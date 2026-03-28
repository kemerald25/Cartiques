"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { Check, ChevronRight, Lock, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
         clearCart();
      }, 3000);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] gap-6">
        <p className="text-xl font-display text-[var(--text-muted)]">Your cart is empty.</p>
        <button 
           onClick={() => router.push("/")}
           className="px-8 py-3 bg-[var(--accent)] text-[var(--bg)] font-bold tracking-[0.1em] uppercase text-sm"
        >
           Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Main Content Area */}
        <div className="lg:col-span-7">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-12">
            <ArrowLeft size={16} />
            <span>Back to Store</span>
          </Link>

          <h1 className="font-display text-4xl mb-12 tracking-wide">Checkout</h1>

          {/* Stepper */}
          <div className="flex items-center gap-4 mb-12">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                  idx <= currentStep ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--border)] text-[var(--text-muted)]'
                }`}>
                  {idx < currentStep ? <Check size={14} /> : idx + 1}
                </div>
                <span className={`text-sm tracking-wider uppercase ${idx <= currentStep ? 'text-[var(--text)] font-semibold' : 'text-[var(--text-muted)]'}`}>
                  {step}
                </span>
                {idx < steps.length - 1 && (
                  <ChevronRight size={16} className="text-[var(--border)] mx-2" />
                )}
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden min-h-[400px]">
             <AnimatePresence mode="wait">
               {isSuccess ? (
                 <motion.div
                   key="success"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 glass border border-[var(--border)] shadow-2xl"
                 >
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ type: "spring", damping: 12, delay: 0.2 }}
                     className="w-20 h-20 bg-[var(--accent)] text-[var(--bg)] rounded-full flex items-center justify-center mb-6"
                   >
                     <Check size={40} />
                   </motion.div>
                   <h2 className="font-display text-3xl mb-4">Order Confirmed</h2>
                   <p className="text-[var(--text-muted)] mb-8">
                     Your luxurious experience is on its way. We have emailed you your receipt.
                   </p>
                   <button 
                     onClick={() => router.push("/")}
                     className="px-8 py-4 bg-[var(--text)] text-[var(--bg)] font-bold tracking-[0.1em] uppercase text-xs"
                   >
                     Continue Shopping
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
                   {currentStep === 0 && (
                     <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                         <div className="flex flex-col gap-2">
                           <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">First Name</label>
                           <input type="text" className="bg-transparent border-b border-[var(--border)] py-3 px-2 focus:border-[var(--accent)] outline-none transition-colors" placeholder="John" />
                         </div>
                         <div className="flex flex-col gap-2">
                           <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Last Name</label>
                           <input type="text" className="bg-transparent border-b border-[var(--border)] py-3 px-2 focus:border-[var(--accent)] outline-none transition-colors" placeholder="Doe" />
                         </div>
                       </div>
                       <div className="flex flex-col gap-2">
                         <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Address</label>
                         <input type="text" className="bg-transparent border-b border-[var(--border)] py-3 px-2 focus:border-[var(--accent)] outline-none transition-colors" placeholder="123 Luxury Ave" />
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                         <div className="flex flex-col gap-2">
                           <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">City</label>
                           <input type="text" className="bg-transparent border-b border-[var(--border)] py-3 px-2 focus:border-[var(--accent)] outline-none transition-colors" placeholder="London" />
                         </div>
                         <div className="flex flex-col gap-2">
                           <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Postcode</label>
                           <input type="text" className="bg-transparent border-b border-[var(--border)] py-3 px-2 focus:border-[var(--accent)] outline-none transition-colors" placeholder="SW1A 1AA" />
                         </div>
                       </div>
                     </div>
                   )}
                   
                   {currentStep === 1 && (
                     <div className="space-y-6">
                        <div className="p-4 border border-[var(--accent)] bg-[var(--accent)]/5 flex items-center gap-4">
                           <Lock size={20} className="text-[var(--accent)]" />
                           <span className="text-sm font-medium">Secure Encrypted Payment</span>
                        </div>
                       <div className="flex flex-col gap-2 pt-4">
                         <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Card Number</label>
                         <input type="text" className="bg-transparent border-b border-[var(--border)] py-3 px-2 focus:border-[var(--accent)] outline-none transition-colors" placeholder="**** **** **** ****" />
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                         <div className="flex flex-col gap-2">
                           <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Expiry</label>
                           <input type="text" className="bg-transparent border-b border-[var(--border)] py-3 px-2 focus:border-[var(--accent)] outline-none transition-colors" placeholder="MM/YY" />
                         </div>
                         <div className="flex flex-col gap-2">
                           <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">CVC</label>
                           <input type="text" className="bg-transparent border-b border-[var(--border)] py-3 px-2 focus:border-[var(--accent)] outline-none transition-colors" placeholder="123" />
                         </div>
                       </div>
                     </div>
                   )}

                   {currentStep === 2 && (
                     <div className="space-y-6">
                        <p className="text-[var(--text-muted)]">Please review your order details before finalising your purchase.</p>
                        <div className="p-6 bg-[var(--bg-surface-2)] space-y-4">
                           <div className="flex justify-between border-b border-[var(--border)] pb-4">
                              <span className="text-sm text-[var(--text-muted)]">Shipping</span>
                              <span className="text-sm">John Doe<br/>123 Luxury Ave<br/>London, SW1A 1AA</span>
                           </div>
                           <div className="flex justify-between pt-2">
                              <span className="text-sm text-[var(--text-muted)]">Payment</span>
                              <span className="text-sm">Visa ending in ****</span>
                           </div>
                        </div>
                     </div>
                   )}

                   <div className="mt-12 flex justify-between">
                     {currentStep > 0 && (
                       <button onClick={() => setCurrentStep(s => s - 1)} className="text-sm tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                         Back
                       </button>
                     )}
                     <button 
                       onClick={handleNext} 
                       className="ml-auto px-10 py-4 bg-[var(--accent)] text-[var(--bg)] font-bold tracking-[0.1em] uppercase text-sm"
                     >
                       {currentStep === 2 ? 'Place Order' : 'Continue'}
                     </button>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 p-8 bg-[var(--bg-surface-2)]">
            <h2 className="font-display text-2xl mb-8 border-b border-[var(--border)] pb-4">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-[var(--bg-surface)] flex-shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{item.selectedColor} / {item.selectedSize}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-[var(--border)]">
              <div className="flex justify-between text-sm text-[var(--text-muted)]">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-muted)]">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-4 border-t border-[var(--border)]">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
