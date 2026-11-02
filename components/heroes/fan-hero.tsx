import Image from "next/image";
import type { CSSProperties } from "react";
import { topics } from "@/lib/topics";

const fan = [
  { rotate: "-12deg", drop: "9%" },
  { rotate: "-7deg", drop: "3%" },
  { rotate: "-2.5deg", drop: "0%" },
  { rotate: "2.5deg", drop: "0%" },
  { rotate: "7deg", drop: "3%" },
  { rotate: "12deg", drop: "9%" },
];

export function FanHero() {
  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-3 px-4 pt-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-5 lg:pt-7">
        <h1 className="max-w-[52rem] text-[clamp(2.5rem,min(5.2vw,9.5svh),5rem)] leading-[1.04] font-semibold tracking-[-0.025em]">
          Her ay yeni bir bebek, binlerce yeni soru.
        </h1>
        <div className="shrink-0 lg:max-w-[22rem] lg:pb-2">
          <p className="text-lg leading-snug text-ink/80 [@media(max-height:700px)]:hidden">
            Uyku, beslenme, gelişim, doktorlar, aileler ve yapay zekâ asistanı bir arada.
          </p>
          <a
            href="#"
            className="mt-3 inline-block rounded-2xl bg-ink px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Hemen başlayın
          </a>
        </div>
      </div>

      <ul className="flex min-h-0 flex-1 items-end justify-center pt-6">
        {topics.map((topic, index) => (
          <li
            key={topic.label}
            className="fan-card relative -ml-[33vw] aspect-[3/5] w-[44vw] shrink-0 first:ml-0 hover:z-20 focus-within:z-20 sm:-ml-[10vw] sm:aspect-[3/4.2] sm:w-[24vw] lg:-ml-[5.5vw] lg:w-[min(20vw,44svh)]"
            style={{ "--fan-rotate": fan[index].rotate, "--fan-drop": fan[index].drop } as CSSProperties}
          >
            <a
              href={topic.href}
              aria-label={`${topic.label}: ${topic.description}`}
              className="block size-full rounded-[1.5rem] bg-white p-[5px] shadow-soft lg:rounded-[2rem] lg:p-2"
            >
              <span className="relative block size-full overflow-hidden rounded-[1.2rem] lg:rounded-[1.5rem]">
                <Image
                  src={topic.photo}
                  alt={topic.photoAlt}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 20vw, 44vw"
                  className="object-cover"
                />
              </span>
              <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white py-0.5 pr-2.5 pl-1 text-xs font-semibold shadow-soft lg:top-5 lg:left-5 lg:gap-2 lg:py-1 lg:pr-3.5 lg:pl-1.5 lg:text-[0.9375rem]">
                <Image src={topic.icon} alt="" width={40} height={40} className="size-6 lg:size-8" />
                <span className="hidden sm:inline">{topic.label}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
