"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { products, boutiqueCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { ArrowDown, Sparkles, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Collections");

  const filteredProducts =
    selectedCategory === "All Collections"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center px-4">
        {/* Background Video/Image */}
        <motion.div
          className="absolute inset-0 z-0 bg-[var(--bg-surface-2)]"
          style={{ y }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2000&q=80')",
            }}
          />
          {/* Top/Bottom Gradient Fades for blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center flex flex-col items-center max-w-5xl mx-auto">
          {/* Micro pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-black/40 backdrop-blur-md mb-6"
          >
            <Sparkles size={12} className="text-[var(--accent)]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--text)] font-semibold">
              Milanese Craftsmanship · Lagos Elegance
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-[12vw] sm:text-[10vw] lg:text-[8.5vw] leading-[0.95] tracking-tight text-[var(--accent)] font-bold"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          >
            ITALO BOUTIQUE
          </motion.h1>

          <div className="overflow-hidden mt-6">
            <motion.p
              className="text-base sm:text-xl md:text-2xl tracking-[0.25em] font-light uppercase text-[var(--text)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              Haute Couture & Sartorial Luxury
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mt-4 font-light leading-relaxed hidden sm:block"
          >
            Curated bespoke garments, liquid silk gowns, and structured tailoring
            tailored for connoisseurs of timeless style.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[var(--text-muted)] z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase">
            Explore Collection
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
          >
            <ArrowDown size={13} />
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy / Atelier Section */}
      <section id="philosophy" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
        >
          <div className="space-y-6 sm:space-y-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] font-bold block">
              The Italo Philosophy
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[var(--accent)] leading-tight">
              Sartorial mastery.
              <br />
              <span className="text-[var(--text)] italic font-normal">Born for the spotlight.</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-lg font-light">
              At Italo Boutique, every silhouette is an architectural study in
              proportions. We combine classical Italian tailoring traditions with
              the vibrant, unapologetic grandeur of modern African high-society.
              Each piece is created in limited runs with pure silks, Scottish
              cashmeres, and virgin wools.
            </p>
            <div className="pt-2 flex items-center gap-8 border-t border-[var(--border)]">
              <div>
                <p className="font-display text-2xl text-[var(--accent)]">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Pure Natural Silks & Wools</p>
              </div>
              <div className="border-l border-[var(--border)] pl-8">
                <p className="font-display text-2xl text-[var(--accent)]">Atelier</p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Lagos & Milan Tailored</p>
              </div>
            </div>
          </div>
          <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-surface-2)] shadow-2xl rounded-sm">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=90')",
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-widest uppercase">
              Autumn/Winter · Haute Couture Atelier
            </div>
          </div>
        </motion.div>
      </section>

      {/* Product Grid Section */}
      <section id="products" className="px-4 sm:px-6 md:px-12 pb-32 max-w-[1600px] mx-auto relative z-10">
        {/* Title and Category Tabs Header */}
        <div className="flex flex-col gap-6 mb-12 px-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] font-bold block mb-2">
                Boutique Catalogue
              </span>
              <h2 className="font-display text-3xl sm:text-5xl tracking-wide">
                Curated <span className="text-[var(--text-muted)] italic font-light">Collections</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-[var(--text-muted)] uppercase">
              <SlidersHorizontal size={14} className="text-[var(--accent)]" />
              <span>{filteredProducts.length} Items Available</span>
            </div>
          </div>

          {/* Interactive Category Filter Pills (Mobile-friendly horizontal scroll) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
            {boutiqueCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 font-medium cursor-pointer ${
                    isSelected
                      ? "text-[var(--bg)] font-bold shadow-md"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--bg-surface-2)] border border-[var(--border)]"
                  }`}
                  style={{
                    backgroundColor: isSelected ? "var(--accent)" : undefined,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid Setup */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-16 sm:py-24 px-6 sm:px-12 lg:px-24 bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-4">
            <h3 className="font-display text-2xl tracking-[0.18em] uppercase text-[var(--accent)] font-bold">
              Italo Boutique
            </h3>
            <p className="text-[var(--text-muted)] max-w-sm text-sm leading-relaxed">
              Haute couture, bespoke tailoring, and timeless elegance curated
              for the modern luminary. Available online and by private appointment.
            </p>
            <div className="text-xs text-[var(--accent)] font-medium pt-2">
              Prices displayed in Nigerian Naira (₦ NGN)
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--text)]">
                Catalogues
              </span>
              <button onClick={() => setSelectedCategory("Couture & Gowns")} className="text-sm text-left text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                Couture & Gowns
              </button>
              <button onClick={() => setSelectedCategory("Tailoring & Outerwear")} className="text-sm text-left text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                Tailoring & Suits
              </button>
              <button onClick={() => setSelectedCategory("Resort & Tops")} className="text-sm text-left text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                Resort Wear
              </button>
              <button onClick={() => setSelectedCategory("Accessories")} className="text-sm text-left text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                Artisanal Accessories
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--text)]">
                Boutique Salons
              </span>
              <span className="text-sm text-[var(--text-muted)]">Victoria Island, Lagos</span>
              <span className="text-sm text-[var(--text-muted)]">Via Montenapoleone, Milan</span>
              <span className="text-sm text-[var(--text-muted)]">Mayfair, London</span>
              <a href="#" className="text-sm text-[var(--accent)] hover:underline pt-2">
                Book Private Fitting
              </a>
            </div>

            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-xs tracking-[0.2em] uppercase font-bold text-[var(--text)]">
                Client Care
              </span>
              <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Complimentary Delivery</a>
              <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Bespoke Adjustments</a>
              <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Privacy & Security</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Italo Boutique. All rights reserved.</p>
          <p className="tracking-wider uppercase text-[10px]">Haute Couture & Sartorial Excellence</p>
        </div>
      </footer>
    </div>
  );
}

