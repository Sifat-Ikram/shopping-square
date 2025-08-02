"use client";
import Product from "@/types/Product";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";
import { addToCart } from "../../lib/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import CartSidebar from "../cart/Cart";

interface ProductDetailProps {
  product: Product;
}

const ProductDetailPage = ({ product }: ProductDetailProps) => {
  const dispatch = useDispatch();
  const [zoomStyle, setZoomStyle] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rate >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transform: `scale(1.7)`,
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        category: product.category,
        image: product.image,
      })
    );

    setIsCartOpen(true);
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8 space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product Image */}
        <motion.div className="relative w-full aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              priority
              style={zoomStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </motion.div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-4 text-gray-800"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#DC143C]">
            {product.title}
          </h1>
          <p className="text-xl font-bold text-[#DC143C]">
            BDT {product.price.toFixed(2)}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
          {/* Rating */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex">{renderStars(product.rating.rate)}</div>
            <span>
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Call-to-Action Buttons (optional future use) */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleAddToCart}
              className="bg-[#DC143C] cursor-pointer text-white px-5 py-2 rounded-xl hover:bg-[#c11235] transition-colors text-sm sm:text-base"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}
    </motion.div>
  );
};

export default ProductDetailPage;
