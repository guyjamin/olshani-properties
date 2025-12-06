"use client"

import { Property } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface PropertyListProps {
    properties: Property[]
    onEdit: (property: Property) => void
    onDelete: (id: string) => void
}

export function PropertyList({ properties, onEdit, onDelete }: PropertyListProps) {
    if (properties.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No properties found. Add your first property to get started.
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Unit Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Completion</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {properties.map((property) => (
                        <TableRow key={property.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <span>{property.projectEmoji}</span>
                                    <span>{property.projectName}</span>
                                </div>
                            </TableCell>
                            <TableCell>{property.unitType}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{property.location}</Badge>
                            </TableCell>
                            <TableCell>{property.size || "N/A"}</TableCell>
                            <TableCell>
                                KES {property.price.toLocaleString()}
                            </TableCell>
                            <TableCell>{property.completionDate}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onEdit(property)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => onDelete(property.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
