import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import type { Property } from './properties'

const DATA_PATH = join(process.cwd(), 'data', 'properties.json')

/**
 * Ensure the data directory exists
 */
function ensureDataDirectory(): void {
    const dir = dirname(DATA_PATH)
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
    }
}

/**
 * Read all properties from JSON file
 */
export async function readProperties(): Promise<Property[]> {
    try {
        ensureDataDirectory()

        if (!existsSync(DATA_PATH)) {
            // Return empty array if file doesn't exist
            return []
        }

        const data = readFileSync(DATA_PATH, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading properties:', error)
        return []
    }
}

/**
 * Write properties to JSON file
 */
export async function writeProperties(properties: Property[]): Promise<void> {
    try {
        ensureDataDirectory()
        writeFileSync(DATA_PATH, JSON.stringify(properties, null, 2), 'utf-8')
    } catch (error) {
        console.error('Error writing properties:', error)
        throw error
    }
}

/**
 * Add a new property
 */
export async function addProperty(property: Property): Promise<Property[]> {
    const properties = await readProperties()
    properties.push(property)
    await writeProperties(properties)
    return properties
}

/**
 * Update an existing property
 */
export async function updateProperty(id: string, updatedProperty: Property): Promise<Property[]> {
    const properties = await readProperties()
    const index = properties.findIndex(p => p.id === id)

    if (index === -1) {
        throw new Error(`Property with id ${id} not found`)
    }

    properties[index] = updatedProperty
    await writeProperties(properties)
    return properties
}

/**
 * Delete a property
 */
export async function deleteProperty(id: string): Promise<Property[]> {
    const properties = await readProperties()
    const filtered = properties.filter(p => p.id !== id)

    if (filtered.length === properties.length) {
        throw new Error(`Property with id ${id} not found`)
    }

    await writeProperties(filtered)
    return filtered
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id: string): Promise<Property | undefined> {
    const properties = await readProperties()
    return properties.find(p => p.id === id)
}
