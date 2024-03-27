"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { FC, useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel: FC<Props> = ({ slug }) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getStock();
  }, [slug]);

  const getStock = async () => {
    setisLoading(true);
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setisLoading(false);
  };
  return (
    <>
      {isLoading && (
        <h2
          className={`${titleFont.className} antialised font-bold text-lg bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h2>
      )}

      {!isLoading && (
        <h2 className={`${titleFont.className} antialised font-bold text-lg`}>
          Stock: {stock}
        </h2>
      )}
    </>
  );
};
