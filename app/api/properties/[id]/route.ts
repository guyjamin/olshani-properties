import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const PROPERTIES_FILE = path.join(process.cwd(), "data", "properties.json")

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const updatedProperty = await request.json()
        const { id } = params

        // 1. Read current properties from file
        const fileContent = await fs.readFile(PROPERTIES_FILE, "utf-8")
        const properties = JSON.parse(fileContent)

        // 2. Update logic
        const index = properties.findIndex((p: any) => p.id === id)
        if (index === -1) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }
        properties[index] = { ...properties[index], ...updatedProperty }

        // 3. Save to file
        await fs.writeFile(PROPERTIES_FILE, JSON.stringify(properties, null, 2), "utf-8")

        return NextResponse.json({ success: true, property: properties[index] })
    } catch (error: any) {
        console.error("Error updating property:", error)
        return NextResponse.json({ error: error.message || "Failed to update property" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params

        // 1. Read current properties from file
        const fileContent = await fs.readFile(PROPERTIES_FILE, "utf-8")
        const properties = JSON.parse(fileContent)

        // 2. Filter out property
        const filteredProperties = properties.filter((p: any) => p.id !== id)

        if (filteredProperties.length === properties.length) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }

        // 3. Save to file
        await fs.writeFile(PROPERTIES_FILE, JSON.stringify(filteredProperties, null, 2), "utf-8")

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("Error deleting property:", error)
        return NextResponse.json({ error: error.message || "Failed to delete property" }, { status: 500 })
    }
}
