"use client";

import { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/lib/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  className,
  style,
  as: Tag = "div",
}: RevealProps) {
  const [ref, visible] = useReveal();

  return (
    // @ts-expect-error dynamic tag
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
