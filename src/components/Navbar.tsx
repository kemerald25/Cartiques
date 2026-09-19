"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sun, Moon, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount, toggleCart, toggleTheme, theme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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

  const navLinks = [
    { label: "All Collections", href: "/#products" },
    { label: "Couture & Gowns", href: "/#products" },
    { label: "Tailoring", href: "/#products" },
    { label: "Resort Wear", href: "/#products" },
    { label: "Accessories", href: "/#products" },
    { label: "The Atelier", href: "/#philosophy" },
  ];

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-8 md:px-12"
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
              ? "rgba(0,0,0,0.65)"
              : "rgba(0,0,0,0)",
            backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
            borderBottom: scrolled
              ? "1px solid rgba(200,169,110,0.15)"
              : "1px solid rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <motion.div
            className="flex flex-col"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="font-display text-xl sm:text-2xl tracking-[0.18em] uppercase font-bold"
              style={{ color: "var(--accent)" }}
            >
              Italo Boutique
            </span>
            <span
              className="text-[8px] tracking-[0.35em] uppercase opacity-60 -mt-1 hidden sm:block"
              style={{ color: "var(--text)" }}
            >
              Haute Couture · Milano & Lagos
            </span>
          </motion.div>
        </Link>

        {/* Centre nav links (Desktop) */}
        <div className="relative z-10 hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 5).map((link) => (
            <Link key={link.label} href={link.href}>
              <motion.span
                className="text-[11px] tracking-[0.2em] uppercase font-medium opacity-70 hover:opacity-100 transition-opacity"
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
        <div className="relative z-10 flex items-center gap-3 sm:gap-4">
          {/* Currency indicator */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-wider font-medium border"
            style={{
              borderColor: "var(--border)",
              color: "var(--accent)",
              backgroundColor: "rgba(200,169,110,0.06)",
            }}
          >
            <span className="font-bold">₦</span>
            <span className="text-[10px] opacity-80 uppercase tracking-widest text-[var(--text)]">
              NGN
            </span>
          </div>

          {/* Theme toggle */}
          <motion.button
            onClick={handleThemeToggle}
            className="flex items-center justify-center w-9 h-9 rounded-full border opacity-80 hover:opacity-100 transition-opacity"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
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
            className="relative flex items-center justify-center w-9 h-9 rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Open bag (${cartCount} items)`}
          >
            <ShoppingBag size={17} className="opacity-90" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  className="absolute -top-1.5 -right-1.5 text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                    width: 19,
                    height: 19,
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: cartBounce ? 1.35 : 1,
                  }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Hamburger Button */}
          <motion.button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full border transition-colors relative z-[110]"
            style={{
              borderColor: mobileMenuOpen ? "var(--accent)" : "var(--border)",
              color: mobileMenuOpen ? "var(--accent)" : "var(--text)",
              backgroundColor: mobileMenuOpen ? "rgba(200,169,110,0.1)" : "transparent",
            }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Hamburger Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[98] lg:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[99] w-[85%] max-w-[360px] flex flex-col justify-between p-6 pt-24 lg:hidden shadow-2xl overflow-y-auto"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderLeft: "1px solid var(--border)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            >
              {/* Menu Content */}
              <div className="space-y-8">
                {/* Header inside mobile drawer */}
                <div className="border-b pb-4" style={{ borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} style={{ color: "var(--accent)" }} />
                    <span
                      className="text-[10px] uppercase tracking-[0.25em] font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      Boutique Catalogue
                    </span>
                  </div>
                  <h3
                    className="font-display text-2xl tracking-wider uppercase font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    Italo Boutique
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Bespoke Haute Couture & Tailoring
                  </p>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleMobileNavClick}
                        className="flex items-center justify-between py-3.5 px-3 rounded-lg group hover:bg-[var(--bg-surface-2)] transition-colors"
                      >
                        <span
                          className="font-display text-lg tracking-wide group-hover:text-[var(--accent)] transition-colors"
                          style={{ color: "var(--text)" }}
                        >
                          {link.label}
                        </span>
                        <ArrowRight
                          size={16}
                          className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                          style={{ color: "var(--accent)" }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Bag Action */}
                <div
                  className="p-4 rounded-xl border flex items-center justify-between"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--bg-surface-2)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={18} style={{ color: "var(--accent)" }} />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider">
                        Your Shopping Bag
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        {cartCount === 0
                          ? "No items added yet"
                          : `${cartCount} item${cartCount > 1 ? "s" : ""} selected`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      toggleCart();
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                    }}
                  >
                    Open
                  </button>
                </div>
              </div>

              {/* Footer info in drawer */}
              <div
                className="pt-6 border-t mt-8 space-y-4 text-xs"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-widest text-[10px]">
                    Currency
                  </span>
                  <span className="font-semibold text-[var(--accent)]">
                    ₦ NGN (Nigerian Naira)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-widest text-[10px]">
                    Atelier Locations
                  </span>
                  <span className="text-[var(--text)]">Lagos · Milan · London</span>
                </div>
                <p className="text-[10px] leading-relaxed pt-2 opacity-60">
                  Concierge & bespoke consultations available via appointment.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

