"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const setOrderTransactionId = async (
  orderId: string,
  transactionId: string,
) => {
  const session = await auth();
  const userId = session?.user.id;
  // Verify user is authenticaded.
  if (!userId)
    return {
      ok: false,
      message:
        "You cannot place an order payment transaction if you are not authenticated.",
    };

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order) throw `Order with id: ${orderId} does not exists.`;
    if (session.user.role === "user" && session.user.id !== order.userId) {
      throw `Order with id: ${orderId} does not exists.`;
    }

    order.transactionId = transactionId;
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...order,
        transactionId,
      },
    });
    return {
      ok: true,
      message: "Order transactionId setup successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Could not set the transactionId for the order.",
    };
  }
};
