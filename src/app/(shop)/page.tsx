import { Title, ProductGrid, Pagination } from "@/components";
import { getPaginatedProducts } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { products, totalPages } = await getPaginatedProducts({
    page: parseInt(searchParams.page || "0"),
  });

  if (products.length === 0) {
    redirect("/");
  }
  return (
    <main>
      <Title title="Store" subtitle="All Products" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages}></Pagination>
    </main>
  );
}
