"use client"

import { type Project, formatPrice } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prices = project.units.map((u) => u.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange =
    minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`

  const unitTypes = Array.from(new Set(project.units.map((u) => u.unitType)))

  const handleEnquire = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${project.name} project in ${project.location}. Can you provide more details?`,
    )
    window.open(`https://wa.me/254702168686?text=${message}`, "_blank")
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={`${project.name} project in ${project.location}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">{project.completionDate}</Badge>
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg">
          <span className="text-2xl">{project.emoji}</span>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-semibold text-balance">{project.name}</h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>{project.floors} Floors</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{priceRange}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Home className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{project.units.length} Apartment types Available</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {unitTypes.map((type, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Key Amenities</h4>
          <div className="grid grid-cols-2 gap-2">
            {project.amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-pretty">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button asChild className="flex-1" size="lg">
          <Link href={`/project/${encodeURIComponent(project.name)}`} aria-label={`View details for ${project.name} project in ${project.location}`}>
            View Details
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 bg-transparent"
          onClick={handleEnquire}
          aria-label={`Enquire about ${project.name} project on WhatsApp`}
        >
          Enquire Now
        </Button>
      </CardFooter>
    </Card>
  )
}
