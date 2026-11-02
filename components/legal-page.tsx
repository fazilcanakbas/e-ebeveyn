import type { ReactNode } from "react";

export type LegalSection = { id: string; title: string; body: ReactNode };

// Doldurulması gereken şirket bilgisi; yayından önce metinde kalmamalı.
export function Blank({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-cobalt/10 px-1 text-cobalt">[{children}]</mark>;
}

type LegalPageProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <div>
      <h1 className="text-[clamp(3rem,7vw,7rem)] leading-[1.02] tracking-[-0.025em]">{title}</h1>
      <p className="mt-5 max-w-[42rem] text-lg leading-snug text-ink/70 lg:mt-7 lg:text-xl">{intro}</p>
      <p className="mt-6 max-w-[42rem] rounded-2xl bg-ink/5 px-4 py-3 text-sm font-medium">
        Taslak metin. Yayından önce hukuk danışmanının onayı gerekir; <Blank>köşeli parantezli</Blank> alanlar
        doldurulacak.
      </p>

      <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
        <nav aria-label="İçindekiler" className="hidden lg:col-span-4 lg:block">
          <ol className="sticky top-28 space-y-2 text-ink/60">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="transition-colors duration-300 hover:text-ink">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12 lg:col-span-7 lg:col-start-6 lg:space-y-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20 lg:scroll-mt-28">
              <h2 className="text-[clamp(1.625rem,2.4vw,2.25rem)] leading-tight tracking-[-0.02em]">{section.title}</h2>
              <div className="mt-3 space-y-3 text-[1.0625rem] leading-relaxed text-ink/80 [&_a]:text-cobalt [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
