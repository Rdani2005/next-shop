"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
      },
    });
    return {
      ok: true,
      user: user,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Could not create user. " + error,
    };
  }
};
