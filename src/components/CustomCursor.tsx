"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "product" | "button";

export default function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("[data-cursor='product']")) {
        setVariant("product");
      } else if (
        el.closest(
          "button, a, input, textarea, select, [data-cursor='button'], label"
        )
      ) {
        setVariant("button");
      } else {
        setVariant("default");
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  const ringVariants = {
    default: {
      scale: 1,
      opacity: 1,
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "var(--accent)",
    },
    product: {
      scale: 2.2,
      opacity: 1,
      backgroundColor: "rgba(200,169,110,0.08)",
      borderColor: "var(--accent)",
    },
    button: {
      scale: 1.4,
      opacity: 1,
      backgroundColor: "var(--accent)",
      borderColor: "var(--accent)",
    },
    hidden: { scale: 0, opacity: 0 },
  };

  return (
    <>
      {/* Lagging ring */}
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full border"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
        }}
        animate={isVisible ? variant : "hidden"}
        variants={ringVariants}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      />
      {/* Exact-position dot */}
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
          backgroundColor: "var(--accent)",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
