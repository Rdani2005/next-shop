import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verify Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Edit items</span>
            <Link href={"/cart"} className="underline mb-5">
              Edit Cart
            </Link>
            {/* Cart Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded mb-5"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div className="">
                  <p>{product.title}</p>
                  <p>{product.price} X 3</p>
                  {/* <button className="underline mt-3">remove</button> */}
                </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Address Delivery</h2>
            <div className="grid grid-cols-2 mb-2">
              <span>Address</span>
              <span className="text-right">Calle 123, Miami</span>
              <span>Phone</span>
              <span className="text-right">+57 123 456 789</span>
              <span>Delivery</span>
              <span className="text-right">Free</span>
            </div>
            <div className="w-full h-0 5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resume</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 items</span>
              <span>Subtotal</span>
              <span className="text-right">$100</span>
              <span>Taxes (15%)</span>
              <span className="text-right">$15</span>
              <span className="mt-5 text-2xl">Total</span>
              <span className="text-right mt-5 text-2xl">$115</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link
                href={"/orders/123"}
                className="flex btn btn-primary justify-center"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
