"use server";

import { auth } from "@/auth.config";

export const changeUserRole = async (
  userId: string,
  role: "admin" | "user",
) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You should be authenticated.",
    };
  }
};
