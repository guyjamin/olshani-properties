"use client"

import { type Property, formatPrice } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Calendar, Maximize2, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const displayedAmenities = showAllAmenities ? property.amenities : property.amenities.slice(0, 6)

  const handleEnquire = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${property.projectName} ${property.unitType} unit (${property.size}) priced at ${formatPrice(property.price)}. Can you provide more details?`,
    )
    window.open(`https://wa.me/254702168686?text=${message}`, "_blank")
  }

  return (
    <Card className="overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-primary/20">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={`${property.projectName} ${property.unitType} in ${property.location}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">{property.completionDate}</Badge>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-2xl font-semibold text-balance">{property.projectName}</h3>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{property.completionDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">{formatPrice(property.price)}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{property.unitType}</span>
          </div>
          {property.size && (
            <>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{property.size}</span>
              </div>
            </>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Amenities</h4>
          <div className="grid grid-cols-2 gap-2">
            {displayedAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
          {property.amenities.length > 6 && (
            <button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              {showAllAmenities ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show all {property.amenities.length} amenities <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button className="flex-1" size="lg">
          View Details
        </Button>
        <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={handleEnquire}>
          Enquire Now
        </Button>
      </CardFooter>
    </Card>
  )
}
