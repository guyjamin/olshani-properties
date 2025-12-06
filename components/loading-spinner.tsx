import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg"
    text?: string
    className?: string
}

export function LoadingSpinner({ size = "md", text, className }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    }

    return (
        <div className={cn("flex flex-col items-center justify-center gap-3", className)} role="status" aria-live="polite">
            <div
                className={cn(
                    "animate-spin rounded-full border-primary border-t-transparent",
                    sizeClasses[size]
                )}
                aria-hidden="true"
            />
            {text && <p className="text-sm text-muted-foreground">{text}</p>}
            <span className="sr-only">Loading...</span>
        </div>
    )
}
