"use client"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { NightToggle } from "@/components/night-toggle"
import { MobileMenu } from "@/components/mobile-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Olshani Properties Home">
          <Image
            src="/olshani-logo.png"
            alt="Olshani Properties Logo"
            width={96}
            height={96}
            className="h-12 w-auto"
            priority
            unoptimized
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-secondary">OLSHANI PROPERTIES</span>
            <span className="text-xs text-primary font-medium tracking-wider">Keeping The Promise</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link
            href="/#properties"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            aria-label="View properties"
          >
            Properties
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            aria-label="About Olshani Properties"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            aria-label="Contact us"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Social Media Links - Desktop Only */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://twitter.com/olshani_ke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1DjLh4CWJk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://instagram.com/olshaniproperties"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://tiktok.com/@olshani_properties"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Follow us on TikTok"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>

          <NightToggle />
          <a
            href="https://wa.me/254702168686"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
            aria-label="Contact us on WhatsApp"
          >
            Contact Us
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}