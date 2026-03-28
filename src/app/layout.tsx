import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import ThemeProvider from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cartique — Luxury Fashion & Gadgets",
  description:
    "A curated digital showroom for the discerning few. Where fashion meets technology without compromise.",
  keywords: [
    "luxury fashion",
    "premium gadgets",
    "designer clothing",
    "high-end electronics",
    "Cartique",
  ],
  openGraph: {
    title: "Cartique",
    description: "Shop the extraordinary. Curated fashion & gadgets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AppProvider>
          <ThemeProvider>
            <CustomCursor />
            <Navbar />
            <CartDrawer />
            <main>{children}</main>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
