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
        userId: userId,
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                slug: true,
              },
            },
          },
          select: {
            id: true,
            quantity: true,
            size: true,
            price: true,
          },
        },
      },
    });
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: `Could not load the order with id: ${orderId}`,
    };
  }
};
