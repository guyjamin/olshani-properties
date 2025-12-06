"use client"

import { useState } from "react"
import { getProjects } from "@/lib/properties"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilters, type ProjectFilterState } from "@/components/project-filters"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeroSection } from "@/components/hero-section"
import { EmptyState } from "@/components/empty-state"
import { FeaturedProject } from "@/components/featured-project"
import { Building2 } from "lucide-react"

export default function HomePage() {
  const [filters, setFilters] = useState<ProjectFilterState>({
    search: "",
    location: "",
    priceRange: "",
  })

  const allProjects = getProjects()

  const filteredProjects = allProjects.filter((project) => {
    // Search filter
    if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Location filter
    if (filters.location && filters.location !== "all" && project.location !== filters.location) {
      return false
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== "all") {
      const prices = project.units.map((u) => u.price / 1000000)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      const [min, max] = filters.priceRange.split("-").map(Number)

      if (max) {
        if (maxPrice < min || minPrice > max) return false
      } else {
        if (maxPrice < min) return false
      }
    }

    return true
  })

  const featuredProject = allProjects.find((p) => p.name === "GAIA")

  // Check if any filters are active
  const hasActiveFilters = !!(filters.search || (filters.location && filters.location !== "all") || (filters.priceRange && filters.priceRange !== "all"))

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      priceRange: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Header */}
      {/* <header className="border-b border-border bg-card">
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
      </header> */}

      {featuredProject && (
        <section className="bg-muted/30 border-b border-border" id="properties">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-bold mb-2">Featured Project</h2>
              <p className="text-muted-foreground">Discover our premium luxury development</p>
            </div>
            <FeaturedProject project={featuredProject} />
          </div>
        </section>
      )}

      {/* Filters and Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-8">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-2">All Projects</h2>
            <p className="text-muted-foreground">
              Browse our complete collection of {allProjects.length} luxury developments
            </p>
          </div>

          <ProjectFilters onFilterChange={setFilters} />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {allProjects.length} projects
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState onClearFilters={clearFilters} hasActiveFilters={hasActiveFilters} />
          )}
        </div>
      </section>

      <Footer />

      <WhatsAppButton phoneNumber="0702168686" />
    </div>
  )
}
