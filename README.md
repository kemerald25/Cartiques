# Italo Boutique

Italo Boutique is an haute couture salon and sartorial e-commerce experience tailored for luxury fashion, liquid silk gowns, and bespoke tailoring. Built to evoke a high-end European-African editorial showroom, Italo Boutique marries classical Italian tailoring traditions with contemporary luxury aesthetics.

## 🚀 The Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion & CSS View Transitions API
- **Icons:** Lucide React
- **State Management:** React Context API & `useReducer`
- **Currency:** Nigerian Naira (₦ NGN)

## ✨ Core Features

### 1. Haute Couture & Boutique Collections
Curated catalogues spanning **Couture & Gowns**, **Tailoring & Outerwear**, **Resort & Tops**, and **Artisanal Accessories**. Interactive category filter tabs allow smooth browsing with animated transitions.

### 2. Nigerian Naira (₦ NGN) Luxury Pricing
All products, quick-view sheets, cart drawers, and checkout steps are natively formatted in Nigerian Naira with realistic luxury boutique price points.

### 3. Responsive Mobile Navigation & Hamburger Menu
An animated mobile hamburger button seamlessly opens a full-featured slide-out luxury navigation drawer with category shortcuts, bag counter, theme switch, and atelier details.

### 4. Fully Mobile-Responsive Checkout
Overhauled multi-step checkout with:
- Collapsible mobile order summary drawer for small screens.
- Responsive, non-overflowing progress stepper.
- Mobile touch-optimized form inputs with Nigerian address fields (States, Cities, phone).
- Payment methods: Card and Dedicated Instant Bank Transfer.
- Touch-friendly full-width action buttons and responsive confirmation modal.

### 5. Cinematic Aesthetics (Noir & Blanc)
Two bespoke themes: **Noir** (dark canvas with warm gold accents) and **Blanc** (clean editorial light mode) with hardware-accelerated radial wipe transitions.

## 📂 Project Structure

```text
cartique/
├── public/                 # Static assets (fonts, icons, raw SVGs)
├── src/
│   ├── app/                # Next.js App Router root
│   │   ├── checkout/       # Interactive checkout UI
│   │   ├── globals.css     # Design tokens & View Transition animations
│   │   ├── layout.tsx      # Root providers & metadata
│   │   └── page.tsx        # Homepage & Masonry Product Grid
│   ├── components/         # Reusable UI Architecture
│   │   ├── CartDrawer.tsx  # Spring-physics side cart interface
│   │   ├── CustomCursor.tsx# Physics-based dual-cursor
│   │   ├── Navbar.tsx      # Fixed blur pill navigation
│   │   ├── ProductCard.tsx # Hover-reactive store item
│   │   └── ThemeProvider.tsx # Safely binds themes to HTML base
│   └── lib/
│       ├── data.ts         # Centralized product catalog & generic types
│       └── store.tsx       # Global state management (`useApp` Hook)
└── next.config.ts          # Turbopack config (Image optimization config)
```

## 🛠️ Global State Management

Cartique completely bypasses external state libraries like Redux or Zustand, relying entirely on a lightning-fast React Context combined with `useReducer`:
The core architecture sits in `src/lib/store.tsx` and seamlessly manages:
1. Product insertions to bag (including size and color constraints formatting).
2. Live cart count and price aggregation.
3. The X/Y coordination tracking for the radial theme wipe.
4. UI visibility for elements like the pop-out Cart Drawer.

```typescript
// Typical invocation inside an interactive component
const { cartCount, toggleTheme, theme } = useApp();
```

## ⚙️ Prerequisites & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Launch the Development Server**
   ```bash
   npm run dev
   ```
3. **Build For Production**
   ```bash
   npm run build
   npm run start
   ```

*(Note: Older processors using the default Next.js Turbopack image optimization might throw a `bmi2` rust panic during build. Cartique's `next.config.ts` prevents this by hard-bypassing optimization if required via the `unoptimized: true` flag).*

## 🎨 Design Philosophy

*"Design is not just what it looks like. It is how it works."*
Cartique prioritizes a 60fps feeling throughout the DOM. There are absolutely no standard hover underlines or arbitrary DOM loads. We lean heavily into layout animations using Framer's `layoutId` props and React's `Suspense` capabilities. 

Enjoy your luxury viewing experience!
