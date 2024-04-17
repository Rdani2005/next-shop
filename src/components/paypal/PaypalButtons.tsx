"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { FC } from "react";
import { paypalCheckPayment, setOrderTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton: FC<Props> = ({ orderId, amount }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: roundedAmount.toString(),
            currency_code: "USD",
          },
        },
      ],
    });

    const { ok } = await setOrderTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error("Could not update the order.");
    }
    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions,
  ): Promise<void> => {
    const details = await actions.order?.capture();
    if (!details) {
      return;
    }
    await paypalCheckPayment(details.id!);
  };

  return isPending ? (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded mt-2"></div>
    </div>
  ) : (
    <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
  );
};
