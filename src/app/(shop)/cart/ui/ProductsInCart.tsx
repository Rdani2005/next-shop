"use client";
import Image from "next/image";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CartProduct } from "@/interfaces";

export const ProductsInCart = () => {
  const [loaded, setloaded] = useState(false);
  const { cart, updateProductQuantity, deleteProduct } = useCartStore();
  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) return <div>Loading...</div>;

  return (
    <>
      {cart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              alt={product.title}
              className="mr-5 rounded mb-5"
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          </Link>
          <div className="">
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              className="underline mt-3"
              onClick={() => deleteProduct(product)}
            >
              remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
