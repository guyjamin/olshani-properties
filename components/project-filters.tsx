"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export interface ProjectFilterState {
  search: string
  location: string
  priceRange: string
}

interface ProjectFiltersProps {
  onFilterChange: (filters: ProjectFilterState) => void
}

export function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
  const handleFilterChange = (key: keyof ProjectFilterState, value: string) => {
    onFilterChange((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-10"
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select onValueChange={(value) => handleFilterChange("location", value)}>
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

        <Select onValueChange={(value) => handleFilterChange("priceRange", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-10">Under KSh 10M</SelectItem>
            <SelectItem value="10-20">KSh 10M - 20M</SelectItem>
            <SelectItem value="20-30">KSh 20M - 30M</SelectItem>
            <SelectItem value="30">Above KSh 30M</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
