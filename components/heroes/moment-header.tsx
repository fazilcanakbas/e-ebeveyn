"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoPlaceholder } from "@/components/logo-placeholder";
import { MobileMenu } from "@/components/mobile-menu";
import { allTopics } from "@/lib/topics";
import { AppDrawer } from "./app-drawer";

// Hero görünürken şeffaf durur, hero bitince beyaza döner. Hero'suz sayfalarda hep beyaz.
export function MomentHeader({ heroId }: { heroId?: string }) {
  const [solid, setSolid] = useState(!heroId);

  useEffect(() => {
    const hero = heroId && document.getElementById(heroId);
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  return (
    <header
      data-solid={solid}
      className="moment-header fixed inset-x-0 top-0 z-40 flex h-14 items-stretch justify-between border-b lg:h-[4.5rem]"
    >
      <div className="moment-line flex items-center px-4 lg:border-r lg:px-6 xl:px-8">
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
          className="moment-line hidden items-center border-l px-4 font-medium whitespace-nowrap transition-opacity hover:opacity-70 lg:flex xl:px-6"
        >
          Giriş yap
        </Link>
        <div className="moment-line hidden items-center border-l px-3 lg:flex">
          <Link
            href="/uye-ol"
            className="rounded-full bg-cobalt px-5 py-3 font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:bg-ink xl:px-6"
          >
            Üye ol
          </Link>
        </div>
        <div className="flex items-center pr-2 lg:hidden">
          <MobileMenu buttonClassName="" />
        </div>
      </div>
    </header>
  );
}
