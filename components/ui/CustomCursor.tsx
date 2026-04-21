"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dotRef.current || !ringRef.current) return;
    gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.25, ease: "power2.out" });
  }, []);

  useEffect(() => {
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    window.addEventListener("mousemove", onMouseMove);

    const handleEnter = () => {
      gsap.to(ring, { scale: 2, borderColor: "rgba(0, 245, 255, 0.5)", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(255, 255, 255, 0.25)", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial binding
    document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, [onMouseMove]);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: "fixed", top: -4, left: -4,
          width: 8, height: 8,
          backgroundColor: "#00F5FF",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: "fixed", top: -20, left: -20,
          width: 40, height: 40,
          border: "1.5px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
    </>
  );
}
