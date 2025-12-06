import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const timestamp = Date.now()
        const filename = `${timestamp}-${file.name.replace(/\s+/g, "-")}`
        const path = join(process.cwd(), "public", filename)

        await writeFile(path, buffer)

        return NextResponse.json({
            success: true,
            filename,
            url: `/${filename}`
        })
    } catch (error) {
        console.error("Error uploading file:", error)
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }
}
