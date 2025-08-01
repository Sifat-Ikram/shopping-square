import ProductDetailPage from "@/components/productDetails/ProductDetails";
import Product from "@/types/Product";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 }, // 🔁 Revalidate every 60 seconds (ISR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = params;

  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const openGraph: OpenGraph = {
    title: `${title} | Shopping Square`,
    description: `Explore ${title} with great deals and discounts. Available now on Shopping Square.`,
    url: `https://www.yoursite.com/products/${slug}`,
    siteName: "Shopping Square",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.yoursite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${title} Image`,
      },
    ],
  };

  return {
    title: `${title} | Shopping Square`,
    description: `Buy ${title} online at the best price. Shop now at Shopping Square.`,
    keywords: [
      title,
      "online shopping",
      "shopping square",
      "best price",
      "product details",
    ],
    openGraph,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.yoursite.com/products/${slug}`,
    },
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = params;
  const products = await fetchProducts();

 

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <ProductDetailPage slug={slug} initialProducts={products} />
    </div>
  );
};

export default ProductPage;
