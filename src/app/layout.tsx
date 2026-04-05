import type { Metadata } from "next";
import { Outfit, Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LocalBusinessSchema from "../components/LocalBusinessSchema";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mesapoolremoval.com'),
  title: "Mesa Pool Removal | Concrete & Fiberglass Demolition",
  description:
    "Expert pool removal in Mesa, AZ. Specializing in tight access, caliche soil excavation, and engineered compaction for a stable, usable yard. Request an estimate.",
  category: "service",
  keywords: ["Mesa pool removal", "swimming pool demolition Arizona", "caliche excavation Mesa", "pool fill-in cost Mesa", "East Valley pool removal"],
  authors: [{ name: "Mesa Pool Removal Specialists" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Mesa Pool Removal Specialists",
    description: "We handle full pool demolition, debris removal, and proper compaction in Mesa, AZ.",
    url: "https://mesapoolremoval.com",
    siteName: "Mesa Pool Removal",
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f97316',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${roboto.variable}`}>
      <body className="antialiased">
        <LocalBusinessSchema />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
