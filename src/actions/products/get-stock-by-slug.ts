"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    });

    if (!product) return 0;
    return product.inStock;
  } catch (error) {
    return 0;
  }
};
