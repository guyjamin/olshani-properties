export interface Property {
  id: string
  projectName: string
  projectEmoji: string
  floors: number
  location: string
  unitType: string
  size: string
  price: number
  completionDate: string
  amenities: string[]
  image: string
}

export interface Project {
  name: string
  emoji: string
  floors: number
  location: string
  completionDate: string
  amenities: string[]
  units: Property[]
  image: string
}

// Load properties from JSON file
import propertiesData from '../data/properties.json'
export const properties: Property[] = propertiesData as Property[]

// Helper function to format price
export function formatPrice(price: number): string {
  return `KES ${(price / 1000000).toFixed(1)}M`
}

export function getProjects(): Project[] {

  const projectMap = new Map<string, Project>()

  properties.forEach((property) => {
    if (!projectMap.has(property.projectName)) {
      projectMap.set(property.projectName, {
        name: property.projectName,
        emoji: property.projectEmoji,
        floors: property.floors,
        location: property.location,
        completionDate: property.completionDate,
        amenities: property.amenities,
        units: [property],
        image: property.image,
      })
    } else {
      const project = projectMap.get(property.projectName)!
      project.units.push(property)
    }
  })

  return Array.from(projectMap.values())
}

export function getProjectByName(name: string): Project | undefined {
  const projects = getProjects()
  return projects.find((p) => p.name === name)
}
