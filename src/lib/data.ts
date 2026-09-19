export interface Product {
  id: string;
  name: string;
  category: "Couture & Gowns" | "Tailoring & Outerwear" | "Resort & Tops" | "Accessories";
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

export const boutiqueCategories = [
  "All Collections",
  "Couture & Gowns",
  "Tailoring & Outerwear",
  "Resort & Tops",
  "Accessories",
] as const;

export const products: Product[] = [
  {
    id: "1",
    name: "Obsidian Structured Blazer",
    category: "Tailoring & Outerwear",
    price: 245000,
    originalPrice: 290000,
    description: "Peak-lapel Italian wool. Sculpted waistline.",
    longDescription:
      "Tailored from high-twist Italian virgin wool with hand-finished pick-stitching and structured shoulders. The Obsidian Blazer delivers an commanding silhouette crafted for evening galas and executive presence.",
    colors: [
      { name: "Onyx Black", hex: "#111111" },
      { name: "Chalk Pinstripe", hex: "#3b3d42" },
      { name: "Camel", hex: "#c19a6b" },
    ],
    sizes: ["UK 6", "UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=90",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=90",
    ],
    badge: "Bespoke",
    featured: true,
    span: "tall",
  },
  {
    id: "2",
    name: "Aurelia Silk Slip Gown",
    category: "Couture & Gowns",
    price: 320000,
    description: "Heavyweight mulberry silk. Fluid bias drape.",
    longDescription:
      "Crafted from 30-momme liquid mulberry silk cut on the bias to caress every contour. Featuring an open crossover back, delicate French seams, and a subtle train that commands the room.",
    colors: [
      { name: "Champagne Gold", hex: "#d8c39d" },
      { name: "Emerald Noir", hex: "#1c2e26" },
      { name: "Deep Ruby", hex: "#5e1925" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=90",
    ],
    badge: "Couture",
    featured: true,
    span: "normal",
  },
  {
    id: "3",
    name: "Milano Double-Breasted Trench",
    category: "Tailoring & Outerwear",
    price: 385000,
    originalPrice: 430000,
    description: "Water-resistant silk gabardine. Horn buttons.",
    longDescription:
      "An enduring icon reimagined by Italo Boutique. Made from treated Italian gabardine with genuine horn buttons, storm flaps, and a belted waist that cinches effortlessly over evening wear or daywear.",
    colors: [
      { name: "Warm Khaki", hex: "#bfa888" },
      { name: "Midnight Navy", hex: "#121927" },
      { name: "Espresso", hex: "#2f221b" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=90",
    ],
    badge: "Iconic",
    span: "wide",
  },
  {
    id: "4",
    name: "Elysian Pleated Corset Dress",
    category: "Couture & Gowns",
    price: 295000,
    description: "Internal boning. Micro-pleated georgette.",
    longDescription:
      "An exquisite blend of architectural corsetry and ethereal micro-pleats. Features an internal French-boned bodice and a cascading asymmetrical hemline designed to move like water.",
    colors: [
      { name: "Ivory Pearl", hex: "#f4f1ea" },
      { name: "Midnight Noir", hex: "#101010" },
      { name: "Dusty Rose", hex: "#c99a9e" },
    ],
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14"],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=90",
    ],
    badge: "New Season",
    span: "normal",
  },
  {
    id: "5",
    name: "Florentine Cashmere Knit",
    category: "Resort & Tops",
    price: 165000,
    description: "Pure Mongolian cashmere. Seamless knit.",
    longDescription:
      "Spun from ultra-fine Mongolian cashmere with an airy yet warm tactile feel. Finished with rolled micro-rib cuffs and a relaxed boat neckline for understated boutique luxury.",
    colors: [
      { name: "Alabaster", hex: "#f0ece1" },
      { name: "Caramel", hex: "#9b683e" },
      { name: "Charcoal", hex: "#2b2b2b" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=90",
    ],
    span: "tall",
  },
  {
    id: "6",
    name: "Palazzo Pleated Silk Trousers",
    category: "Tailoring & Outerwear",
    price: 180000,
    description: "High-waisted wide leg. Fluid crepe de chine.",
    longDescription:
      "Tailored with a sharp high-rise waistband and crisp front pleats that open into a dramatic, sweeping wide leg. Paired effortlessly with heels or evening sandals.",
    colors: [
      { name: "Cream White", hex: "#ede9df" },
      { name: "Pitch Black", hex: "#141414" },
      { name: "Terracotta", hex: "#af593e" },
    ],
    sizes: ["UK 6", "UK 8", "UK 10", "UK 12", "UK 14"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=90",
    ],
    badge: "Bestseller",
    span: "normal",
  },
  {
    id: "7",
    name: "Sorrento Linen Resort Set",
    category: "Resort & Tops",
    price: 195000,
    originalPrice: 230000,
    description: "Pure Normandy linen shirt & relaxed trousers.",
    longDescription:
      "Handcrafted from pre-washed Normandy flax linen that breathes effortlessly in tropical and coastal climates. Cut with an unbuttoned camp collar and tailored drawstring hems.",
    colors: [
      { name: "Sand Dune", hex: "#cfbea5" },
      { name: "Sea Salt", hex: "#faf8f5" },
      { name: "Olive Grove", hex: "#4b5320" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=90",
    ],
    badge: "Resort '26",
    span: "wide",
  },
  {
    id: "8",
    name: "Artisanal Woven Leather Tote",
    category: "Accessories",
    price: 275000,
    description: "Hand-braided Tuscan nappa. Solid brass hardware.",
    longDescription:
      "Woven entirely by hand from buttery Tuscan calfskin nappa. Each tote takes three days to construct and features a removable suede interior pouch and bespoke brushed brass accents.",
    colors: [
      { name: "Cognac Brown", hex: "#8d4c1b" },
      { name: "Nero Black", hex: "#191919" },
      { name: "Ivory", hex: "#eeeae1" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=90",
    ],
    badge: "Artisanal",
    span: "normal",
  },
  {
    id: "9",
    name: "Capri Organza Draped Blouse",
    category: "Resort & Tops",
    price: 145000,
    description: "Sheer silk organza. Dramatic bishop sleeves.",
    longDescription:
      "A breathtaking showpiece with romantic balloon sleeves, delicate covered buttons, and a detachable silk camisole. Balances sheer delicacy with boutique structure.",
    colors: [
      { name: "Opal Sheer", hex: "#f3f0e8" },
      { name: "Smoky Quartz", hex: "#3e3835" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=90",
    ],
    span: "tall",
  },
  {
    id: "10",
    name: "Ravello Velvet Cocktail Gown",
    category: "Couture & Gowns",
    price: 360000,
    description: "Silk-blend devoré velvet. Plunging back.",
    longDescription:
      "Sensual and opulent. Italian devoré velvet with a luminous sheen that catches ambient light. Cut with a sculptural column silhouette and thigh-high side split.",
    colors: [
      { name: "Midnight Sapphire", hex: "#102035" },
      { name: "Bordeaux", hex: "#4b121a" },
      { name: "Noir", hex: "#121212" },
    ],
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14"],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=90",
    ],
    badge: "Haute",
    featured: true,
    span: "normal",
  },
  {
    id: "11",
    name: "Verona Hand-Pressed Sunglasses",
    category: "Accessories",
    price: 95000,
    description: "Japanese bio-acetate. 24k gold-plated accents.",
    longDescription:
      "Substantial 8mm Japanese acetate frames individually hand-polished over 72 hours. Features gradient polarized nylon lenses offering 100% UVA/UVB protection and gold hinge details.",
    colors: [
      { name: "Tortoise Shell", hex: "#634125" },
      { name: "Gloss Noir", hex: "#111111" },
      { name: "Amber Honey", hex: "#a47139" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=90",
    ],
    span: "normal",
  },
  {
    id: "12",
    name: "Sartorial Wool Tuxedo Suit",
    category: "Tailoring & Outerwear",
    price: 490000,
    originalPrice: 560000,
    description: "Two-piece Super 150s wool. Grosgrain silk facing.",
    longDescription:
      "The pinnacle of bespoke black-tie tailoring. Handcrafted Super 150s Australian Merino wool with Italian grosgrain silk lapels, matched side-stripe trousers, and a full floating canvas.",
    colors: [
      { name: "Midnight Black", hex: "#0f0f11" },
      { name: "Royal Navy", hex: "#141c2b" },
    ],
    sizes: ["UK 38R", "UK 40R", "UK 42R", "UK 44R", "UK 46R"],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=90",
    ],
    badge: "Black Tie",
    featured: true,
    span: "wide",
  },
  {
    id: "13",
    name: "Amalfi Silk Twill Scarf",
    category: "Accessories",
    price: 65000,
    description: "90cm hand-rolled 100% silk twill. Heritage motif.",
    longDescription:
      "Loomed in Lake Como, Italy, this heavy silk twill scarf features an intricate mythological print hand-screened in 14 individual color passes with hand-rolled and hand-stitched edges.",
    colors: [
      { name: "Gold & Navy", hex: "#c8a96e" },
      { name: "Emerald & Rust", hex: "#2b4c3f" },
    ],
    sizes: ["90cm x 90cm"],
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=90",
    ],
    badge: "Limited Edition",
    span: "normal",
  },
  {
    id: "14",
    name: "Bellagio Guipure Lace Midi Dress",
    category: "Couture & Gowns",
    price: 275000,
    description: "Heavy corded floral lace with nude silk lining.",
    longDescription:
      "A romantic celebration of Italian corded lace. Cut with a flattering scallop square neckline and a softly flared midi skirt lined in pure nude silk crepe.",
    colors: [
      { name: "Vintage Ecru", hex: "#f2ede2" },
      { name: "Jet Black", hex: "#161616" },
      { name: "Cornflower Blue", hex: "#5b7c99" },
    ],
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=90",
    ],
    badge: "Signature",
    span: "tall",
  },
];

export const getProduct = (id: string) =>
  products.find((p) => p.id === id) ?? null;

export const formatPrice = (price: number) => {
  return "₦" + Math.round(price).toLocaleString("en-NG");
};

