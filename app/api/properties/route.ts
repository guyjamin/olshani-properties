import { NextResponse } from "next/server"
import { fetchGitHubFile, uploadToGitHub } from "@/lib/github"

const PROPERTIES_PATH = "data/properties.json"

export async function GET() {
    try {
        // Always fetch fresh data from GitHub for the admin panel
        const { content } = await fetchGitHubFile(PROPERTIES_PATH)
        const properties = JSON.parse(content)
        return NextResponse.json(properties)
    } catch (error) {
        console.error("Error reading properties:", error)
        return NextResponse.json({ error: "Failed to load properties" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const newProperty = await request.json()

        // 1. Get current properties and SHA from GitHub
        const { content, sha } = await fetchGitHubFile(PROPERTIES_PATH)
        const properties = JSON.parse(content)

        // 2. Add new property
        properties.push(newProperty)

        // 3. Save back to GitHub
        await uploadToGitHub(
            PROPERTIES_PATH,
            JSON.stringify(properties, null, 2),
            `Add property: ${newProperty.projectName}`,
            sha
        )

        return NextResponse.json({ success: true, property: newProperty })
    } catch (error: any) {
        console.error("Error adding property:", error)
        return NextResponse.json({ error: error.message || "Failed to add property" }, { status: 500 })
    }
}
