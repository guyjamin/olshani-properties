import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const PROPERTIES_FILE = path.join(process.cwd(), "data", "properties.json")

export async function GET() {
    try {
        const fileContent = await fs.readFile(PROPERTIES_FILE, "utf-8")
        const properties = JSON.parse(fileContent)
        return NextResponse.json(properties)
    } catch (error) {
        console.error("Error reading properties:", error)
        return NextResponse.json({ error: "Failed to load properties" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const newProperty = await request.json()

        // 1. Read current properties from file
        const fileContent = await fs.readFile(PROPERTIES_FILE, "utf-8")
        const properties = JSON.parse(fileContent)

        // 2. Add new property
        properties.push(newProperty)

        // 3. Save back to file
        await fs.writeFile(PROPERTIES_FILE, JSON.stringify(properties, null, 2), "utf-8")

        return NextResponse.json({ success: true, property: newProperty })
    } catch (error: any) {
        console.error("Error adding property:", error)
        return NextResponse.json({ error: error.message || "Failed to add property" }, { status: 500 })
    }
}
