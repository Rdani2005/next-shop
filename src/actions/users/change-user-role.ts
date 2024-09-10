"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();
  const newRole = role === "admin" ? "admin" : "user";
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You should be authenticated.",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
      message: "User role changed successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "error when changing user role.",
    };
  }
};
