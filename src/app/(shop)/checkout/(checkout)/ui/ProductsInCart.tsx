"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const [loaded, setloaded] = useState(false);
  const { cart } = useCartStore();
  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) return <div>Loading...</div>;

  return (
    <>
      {cart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex">
          <span>
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
          </span>
          <div className="">
            <span className="hover:underline cursor-pointer">
              {product.title}
            </span>
            <p>
              ${product.price} - {product.quantity}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
