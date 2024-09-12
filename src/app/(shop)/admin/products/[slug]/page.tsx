import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { notFound } from "next/navigation";
import React from "react";
import { ProductForm } from "./ui/ProductsForm";

type Props = {
  params: {
    slug: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product) {
    if (slug !== "new") {
      notFound();
    }
  }

  const title =
    slug === "new" ? "create product" : product ? product.title : "";
  return (
    <>
      <Title title={title} />
      {product && <ProductForm product={product!} categories={categories} />}
    </>
  );
};

export default ProductPage;
