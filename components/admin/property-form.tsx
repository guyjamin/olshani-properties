"use client"

import { useState } from "react"
import { Property } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface PropertyFormProps {
    property: Property | null
    onSave: (property: Property) => void
    onCancel: () => void
}

export function PropertyForm({ property, onSave, onCancel }: PropertyFormProps) {
    const [formData, setFormData] = useState<Property>(
        property || {
            id: "",
            projectName: "",
            projectEmoji: "",
            floors: 0,
            location: "",
            unitType: "",
            size: "",
            price: 0,
            completionDate: "",
            amenities: [],
            image: "",
        }
    )
    const [amenitiesText, setAmenitiesText] = useState(
        property?.amenities.join(", ") || ""
    )
    const [isUploading, setIsUploading] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "floors" ? Number(value) : value,
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                const { url } = await response.json()
                setFormData((prev) => ({ ...prev, image: url }))
                toast.success("Image uploaded successfully")
            } else {
                toast.error("Failed to upload image")
            }
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Failed to upload image")
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Generate ID if creating new property
        const propertyData = {
            ...formData,
            id: formData.id || `${formData.projectName.toLowerCase().replace(/\s+/g, "-")}-${formData.unitType.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
            amenities: amenitiesText.split(",").map((a) => a.trim()).filter(Boolean),
        }

        onSave(propertyData)
    }

    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {property ? "Edit Property" : "Add New Property"}
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the property details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="projectName">Project Name *</Label>
                            <Input
                                id="projectName"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="projectEmoji">Project Emoji</Label>
                            <Input
                                id="projectEmoji"
                                name="projectEmoji"
                                value={formData.projectEmoji}
                                onChange={handleChange}
                                placeholder="🏗️"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="location">Location *</Label>
                            <Input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="floors">Floors *</Label>
                            <Input
                                id="floors"
                                name="floors"
                                type="number"
                                value={formData.floors}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="unitType">Unit Type *</Label>
                            <Input
                                id="unitType"
                                name="unitType"
                                value={formData.unitType}
                                onChange={handleChange}
                                placeholder="e.g., 1 Bedroom, Studio"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="size">Size</Label>
                            <Input
                                id="size"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                placeholder="e.g., 52 sqm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="price">Price (KES) *</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="completionDate">Completion Date *</Label>
                            <Input
                                id="completionDate"
                                name="completionDate"
                                value={formData.completionDate}
                                onChange={handleChange}
                                placeholder="e.g., Dec 2027"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                        <Textarea
                            id="amenities"
                            value={amenitiesText}
                            onChange={(e) => setAmenitiesText(e.target.value)}
                            placeholder="Swimming Pool, Gym, Security"
                            rows={3}
                        />
                    </div>

                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                        />
                        {formData.image && (
                            <p className="text-sm text-gray-600 mt-1">
                                Current: {formData.image}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isUploading}>
                            {isUploading ? "Uploading..." : property ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
