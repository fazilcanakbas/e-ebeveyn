import Image from "next/image";
import Link from "next/link";
import { LogoPlaceholder } from "@/components/logo-placeholder";
import { MobileMenu } from "@/components/mobile-menu";
import { allTopics } from "@/lib/topics";
import { AppDrawer } from "./app-drawer";
import { MomentAge } from "./moment-age";

export function MomentHeader() {
  return (
    <header className="relative z-20 flex h-14 shrink-0 items-stretch justify-between border-b border-white/25 text-white lg:h-[4.5rem]">
      <div className="flex items-center px-4 lg:border-r lg:border-white/25 lg:px-6 xl:px-8">
        <LogoPlaceholder />
      </div>
      <nav aria-label="Ana menü" className="hidden flex-1 items-center justify-center lg:flex">
        <ul className="flex gap-4 font-medium xl:gap-6 2xl:gap-8">
          {allTopics.map((topic) => (
            <li key={topic.label}>
              <a href={topic.href} className="transition-opacity hover:opacity-70">
                {topic.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-stretch">
        <AppDrawer />
        <Link
          href="/giris"
          className="hidden items-center border-l border-white/25 px-4 font-medium whitespace-nowrap transition-opacity hover:opacity-70 lg:flex xl:px-6"
        >
          Giriş yap
        </Link>
        <div className="hidden items-center border-l border-white/25 px-3 lg:flex">
          <Link
            href="/uye-ol"
            className="rounded-full bg-[#1c3cff] px-5 py-3 font-semibold whitespace-nowrap transition-colors hover:bg-white hover:text-[#1c3cff] xl:px-6"
          >
            Üye ol
          </Link>
        </div>
        <div className="flex items-center pr-2 lg:hidden">
          <MobileMenu buttonClassName="text-white" />
        </div>
      </div>
    </header>
  );
}

// Fotoğraf geçici, Pexels: 27176791.
export function MomentHero() {
  return (
    <section className="flex min-h-0 flex-1 flex-col justify-end text-white lg:justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/pexels-27176791.jpg"
          alt="Yenidoğan bebeğine sarılmış, gözleri kapalı anne"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[47%_50%] lg:object-[50%_26%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.35)_0%,rgb(0_0_0/0)_30%,rgb(0_0_0/0)_40%,rgb(0_0_0/0.72)_100%)] lg:bg-[linear-gradient(90deg,rgb(0_0_0/0.5)_0%,rgb(0_0_0/0.18)_55%,rgb(0_0_0/0)_75%)]" />
      </div>

      <div className="relative z-10 px-4 pb-6 lg:px-8 lg:pb-[2svh]">
        <h1 className="text-[clamp(3.25rem,min(8vw,14svh),8rem)] leading-[1] font-normal tracking-[-0.025em]">
          İlk günden
          <br />
          ilk adımına.
        </h1>
        <div className="mt-5 lg:mt-7">
          <MomentAge />
        </div>
      </div>
    </section>
  );
}
