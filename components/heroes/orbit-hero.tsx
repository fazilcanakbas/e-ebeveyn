"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { assistant } from "@/lib/topics";
import { HeadlineWord } from "../headline-word";
import { OrbitStage } from "../orbit-stage";
import { useTopicCycle } from "../use-topic-cycle";

export function OrbitHero({ layout }: { layout: "center" | "split" }) {
  const { active, topic, wordTopic, hold, release } = useTopicCycle();
  const split = layout === "split";

  return (
    <section
      className={`relative flex min-h-0 flex-1 flex-col overflow-hidden ${
        split ? "lg:grid lg:grid-cols-[1fr_1.08fr]" : ""
      }`}
    >
      <div
        className={`relative z-10 w-full px-4 pt-5 text-center lg:pt-6 ${
          split
            ? "lg:mx-0 lg:self-center lg:pt-0 lg:pb-[6svh] lg:pl-[max(2rem,calc((100vw-1320px)/2+1.25rem))] lg:text-left"
            : "mx-auto max-w-[76rem]"
        }`}
      >
        <h1
          className={`font-semibold tracking-[-0.022em] ${
            split
              ? "text-[clamp(2.5rem,min(4.9vw,9.5svh),4.75rem)] leading-[1.16]"
              : "text-[clamp(2.5rem,min(5vw,8.6svh),4.5rem)] leading-[1.14]"
          }`}
        >
          Bebeğinizin{" "}
          {split && <br className="hidden lg:block" />}
          <HeadlineWord topic={wordTopic} /> için <br className="hidden sm:block" />
          her şey burada.
        </h1>
        <p
          className={`mt-3 text-lg leading-snug text-ink/75 [@media(max-height:700px)]:hidden ${
            split ? "mx-auto max-w-[32rem] lg:mx-0 lg:mt-5 lg:text-xl" : "mx-auto max-w-[52rem]"
          }`}
        >
          Uykudan beslenmeye, doktorlardan ebeveyn forumlarına: ihtiyacınız olan her şey tek
          platformda.
        </p>
        <a
          href="#"
          className={`mt-4 inline-block rounded-2xl bg-ink px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5 ${
            split ? "lg:mt-7" : ""
          }`}
        >
          Hemen başlayın
        </a>
      </div>

      <OrbitStage
        layout={layout}
        active={active}
        hold={hold}
        release={release}
        className={`mt-3 lg:mt-1 ${split ? "lg:mt-0 lg:h-full" : ""}`}
      >
        <a
          href={assistant.href}
          className="absolute bottom-3 left-1/2 z-20 flex w-[min(90%,27rem)] -translate-x-1/2 items-center gap-2.5 rounded-3xl bg-white py-1.5 pr-4 pl-2 shadow-soft transition-transform hover:-translate-y-0.5 lg:bottom-4"
        >
          <Image src={assistant.icon} alt="" width={48} height={48} className="size-10 shrink-0" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-xs font-semibold" style={{ color: assistant.color }}>
              {assistant.label}&apos;a sorun
            </span>
            <span key={topic.label} className="anim-word block truncate text-[0.9375rem] font-medium">
              {topic.question}
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
        </a>
      </OrbitStage>
    </section>
  );
}
