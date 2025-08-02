// app/sitemap.xml/route.ts
import type Product from "@/types/Product";

// Define a simple, custom type to avoid conflicts with Next.js's MetadataRoute.
type SitemapItem = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

export async function GET(): Promise<Response> {
  const products = (await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  )) as Product[];

  const productRoutes: SitemapItem[] = products.map((product) => ({
    url: `https://shopping-square.vercel.app/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const staticRoutes: SitemapItem[] = [
    {
      url: "https://shopping-square.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const sitemapData = [...staticRoutes, ...productRoutes];

  // Manually construct the sitemap XML string
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapData
  .map(
    (item) => `
    <url>
      <loc>${item.url}</loc>
      <lastmod>${item.lastModified.toISOString()}</lastmod>
      <changefreq>${item.changeFrequency}</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `
  )
  .join("")}
</urlset>
`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
