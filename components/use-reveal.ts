"use client";

import { useEffect, useRef } from "react";

// Öğe ekrana girince data-in="true" yazar; giriş animasyonu CSS'te bu değere bağlıdır.
export function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.in = "true";
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
