"use client";

import Link from "next/link";
import { guideStages } from "@/lib/age-stages";
import { brandIcons } from "@/lib/brand-icons";
import { allTopics } from "@/lib/topics";
import { BirthDateCheck } from "./birth-date-check";
import { useReveal } from "./use-reveal";

const columns = [
  {
    title: "Konular",
    links: allTopics.map((topic) => ({ label: topic.label, href: topic.href })),
  },
  {
    title: "Dönemler",
    links: guideStages.map((stage) => ({ label: stage.label, href: `/#donem-${stage.id}` })),
  },
  {
    title: "Hesap",
    links: [
      { label: "Giriş yap", href: "/giris" },
      { label: "Üye ol", href: "/uye-ol" },
    ],
  },
  {
    title: "e-ebeveyn",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "İletişim", href: "/iletisim" },
      { label: "Gizlilik ve KVKK", href: "/gizlilik" },
      { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    ],
  },
];

const stores = [
  { name: "App Store", icon: brandIcons.apple },
  { name: "Google Play", icon: brandIcons.googlePlay },
];

const rise =
  "transition-[opacity,translate] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-data-[in=false]/foot:translate-y-6 motion-safe:group-data-[in=false]/foot:opacity-0";

export function SiteFooter() {
  const top = useReveal<HTMLDivElement>();
  const mark = useReveal<HTMLDivElement>(0.3);

  return (
    <footer className="overflow-hidden bg-white text-ink">
      <div
        ref={top}
        data-in="false"
        className="group/foot grid gap-12 px-4 pt-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-24"
      >
        <div className="lg:col-span-5">
          <div className={rise}>
            <BirthDateCheck />
          </div>
          <ul className={`mt-7 flex flex-wrap gap-2 delay-100 ${rise}`}>
            {stores.map((store) => (
              <li key={store.name}>
                <a
                  href="#"
                  className="flex items-center gap-2.5 rounded-full border border-ink/20 py-2.5 pr-5 pl-4 font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                    <path d={store.icon} />
                  </svg>
                  {store.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav
          aria-label="Site haritası"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7"
        >
          {columns.map((column, index) => (
            <div key={column.title} className={rise} style={{ transitionDelay: `${150 + index * 80}ms` }}>
              <h2 className="text-sm text-ink/55">{column.title}</h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {/* Dönem kartları hashchange dinler; Link bu olayı tetiklemediği için düz bağlantı. */}
                    {!link.href.includes("#") ? (
                      <Link href={link.href} className="transition-opacity duration-300 hover:opacity-60">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="transition-opacity duration-300 hover:opacity-60">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mx-4 mt-14 flex flex-col gap-2 border-t border-ink/15 pt-4 text-sm text-ink/60 lg:mx-8 lg:mt-20 lg:flex-row lg:justify-between lg:gap-10">
        <p className="max-w-[46rem]">
          e-ebeveyn bilgilendirme amaçlıdır, tıbbi tavsiye yerine geçmez. Acil bir durumda 112&apos;yi
          arayın.
        </p>
        <p className="shrink-0">© 2026 e-ebeveyn</p>
      </div>

      {/* Gerçek logo gelene kadar marka adı yazıyla duruyor. Satır yüksekliği ve negatif margin
          Xmind'ın ölçülerine göre: harflerin üstü kutunun tepesine, y'nin kuyruğu sayfanın dibine değer. */}
      <div ref={mark} data-in="false" aria-hidden="true" className="group/foot mt-5 overflow-hidden lg:mt-6">
        <p className="-mt-[0.17em] text-center text-[23vw] leading-[1.05] tracking-[-0.045em] whitespace-nowrap transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-data-[in=false]/foot:translate-y-full">
          e-ebeveyn
        </p>
      </div>
    </footer>
  );
}
