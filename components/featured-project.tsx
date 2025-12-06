"use client"

import { type Project, formatPrice } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Home, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

interface FeaturedProjectProps {
    project: Project
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const prices = project.units.map((u) => u.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange =
        minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`

    const unitTypes = Array.from(new Set(project.units.map((u) => u.unitType)))

    // Carousel images - using different unit images for variety
    const carouselImages = [
        project.image,
        ...project.units.slice(0, 3).map((unit) => unit.image),
    ].filter((img, index, self) => img && self.indexOf(img) === index) // Remove duplicates

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
    }, [emblaApi, onSelect])

    const handleEnquire = () => {
        const message = encodeURIComponent(
            `Hi, I'm interested in the ${project.name} project in ${project.location}. Can you provide more details?`
        )
        window.open(`https://wa.me/254702168686?text=${message}`, "_blank")
    }

    return (
        <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
                {/* Carousel Section */}
                <div className="relative bg-muted">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {carouselImages.map((image, index) => (
                                <div key={index} className="flex-[0_0_100%] min-w-0 relative aspect-[4/3]">
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${project.name} view ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {carouselImages.length > 1 && (
                        <>
                            <button
                                onClick={scrollPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background p-2 rounded-full transition-colors z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background p-2 rounded-full transition-colors z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {carouselImages.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? "bg-primary w-6" : "bg-background/60 hover:bg-background/80"
                                        }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Badge */}
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground z-10">
                        Featured
                    </Badge>
                    <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg z-10">
                        <span className="text-2xl">{project.emoji}</span>
                    </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="space-y-3">
                            <h3 className="font-serif text-3xl md:text-4xl font-bold text-balance">{project.name}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    <span>{project.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Building2 className="w-4 h-4" />
                                    <span>{project.floors} Floors</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{project.completionDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Starting from</p>
                            <p className="text-3xl md:text-4xl font-bold text-primary">{priceRange}</p>
                        </div>

                        {/* Unit Types */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Home className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{project.units.length} Apartment Types Available</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {unitTypes.map((type, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {type}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold">Premium Amenities</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {project.amenities.slice(0, 6).map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span className="text-pretty">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                            {project.amenities.length > 6 && (
                                <p className="text-xs text-muted-foreground">+{project.amenities.length - 6} more amenities</p>
                            )}
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-3 mt-6">
                        <Button asChild className="flex-1" size="lg">
                            <Link href={`/project/${encodeURIComponent(project.name)}`}>View Full Details</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1" onClick={handleEnquire}>
                            Enquire Now
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
