"use client";
import { ReactNode, CSSProperties } from "react";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleIn";
  className?: string;
  style?: CSSProperties;
}

const KEYFRAMES = {
  fadeUp:     "fadeUp",
  fadeIn:     "fadeIn",
  slideLeft:  "slideLeft",
  slideRight: "slideRight",
  scaleIn:    "scaleIn",
};

export function Reveal({
  children, delay = 0, duration = 0.85,
  animation = "fadeUp", className, style,
}: RevealProps) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        animation: visible
          ? `${KEYFRAMES[animation]} ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s both`
          : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
