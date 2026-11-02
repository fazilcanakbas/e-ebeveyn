"use client";

import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { assistant, topics } from "@/lib/topics";

// Tam ekran fotoğraf geçici, Pexels: 1108193.
export function AskHero() {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (draft.trim()) setSent(true);
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col justify-end">
      <div className="absolute inset-0 overflow-hidden lg:left-[20%]">
        <Image
          src="/images/pexels-1108193.jpg"
          alt="Yatağın üzerinde oturup kahkaha atan bebek"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[60%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.92)_0%,rgb(255_255_255/0.7)_38%,rgb(255_255_255/0)_62%)] lg:bg-[linear-gradient(90deg,rgb(255_255_255)_0%,rgb(255_255_255/0.6)_22%,rgb(255_255_255/0)_42%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1320px] flex-1 flex-col justify-between gap-4 px-4 pt-5 pb-14 lg:justify-end lg:gap-6 lg:px-5 lg:pt-6 lg:pb-8">
        <div>
          <h1 className="max-w-[44rem] text-[clamp(2.5rem,min(5.4vw,10svh),5.25rem)] leading-[1.03] font-semibold tracking-[-0.025em]">
            Aklınıza takılan <br className="hidden lg:block" />
            her şeyi sorun.
          </h1>
          <p className="mt-3 max-w-[30rem] text-lg leading-snug text-ink/80 [@media(max-height:700px)]:hidden">
            Yapay zekâ asistanı, doktorlar ve sizin gibi aileler. Gecenin üçünde bile.
          </p>
        </div>

        <div className="w-full max-w-[52rem]">
          <ul className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible">
            {topics.map((topic) => (
              <li key={topic.label} className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setDraft(topic.question);
                    setSent(false);
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-white py-1 pr-3.5 pl-1.5 text-sm font-semibold shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Image src={topic.icon} alt="" width={40} height={40} className="size-7" />
                  {topic.label}
                </button>
              </li>
            ))}
          </ul>
          <form
            onSubmit={submit}
            className="flex items-center gap-2 rounded-3xl bg-white py-2 pr-2 pl-2.5 shadow-soft lg:gap-3"
          >
            <Image src={assistant.icon} alt="" width={56} height={56} className="size-10 shrink-0 lg:size-12" />
            <label htmlFor="ask" className="sr-only">
              Asistana sorun
            </label>
            <input
              id="ask"
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                setSent(false);
              }}
              placeholder="Bebeğiniz hakkında ne sormak istersiniz?"
              className="min-w-0 flex-1 bg-transparent py-2 text-base font-medium outline-none placeholder:text-ink/55 lg:text-xl"
            />
            <button
              type="submit"
              aria-label="Gönder"
              className="grid size-11 shrink-0 place-items-center rounded-2xl bg-coral transition-transform hover:-translate-y-0.5 lg:size-13"
            >
              <ArrowUp className="size-5" aria-hidden="true" />
            </button>
          </form>
          {sent && (
            <p role="status" className="mt-2 rounded-xl bg-white/90 px-3 py-1.5 text-sm font-medium">
              Asistan henüz bağlı değil; bu bir tasarım önizlemesi.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
