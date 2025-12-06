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
    default: "Olshani Properties | Premium Apartments in Nairobi",
    template: "%s | Olshani Properties",
  },
  description:
    "Discover luxury apartments in Westlands & Kilimani, Nairobi. DIPLOMAT, GAIA, and EMERALD residences offer premium living with world-class amenities. 13 projects, prices from KSh 5.59M.",
  keywords: [
    "luxury apartments Nairobi",
    "Westlands apartments",
    "Kilimani apartments",
    "premium properties Kenya",
    "DIPLOMAT residences",
    "GAIA apartments",
    "real estate Nairobi",
    "apartments for sale Westlands",
    "luxury living Nairobi",
    "Olshani Properties",
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
    url: "/",
    siteName: "Olshani Properties",
    title: "Olshani Properties | Premium Apartments in Nairobi",
    description:
      "Discover luxury apartments in Westlands & Kilimani. 13 premium projects with world-class amenities. Prices from KSh 5.59M.",
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
    description:
      "Discover luxury apartments in Westlands & Kilimani. 13 premium projects with world-class amenities.",
    images: ["/olshani-logo.png"],
    creator: "@olshaniproperties", // Update with your actual Twitter handle
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
    // google: "your-google-verification-code", // Add when you have it
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <SkipToContent />
        <ClientThemeProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main id="main-content">
            {children}
          </main>
        </ClientThemeProvider>
      </body>
    </html>
  )
}
