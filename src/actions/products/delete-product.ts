"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "Could not delete images from FS",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
  try {
    cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/products/${deletedImage.product.slug}`);
    return {
      ok: true,
      message: "product image deleted successfully",
    };
  } catch (error) {
    return {
      ok: false,
      error: "Could not delete images from FS",
    };
  }
};
