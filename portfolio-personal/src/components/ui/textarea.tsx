import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border border-border-subtle bg-background-secondary px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-accent-neon-blue focus:outline-none focus:ring-2 focus:ring-accent-neon-blue/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          // Optimizaciones para iOS
          "appearance-none",
          "touch-manipulation",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }