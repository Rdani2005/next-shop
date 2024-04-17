"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();
  const userId = session?.user.id;
  // Verify user is authenticaded.
  if (!userId)
    return {
      ok: false,
      message: "You cannot place an order if you are not authenticated.",
    };

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderAddress: {
          select: {
            firstName: true,
            lastName: true,
            city: true,
            address: true,
            zipCode: true,
            address2: true,
            phone: true,
            Country: {
              select: {
                name: true,
              },
            },
          },
        },
        orderItems: {
          select: {
            quantity: true,
            size: true,
            price: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (!order) throw `Order with id: ${orderId} does not exists.`;
    if (session.user.role === "user" && session.user.id !== order.userId) {
      throw `Order with id: ${orderId} does not exists.`;
    }

    return {
      ok: true,
      order: order,
      message: "Order exists.",
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: `Could not load the order with id: ${orderId}`,
    };
  }
};
