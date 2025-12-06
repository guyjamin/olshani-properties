"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  search: string
  project: string
  location: string
  unitType: string
  priceRange: string
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    project: "",
    location: "",
    unitType: "",
    priceRange: "",
  })

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      search: "",
      project: "",
      location: "",
      unitType: "",
      priceRange: "",
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Filter Properties</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by project or unit type..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={filters.project} onValueChange={(value) => handleFilterChange("project", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="DIPLOMAT">DIPLOMAT</SelectItem>
            <SelectItem value="GAIA">GAIA</SelectItem>
            <SelectItem value="EMERALD">EMERALD</SelectItem>
            <SelectItem value="MISTY">MISTY</SelectItem>
            <SelectItem value="HEPHÉ">HEPHÉ</SelectItem>
            <SelectItem value="AMETHYST">AMETHYST</SelectItem>
            <SelectItem value="1050">1050</SelectItem>
            <SelectItem value="Marble West">Marble West</SelectItem>
            <SelectItem value="Astra Bay">Astra Bay</SelectItem>
            <SelectItem value="Himalaya Horizon">Himalaya Horizon</SelectItem>
            <SelectItem value="Montbleu">Montbleu</SelectItem>
            <SelectItem value="Marina 2">Marina 2</SelectItem>
            <SelectItem value="Urban Dreams">Urban Dreams</SelectItem>
            <SelectItem value="Executive Suites, Riverside">Executive Suites, Riverside</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Westlands">Westlands</SelectItem>
            <SelectItem value="Kilimani">Kilimani</SelectItem>
            <SelectItem value="Lower Kabete">Lower Kabete</SelectItem>
            <SelectItem value="Riverside">Riverside</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.unitType} onValueChange={(value) => handleFilterChange("unitType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Unit Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Studio">Studio</SelectItem>
            <SelectItem value="Furnished Studio">Furnished Studio</SelectItem>
            <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
            <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
            <SelectItem value="2 Bedroom + DSQ">2 Bedroom + DSQ</SelectItem>
            <SelectItem value="3 Bedroom + DSQ">3 Bedroom + DSQ</SelectItem>
            <SelectItem value="3 Bedroom All Ensuite + DSQ">3 Bedroom All Ensuite + DSQ</SelectItem>
            <SelectItem value="4 Bedroom + DSQ">4 Bedroom + DSQ</SelectItem>
            <SelectItem value="4 Bedroom All Ensuite + DSQ">4 Bedroom All Ensuite + DSQ</SelectItem>
            <SelectItem value="5 Bedroom All Ensuite + DSQ">5 Bedroom All Ensuite + DSQ</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-10">Under KSh 10M</SelectItem>
            <SelectItem value="10-20">KSh 10M - 20M</SelectItem>
            <SelectItem value="20-30">KSh 20M - 30M</SelectItem>
            <SelectItem value="30+">Above KSh 30M</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button variant="ghost" onClick={handleReset} size="sm">
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
