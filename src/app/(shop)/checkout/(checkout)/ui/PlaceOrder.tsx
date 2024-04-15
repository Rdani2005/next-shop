"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const { address } = useAddressStore();
  const [errorMessage, setErrorMessage] = useState("");
  const summaryInformation = useCartStore((state) =>
    state.getSummaryInformation(),
  );
  const { cart, clearCart } = useCartStore();
  const router = useRouter();
  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));
    const response = await placeOrder(productsToOrder, address);
    if (!response.ok) {
      setErrorMessage(response.message);
      setIsPlacingOrder(false);
      return;
    }
    clearCart();
    setIsPlacingOrder(false);
    router.replace(`/orders/${response.order?.id}`);
  };

  if (!loaded) return <p>loading...</p>;
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Delivery Address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.zipCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>
      <div className="w-full h-0 5 rounded bg-gray-200 mb-10" />
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
        <p className="mb-5">
          <span className="text-xs">
            By doing click on &quot;Place Order&quot;, you are accepting our{" "}
          </span>
          <a href="#" className="underline text-xs">
            Terms and Conditions
          </a>
        </p>
      </div>
      <p className="text-red-500">{errorMessage}</p>
      <button
        onClick={onPlaceOrder}
        className={clsx({
          "btn-primary": !isPlacingOrder,
          "btn-disable": isPlacingOrder,
        })}
      >
        Place Order
      </button>
    </div>
  );
};
