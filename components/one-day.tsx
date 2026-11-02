"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { assistant, topics, type Topic } from "@/lib/topics";

const [sleep, feeding, growth, play, doctors, forum] = topics;

type Scene = {
  minutes: number;
  time: string;
  question: string;
  body: string;
  links: Topic[];
  photo: string;
  photoAlt: string;
  position: string;
  mobilePosition: string;
  mirrored: boolean;
  shade: number;
};

// Fotoğraflar geçici, Pexels: 4669022, 3933039, 7653108, 27176791.
// Gece sahnesinin dakikası bir sonraki güne taşar: 27 × 60 + 12 = 03:12.
const scenes: Scene[] = [
  {
    minutes: 7 * 60 + 40,
    time: "07:40",
    question: "Gece nasıl geçti?",
    body: "Uykuyu ve ilk öğünü iki dokunuşla kaydedin, gününüz ona göre şekillensin.",
    links: [sleep, feeding],
    photo: "/images/stories/sabah.jpg",
    photoAlt: "Mama sandalyesinde kahkaha atan bebek",
    position: "50% 30%",
    mobilePosition: "64% 50%",
    mirrored: false,
    shade: 0,
  },
  {
    minutes: 11 * 60 + 15,
    time: "11:15",
    question: "Bugün ne oynasak?",
    body: "Bu ay neler değişiyor, yaşına uygun oyunlar neler? Hepsi bebeğinizin dönemine göre.",
    links: [growth, play],
    photo: "/images/stages/2-3-yas.jpg",
    photoAlt: "Ahşap bloklarla oynayan küçük çocuk",
    position: "50% 35%",
    mobilePosition: "46% 40%",
    mirrored: false,
    shade: 0,
  },
  {
    minutes: 14 * 60 + 30,
    time: "14:30",
    question: "Ateşi çıktı, doktora gitmeli miyim?",
    body: "Bazı sorular doktora sorulur. Çocuk doktorlarını bulun, aklınızdakileri not alın.",
    links: [doctors],
    photo: "/images/stories/uzmanlar.jpg",
    photoAlt: "Çocuğu stetoskopla muayene eden doktor",
    position: "50% 30%",
    mobilePosition: "48% 50%",
    mirrored: false,
    shade: 0.08,
  },
  {
    minutes: 27 * 60 + 12,
    time: "03:12",
    question: "Bu gece uyanık olan tek siz değilsiniz.",
    body: "Aynı saatte uyanık ailelerle konuşun, aklınıza takılanı asistana sorun.",
    links: [forum, assistant],
    photo: "/images/pexels-27176791.jpg",
    photoAlt: "Yenidoğan bebeğine sarılmış, gözleri kapalı anne",
    position: "50% 26%",
    mobilePosition: "47% 50%",
    mirrored: false,
    shade: 0.38,
  },
];

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

// Her sahnede biraz durur, geçişi aradaki kısa bölümde yapar.
function sceneAt(progress: number) {
  const position = progress * (scenes.length - 1);
  const index = Math.min(scenes.length - 2, Math.floor(position));
  const raw = clamp((position - index - 0.25) / 0.5);
  return index + raw * raw * (3 - 2 * raw);
}

export function OneDay() {
  const track = useRef<HTMLElement>(null);
  const clock = useRef<HTMLParagraphElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLSpanElement>(null);
  const copies = useRef<(HTMLDivElement | null)[]>([]);
  const photos = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const box = track.current?.getBoundingClientRect();
      if (!box) return;

      const progress = clamp(-box.top / Math.max(1, box.height - window.innerHeight));
      const value = sceneAt(progress);
      const index = Math.min(scenes.length - 2, Math.floor(value));
      const amount = value - index;
      const from = scenes[index];
      const to = scenes[index + 1];

      const minutes = Math.round(mix(from.minutes, to.minutes, amount)) % 1440;
      const digits = `${String(Math.floor(minutes / 60)).padStart(2, "0")}${String(minutes % 60).padStart(2, "0")}`;
      clock.current?.querySelectorAll<HTMLElement>("[data-digit]").forEach((cell, position) => {
        cell.textContent = digits[position];
      });

      if (shade.current) shade.current.style.opacity = String(mix(from.shade, to.shade, amount));
      if (progressBar.current) {
        progressBar.current.style.transform = `scaleX(${value / (scenes.length - 1)})`;
      }

      scenes.forEach((scene, sceneIndex) => {
        const distance = Math.abs(value - sceneIndex);
        const copy = copies.current[sceneIndex];
        if (copy) {
          copy.style.opacity = String(clamp(1 - distance * 2.6));
          copy.style.transform = calm ? "" : `translateY(${(sceneIndex - value) * 2.5}rem)`;
        }
        const photo = photos.current[sceneIndex];
        if (photo) {
          photo.style.opacity = String(clamp(1 - distance));
          // Fotoğraf kendi sahnesine yaklaşırken çok hafif yakınlaşır.
          photo.style.transform = calm ? "" : `scale(${1.08 - 0.08 * clamp(1 - distance)})`;
        }
      });

      setActive(Math.round(value));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const goTo = (index: number) => {
    const box = track.current?.getBoundingClientRect();
    if (!box) return;
    const distance = box.height - window.innerHeight;
    window.scrollTo({ top: window.scrollY + box.top + (index / (scenes.length - 1)) * distance });
  };

  return (
    <section ref={track} aria-label="Ebeveynin bir günü" className="relative h-[420svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-end overflow-hidden bg-[#14100d] text-white">
        {scenes.map((scene, index) => (
          <div
            key={scene.time}
            ref={(node) => {
              photos.current[index] = node;
            }}
            className="absolute inset-0"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <Image
              src={scene.photo}
              alt={index === active ? scene.photoAlt : ""}
              fill
              sizes="100vw"
              className={`object-cover [object-position:var(--position-mobile)] lg:[object-position:var(--position)] ${
                scene.mirrored ? "lg:-scale-x-100" : ""
              }`}
              style={
                {
                  "--position": scene.position,
                  "--position-mobile": scene.mobilePosition,
                } as CSSProperties
              }
            />
          </div>
        ))}

        <div ref={shade} aria-hidden="true" className="absolute inset-0 bg-[#060a1c]" style={{ opacity: 0 }} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0)_28%,rgb(0_0_0/0.82)_100%)] lg:bg-[linear-gradient(90deg,rgb(0_0_0/0.62)_0%,rgb(0_0_0/0.28)_46%,rgb(0_0_0/0)_72%),linear-gradient(180deg,rgb(0_0_0/0)_58%,rgb(0_0_0/0.55)_100%)]"
        />

        <div className="relative px-4 lg:px-8">
          <p
            ref={clock}
            aria-hidden="true"
            className="flex text-[clamp(4.5rem,min(13vw,24svh),13rem)] leading-[0.92] font-extralight tracking-[-0.02em]"
          >
            {scenes[0].time.split("").map((char, index) =>
              char === ":" ? (
                <span key={index} className="w-[0.3em] text-center">
                  :
                </span>
              ) : (
                <span key={index} data-digit className="inline-block w-[0.6em] text-center">
                  {char}
                </span>
              ),
            )}
          </p>

          <div className="mt-2 grid lg:mt-3">
            {scenes.map((scene, index) => (
              <div
                key={scene.time}
                ref={(node) => {
                  copies.current[index] = node;
                }}
                inert={index !== active}
                className="col-start-1 row-start-1 self-end"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <h3 className="max-w-[18ch] text-[clamp(2rem,min(4.4vw,8.5svh),4.5rem)] leading-[1.04] font-normal tracking-[-0.025em]">
                  <span className="sr-only">Saat {scene.time}. </span>
                  {scene.question}
                </h3>
                <div className="mt-3 flex flex-col gap-x-8 gap-y-2 lg:mt-4 lg:flex-row lg:items-baseline">
                  <p className="max-w-[32rem] text-base leading-snug text-white/85 lg:text-lg">{scene.body}</p>
                  <ul className="flex shrink-0 gap-5">
                    {scene.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 font-semibold whitespace-nowrap underline decoration-1 underline-offset-[6px] lg:text-lg"
                        >
                          {link.label}
                          <ArrowRight
                            className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <nav aria-label="Günün saatleri" className="relative mt-5 px-4 pb-3 lg:mt-7 lg:px-8 lg:pb-5">
          <div className="relative h-px bg-white/30">
            <span
              ref={progressBar}
              className="absolute inset-0 origin-left bg-white"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <ul className="mt-1.5 flex justify-between">
            {scenes.map((scene, index) => (
              <li key={scene.time}>
                <button
                  type="button"
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={`cursor-pointer py-1 text-sm transition-opacity duration-500 lg:text-base ${
                    index === active ? "font-semibold" : "opacity-65 hover:opacity-100"
                  }`}
                >
                  {scene.time}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
