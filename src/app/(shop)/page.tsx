import { Title, ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
    return (
        <main>
            <Title title="Store" subtitle="All Products" className="mb-2" />
            <ProductGrid products={products} />
        </main>
    );
}
