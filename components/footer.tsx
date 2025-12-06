import Image from "next/image"
import Link from "next/link"
import { Building2, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-primary" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold">Olshani Properties</span>
                <span className="text-sm text-secondary-foreground/80">Keeping The Promise</span>
              </div>
            </div>

            <p className="text-sm text-secondary-foreground/70 leading-relaxed max-w-sm">
              Premium living in Nairobi — thoughtfully designed apartments with curated amenities and honest service.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/olshani_ke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/olshaniproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@olshani_properties"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#properties" className="hover:text-primary">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/90">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> <a href="tel:0702168686" className="hover:text-primary">0702 168 686</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> <a href="mailto:info@olshaniproperties.co.ke" className="hover:text-primary">info@olshaniproperties.co.ke</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-sm text-secondary-foreground/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>© {new Date().getFullYear()} Olshani Properties. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>
              {" "}
              <a
                href="https://jamin-kairu.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                𓃵
              </a>
            </span>
          </div>
          <div>
            <Link href="/privacy" className="mr-4 hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
