export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  badge?: string;
  featured?: boolean;
  span?: "tall" | "wide" | "normal";
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Obsidian Jacket",
    category: "Fashion",
    price: 890,
    originalPrice: 1200,
    description: "Technical shell. Architectural silhouette.",
    longDescription:
      "Crafted from a Japanese technical fabric that breathes like linen and repels like rubber. The Obsidian Jacket redefines outerwear — a piece that belongs equally in a gallery and a storm.",
    colors: [
      { name: "Midnight", hex: "#1a1a1a" },
      { name: "Slate", hex: "#4a5568" },
      { name: "Sand", hex: "#c8b89a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=90",
    ],
    badge: "Sale",
    featured: true,
    span: "tall",
  },
  {
    id: "2",
    name: "Aura Timepiece",
    category: "Gadgets",
    price: 2450,
    description: "Time, reimagined in sapphire and steel.",
    longDescription:
      "The Aura Timepiece is a study in restraint. Swiss automatic movement, 42mm case, anti-reflective sapphire crystal, and a strap of full-grain Italian leather that only improves with age.",
    colors: [
      { name: "Gold", hex: "#c8a96e" },
      { name: "Silver", hex: "#c0c0c0" },
      { name: "Rose Gold", hex: "#b76e79" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=90",
    ],
    badge: "New",
    featured: true,
    span: "normal",
  },
  {
    id: "3",
    name: "Lune Sneaker",
    category: "Fashion",
    price: 495,
    description: "Zero gravity. Maximum presence.",
    longDescription:
      "Born from aerospace-grade foam research, the Lune Sneaker feels like nothing you've worn before. A deliberate design language that makes every other shoe feel loud.",
    colors: [
      { name: "White", hex: "#f5f5f5" },
      { name: "Black", hex: "#111111" },
      { name: "Blush", hex: "#e8b4b8" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90",
    ],
    span: "wide",
  },
  {
    id: "4",
    name: "Phantom Earbuds",
    category: "Gadgets",
    price: 380,
    description: "Silence, on demand.",
    longDescription:
      "Adaptive noise cancellation that reads your environment in real time. 12 hours of audio, 40 with the carbon-fibre case. The Phantom Earbuds don't just play music — they create space.",
    colors: [
      { name: "Matte Black", hex: "#1a1a1a" },
      { name: "Pearl", hex: "#f0ede8" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&q=90",
    ],
    badge: "Bestseller",
    span: "normal",
  },
  {
    id: "5",
    name: "Silk Trench",
    category: "Fashion",
    price: 1290,
    description: "Liquid drape. Structured ease.",
    longDescription:
      "A trench coat in deadstock silk-wool that drapes like evening and wears like armour. The kind of piece that makes a room pause.",
    colors: [
      { name: "Camel", hex: "#c19a6b" },
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Ecru", hex: "#f0ede0" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=90",
    ],
    span: "tall",
  },
  {
    id: "6",
    name: "Noir Sunglasses",
    category: "Fashion",
    price: 320,
    description: "See differently.",
    longDescription:
      "Hand-pressed acetate frames with polarised lenses in a gradient that shifts from obsidian to cognac. UV400 protection wrapped in a silhouette that belongs on every face.",
    colors: [
      { name: "Black/Gold", hex: "#1a1a1a" },
      { name: "Tortoise", hex: "#8b5e3c" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=90",
    ],
    span: "normal",
  },
  {
    id: "7",
    name: "Flux Speaker",
    category: "Gadgets",
    price: 699,
    description: "Sound you feel before you hear.",
    longDescription:
      "An aluminium monolith that produces 360° room-filling sound with physics-defying bass response. The Flux Speaker is the anchor of any space — visual and sonic.",
    colors: [
      { name: "Obsidian", hex: "#1a1a1a" },
      { name: "Luna", hex: "#e8e8e8" },
      { name: "Copper", hex: "#b87333" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=90",
    ],
    badge: "New",
    span: "wide",
  },
  {
    id: "8",
    name: "Cashmere Knit",
    category: "Fashion",
    price: 450,
    originalPrice: 580,
    description: "Cloud-weight Mongolian cashmere.",
    longDescription:
      "Six-ply Grade-A Mongolian cashmere, knit in Hawick, Scotland. The Cashmere Knit is deliberately minimal so that the material can speak for itself — and it has plenty to say.",
    colors: [
      { name: "Stone", hex: "#b8b0a0" },
      { name: "Midnight", hex: "#1a1a2e" },
      { name: "Rust", hex: "#c0573a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=90",
    ],
    span: "normal",
  },
];

export const getProduct = (id: string) =>
  products.find((p) => p.id === id) ?? null;

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(price);
