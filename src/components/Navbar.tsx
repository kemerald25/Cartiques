"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount, toggleCart, toggleTheme, theme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bounce cart badge when count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 400);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-12"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
      style={{ height: 72 }}
    >
      {/* Background blur pill */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: scrolled
            ? "rgba(0,0,0,0.6)"
            : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
          borderBottom: scrolled
            ? "1px solid rgba(200,169,110,0.12)"
            : "1px solid rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Logo */}
      <Link href="/" className="relative z-10">
        <motion.span
          className="font-display text-2xl tracking-[0.15em] uppercase"
          style={{ color: "var(--accent)" }}
          whileHover={{ letterSpacing: "0.2em" }}
          transition={{ duration: 0.3 }}
        >
          Cartique
        </motion.span>
      </Link>

      {/* Centre nav links */}
      <div className="relative z-10 hidden md:flex items-center gap-10">
        {[
          { label: "Collection", href: "/#products" },
          { label: "Fashion", href: "/#products" },
          { label: "Gadgets", href: "/#products" },
          { label: "Editorial", href: "/#products" },
        ].map((link) => (
          <Link key={link.label} href={link.href}>
            <motion.span
              className="text-xs tracking-[0.18em] uppercase font-medium opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: "var(--text)" }}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
            </motion.span>
          </Link>
        ))}
      </div>

      {/* Right actions */}
      <div className="relative z-10 flex items-center gap-5">
        {/* Theme toggle */}
        <motion.button
          onClick={handleThemeToggle}
          className="flex items-center justify-center w-9 h-9 rounded-full border opacity-70 hover:opacity-100 transition-opacity"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {theme === "noir" ? (
                <Sun size={15} />
              ) : (
                <Moon size={15} />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Cart button */}
        <motion.button
          id="cart-icon"
          onClick={toggleCart}
          className="relative flex items-center justify-center w-9 h-9"
          style={{ color: "var(--text)" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Open cart (${cartCount} items)`}
        >
          <ShoppingBag size={20} className="opacity-80" />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                className="absolute -top-1 -right-1 text-[10px] font-bold flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg)",
                  width: 18,
                  height: 18,
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: cartBounce ? 1.4 : 1,
                }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 500 }}
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
}
