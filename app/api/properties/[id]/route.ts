import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "properties.json")

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const updatedProperty = await request.json()
        const { id } = params

        // Read existing properties
        const fileContents = await fs.readFile(dataFilePath, "utf8")
        const properties = JSON.parse(fileContents)

        // Find and update property
        const index = properties.findIndex((p: any) => p.id === id)
        if (index === -1) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }

        properties[index] = { ...properties[index], ...updatedProperty }

        // Write back to file
        await fs.writeFile(dataFilePath, JSON.stringify(properties, null, 2))

        return NextResponse.json({ success: true, property: properties[index] })
    } catch (error) {
        console.error("Error updating property:", error)
        return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params

        // Read existing properties
        const fileContents = await fs.readFile(dataFilePath, "utf8")
        const properties = JSON.parse(fileContents)

        // Filter out the property to delete
        const filteredProperties = properties.filter((p: any) => p.id !== id)

        if (filteredProperties.length === properties.length) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }

        // Write back to file
        await fs.writeFile(dataFilePath, JSON.stringify(filteredProperties, null, 2))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting property:", error)
        return NextResponse.json({ error: "Failed to delete property" }, { status: 500 })
    }
}
