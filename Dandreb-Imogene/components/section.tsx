import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative overflow-hidden", {
  variants: {
    surface: {
      default: "bg-background",
      card: "bg-card",
      tinted: "bg-secondary",
      forest: "bg-forest text-forest-foreground",
    },
    spacing: {
      default: "py-24 md:py-32",
      compact: "py-16 md:py-24",
      none: "",
    },
  },
  defaultVariants: {
    surface: "default",
    spacing: "default",
  },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** Anchor id used by the navigation */
  id?: string;
}

/** Consistent vertical rhythm + surface for every page section. */
export function Section({
  id,
  surface,
  spacing,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(sectionVariants({ surface, spacing }), className)}
      {...props}
    >
      {children}
    </section>
  );
}

/** Standard horizontal container. */
export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
