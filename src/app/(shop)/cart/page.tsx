import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
];

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more Items</span>
            <Link href={"/"} className="underline mb-5">
              Buy more
            </Link>
          </div>
          {/* Cart Items */}
          {productsInCart.map((product) => (
            <div key={product.slug} className="flex"></div>
          ))}
          {/* Summary */}
        </div>
      </div>
    </div>
  );
}
