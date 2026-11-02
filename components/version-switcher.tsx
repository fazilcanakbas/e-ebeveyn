"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const versions = ["v1", "v2", "v3", "v4", "v5", "v8", "v9", "v10", "v11", "v12"];

// Yalnızca tasarım incelemesi için; versiyon seçilince kaldırılacak.
export function VersionSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Tasarım versiyonları"
      className="fixed top-1/2 right-1 z-50 flex -translate-y-1/2 flex-col gap-0.5 rounded-xl bg-ink p-1 text-[0.6875rem] font-semibold shadow-soft"
    >
      {versions.map((version) => {
        const current = pathname === `/${version}`;
        return (
          <Link
            key={version}
            href={`/${version}`}
            aria-current={current ? "page" : undefined}
            className={`rounded-lg px-2 py-1 uppercase ${
              current ? "bg-white text-ink" : "text-white hover:bg-white/15"
            }`}
          >
            {version}
          </Link>
        );
      })}
    </nav>
  );
}
