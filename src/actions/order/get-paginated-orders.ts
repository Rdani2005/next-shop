"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You should be authenticated.",
    };
  }

  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(take))) take = 12;

  if (page < 1) page = 1;
  if (take < 1) take = 12;
  // 1. get all products
  try {
    const orders = await prisma.order.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
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
    // 2. Get totlal pages amount
    const totalAmount = await prisma.order.count();
    const totalPages = Math.ceil(totalAmount / take);

    return {
      orders,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    throw new Error(`Could not get paginated products from Database ${error}`);
  }
};
