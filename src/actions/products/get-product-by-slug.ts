"use server";

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getProductBySlug = async (
  slug: string,
): Promise<Product | null> => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    const { ProductImage, category, ...rest } = product;

    return {
      ...rest,
      images: ProductImage.map((image) => image.url),
      type: category.name,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by slug: ${error}`);
  }
};
