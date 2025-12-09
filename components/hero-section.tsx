"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, MapPin, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToProperties = () => {
    const element = document.getElementById("properties")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContact = () => {
    window.open("https://wa.me/254702168686", "_blank")
  }

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="/nairobi-skyline.jpg"
            alt="Nairobi Skyline"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        {/* Overlay - darker in light mode, lighter in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70 dark:from-background/90 dark:via-background/75 dark:to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl space-y-8">
          {/* Badge with fade-in animation */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Real Estate</span>
          </div>

          {/* Headline with staggered fade-in */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Premium Living in the Heart of{" "}
              <span className="text-primary">Nairobi</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Discover luxury apartments in Westlands & Kilimani with world-class amenities, modern
              design, and unparalleled comfort.
            </p>
          </div>

          {/* CTAs with enhanced hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button
              size="lg"
              className="text-base group transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={scrollToProperties}
              aria-label="Explore all available properties"
            >
              Explore Properties
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-background/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-background/70"
              onClick={handleContact}
              aria-label="Contact us on WhatsApp"
            >
              Contact Us
            </Button>
          </div>

          {/* Stats with fade-in animation */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-primary">
                <Building2 className="w-6 h-6" />
                13
              </div>
              <p className="text-sm text-muted-foreground">Premium Projects</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-primary">
                <MapPin className="w-6 h-6" />
                4
              </div>
              <p className="text-sm text-muted-foreground">Prime Locations</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-primary">
                <TrendingUp className="w-6 h-6" />
                5.59M+
              </div>
              <p className="text-sm text-muted-foreground">Starting From</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  )
}
