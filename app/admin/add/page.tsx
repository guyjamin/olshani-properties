"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, ArrowLeft, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddPropertyPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Generate unique ID
            const id = `${formData.projectName.toLowerCase().replace(/\s+/g, "-")}-${formData.unitType.toLowerCase().replace(/\s+/g, "-")}`

            const property = {
                id,
                projectName: formData.projectName,
                location: formData.location,
                unitType: formData.unitType,
                price: parseInt(formData.price),
                size: formData.size,
                image: formData.image,
                completionDate: formData.completionDate,
                floors: parseInt(formData.floors) || 0,
                amenities: formData.amenities.split(",").map((a) => a.trim()),
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
                alert("Failed to add property")
            }
        } catch (error) {
            console.error("Error adding property:", error)
            alert("Failed to add property")
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
                                <Label htmlFor="image">Image URL *</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    placeholder="e.g., /Projects_Diplomat.jpg"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                />
                                <p className="text-sm text-muted-foreground">
                                    Upload image to /public folder first, then enter the path (e.g., /image-name.jpg)
                                </p>
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
                                <Button type="submit" disabled={loading} className="flex-1">
                                    {loading ? "Adding..." : "Add Property"}
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
