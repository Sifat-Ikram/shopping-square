import { motion } from "framer-motion";
import Image from "next/image";
import Product from "@/types/Product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.section
      whileHover={{ y: -6, boxShadow: "0px 12px 32px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="w-full rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 flex flex-col gap-4"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority
          className="object-contain max-h-40 transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 sm:gap-2 mt-auto">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
          {product.category}
        </p>
        <p className="text-sm sm:text-base font-medium text-gray-700">
          BDT {product.price.toFixed(2)}
        </p>
        <Link href={`/products/${product.id}`}>
          <button className="mt-2 w-fit cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#DC143C] text-[#DC143C] text-xs sm:text-sm hover:bg-[#DC143C] hover:text-white transition-colors duration-200">
            View Details
          </button>
        </Link>
      </div>
    </motion.section>
  );
};

export default ProductCard;
