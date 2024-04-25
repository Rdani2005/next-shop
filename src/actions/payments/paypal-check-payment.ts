"use server";
import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();
  if (!authToken) {
    return {
      ok: false,
      message: "could not get the auth token.",
    };
  }

  const response = await verifyPaypalPayment(transactionId, authToken);
  if (!response) {
    return {
      ok: false,
      message: "Error on paypal transaction payment.",
    };
  }

  const { status, purchase_units } = response;
  const { invoice_id: orderId } = purchase_units[0];
  if (status != "COMPLETED") {
    return {
      ok: false,
      message: "It has not being paid on PayPal",
    };
  }

  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
      message: "Order was paid successfully.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Payment could not be completed.",
    };
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET || "";
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
    "utf-8",
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  try {
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        ...requestOptions,
        cache: "no-store",
      },
    )
      .then((res) => res.json())
      .catch((error) => error);
    return response.access_token;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string,
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  console.log({ paypalOrderUrl });

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((res) => res.json());
    return response;
  } catch (error) {
    console.log(error);

    return null;
  }
};
