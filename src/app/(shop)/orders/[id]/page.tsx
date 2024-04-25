import { PaypalButton, Title } from "@/components";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { notFound } from "next/navigation";
import { currencyFormat } from "@/utils";
import { Metadata } from "next";
import { OrderStatus } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Order",
  description: "Looking for order information.",
};

export default async function OrderPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);
  if (!ok) notFound();

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid || false} />
            {order?.orderItems.map((item) => (
              <div
                key={`${item.product.slug}-${item.size}`}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery Address</h2>
            <div className="mb-10">
              <p className="text-xl">
                {order?.orderAddress?.firstName} {order?.orderAddress?.lastName}
              </p>
              <p>{order?.orderAddress?.address}</p>
              <p>{order?.orderAddress?.address2}</p>
              <p>{order?.orderAddress?.zipCode}</p>
              <p>
                {order?.orderAddress?.city}, {order?.orderAddress?.Country.name}
              </p>
              <p>{order?.orderAddress?.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Resume</h2>

            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">{order?.itemsInOrder}</span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>taxes (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <div
                  className={clsx(
                    "bg-green-700 flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  )}
                >
                  <IoCardOutline size={30} />
                  <span className="mx-2">Paid</span>
                </div>
              ) : (
                <PaypalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
