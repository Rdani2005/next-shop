"use server";

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProducts = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(take))) take = 12;

  if (page < 1) page = 1;
  if (take < 1) take = 12;
  // 1. get all products
  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });
    // 2. Get totlal pages amount
    const totalAmount = await prisma.product.count({});
    const totalPages = Math.ceil(totalAmount / take);

    return {
      products: products.map(({ ProductImage, category, ...product }) => ({
        ...product,
        images: ProductImage.map((image) => image.url),
        type: category.name,
      })) as Product[],
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    throw new Error(`Could not get paginated products from Database ${error}`);
  }
};
