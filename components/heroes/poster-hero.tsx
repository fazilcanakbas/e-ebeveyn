import Image from "next/image";
import { LogoPlaceholder } from "@/components/logo-placeholder";
import { MobileMenu } from "@/components/mobile-menu";
import { allTopics } from "@/lib/topics";

const ages = ["0–3 ay", "4–6 ay", "7–12 ay", "1–2 yaş", "2–3 yaş"];

export function PosterHeader() {
  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center justify-between border-b-2 border-[#26090a] px-4 text-[#26090a] lg:h-16 lg:px-8">
      <LogoPlaceholder />
      <nav aria-label="Ana menü" className="hidden lg:block">
        <ul className="flex gap-6 font-semibold xl:gap-8">
          {allTopics.map((topic) => (
            <li key={topic.label}>
              <a
                href={topic.href}
                className="underline-offset-[6px] hover:underline hover:decoration-2"
              >
                {topic.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="#"
        className="hidden bg-[#26090a] px-5 py-2.5 font-semibold text-[#fff4e0] hover:bg-[#fff4e0] hover:text-[#26090a] lg:block"
      >
        Üye ol
      </a>
      <MobileMenu buttonClassName="-mr-2" />
    </header>
  );
}

// Fotoğraf geçici, Pexels: 20516648.
export function PosterHero() {
  return (
    <section className="relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden px-4 pt-3 pb-4 lg:px-8 lg:pt-4 lg:pb-6">
      <div className="absolute right-[-8vw] bottom-[27%] aspect-square w-[66vw] overflow-hidden rounded-full lg:top-[6%] lg:right-[3vw] lg:bottom-auto lg:w-[min(38vw,68svh)]">
        <Image
          src="/images/pexels-20516648.jpg"
          alt="Babasının kollarında kahkaha atan bebek"
          fill
          preload
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="object-cover object-[50%_32%]"
        />
      </div>

      <h1 className="pointer-events-none relative text-[min(30vw,20svh)] leading-[0.88] font-black tracking-[-0.035em] text-[#fff4e0] lg:text-[min(19.5vw,34svh)]">
        Kolay
        <br />
        değil<span className="ml-[0.05em]">.</span>
      </h1>

      <div className="relative flex flex-col gap-3 text-[#26090a] lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <p className="max-w-[17rem] text-xl leading-[1.15] font-bold tracking-[-0.01em] lg:max-w-[26rem] lg:text-3xl">
          Ama tek başınıza da değilsiniz.
        </p>
        <div>
          <p id="poster-age" className="font-bold lg:text-lg">
            Bebeğiniz kaç aylık?
          </p>
          <ul aria-labelledby="poster-age" className="mt-2 flex">
            {ages.map((age) => (
              <li key={age} className="-ml-0.5 flex-1 first:ml-0 lg:flex-none">
                <a
                  href="#"
                  className="block border-2 border-[#26090a] bg-[#ff4a1c] py-2.5 text-center text-[0.8125rem] font-bold whitespace-nowrap transition-colors hover:bg-[#26090a] hover:text-[#fff4e0] sm:text-base lg:px-5 lg:py-3.5"
                >
                  {age}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
