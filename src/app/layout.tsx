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
  title: "Italo Boutique — Haute Couture & Sartorial Luxury",
  description:
    "An exclusive haute couture salon and sartorial house. Discover curated gowns, bespoke tailoring, fine silk, and luxury Italian-inspired craftsmanship.",
  keywords: [
    "Italo Boutique",
    "luxury boutique",
    "haute couture",
    "bespoke tailoring",
    "designer dresses",
    "silk evening gowns",
    "luxury fashion Nigeria",
    "Italian luxury",
  ],
  openGraph: {
    title: "Italo Boutique",
    description: "Haute Couture & Sartorial Luxury. Discover the boutique collection.",
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
