"use client";
import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import Link from "next/link";

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
            <ProductImage
              src={`${product.image}`}
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
