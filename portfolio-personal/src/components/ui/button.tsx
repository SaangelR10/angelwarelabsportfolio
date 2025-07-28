import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-accent-neon-blue text-background-primary hover:bg-accent-neon-blue/90 shadow-neon-blue",
        destructive: "bg-accent-neon-magenta text-background-primary hover:bg-accent-neon-magenta/90 shadow-neon-magenta",
        outline: "border border-accent-neon-blue text-accent-neon-blue hover:bg-accent-neon-blue hover:text-background-primary",
        secondary: "bg-background-secondary text-text-primary hover:bg-background-secondary/80",
        ghost: "hover:bg-background-secondary hover:text-text-primary",
        link: "text-accent-neon-blue underline-offset-4 hover:underline",
        gradient: "bg-gradient-neon text-background-primary hover:shadow-glow",
      },
      size: {
        default: "h-12 px-6 py-3 text-base", // 48px altura para móviles
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12", // 48x48px para iconos táctiles
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }