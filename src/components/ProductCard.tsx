"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Product, formatPrice } from "@/lib/data";
import { useApp } from "@/lib/store";
import { Plus } from "lucide-react";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleCart } = useApp();
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedColor, selectedSize);
    toggleCart();
  };

  return (
    <motion.div
      className="relative group overflow-hidden cursor-pointer w-full aspect-[3/4] rounded-sm bg-[var(--bg-surface-2)] shadow-sm"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: (index % 4) * 0.06 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
      data-cursor="product"
    >
      {/* Background/Image wrapper */}
      <div className="absolute inset-0 bg-[var(--bg-surface-2)]">
        <motion.div
          className="w-full h-full relative"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={index < 4}
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      {/* Persistent Info Gradient & Text */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
        <motion.div
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {product.badge && (
            <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--accent)] font-bold mb-1.5 block">
              {product.badge}
            </span>
          )}
          <div className="flex justify-between items-end gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-display text-base sm:text-lg tracking-wide truncate font-semibold">
                {product.name}
              </h3>
              <p className="text-white/70 text-xs mt-0.5 line-clamp-1 font-light">
                {product.description}
              </p>
            </div>
            <div className="text-[var(--accent-light)] font-semibold text-sm sm:text-base tracking-wider flex-shrink-0 whitespace-nowrap">
              {formatPrice(product.price)}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick View Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-x-0 bottom-0 glass p-4 sm:p-5 pt-6 sm:pt-7 flex flex-col gap-3 sm:gap-4 z-20 backdrop-blur-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedColor(color.name);
                    }}
                    className="group flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
                    data-cursor="button"
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === color.name
                          ? "border-[var(--accent)] scale-110"
                          : "border-transparent border-white/20"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span
                      className={`text-[9px] uppercase tracking-widest transition-opacity duration-300 ${
                        selectedColor === color.name
                          ? "text-[var(--text)] opacity-100"
                          : "text-inherit opacity-0 group-hover:opacity-50"
                      }`}
                    >
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="flex flex-wrap gap-2 pointer-events-auto">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size);
                    }}
                    className={`px-3 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 border backdrop-blur-md ${
                      selectedSize === size
                        ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)]"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }`}
                    data-cursor="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="mt-1 w-full py-3 sm:py-3.5 bg-[var(--accent)] text-[var(--bg)] text-xs sm:text-sm tracking-[0.2em] font-bold uppercase pointer-events-auto relative overflow-hidden group/btn rounded-sm"
              data-cursor="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="flex items-center justify-center gap-2 relative z-10">
                <Plus size={16} />
                <span>Add to Cart</span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
