import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Briven Pharmaceutical | Caring for Life, Delivering Trust",
  description:
    "Briven Pharmaceutical — Quality medicines, nutritional supplements, and healthcare products. Trusted by healthcare professionals across India.",
  keywords: [
    "pharmacy",
    "medicines",
    "Briven",
    "pharmaceutical",
    "healthcare",
    "India",
  ],
  icons: {
    icon: [
      { url: "/images/briven-logo.png", type: "image/png" },
    ],
    shortcut: "/images/briven-logo.png",
    apple: "/images/briven-logo.png",
  },
};

import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import FloatingCartBar from "@/components/FloatingCartBar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          {children}
          <CartDrawer />
          <FloatingCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
