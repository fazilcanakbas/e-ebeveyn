"use client";

import { useEffect, useRef } from "react";
import type { MainTopic } from "@/lib/topics";
import { wordTopics } from "./use-topic-cycle";

export function HeadlineWord({ topic }: { topic: MainTopic }) {
  const box = useRef<HTMLSpanElement>(null);
  const sizers = useRef<Record<string, HTMLSpanElement | null>>({});

  // Genişlik em cinsinden tutulur; yazı boyutu ekranla değişse de kelimeye oturur.
  useEffect(() => {
    const fit = () => {
      const sizer = sizers.current[topic.label];
      if (!box.current || !sizer) return;
      const fontSize = parseFloat(getComputedStyle(box.current).fontSize);
      box.current.style.width = `${sizer.getBoundingClientRect().width / fontSize}em`;
    };
    fit();
    document.fonts.ready.then(fit);
  }, [topic]);

  return (
    <>
      <span className="sr-only">{wordTopics.map((item) => item.word).join(", ")} </span>
      <span
        aria-hidden="true"
        className="relative inline-block rounded-[0.28em] bg-white px-[0.22em] pb-[0.06em] shadow-soft"
      >
        <span
          ref={box}
          className="inline-block overflow-x-clip whitespace-nowrap transition-[width] duration-300 ease-out"
        >
          <span key={topic.label} className="anim-word inline-block" style={{ color: topic.color }}>
            {topic.word}
          </span>
        </span>
        {wordTopics.map((item) => (
          <span
            key={item.label}
            ref={(node) => {
              sizers.current[item.label] = node;
            }}
            className="invisible absolute top-0 left-0 whitespace-nowrap"
          >
            {item.word}
          </span>
        ))}
      </span>
    </>
  );
}
