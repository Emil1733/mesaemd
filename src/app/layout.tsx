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
  title: {
    default: 'Mesa Pool Removal',
    template: '%s',
  },
  description: 'Pool removal, demolition, fill-in, cost, permit, and excavation information for Mesa, Arizona and nearby East Valley service areas.',
  category: 'service',
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
    siteName: 'Mesa Pool Removal',
    locale: 'en_US',
    type: 'website',
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
