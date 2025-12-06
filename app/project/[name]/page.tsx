"use client"

import { getProjectByName, formatPrice } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Calendar, Home, ArrowLeft, Maximize2 } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { notFound } from "next/navigation"
import React from "react"

export default function ProjectDetailPage({ params }: { params: Promise<{ name: string }> | { name: string } }) {
  // unwrap params in client component
  const unwrappedParams =
    // if params is a thenable, use React.use to unwrap; otherwise use as-is
    typeof (params as any)?.then === "function" && typeof React.use === "function"
      ? React.use(params as Promise<{ name: string }>)
      : (params as { name: string })

  const { name } = unwrappedParams

  const projectName = decodeURIComponent(name)
  const project = getProjectByName(projectName)

  if (!project) {
    notFound()
  }

  const handleEnquire = (unitType: string, size: string, price: number) => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${project.name} ${unitType} unit (${size}) priced at ${formatPrice(price)}. Can you provide more details?`,
    )
    window.open(`https://wa.me/254702168686?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="font-serif text-2xl font-bold text-balance">Olshani Properties</h1>
                <p className="text-sm text-muted-foreground">Premium Living in the Heart of Nairobi</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Project Hero */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-3xl">{project.emoji}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-4xl font-bold mb-4">{project.name}</h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span>{project.floors} Floors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{project.completionDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    <span>{project.units.length} Apartment types</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-bold mb-2">Available Apartment types</h2>
            <p className="text-muted-foreground">Choose from {project.units.length} Apartment types</p>
          </div>

          <div className="space-y-4">
            {project.units.map((unit) => (
              <div
                key={unit.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-1">{unit.unitType}</h3>
                        {unit.size && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Maximize2 className="w-4 h-4" />
                            <span>{unit.size}</span>
                          </div>
                        )}
                      </div>
                      <Badge variant="secondary">{unit.completionDate}</Badge>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{formatPrice(unit.price)}</span>
                    </div>
                  </div>

                  <Button size="lg" onClick={() => handleEnquire(unit.unitType, unit.size, unit.price)}>
                    Enquire on WhatsApp
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <WhatsAppButton phoneNumber="0702168686" />
    </div>
  )
}
