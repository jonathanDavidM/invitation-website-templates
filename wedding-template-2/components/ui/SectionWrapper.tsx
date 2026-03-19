// components/ui/SectionWrapper.tsx
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
  darkBg?: boolean;
}

export function SectionWrapper({ id, className, children, darkBg = false }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 px-6",
        darkBg ? "bg-forest-dark" : "bg-forest-deep",
        className
      )}
    >
      <div className="max-w-5xl mx-auto relative z-10">{children}</div>
      {/* Subtle corner ornaments */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/10" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold/10" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold/10" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/10" />
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", centered && "text-center")}>
      {eyebrow && (
        <p className="font-heading text-gold tracking-[0.3em] text-xs uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display italic text-cream/95 text-5xl md:text-6xl font-light leading-tight mb-4">
        {title}
      </h2>
      {/* Gold divider */}
      <div className={cn("flex items-center gap-3 my-6", centered && "justify-center")}>
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
        <span className="font-display text-gold text-lg italic">✦</span>
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
      </div>
      {subtitle && (
        <p className="font-body text-cream/50 text-sm leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
