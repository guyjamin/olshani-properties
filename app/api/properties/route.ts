import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "properties.json")

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, "utf8")
        const properties = JSON.parse(fileContents)
        return NextResponse.json(properties)
    } catch (error) {
        console.error("Error reading properties:", error)
        return NextResponse.json({ error: "Failed to load properties" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const newProperty = await request.json()

        // Read existing properties
        const fileContents = await fs.readFile(dataFilePath, "utf8")
        const properties = JSON.parse(fileContents)

        // Add new property
        properties.push(newProperty)

        // Write back to file
        await fs.writeFile(dataFilePath, JSON.stringify(properties, null, 2))

        return NextResponse.json({ success: true, property: newProperty })
    } catch (error) {
        console.error("Error adding property:", error)
        return NextResponse.json({ error: "Failed to add property" }, { status: 500 })
    }
}
