"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/modules/parallax.module.css";

interface ParallaxImageProps {
  src: string;
  alt: string;
  height?: string;
  speed?: number;
  overlay?: string;
  children?: React.ReactNode;
}

export function ParallaxImage({
  src, alt, height = "70vh", speed = 0.35, overlay = "rgba(9,9,8,0.45)", children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      img.style.transform = `translateY(${(progress - 0.5) * speed * 100}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={styles.container} style={{ height }}>
      <div ref={imgRef} className={styles.imgWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={styles.img} />
      </div>
      <div className={styles.overlay} style={{ background: overlay }} />
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
