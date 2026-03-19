"use client";
// components/ui/FloatingPetals.tsx
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
  opacity: number;
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${12 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 15}s`,
      size: `${8 + Math.random() * 10}px`,
      opacity: 0.1 + Math.random() * 0.25,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: petal.left,
            top: "-20px",
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            animationIterationCount: "infinite",
          }}
        >
          {/* Leaf shape */}
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 20 20"
            style={{ opacity: petal.opacity }}
          >
            <ellipse cx="10" cy="10" rx="4" ry="9" fill="#2d8653" transform="rotate(30 10 10)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
