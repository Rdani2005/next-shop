export const revalidate = 60;
import { getPaginatedProducts } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: Category;
  };
  searchParams: {
    page?: string;
  };
}

const labels: Record<Category, string> = {
  men: "para hombres",
  women: "para mujeres",
  kid: "para niños",
  unisex: "para todos",
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;
  const { products, totalPages } = await getPaginatedProducts({
    page: parseInt(searchParams.page || "0"),
    gender: gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <main>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}

// api needed to integrate metallic casino (JSON)
