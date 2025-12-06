import { SearchX, RefreshCw, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
    onClearFilters: () => void
    hasActiveFilters: boolean
}

export function EmptyState({ onClearFilters, hasActiveFilters }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {/* Icon */}
            <div className="mb-6 rounded-full bg-muted p-6">
                <SearchX className="w-12 h-12 text-muted-foreground" aria-hidden="true" />
            </div>

            {/* Headline */}
            <h3 className="font-serif text-2xl font-bold mb-2">No Properties Found</h3>

            {/* Description */}
            <p className="text-muted-foreground max-w-md mb-8">
                {hasActiveFilters
                    ? "We couldn't find any properties matching your search criteria. Try adjusting your filters or browse all available properties."
                    : "No properties are currently available. Please check back later or contact us for upcoming projects."}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                {hasActiveFilters && (
                    <Button size="lg" onClick={onClearFilters} className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Clear All Filters
                    </Button>
                )}
                <Button
                    size="lg"
                    variant={hasActiveFilters ? "outline" : "default"}
                    className="gap-2"
                    onClick={() => window.open("https://wa.me/254702168686", "_blank")}
                >
                    <MessageCircle className="w-4 h-4" />
                    Contact Us for Custom Requirements
                </Button>
            </div>

            {/* Suggestions */}
            {hasActiveFilters && (
                <div className="mt-8 p-4 bg-muted/50 rounded-lg max-w-md">
                    <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Tip:</strong> Try expanding your search by selecting a
                        different location or price range.
                    </p>
                </div>
            )}
        </div>
    )
}
