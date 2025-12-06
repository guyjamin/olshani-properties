import { NextResponse } from "next/server"
import { uploadToGitHub } from "@/lib/github"

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
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
        const filename = `${timestamp}-${cleanName}`

        // Upload to 'public' folder in GitHub
        await uploadToGitHub(
            `public/${filename}`,
            buffer,
            `Upload image ${filename} via Admin`
        )

        return NextResponse.json({
            success: true,
            filename,
            // The URL will be valid after Vercel rebuilds, but we can return the predictable path immediately
            url: `/${filename}`
        })
    } catch (error: any) {
        console.error("Error uploading file:", error)
        return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 })
    }
}
