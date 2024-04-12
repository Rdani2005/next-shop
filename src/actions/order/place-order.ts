"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId)
    return {
      ok: false,
      message: "You cannot place an order if you are not authenticated.",
    };
  try {
  } catch (error) {
    return { ok: false, message: "" };
  }
};
