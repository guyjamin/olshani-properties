import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Header } from "@/components/header"
import { ClientThemeProvider } from "@/components/client-theme-provider"
import { SkipToContent } from "@/components/skip-to-content"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Olshani Properties | Official Website",
    template: "%s | Olshani Properties",
  },
  description:
    "Olshani Properties - The official website for premium apartments in Nairobi. Discover our luxury DIPLOMAT, GAIA, and EMERALD residences in Westlands & Kilimani.",
  keywords: [
    "Olshani",
    "Olshani Properties",
    "Olshani Real Estate",
    "Olshani Listings",
    "Olshani Apartments",
    "luxury apartments Nairobi",
    "Westlands apartments",
    "Kilimani apartments",
    "premium properties Kenya",
    "DIPLOMAT residences",
    "GAIA apartments",
  ],
  authors: [{ name: "Olshani Properties" }],
  creator: "Olshani Properties",
  publisher: "Olshani Properties",
  metadataBase: new URL("https://olshaniproperties.co.ke"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://olshaniproperties.co.ke",
    title: "Olshani Properties | Premium Apartments in Nairobi",
    description: "Welcome to Olshani Properties. Explore our exclusive portfolio of luxury residences including DIPLOMAT and GAIA.",
    siteName: "Olshani Properties",
    images: [
      {
        url: "/olshani-logo.png",
        width: 1200,
        height: 630,
        alt: "Olshani Properties - Premium Living in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olshani Properties | Premium Apartments in Nairobi",
    description: "Discover luxury apartments in Westlands & Kilimani. 13 premium projects with world-class amenities.",
    images: ["/olshani-logo.png"],
    creator: "@olshaniproperties",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Mh9C9Re9qOLdUnc8cRAHCPHx1YwWLQ7IwDETeNnm9XA",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Olshani Properties",
    image: "https://olshaniproperties.co.ke/logo.png",
    description: "Premier real estate developer in Nairobi specializing in luxury apartments.",
    url: "https://olshaniproperties.co.ke",
    telephone: "+254700000000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    sameAs: [
      "https://facebook.com/olshaniproperties",
      "https://instagram.com/olshaniproperties",
    ],
  }

  return (
    <html lang="en" className={`${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body className={GeistSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientThemeProvider>
          <SkipToContent />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              <Suspense>{children}</Suspense>
            </main>
          </div>
          <Analytics />
        </ClientThemeProvider>
      </body>
    </html>
  )
}
