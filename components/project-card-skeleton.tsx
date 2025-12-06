import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProjectCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            {/* Image Skeleton */}
            <div className="relative aspect-[3/2] bg-muted animate-pulse" />

            <CardContent className="p-6 space-y-4">
                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-7 bg-muted rounded animate-pulse w-3/4" />
                    <div className="flex items-center gap-4">
                        <div className="h-4 bg-muted rounded animate-pulse w-24" />
                        <div className="h-4 bg-muted rounded animate-pulse w-20" />
                    </div>
                </div>

                {/* Price Skeleton */}
                <div className="h-8 bg-muted rounded animate-pulse w-1/2" />

                {/* Unit Types Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-32" />
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 bg-muted rounded animate-pulse w-20" />
                        <div className="h-6 bg-muted rounded animate-pulse w-24" />
                        <div className="h-6 bg-muted rounded animate-pulse w-20" />
                    </div>
                </div>

                {/* Amenities Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-28" />
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded animate-pulse" />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex gap-3">
                <div className="h-10 bg-muted rounded animate-pulse flex-1" />
                <div className="h-10 bg-muted rounded animate-pulse flex-1" />
            </CardFooter>
        </Card>
    )
}
