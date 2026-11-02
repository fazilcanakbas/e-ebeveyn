import { allTopics } from "@/lib/topics";
import { LogoPlaceholder } from "./logo-placeholder";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-20 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 rounded-3xl bg-white py-2.5 pr-2.5 pl-4 shadow-soft lg:py-3 lg:pr-3 lg:pl-5">
        <LogoPlaceholder />
        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex gap-1 font-medium xl:gap-2">
            {allTopics.map((topic) => (
              <li key={topic.label}>
                <a
                  href={topic.href}
                  className="block rounded-xl px-2.5 py-2 text-[0.9375rem] transition-colors hover:bg-ink/5 xl:px-3"
                >
                  {topic.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-1.5 text-[0.9375rem] font-semibold lg:flex">
          <a href="#" className="rounded-xl px-3 py-2.5 whitespace-nowrap transition-colors hover:bg-ink/5">
            Giriş yap
          </a>
          <a
            href="#"
            className="rounded-2xl bg-coral px-5 py-2.5 whitespace-nowrap transition-transform hover:-translate-y-0.5"
          >
            Üye ol
          </a>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
