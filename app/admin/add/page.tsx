"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, ArrowLeft, Upload, X, Image as ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddPropertyPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [formData, setFormData] = useState({
        projectName: "",
        location: "",
        unitType: "",
        price: "",
        size: "",
        image: "",
        completionDate: "",
        floors: "",
        amenities: "",
    })

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = () => {
        setImageFile(null)
        setImagePreview("")
        setFormData({ ...formData, image: "" })
    }

    const uploadImage = async (): Promise<string> => {
        if (!imageFile) return formData.image

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", imageFile)

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Upload failed")
            }

            const data = await response.json()
            return data.url
        } catch (error) {
            console.error("Error uploading image:", error)
            throw error
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Upload image first if there's a file
            let imageUrl = formData.image
            if (imageFile) {
                imageUrl = await uploadImage()
            }

            if (!imageUrl) {
                alert("Please provide an image")
                setLoading(false)
                return
            }

            // Generate unique ID
            const id = `${formData.projectName.toLowerCase().replace(/\s+/g, "-")}-${formData.unitType.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`

            const property = {
                id,
                projectName: formData.projectName,
                location: formData.location,
                unitType: formData.unitType,
                price: parseInt(formData.price),
                size: formData.size,
                image: imageUrl,
                completionDate: formData.completionDate,
                floors: parseInt(formData.floors) || 0,
                amenities: formData.amenities.split(",").map((a) => a.trim()).filter(Boolean),
                emoji: "🏢", // Default emoji
            }

            const response = await fetch("/api/properties", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(property),
            })

            if (response.ok) {
                alert("Property added successfully!")
                router.push("/admin")
            } else {
                const error = await response.json()
                alert(`Failed to add property: ${error.error || "Unknown error"}`)
            }
        } catch (error) {
            console.error("Error adding property:", error)
            alert("Failed to add property. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-primary" />
                        <div>
                            <h1 className="font-serif text-2xl font-bold">Add New Property</h1>
                            <p className="text-sm text-muted-foreground">Olshani Properties Admin</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-3xl">
                <Button variant="ghost" onClick={() => router.push("/admin")} className="mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle>Property Details</CardTitle>
                        <CardDescription>Fill in the information for the new property listing</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Image Upload Section */}
                            <div className="space-y-2">
                                <Label>Property Image *</Label>
                                {imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-64 object-cover rounded-lg border-2 border-border"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={handleRemoveImage}
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                                        <Input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            className="hidden"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <p className="text-sm font-medium mb-1">Click to upload image</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
                                        </label>
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Or enter an image URL below if you already have one hosted
                                </p>
                                <Input
                                    name="image"
                                    placeholder="Or paste image URL (e.g., https://example.com/image.jpg)"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="projectName">Project Name *</Label>
                                    <Input
                                        id="projectName"
                                        name="projectName"
                                        placeholder="e.g., DIPLOMAT"
                                        value={formData.projectName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location *</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="e.g., Kilimani"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="unitType">Unit Type *</Label>
                                    <Input
                                        id="unitType"
                                        name="unitType"
                                        placeholder="e.g., 2 Bedroom"
                                        value={formData.unitType}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="size">Size *</Label>
                                    <Input
                                        id="size"
                                        name="size"
                                        placeholder="e.g., 120 sqm"
                                        value={formData.size}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (KSh) *</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="e.g., 15000000"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="completionDate">Completion Date *</Label>
                                    <Input
                                        id="completionDate"
                                        name="completionDate"
                                        placeholder="e.g., Q2 2025"
                                        value={formData.completionDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="floors">Number of Floors</Label>
                                <Input
                                    id="floors"
                                    name="floors"
                                    type="number"
                                    placeholder="e.g., 8"
                                    value={formData.floors}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amenities">Amenities (comma-separated) *</Label>
                                <Textarea
                                    id="amenities"
                                    name="amenities"
                                    placeholder="e.g., Swimming Pool, Gym, Parking, 24/7 Security"
                                    value={formData.amenities}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={loading || uploading} className="flex-1">
                                    {uploading ? "Uploading image..." : loading ? "Adding property..." : "Add Property"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
