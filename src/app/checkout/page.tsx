"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import {
  Check,
  ChevronRight,
  ChevronDown,
  Lock,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Building2,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = ["Shipping", "Payment", "Review"];

const nigerianStates = [
  "Lagos",
  "Abuja (FCT)",
  "Rivers",
  "Oyo",
  "Delta",
  "Ogun",
  "Enugu",
  "Anambra",
  "Edo",
  "Kano",
  "Kaduna",
  "Other State",
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "Amaka",
    lastName: "Adeyemi",
    email: "amaka.adeyemi@example.com",
    phone: "0803 123 4567",
    address: "Plot 12, Victoria Island Boulevard",
    city: "Victoria Island",
    state: "Lagos",
    deliveryNotes: "",
    cardNumber: "**** **** **** 8821",
    expiry: "09/28",
    cvc: "392",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
      }, 4000);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] px-6 text-center gap-6">
        <div className="w-16 h-16 rounded-full border border-[var(--border)] flex items-center justify-center bg-[var(--bg-surface-2)]">
          <ShoppingBag size={28} className="text-[var(--accent)]" />
        </div>
        <div>
          <h2 className="text-2xl font-display text-[var(--accent)] mb-2">
            Your Bag is Empty
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-sm">
            Discover our curated haute couture and bespoke tailoring collections.
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3.5 bg-[var(--accent)] text-[var(--bg)] font-bold tracking-[0.15em] uppercase text-xs rounded-full hover:opacity-90 transition-opacity"
        >
          Explore Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-20 sm:pt-24 pb-24 sm:pb-32">
      {/* Mobile Collapsible Order Summary Bar */}
      <div className="lg:hidden border-y border-[var(--border)] bg-[var(--bg-surface)] sticky top-[72px] z-40">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
          className="w-full py-3.5 px-5 flex items-center justify-between text-xs tracking-wider"
        >
          <div className="flex items-center gap-2 text-[var(--accent)] font-medium">
            <ShoppingBag size={16} />
            <span>
              {mobileSummaryOpen ? "Hide Order Summary" : "Show Order Summary"}
            </span>
            <span className="text-[var(--text-muted)]">
              ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                mobileSummaryOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          <span className="font-bold text-sm text-[var(--text)]">
            {formatPrice(cartTotal)}
          </span>
        </button>

        {/* Mobile Dropdown Cart Items */}
        <AnimatePresence>
          {mobileSummaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg-surface-2)] px-5 py-4 space-y-4"
            >
              <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-3 items-center"
                  >
                    <div className="relative w-12 h-14 bg-black/20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {item.selectedColor} · {item.selectedSize} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[var(--border)] space-y-2 text-xs">
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Boutique Courier</span>
                  <span className="text-[var(--accent)] font-medium">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1 border-t border-[var(--border)]">
                  <span>Total</span>
                  <span className="text-[var(--accent)]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Main Content Area */}
        <div className="lg:col-span-7">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft size={14} />
            <span>Return to Boutique</span>
          </Link>

          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] font-semibold block">
                Italo Boutique Checkout
              </span>
              <h1 className="font-display text-2xl sm:text-4xl tracking-wide">
                Secure Checkout
              </h1>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--accent)]">
              <ShieldCheck size={16} />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-medium">
                Encrypted & Safe
              </span>
            </div>
          </div>

          {/* Stepper (Responsive) */}
          <div className="mb-8 p-3 sm:p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => {
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <button
                      onClick={() => {
                        if (idx < currentStep) setCurrentStep(idx);
                      }}
                      disabled={idx > currentStep}
                      className={`flex items-center gap-2 text-left transition-opacity ${
                        idx <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all ${
                          isCompleted
                            ? "bg-[var(--accent)] text-[var(--bg)]"
                            : isActive
                            ? "border-2 border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
                            : "bg-[var(--border)] text-[var(--text-muted)]"
                        }`}
                      >
                        {isCompleted ? <Check size={14} /> : idx + 1}
                      </div>
                      <div className="hidden sm:block">
                        <span
                          className={`text-[11px] tracking-wider uppercase block ${
                            isActive
                              ? "text-[var(--accent)] font-bold"
                              : isCompleted
                              ? "text-[var(--text)] font-medium"
                              : "text-[var(--text-muted)]"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    </button>
                    {idx < steps.length - 1 && (
                      <div className="flex-1 mx-2 sm:mx-4 h-[1px] bg-[var(--border)]" />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Mobile step label below */}
            <div className="sm:hidden mt-2 pt-2 border-t border-[var(--border)]/50 text-center">
              <span className="text-[11px] uppercase tracking-widest text-[var(--accent)] font-semibold">
                Step {currentStep + 1} of 3: {steps[currentStep]}
              </span>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-6 sm:p-12 glass border border-[var(--border)] shadow-2xl rounded-2xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--accent)] text-[var(--bg)] rounded-full flex items-center justify-center mb-6 shadow-lg"
                  >
                    <Check size={36} />
                  </motion.div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-semibold mb-1">
                    Receipt #IB-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl mb-3">
                    Order Confirmed
                  </h2>
                  <p className="text-[var(--text-muted)] text-sm max-w-md mb-6 leading-relaxed">
                    Thank you for choosing Italo Boutique. Your bespoke order has
                    been assigned to our private atelier. A luxury dispatch tracking
                    link and invoice have been sent to{" "}
                    <strong className="text-[var(--text)]">{formData.email}</strong>.
                  </p>

                  <div className="w-full max-w-sm p-4 rounded-xl bg-[var(--bg-surface-2)] text-left text-xs space-y-2 mb-8 border border-[var(--border)]">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Recipient</span>
                      <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Delivery Area</span>
                      <span>{formData.city}, {formData.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Total Paid</span>
                      <span className="font-bold text-[var(--accent)]">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/")}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[var(--accent)] text-[var(--bg)] font-bold tracking-[0.15em] uppercase text-xs rounded-full hover:opacity-90 transition-opacity"
                  >
                    Return to Boutique
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Shipping */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface-2)] flex items-start gap-3.5">
                        <Truck size={18} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider">
                            Complimentary White-Glove Courier
                          </p>
                          <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
                            Doorstep delivery across Lagos & nationwide in signature Italo Boutique garment bags and boxes.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                            placeholder="e.g. Amaka"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                            placeholder="e.g. Adeyemi"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                            placeholder="name@domain.com"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                            Phone Number (for courier dispatch)
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                            placeholder="+234 800 000 0000"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                          Delivery Street Address
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                          placeholder="e.g. Plot 12, Victoria Island Boulevard"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                            City / District
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                            placeholder="e.g. Victoria Island / Ikoyi"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                            State (Nigeria)
                          </label>
                          <select
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors text-[var(--text)]"
                          >
                            {nigerianStates.map((st) => (
                              <option key={st} value={st} className="bg-[var(--bg-surface-2)] text-[var(--text)]">
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/5 flex items-center gap-3">
                        <Lock size={18} className="text-[var(--accent)] flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium">
                          Secure 256-Bit SSL Encrypted Boutique Gateway
                        </span>
                      </div>

                      {/* Payment Method Selector */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                            paymentMethod === "card"
                              ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)]"
                              : "border-[var(--border)] bg-[var(--bg-surface-2)] opacity-70"
                          }`}
                        >
                          <CreditCard size={20} className={paymentMethod === "card" ? "text-[var(--accent)]" : ""} />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider">Debit / Credit Card</p>
                            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Mastercard, Visa, Verve</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("transfer")}
                          className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                            paymentMethod === "transfer"
                              ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)]"
                              : "border-[var(--border)] bg-[var(--bg-surface-2)] opacity-70"
                          }`}
                        >
                          <Building2 size={20} className={paymentMethod === "transfer" ? "text-[var(--accent)]" : ""} />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider">Bank Transfer / USSD</p>
                            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Instant Naira Account</p>
                          </div>
                        </button>
                      </div>

                      {paymentMethod === "card" ? (
                        <div className="space-y-4 pt-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                              Card Number
                            </label>
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                              className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                              placeholder="5399 0000 0000 0000"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                value={formData.expiry}
                                onChange={(e) => handleInputChange("expiry", e.target.value)}
                                className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                                placeholder="MM / YY"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                                Security Code (CVV)
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                value={formData.cvc}
                                onChange={(e) => handleInputChange("cvc", e.target.value)}
                                className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg py-3 px-3.5 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface-2)] space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                            Italo Boutique Dedicated Settlement Account
                          </p>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between py-1 border-b border-[var(--border)]">
                              <span className="text-[var(--text-muted)]">Bank Name</span>
                              <span className="font-semibold">Access Bank / Zenith Private</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[var(--border)]">
                              <span className="text-[var(--text-muted)]">Account Name</span>
                              <span className="font-semibold">Italo Boutique Atelier Ltd</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-[var(--text-muted)]">Account Number</span>
                              <span className="font-mono font-bold text-sm text-[var(--accent)]">0192847291</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed pt-2">
                            After placing order, payment is automatically reconciled in real-time.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <p className="text-sm text-[var(--text-muted)]">
                        Please review your haute couture order details and delivery address before authorization.
                      </p>
                      <div className="p-5 sm:p-6 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border)] space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--border)] pb-4 gap-1">
                          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
                            Recipient & Delivery
                          </span>
                          <span className="text-sm sm:text-right font-medium">
                            {formData.firstName} {formData.lastName}
                            <br />
                            <span className="text-xs text-[var(--text-muted)]">
                              {formData.address}, {formData.city}, {formData.state}
                              <br />
                              Tel: {formData.phone}
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
                            Payment Selected
                          </span>
                          <span className="text-xs font-semibold flex items-center gap-1.5 text-[var(--accent)]">
                            {paymentMethod === "card" ? "Card ending in 8821" : "Instant Bank Transfer"}
                          </span>
                        </div>
                      </div>

                      {/* Item preview list */}
                      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface-2)] space-y-3">
                        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold block">
                          Bag Summary ({cart.length} unique styles)
                        </span>
                        {cart.map((item) => (
                          <div
                            key={`review-${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                            className="flex items-center justify-between text-xs py-1"
                          >
                            <span className="truncate pr-2 font-medium">
                              {item.quantity}x {item.product.name} ({item.selectedColor}, {item.selectedSize})
                            </span>
                            <span className="font-semibold flex-shrink-0 text-[var(--text)]">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions (Mobile optimized) */}
                  <div className="mt-8 sm:mt-12 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                    {currentStep > 0 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((s) => s - 1)}
                        className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-[var(--border)] text-xs tracking-wider uppercase font-medium hover:bg-[var(--bg-surface-2)] transition-colors text-center"
                      >
                        Back
                      </button>
                    ) : (
                      <div className="hidden sm:block" />
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto py-4 px-10 bg-[var(--accent)] text-[var(--bg)] font-bold tracking-[0.15em] uppercase text-xs rounded-full hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {currentStep === 2 ? (
                        <>
                          <span>Place Order · {formatPrice(cartTotal)}</span>
                          <Sparkles size={14} />
                        </>
                      ) : (
                        <>
                          <span>Continue</span>
                          <ChevronRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary Sidebar (Desktop only sticky column) */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky top-28 p-8 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border)] shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-6">
              <h2 className="font-display text-2xl tracking-wide">
                Order Summary
              </h2>
              <span className="text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>

            <div className="space-y-4 mb-6 max-h-[38vh] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={`desktop-${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-4 items-center"
                >
                  <div className="relative w-16 h-20 bg-[var(--bg-surface)] rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {item.selectedColor} · {item.selectedSize}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-[var(--border)] text-sm">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Boutique Courier</span>
                <span className="text-[var(--accent)] font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-4 border-t border-[var(--border)]">
                <span>Total Due</span>
                <span className="text-[var(--accent)] text-lg">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <ShieldCheck size={16} className="text-[var(--accent)]" />
              <span>Complimentary returns within 14 days in Lagos & Abuja.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
