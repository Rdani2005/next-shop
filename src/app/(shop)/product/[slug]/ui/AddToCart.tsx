"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(0);
  const [posted, setposted] = useState(false);
  const { addProductToCart } = useCartStore();
  const AddToCart = () => {
    setposted(true);
    if (!size) return;
    const cartProduct: CartProduct = {
      ...product,
      quantity,
      size,
      image: product.images[0],
    };
    addProductToCart(cartProduct);
    setposted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500">
          You should select a Size for adding to the cart.
        </span>
      )}

      <SizeSelector
        onSelectedSize={setSize}
        selectedSize={size}
        availableSizes={product.sizes}
      />
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      <button className="btn-primary my-5" onClick={AddToCart}>
        Add To Cart
      </button>
    </>
  );
};
