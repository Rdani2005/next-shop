"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getUserAddress = async (
  userId: string,
): Promise<Address | null> => {
  try {
    const address = await prisma.address.findUnique({
      where: { userId },
    });
    if (address) {
      return {
        ...address,
        country: address!.countryId,
        address2: address.address2 ?? undefined,
      };
    }
    return null;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
