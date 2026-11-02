"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { topics } from "@/lib/topics";

type Spot = { left: string; bottom: string };

// Ana fotoğraf geçici, Pexels: 10935456.
const spots: Record<"center" | "split", Spot[]> = {
  center: [
    { left: "10%", bottom: "9%" },
    { left: "18%", bottom: "42%" },
    { left: "29%", bottom: "71%" },
    { left: "71%", bottom: "71%" },
    { left: "82%", bottom: "42%" },
    { left: "90%", bottom: "9%" },
  ],
  split: [
    { left: "10%", bottom: "12%" },
    { left: "13%", bottom: "44%" },
    { left: "19%", bottom: "72%" },
    { left: "81%", bottom: "72%" },
    { left: "87%", bottom: "44%" },
    { left: "90%", bottom: "12%" },
  ],
};

const mobileSpots: Spot[] = [
  { left: "11%", bottom: "20%" },
  { left: "13%", bottom: "48%" },
  { left: "25%", bottom: "75%" },
  { left: "75%", bottom: "75%" },
  { left: "87%", bottom: "48%" },
  { left: "89%", bottom: "20%" },
];

const discs = {
  center: ["w-[210vw] lg:w-[92vw]", "w-[150vw] lg:w-[66vw]", "w-[100vw] lg:w-[44vw]"],
  split: ["w-[210vw] lg:w-[62vw]", "w-[150vw] lg:w-[46vw]", "w-[100vw] lg:w-[31vw]"],
};

type OrbitStageProps = {
  layout: "center" | "split";
  active: number;
  hold: (index: number) => void;
  release: () => void;
  className: string;
  children: ReactNode;
};

export function OrbitStage({
  layout,
  active,
  hold,
  release,
  className,
  children,
}: OrbitStageProps) {
  return (
    <div className={`relative min-h-0 flex-1 ${className}`}>
      <div aria-hidden="true">
        {discs[layout].map((size) => (
          <span
            key={size}
            className={`absolute bottom-0 left-1/2 aspect-square -translate-x-1/2 translate-y-1/2 rounded-full bg-white/30 ${size}`}
          />
        ))}
      </div>

      <div
        className={`absolute bottom-0 left-1/2 h-[94%] w-[54%] -translate-x-1/2 overflow-hidden rounded-t-full shadow-soft sm:w-[42%] ${
          layout === "split"
            ? "lg:h-[80%] lg:w-[52%]"
            : "lg:h-[98%] lg:w-auto lg:aspect-[1/1.02]"
        }`}
      >
        <Image
          src="/images/pexels-10935456.jpg"
          alt="Annesinin kucağında gülümseyen bebek"
          fill
          preload
          sizes="(min-width: 1024px) 560px, 60vw"
          className="object-cover object-[50%_65%]"
        />
      </div>

      <ul>
        {topics.map((item, index) => {
          const spot = spots[layout][index];
          const mobileSpot = mobileSpots[index];

          return (
            <li
              key={item.label}
              className="absolute bottom-(--spot-y-m) left-(--spot-x-m) z-10 -translate-x-1/2 lg:bottom-(--spot-y) lg:left-(--spot-x)"
              style={
                {
                  "--spot-x": spot.left,
                  "--spot-y": spot.bottom,
                  "--spot-x-m": mobileSpot.left,
                  "--spot-y-m": mobileSpot.bottom,
                } as CSSProperties
              }
            >
              <a
                href={item.href}
                onMouseEnter={() => hold(index)}
                onMouseLeave={release}
                onFocus={() => hold(index)}
                onBlur={release}
                className="flex flex-col items-center gap-1"
              >
                <span className="anim-float block" style={{ animationDelay: `${index * -0.9}s` }}>
                  <Image
                    src={item.icon}
                    alt=""
                    width={112}
                    height={112}
                    className={`size-12 drop-shadow-lg transition-transform duration-300 sm:size-20 lg:size-[clamp(3.5rem,10.5svh,6rem)] ${
                      index === active ? "scale-125" : ""
                    }`}
                  />
                </span>
                <span
                  className="rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap shadow-soft transition-colors sm:px-3 sm:py-1 sm:text-sm"
                  style={index === active ? { color: item.color } : undefined}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {children}
    </div>
  );
}
