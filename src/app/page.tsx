"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video/Image */}
        <motion.div
          className="absolute inset-0 z-0 bg-[var(--bg-surface-2)]"
          style={{ y }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2000&q=80')",
            }}
          />
          {/* Top/Bottom Gradient Fades for blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.h1
            className="font-display text-[15vw] leading-none tracking-tight text-[var(--accent)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          >
            CARTIQUE
          </motion.h1>

          <div className="overflow-hidden mt-6">
            <motion.p
              className="text-lg md:text-2xl tracking-[0.2em] font-light uppercase text-[var(--text)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              The Next Era of Luxury
            </motion.p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[var(--text-muted)] mt-12 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">
            Discover
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 md:px-24 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center"
        >
          <div className="space-y-8">
            <h2 className="font-display text-4xl md:text-6xl text-[var(--accent)] leading-tight">
              Design is not just what it looks like.
              <br />
              <span className="text-[var(--text)] italic">It is how it works.</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-md">
              We curate a collection where form and function intersect flawlessly.
              From high-fashion garments to precision-engineered gadgets, every
              piece is selected for its uncompromising quality and visionary
              design.
            </p>
          </div>
          <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-surface-2)]">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=90')",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Product Grid Section */}
      <section id="products" className="px-4 md:px-8 pb-32 max-w-[1600px] mx-auto relative z-10">
        <div className="flex items-end justify-between mb-16 px-4">
          <h2 className="font-display text-4xl md:text-5xl tracking-wide">
            Curated <span className="text-[var(--text-muted)] italic">Selection</span>
          </h2>
          <span className="text-xs tracking-[0.2em] text-[var(--accent)] uppercase hidden md:block border-b border-[var(--accent)] pb-1">
            View All ({products.length})
          </span>
        </div>

        {/* Masonry Grid Setup using CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[400px]">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-20 px-8 lg:px-24">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
            <div>
               <h3 className="font-display text-2xl tracking-[0.15em] uppercase text-[var(--accent)] mb-6">Cartique</h3>
               <p className="text-[var(--text-muted)] max-w-xs text-sm">
                  The intersection of luxury fashion and precision technology.
               </p>
            </div>
            <div className="flex gap-16">
               <div className="flex flex-col gap-4">
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--text)]">Explore</span>
                  <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Fashion</a>
                  <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Gadgets</a>
                  <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Editorial</a>
               </div>
               <div className="flex flex-col gap-4">
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--text)]">Legal</span>
                  <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Terms</a>
                  <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Privacy</a>
                  <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Returns</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
