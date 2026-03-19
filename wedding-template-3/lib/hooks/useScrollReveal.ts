"use client";
import { useRef, useState, useEffect, RefObject } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function useParallax(speed = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top * speed;
      (el.firstElementChild as HTMLElement | null)?.style.setProperty(
        "transform", `translateY(${offset}px)`
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);
  return ref;
}
