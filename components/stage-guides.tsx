"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ageStages } from "@/lib/age-stages";

const tilts = ["-3deg", "2deg", "-1.5deg", "2.5deg", "-2deg"];

export function StageGuides() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const hoverTarget = useRef<number | null>(null);

  const cancelQueued = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTarget.current = null;
  };

  // Fare kartların üzerinden geçerken her kart tek tek açılmasın; üzerinde durduğu açılır.
  const queueActive = (index: number) => {
    if (index === active) {
      cancelQueued();
      return;
    }
    if (hoverTarget.current === index) return;
    cancelQueued();
    hoverTarget.current = index;
    hoverTimer.current = window.setTimeout(() => {
      hoverTarget.current = null;
      setActive(index);
    }, 140);
  };

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  useEffect(() => {
    const node = list.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.in = "true";
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(node);

    // Hero'daki yaş seçeneği bu bölüme atlayıp ilgili kartı açar.
    const onHash = () => {
      const index = ageStages.findIndex((stage) => `#donem-${stage.id}` === window.location.hash);
      if (index >= 0) setActive(index);
    };
    window.addEventListener("hashchange", onHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <section className="flex-1 px-4 pt-[5svh] pb-8 lg:px-8 lg:pb-12">
      <h2 className="text-center text-[clamp(2rem,4vw,3.25rem)] leading-tight font-normal tracking-[-0.02em]">
        Her dönem için ayrı bir rehber
      </h2>
      <p className="mx-auto mt-2 max-w-[42rem] text-center text-lg leading-snug text-ink/70">
        Uyku, beslenme ve gelişim: bebeğiniz büyüdükçe rehberiniz de onunla değişir.
      </p>

      <ul
        ref={list}
        data-in="false"
        onMouseLeave={cancelQueued}
        className="stage-list mt-6 flex flex-col gap-2 lg:mt-8 lg:h-[min(74svh,40rem)] lg:flex-row lg:gap-3"
      >
        {ageStages.map((stage, index) => {
          const isActive = index === active;
          return (
            <li
              key={stage.id}
              id={`donem-${stage.id}`}
              data-active={isActive}
              // Sayfa kayarken duran farenin altına gelen kart seçimi değiştirmesin.
              onMouseMove={(event) => {
                if (event.movementX !== 0 || event.movementY !== 0) queueActive(index);
              }}
              className="stage-card relative h-20 scroll-mt-6 overflow-hidden rounded-[1.75rem] bg-[#2a201b] text-white data-[active=true]:h-[27rem] lg:h-auto lg:min-w-0 lg:flex-1 lg:data-[active=true]:h-auto lg:data-[active=true]:flex-[3.4]"
              style={
                {
                  "--stage-delay": `${index * 90}ms`,
                  "--stage-tilt": tilts[index],
                } as CSSProperties
              }
            >
              <Image
                src={stage.photo}
                alt={stage.photoAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                style={{ objectPosition: stage.photoPosition }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.42)_0%,rgb(0_0_0/0.08)_34%,rgb(0_0_0/0.28)_50%,rgb(0_0_0/0.86)_100%)]"
              />

              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`donem-detay-${stage.id}`}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="absolute inset-0 z-10 flex cursor-pointer items-start p-5 text-left text-2xl font-medium tracking-[-0.015em] whitespace-nowrap lg:p-6 lg:text-3xl"
              >
                {stage.label}
              </button>

              <div
                id={`donem-detay-${stage.id}`}
                className="stage-detail absolute inset-x-0 bottom-0 z-20 w-full p-5 lg:w-[23rem] lg:p-6"
              >
                <p className="text-[1.75rem] leading-[1.08] tracking-[-0.02em] lg:text-[2.25rem]">
                  {stage.headline}
                </p>
                <ul className="mt-3 space-y-1 lg:mt-4">
                  {stage.facts.map((fact) => (
                    <li key={fact.topic} className="flex gap-2 text-[0.9375rem] leading-snug lg:text-base">
                      <span className="w-[4.75rem] shrink-0 text-white/70">{fact.topic}</span>
                      <span className="font-medium">{fact.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1c3cff] px-5 py-3 font-semibold transition-colors hover:bg-white hover:text-[#1c3cff]"
                >
                  {stage.label} rehberi
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-center text-xs text-ink/60">
        Taslak içerik. CDC, AASM ve DSÖ verilerine dayanır; tıbbi tavsiye değildir. Her çocuk kendi
        hızında gelişir.
      </p>
    </section>
  );
}
