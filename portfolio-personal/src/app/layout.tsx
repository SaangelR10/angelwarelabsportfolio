import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { seoData } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  authors: [{ name: seoData.author }],
  robots: seoData.robots,
  openGraph: {
    type: seoData.ogType,
    title: seoData.title,
    description: seoData.description,
    url: "https://tu-portfolio.vercel.app",
    siteName: "Tu Nombre - Portfolio",
    images: [
      {
        url: seoData.ogImage,
        width: 1200,
        height: 630,
        alt: "Tu Nombre - Desarrollador Frontend",
      },
    ],
    locale: "es_ES",
  },
  twitter: {
    card: seoData.twitterCard,
    title: seoData.title,
    description: seoData.description,
    images: [seoData.ogImage],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#121212",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect para optimización de rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags para iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Tu Nombre" />
        
        {/* Meta tags para Android */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Tu Nombre" />
        
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-background-primary text-text-primary overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
