import { QuantitySelector, Title } from "@/components";
import { Product } from "@/interfaces";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { SummaryInformation } from "./ui/SummaryInformation";

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
            {/* Cart Items */}
            <ProductsInCart />
          </div>
          {/* Summary */}
          <SummaryInformation />
        </div>
      </div>
    </div>
  );
}
