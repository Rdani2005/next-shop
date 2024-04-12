"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const createdOrder = createOrderReplaceAdress(address, userId);
    return {
      ok: true,
      message: "Address created successfylly.",
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: `Could not record the User Address.`,
    };
  }
};

const createOrderReplaceAdress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.address.findUnique({
      where: {
        userId,
      },
    });
    const { country, ...rest } = address;
    if (!storedAddress) {
      const newAddress = await prisma.address.create({
        data: {
          ...rest,
          userId,
          countryId: country,
        },
      });

      return newAddress;
    }

    const updatedAddress = await prisma.address.update({
      where: { userId },
      data: {
        ...rest,
        countryId: country,
      },
    });
    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error(`Could not record the user address: ${error}`);
  }
};
