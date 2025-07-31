import ProductList from "@/components/productPage/ProductList";
import Product from "@/types/Product";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });
  return res.json();
};

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="font-sans py-6 space-y-10">
      <div className="sm:w-11/12 mx-auto max-sm:px-2 space-y-4">
        <h1 className="text-xl md:text-3xl font-bold text-center text-[#DC143C]">
          Welcome to NextShop — Your One-Stop Online Store
        </h1>
        <p className="text-center text-gray-700 text-sm md:text-base">
          Find everything you need, from everyday essentials to the latest
          trends.
        </p>
      </div>
      <ProductList initialProducts={products} />
    </main>
  );
}
