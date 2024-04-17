"use server";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();
  if (!authToken)
    return {
      ok: false,
      nessage: "could not get the auth token.",
    };
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET || "";
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
    "utf-8",
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlEncoded = new URLSearchParams();

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlEncoded,
  };

  try {
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      requestOptions,
    ).then((response) => response.json());
    return response.access_token;
  } catch (error) {
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string,
) => {
  const paypalOrderUrl = `${process.env.PAYAL_ORDERS_URL}/${paypalTransactionId}`;
};
