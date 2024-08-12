"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({
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

  // 1. get all products
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "desc",
      },
      take,
      skip: (page - 1) * take,
    });
    // 2. Get totlal pages amount
    const totalAmount = await prisma.user.count();
    const totalPages = Math.ceil(totalAmount / take);

    return {
      users,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    throw new Error(`Could not get paginated products from Database ${error}`);
  }
};
