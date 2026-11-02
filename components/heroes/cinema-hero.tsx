import Image from "next/image";
import { LogoPlaceholder } from "@/components/logo-placeholder";
import { MobileMenu } from "@/components/mobile-menu";
import { allTopics } from "@/lib/topics";

const ages = ["0–3 ay", "4–6 ay", "7–12 ay", "1–2 yaş", "2–3 yaş"];

export function CinemaHeader() {
  return (
    <header className="relative z-20 flex shrink-0 items-center justify-between px-4 py-3 text-white lg:px-10 lg:py-6">
      <LogoPlaceholder />
      <nav aria-label="Ana menü" className="hidden lg:block">
        <ul className="flex gap-7 text-[0.9375rem] font-light">
          {allTopics.map((topic) => (
            <li key={topic.label}>
              <a href={topic.href} className="opacity-80 transition-opacity hover:opacity-100">
                {topic.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="#"
        className="hidden text-[0.9375rem] font-light underline underline-offset-[6px] lg:block"
      >
        Giriş yap
      </a>
      <MobileMenu buttonClassName="-mr-2 text-white" />
    </header>
  );
}

// Fotoğraf geçici, Pexels: 27176211.
export function CinemaHero() {
  return (
    <section className="flex min-h-0 flex-1 flex-col justify-end text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/pexels-27176211.jpg"
          alt="Annesinin havaya kaldırdığı, gülen bebek"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[44%_50%] lg:object-[58%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.45)_0%,rgb(0_0_0/0)_22%,rgb(0_0_0/0)_42%,rgb(0_0_0/0.62)_72%,rgb(0_0_0/0.9)_100%)]" />
      </div>

      <div className="relative px-4 lg:px-10">
        <h1 className="max-w-[58rem] text-[clamp(2.75rem,min(6.2vw,11svh),6.75rem)] leading-[1.02] font-light tracking-[-0.035em]">
          Hayatınızın en güzel karmaşasına hoş geldiniz.
        </h1>
      </div>

      <div className="relative mt-5 grid grid-cols-5 border-t border-white/35 lg:mt-8 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
        <p
          id="cinema-age"
          className="col-span-5 px-4 py-2.5 text-[0.9375rem] font-light lg:col-span-1 lg:px-10 lg:py-5 lg:text-base"
        >
          Bebeğiniz kaç aylık?
        </p>
        <ul aria-labelledby="cinema-age" className="contents">
          {ages.map((age) => (
            <li key={age} className="border-t border-l border-white/35 first:border-l-0 lg:border-t-0 lg:first:border-l">
              <a
                href="#"
                className="block py-3 text-center text-[0.8125rem] whitespace-nowrap transition-colors hover:bg-white hover:text-black sm:text-base lg:py-5 lg:text-lg lg:font-light"
              >
                {age}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
