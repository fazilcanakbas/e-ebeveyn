"use client";

import { useEffect, useState } from "react";
import { topics } from "@/lib/topics";

export const wordTopics = topics.filter((topic) => topic.word);

// Aktif konuyu sırayla gezer; kullanıcı bir konunun üzerindeyken bekler.
export function useTopicCycle() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [wordTopic, setWordTopic] = useState(wordTopics[0]);

  const activate = (index: number) => {
    setActive(index);
    if (topics[index].word) setWordTopic(topics[index]);
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      const next = (active + 1) % topics.length;
      setActive(next);
      if (topics[next].word) setWordTopic(topics[next]);
    }, 2400);
    return () => clearInterval(timer);
  }, [active, paused]);

  return {
    active,
    topic: topics[active],
    wordTopic,
    hold: (index: number) => {
      setPaused(true);
      activate(index);
    },
    release: () => setPaused(false),
  };
}
