"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();
  const userId = session?.user.id;
  // Verify user is authenticaded.
  if (!userId)
    return {
      ok: false,
      message: "You cannot place an order if you are not authenticated.",
      orders: [],
    };

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        isPaid: true,
        orderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      ok: true,
      message: "Ok",
      orders,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "There was an error handling your orders request.",
      orders: [],
    };
  }
};
