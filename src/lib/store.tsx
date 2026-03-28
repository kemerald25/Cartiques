"use client";

import {
  createContext,
  useContext,
  useReducer,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product, CartItem } from "./data";

/* ─── CART REDUCER ────────────────────────────────────────────────────────── */
type CartAction =
  | { type: "ADD"; payload: { product: Product; color: string; size: string } }
  | { type: "REMOVE"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(
        (i) =>
          i.product.id === action.payload.product.id &&
          i.selectedColor === action.payload.color &&
          i.selectedSize === action.payload.size
      );
      if (existing) {
        return state.map((i) =>
          i.product.id === action.payload.product.id &&
          i.selectedColor === action.payload.color &&
          i.selectedSize === action.payload.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...state,
        {
          product: action.payload.product,
          quantity: 1,
          selectedColor: action.payload.color,
          selectedSize: action.payload.size,
        },
      ];
    }
    case "REMOVE":
      return state.filter((i) => i.product.id !== action.payload);
    case "UPDATE_QTY":
      return state
        .map((i) =>
          i.product.id === action.payload.id
            ? { ...i, quantity: action.payload.qty }
            : i
        )
        .filter((i) => i.quantity > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

/* ─── CONTEXT TYPE ────────────────────────────────────────────────────────── */
interface AppContextType {
  cart: CartItem[];
  cartOpen: boolean;
  theme: "noir" | "blanc";
  themeToggleOrigin: { x: number; y: number };
  addToCart: (product: Product, color: string, size: string) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

/* ─── PROVIDER ────────────────────────────────────────────────────────────── */
export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [theme, setTheme] = useState<"noir" | "blanc">("noir");
  const [themeToggleOrigin, setThemeToggleOrigin] = useState({
    x: 50,
    y: 50,
  });

  const addToCart = useCallback(
    (product: Product, color: string, size: string) => {
      dispatch({ type: "ADD", payload: { product, color, size } });
    },
    []
  );
  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);
  const updateQty = useCallback((id: string, qty: number) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  }, []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const toggleCart = useCallback(() => setCartOpen((v) => !v), []);
  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      if (origin) {
        setThemeToggleOrigin(origin);
        // Map the origin to CSS properties so CSS variables can read it
        document.documentElement.style.setProperty("--rx", `${origin.x}px`);
        document.documentElement.style.setProperty("--ry", `${origin.y}px`);
      }
      
      const transition = () => {
        setTheme((t) => (t === "noir" ? "blanc" : "noir"));
      };

      if (!("startViewTransition" in document)) {
        transition();
        return;
      }

      (document as any).startViewTransition(() => {
        transition();
      });
    },
    []
  );

  const cartTotal = cart.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  );
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <AppContext
      value={{
        cart,
        cartOpen,
        theme,
        themeToggleOrigin,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleCart,
        toggleTheme,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
