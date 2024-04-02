"use client";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currencyFormat";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const SummaryInformation = () => {
  const [loaded, setloaded] = useState(false);
  const summaryInformation = useCartStore((state) =>
    state.getSummaryInformation(),
  );
  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) return <div>Loading...</div>;

  return (
    <div className=" bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2">Resume</h2>
      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {summaryInformation.productsQuantity} items
        </span>
        <span>Subtotal</span>
        <span className="text-right">
          {currencyFormat(summaryInformation.subtotal)}
        </span>
        <span>Taxes (15%)</span>
        <span className="text-right">
          {currencyFormat(summaryInformation.taxes)}
        </span>
        <span className="mt-5 text-2xl">Total</span>
        <span className="text-right mt-5 text-2xl">
          {currencyFormat(summaryInformation.total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <Link
          href={"/checkout/address"}
          className="flex btn btn-primary justify-center"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
