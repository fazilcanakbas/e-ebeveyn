import Image from "next/image";
import type { ReactNode } from "react";
import { assistant, topics, type Topic } from "@/lib/topics";

function Tile({
  topic,
  className,
  children,
}: {
  topic: Topic;
  className: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={topic.href}
      className={`group relative block min-h-0 overflow-hidden rounded-[1.5rem] p-3 lg:rounded-[1.75rem] lg:p-5 ${className}`}
      style={{ background: topic.tint }}
    >
      <span className="block text-base leading-tight font-semibold tracking-[-0.01em] lg:text-2xl">
        {topic.label}
      </span>
      <span className="mt-0.5 hidden text-sm text-ink/70 sm:block lg:text-[0.9375rem]">
        {topic.description}
      </span>
      {children}
      <Image
        src={topic.icon}
        alt=""
        width={256}
        height={256}
        sizes="(min-width: 1024px) 200px, 96px"
        className="absolute -right-1 -bottom-1.5 size-[4.5rem] drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 sm:size-24 lg:right-0 lg:-bottom-1 lg:size-[clamp(5.5rem,17svh,10rem)]"
      />
    </a>
  );
}

export function BentoHero() {
  const [sleep, feeding, growth, play, doctors, forum] = topics;

  return (
    <section className="mx-auto flex min-h-0 w-full max-w-[1368px] flex-1 flex-col px-3 pt-3 pb-3 sm:px-6 lg:pt-4 lg:pb-4">
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-[auto_repeat(5,minmax(0,1fr))] gap-2 lg:grid-cols-12 lg:grid-rows-6 lg:gap-3">
        <div className="col-span-2 flex flex-col justify-between gap-3 rounded-[1.5rem] bg-ink p-4 text-white lg:col-span-5 lg:row-span-4 lg:rounded-[2rem] lg:p-8">
          <h1 className="text-[clamp(2.25rem,min(4.5vw,8.6svh),4.5rem)] leading-[1.05] font-semibold tracking-[-0.025em]">
            Ebeveynliğin tüm soruları, tek yerde.
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
            <p className="max-w-[20rem] text-base leading-snug text-white/75 lg:text-lg [@media(max-height:700px)]:hidden">
              Bebeğinizin ilk günlerinden ilk adımlarına, her dönemde yanınızda.
            </p>
            <a
              href="#"
              className="rounded-2xl bg-coral px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Hemen başlayın
            </a>
          </div>
        </div>

        <div className="relative col-span-2 min-h-0 overflow-hidden rounded-[1.5rem] lg:col-span-3 lg:row-span-4 lg:rounded-[1.75rem]">
          <Image
            src="/images/pexels-10935456.jpg"
            alt="Annesinin kucağında gülümseyen bebek"
            fill
            preload
            sizes="(min-width: 1024px) 26vw, 100vw"
            className="object-cover object-[50%_45%]"
          />
        </div>

        <Tile topic={sleep} className="lg:col-span-2 lg:row-span-2" />
        <Tile topic={feeding} className="lg:col-span-2 lg:row-span-2" />
        <Tile topic={assistant} className="col-span-2 lg:col-span-4 lg:row-span-2">
          <span className="absolute bottom-3 left-3 max-w-[60%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm font-medium shadow-soft lg:bottom-5 lg:left-5 lg:text-base">
            {topics[0].question}
          </span>
        </Tile>
        <Tile topic={growth} className="lg:col-span-3 lg:row-span-2" />
        <Tile topic={play} className="lg:col-span-3 lg:row-span-2" />
        <Tile topic={doctors} className="lg:col-span-3 lg:row-span-2" />
        <Tile topic={forum} className="lg:col-span-3 lg:row-span-2" />
      </div>
    </section>
  );
}
