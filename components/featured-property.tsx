import Image from "next/image"
import { type Property, formatPrice } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Maximize2, Calendar, Phone, Mail } from "lucide-react"

interface FeaturedPropertyProps {
  property: Property
}

export function FeaturedProperty({ property }: FeaturedPropertyProps) {
  return (
    <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.projectName}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground font-semibold">Featured Property</Badge>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3 text-balance">{property.projectName}</h2>
              <p className="text-xl md:text-2xl font-semibold text-primary">{formatPrice(property.price)}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-secondary-foreground/80">
                <MapPin className="w-5 h-5" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/80">
                <Maximize2 className="w-5 h-5" />
                <span>
                  {property.unitType} {property.size && `• ${property.size}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/80">
                <Calendar className="w-5 h-5" />
                <span>Completion: {property.completionDate}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg">Premium Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.amenities.slice(0, 6).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              {property.amenities.length > 6 && (
                <p className="text-sm text-secondary-foreground/60 mt-2">
                  +{property.amenities.length - 6} more amenities
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button size="lg" variant="outline" className="border-secondary-foreground/20 bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Email Enquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
