import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-border-subtle bg-background-secondary px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-accent-neon-blue focus:outline-none focus:ring-2 focus:ring-accent-neon-blue/20 disabled:cursor-not-allowed disabled:opacity-50",
          // Optimizaciones para iOS
          "appearance-none",
          "touch-manipulation",
          // Soporte para autocompletado en iOS
          "autocomplete",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }