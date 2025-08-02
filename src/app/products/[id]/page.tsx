import { Metadata } from "next";
import Product from "@/types/Product";
import ProductDetailPage from "@/components/productDetails/ProductDetails";

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  return products.map((product) => ({ id: product.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await res.json();

  return {
    title: `${product.title} | Shopping Square`,
    description: product.description,
    openGraph: {
      title: `${product.title} | Shopping Square`,
      description: product.description,
      url: `https://shopping-square.vercel.app/products/${product.id}`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 },
  });
  const product: Product = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <ProductDetailPage product={product} />
    </div>
  );
}
