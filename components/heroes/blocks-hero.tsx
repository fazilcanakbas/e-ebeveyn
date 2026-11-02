import { LogoPlaceholder } from "@/components/logo-placeholder";
import { MobileMenu } from "@/components/mobile-menu";
import { allTopics } from "@/lib/topics";
import { BlockPile } from "./block-pile";

const ages = ["0–3 ay", "4–6 ay", "7–12 ay", "1–2 yaş", "2–3 yaş"];

export function BlocksHeader() {
  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center justify-between border-b-[3px] border-[#141414] bg-white px-4 text-[#141414] lg:h-[4.25rem] lg:px-8">
      <LogoPlaceholder />
      <nav aria-label="Ana menü" className="hidden lg:block">
        <ul className="flex gap-1 font-bold">
          {allTopics.map((topic) => (
            <li key={topic.label}>
              <a
                href={topic.href}
                className="block border-[3px] border-transparent px-2.5 py-1 hover:border-[#141414] hover:bg-[#ffd84d] xl:px-3"
              >
                {topic.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="#"
        className="hidden border-[3px] border-[#141414] bg-[#ff5a36] px-5 py-1.5 font-extrabold shadow-[4px_4px_0_#141414] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#141414] lg:block"
      >
        Üye ol
      </a>
      <MobileMenu buttonClassName="-mr-2" />
    </header>
  );
}

export function BlocksHero() {
  return (
    <section className="relative flex min-h-0 flex-1 flex-col text-[#141414]">
      <BlockPile />
      <div className="pointer-events-none relative z-10 px-4 pt-5 lg:px-8 lg:pt-8">
        <h1 className="max-w-[60rem] text-[clamp(2.5rem,min(6.4vw,11svh),6.5rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
          Bebeğinizle ilgili her şey elinizin altında.
        </h1>
        <p className="mt-2 text-base font-bold lg:mt-3 lg:text-xl">
          Blokları tutun, fırlatın.
        </p>
        <div className="mt-4 lg:mt-6">
          <p id="blocks-age" className="font-extrabold lg:text-lg">
            Bebeğiniz kaç aylık?
          </p>
          <ul aria-labelledby="blocks-age" className="mt-2 flex gap-1.5 lg:gap-2.5">
            {ages.map((age) => (
              <li key={age} className="pointer-events-auto flex-1 lg:flex-none">
                <a
                  href="#"
                  className="block border-[3px] border-[#141414] bg-white py-2 text-center text-[0.8125rem] font-extrabold whitespace-nowrap shadow-[3px_3px_0_#141414] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-[#141414] hover:text-white hover:shadow-[1px_1px_0_#141414] sm:text-base lg:px-5 lg:py-2.5"
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
