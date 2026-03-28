"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useState } from "react";

export default function CartDrawer() {
  const { cart, cartOpen, toggleCart, removeFromCart, updateQty, cartTotal } =
    useApp();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = () => {
    setCheckingOut(true);
    toggleCart();
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200]"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-[201] flex flex-col w-full max-w-[420px]"
            style={{ backgroundColor: "var(--bg-surface)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35, mass: 0.8 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-7 py-6"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} style={{ color: "var(--accent)" }} />
                <span
                  className="text-sm tracking-[0.18em] uppercase font-medium"
                  style={{ color: "var(--text)" }}
                >
                  Your Bag
                </span>
                {cart.length > 0 && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                    }}
                  >
                    {cart.length}
                  </span>
                )}
              </div>
              <motion.button
                onClick={toggleCart}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                style={{ color: "var(--text-muted)" }}
                className="hover:opacity-70"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-4">
              <AnimatePresence initial={false}>
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-20"
                  >
                    <ShoppingBag
                      size={48}
                      style={{ color: "var(--border)" }}
                    />
                    <p
                      className="text-sm tracking-wider uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Your bag is empty
                    </p>
                    <motion.button
                      onClick={toggleCart}
                      className="text-xs tracking-[0.15em] uppercase mt-2 px-6 py-2 rounded-full border"
                      style={{
                        borderColor: "var(--accent)",
                        color: "var(--accent)",
                      }}
                      whileHover={{
                        backgroundColor: "var(--accent)",
                        color: "var(--bg)",
                      }}
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {cart.map((item, i) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: i * 0.04,
                          layout: { type: "spring", stiffness: 400, damping: 35 },
                        }}
                        className="flex gap-4 items-start"
                      >
                        {/* Thumbnail */}
                        <div
                          className="relative rounded-lg overflow-hidden flex-shrink-0"
                          style={{
                            width: 80,
                            height: 96,
                            backgroundColor: "var(--bg-surface-2)",
                          }}
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium leading-tight truncate"
                            style={{ color: "var(--text)" }}
                          >
                            {item.product.name}
                          </p>
                          <p
                            className="text-xs mt-1"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {item.selectedColor} · {item.selectedSize}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            {/* Qty stepper */}
                            <div
                              className="flex items-center gap-2 rounded-full px-2 py-1"
                              style={{ border: "1px solid var(--border)" }}
                            >
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() =>
                                  updateQty(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-5 h-5 flex items-center justify-center"
                                style={{ color: "var(--text-muted)" }}
                              >
                                <Minus size={11} />
                              </motion.button>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                  key={item.quantity}
                                  initial={{ y: -8, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 8, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-xs font-medium w-4 text-center"
                                  style={{ color: "var(--text)" }}
                                >
                                  {item.quantity}
                                </motion.span>
                              </AnimatePresence>
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() =>
                                  updateQty(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-5 h-5 flex items-center justify-center"
                                style={{ color: "var(--text-muted)" }}
                              >
                                <Plus size={11} />
                              </motion.button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className="text-sm font-semibold"
                                style={{ color: "var(--text)" }}
                              >
                                {formatPrice(
                                  item.product.price * item.quantity
                                )}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  removeFromCart(item.product.id)
                                }
                                style={{ color: "var(--text-muted)" }}
                                className="hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={14} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / CTA */}
            {cart.length > 0 && (
              <motion.div
                className="px-7 py-6"
                style={{ borderTop: "1px solid var(--border)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Free shipping notice */}
                <div
                  className="flex items-center justify-between text-xs mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="tracking-wider uppercase">Subtotal</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={cartTotal}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="font-semibold text-sm"
                      style={{ color: "var(--text)" }}
                    >
                      {formatPrice(cartTotal)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p
                  className="text-center text-xs mb-5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Shipping & taxes calculated at checkout
                </p>

                <Link href="/checkout" onClick={handleCheckout}>
                  <motion.button
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-medium tracking-[0.1em] uppercase text-sm gold-glow"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
