"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { assistant, topics, type Topic } from "@/lib/topics";
import { useReveal } from "./use-reveal";

const [sleep, feeding, growth, play, doctors, forum] = topics;

type Story = {
  eyebrow: string;
  title: string;
  body: string;
  action: { label: string; href: string };
  rows: Topic[];
  photo: string;
  photoAlt: string;
  photoPosition: string;
  photoRight: boolean;
  cream: boolean;
};

// Fotoğraflar geçici, Pexels: 7946745, 7653108, 11369312.
const stories: Story[] = [
  {
    eyebrow: "Takip",
    title: "Her günü tek yerde tutun.",
    body: "Uykuyu ve öğünleri kaydedin, bu ay neler değiştiğini görün, yaşına uygun oyunlar bulun.",
    action: { label: "Takibe başlayın", href: "/uye-ol" },
    rows: [sleep, feeding, growth, play],
    photo: "/images/stories/takip.jpg",
    photoAlt: "Mama sandalyesindeki bebeğe kaşıkla yemek veren ebeveyn",
    photoPosition: "32% 50%",
    photoRight: true,
    cream: false,
  },
  {
    eyebrow: "Uzmanlar",
    title: "Bazı sorular doktora sorulur.",
    body: "Çocuk doktorlarını bulun, kontrole gitmeden önce aklınızdakileri not alın.",
    action: { label: doctors.label, href: doctors.href },
    rows: [],
    photo: "/images/stories/uzmanlar.jpg",
    photoAlt: "Çocuğu stetoskopla muayene eden doktor",
    photoPosition: "86% 50%",
    photoRight: false,
    cream: true,
  },
  {
    eyebrow: "Aileler",
    title: "Bu gece uyanık olan tek siz değilsiniz.",
    body: "Aynı dönemden geçen ailelerle konuşun. Küçük sorular için asistan da yanınızda; tıbbi tavsiyenin yerini tutmaz.",
    action: { label: "Foruma katılın", href: forum.href },
    rows: [forum, assistant],
    photo: "/images/stories/aileler.jpg",
    photoAlt: "Yatakta bebekleriyle uzanan, gülümseyen anne ve baba",
    photoPosition: "60% 50%",
    photoRight: true,
    cream: false,
  },
];

function StorySection({ story }: { story: Story }) {
  const section = useReveal<HTMLElement>(0.25);

  return (
    <section
      ref={section}
      data-in="false"
      className={`story grid lg:min-h-[88svh] lg:grid-cols-2 ${story.cream ? "bg-[#f8f3ec]" : "bg-white"}`}
    >
      <div
        className={`story-photo relative aspect-[4/3] overflow-hidden lg:aspect-auto ${
          story.photoRight ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={story.photo}
          alt={story.photoAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="story-image object-cover"
          style={{ objectPosition: story.photoPosition }}
        />
      </div>

      <div className="story-text flex flex-col justify-center px-4 py-10 lg:px-[6vw] lg:py-16">
        <p className="font-medium text-cobalt lg:text-lg">{story.eyebrow}</p>
        <h2 className="mt-2 max-w-[14ch] text-[clamp(2.5rem,4.6vw,4.75rem)] leading-[1.04] font-normal tracking-[-0.025em]">
          {story.title}
        </h2>
        <p className="mt-5 max-w-[32rem] text-lg leading-snug text-ink/75 lg:text-xl">{story.body}</p>

        {story.rows.length > 0 && (
          <ul className="mt-6 max-w-[32rem] border-t border-ink/15">
            {story.rows.map((row) => (
              <li key={row.label} className="border-b border-ink/15">
                <a
                  href={row.href}
                  className="group flex items-baseline justify-between gap-4 py-3 transition-colors duration-300 hover:text-cobalt"
                >
                  <span className="text-lg font-medium">{row.label}</span>
                  <span className="text-[0.9375rem] text-ink/60 transition-colors duration-300 group-hover:text-cobalt">
                    {row.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7">
          <a
            href={story.action.href}
            className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-ink"
          >
            {story.action.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function StorySections() {
  return (
    <>
      {stories.map((story) => (
        <StorySection key={story.eyebrow} story={story} />
      ))}
    </>
  );
}
