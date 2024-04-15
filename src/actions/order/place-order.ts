"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
) => {
  const session = await auth();
  const userId = session?.user.id;
  // Verify user is authenticaded.
  if (!userId)
    return {
      ok: false,
      message: "You cannot place an order if you are not authenticated.",
    };
  try {
    // Get Product Information
    // ! Remember we can have the two or more products with the same Id.
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map((p) => p.productId),
        },
      },
    });

    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
    const { subtotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find((p) => p.id === item.productId);
        if (!product)
          throw new Error(`${item.productId} does not exists - 500`);
        const itemSubTotal = product.price * productQuantity;

        totals.subtotal += itemSubTotal;
        totals.tax += itemSubTotal * 0.15;
        totals.total += itemSubTotal * 1.15;
        return totals;
      },
      { subtotal: 0, tax: 0, total: 0 },
    );
    try {
      // Prisma Transaction for orders. Remember we are using three tables, and we should be sure of success. If one transaction is not succeded, then we will do a rollback
      const prismaTx = await prisma.$transaction(async (tx) => {
        // 1. Update stock
        const updatedProductsPromise = products.map((product) => {
          const productQuantity = productIds
            .filter((p) => p.productId === product.id)
            .reduce((acc, item) => item.quantity + acc, 0);
          if (productQuantity === 0) {
            throw new Error(`${product.id} does not have a defined quantity.`);
          }

          return tx.product.update({
            where: { id: product.id },
            data: {
              inStock: {
                decrement: productQuantity,
              },
            },
          });
        });

        const updatedProducts = await Promise.all(updatedProductsPromise);
        // No item should have negative values. In that case, there is not stock
        updatedProducts.forEach((product) => {
          if (product.inStock < 0) {
            throw new Error(`${product.title} does not have enough stock.`);
          }
        });
        // 2. Create order header + details
        const order = await tx.order.create({
          data: {
            userId: userId,
            itemsInOrder,
            subTotal: subtotal,
            isPaid: false,
            tax,
            total,
            orderItems: {
              createMany: {
                data: productIds.map((p) => ({
                  quantity: p.quantity,
                  size: p.size,
                  productId: p.productId,
                  price:
                    products.find((product) => product.id === p.productId)
                      ?.price ?? 0,
                })),
              },
            },
          },
        });
        // 3. Create order address
        const { country, ...restAddress } = address;
        const orderAddress = await tx.orderAddress.create({
          data: {
            ...restAddress,
            countryId: country,
            orderId: order.id,
          },
        });
        return {
          order,
          updatedProducts: updatedProducts,
          orderAddress: orderAddress,
        };
      });

      return {
        ok: true,
        order: prismaTx.order,
        orderAddress: prismaTx.orderAddress,
        updatedProducts: prismaTx.updatedProducts,
        message: "Order created successfully.",
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error?.message ?? "",
      };
    }
  } catch (error) {
    return { ok: false, message: `Error ocurred on the action: ${error}` };
  }
};
