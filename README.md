# Cartique

Cartique is a futuristic, design-forward e-commerce experience tailored for high-end fashion and luxury gadgets. Built to feel more like a cinematic digital showroom than a typical online store, Cartique relies heavily on spatial aesthetics, bespoke micro-interactions, and flawless performance.

## 🚀 The Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion & CSS View Transitions API
- **Icons:** Lucide React
- **State Management:** React Context API & `useReducer`

## ✨ Core Features

### 1. Cinematic Aesthetics (Noir & Blanc)
Cartique includes two bespoke themes: **Noir** (dark canvas with warm gold accents) and **Blanc** (clean editorial light mode).
The theme toggle completely avoids jarring flashes or solid overlays. It leverages the cutting-edge **Document View Transitions API** to execute a perfect, hardware-accelerated **radial wipe** from the exact coordinate of your mouse click.

### 2. Spatial Custom Cursor
Ditching the standard browser pointer, Cartique ships with a custom dual-element cursor: a precise dot and a trailing, physics-based outer ring.
- **Product Hover:** The ring expands, morphs, and glows with brand colors.
- **Button Hover:** The ring shrinks slightly to frame the interaction point perfectly.

### 3. Asymmetric Masonry Grid
Products are systematically rendered through an asymmetric layout using tailored spans (tall, wide, normal) giving the grid an organic, editorial magazine vibe rather than a monotonous matrix.

### 4. Interactive Quick-View
Hovering over any product card immediately presents a glassmorphic quick-view panel allowing users to:
- Pick between available colors via a micro-animated swatch UI.
- Select sizing.
- Add items instantly to the cart via a satisfying sliding button animation.

### 5. Elastic Cart Drawer
A side drawer that relies strictly on fluid spring physics. It includes:
- Animated entry/exit item lists matching layout changes.
- Flip-counter quantitative adjustments.
- Real-time subtotal calculations without layout shifts.

### 6. Seamless Checkout Flow
An uninterrupted, multi-step transition UI built with Framer's `<AnimatePresence>`. Users slide dynamically between Shipping, Payment, and Review screens without a single page reload or jarring route jump.

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
