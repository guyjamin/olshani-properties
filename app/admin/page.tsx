"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Building2, LogOut, Plus, Edit, Trash2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface Property {
    id: string
    projectName: string
    location: string
    unitType: string
    price: number
    size: string
    image: string
    completionDate: string
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    // Check authentication on mount
    useEffect(() => {
        const auth = localStorage.getItem("admin_authenticated")
        if (auth === "true") {
            setIsAuthenticated(true)
            loadProperties()
        } else {
            setLoading(false)
        }
    }, [])

    const loadProperties = async () => {
        try {
            const response = await fetch("/api/properties")
            const data = await response.json()
            setProperties(data)
        } catch (error) {
            console.error("Failed to load properties:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Simple password check - in production, use proper authentication
        if (password === "olshani2024") {
            localStorage.setItem("admin_authenticated", "true")
            setIsAuthenticated(true)
            setError("")
            loadProperties()
        } else {
            setError("Invalid password")
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("admin_authenticated")
        setIsAuthenticated(false)
        setPassword("")
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this property?")) return

        try {
            const response = await fetch(`/api/properties/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setProperties(properties.filter((p) => p.id !== id))
            } else {
                alert("Failed to delete property")
            }
        } catch (error) {
            console.error("Failed to delete property:", error)
            alert("Failed to delete property")
        }
    }

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                            <Building2 className="w-12 h-12 text-primary" />
                        </div>
                        <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your password to access the admin dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-sm text-destructive">{error}</p>}
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-primary" />
                            <div>
                                <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
                                <p className="text-sm text-muted-foreground">Olshani Properties</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => router.push("/")}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Site
                            </Button>
                            <Button variant="outline" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Properties</h2>
                        <p className="text-muted-foreground">Manage your property listings</p>
                    </div>
                    <Button onClick={() => router.push("/admin/add")}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Property
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading properties...</p>
                    </div>
                ) : properties.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
                            <p className="text-muted-foreground mb-4">Get started by adding your first property</p>
                            <Button onClick={() => router.push("/admin/add")}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Property
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {properties.map((property) => (
                            <Card key={property.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        {property.image && (
                                            <img
                                                src={property.image}
                                                alt={property.projectName}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-serif text-xl font-bold mb-1">{property.projectName}</h3>
                                            <p className="text-muted-foreground mb-2">{property.location}</p>
                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <span>
                                                    <strong>Type:</strong> {property.unitType}
                                                </span>
                                                <span>
                                                    <strong>Size:</strong> {property.size}
                                                </span>
                                                <span>
                                                    <strong>Price:</strong> KSh {property.price.toLocaleString()}
                                                </span>
                                                <span>
                                                    <strong>Completion:</strong> {property.completionDate}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.push(`/admin/edit/${property.id}`)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleDelete(property.id)}>
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
