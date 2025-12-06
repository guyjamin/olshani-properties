import { NextResponse } from "next/server"
import { fetchGitHubFile, uploadToGitHub } from "@/lib/github"

const PROPERTIES_PATH = "data/properties.json"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const updatedProperty = await request.json()
        const { id } = params

        // 1. Fetch current data
        const { content, sha } = await fetchGitHubFile(PROPERTIES_PATH)
        const properties = JSON.parse(content)

        // 2. Update logic
        const index = properties.findIndex((p: any) => p.id === id)
        if (index === -1) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }
        properties[index] = { ...properties[index], ...updatedProperty }

        // 3. Save to GitHub
        await uploadToGitHub(
            PROPERTIES_PATH,
            JSON.stringify(properties, null, 2),
            `Update property: ${updatedProperty.projectName}`,
            sha
        )

        return NextResponse.json({ success: true, property: properties[index] })
    } catch (error: any) {
        console.error("Error updating property:", error)
        return NextResponse.json({ error: error.message || "Failed to update property" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params

        // 1. Fetch current data
        const { content, sha } = await fetchGitHubFile(PROPERTIES_PATH)
        const properties = JSON.parse(content)

        // 2. Filter out property
        const filteredProperties = properties.filter((p: any) => p.id !== id)

        if (filteredProperties.length === properties.length) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }

        // 3. Save to GitHub
        await uploadToGitHub(
            PROPERTIES_PATH,
            JSON.stringify(filteredProperties, null, 2),
            `Delete property: ${id}`,
            sha
        )

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("Error deleting property:", error)
        return NextResponse.json({ error: error.message || "Failed to delete property" }, { status: 500 })
    }
}
