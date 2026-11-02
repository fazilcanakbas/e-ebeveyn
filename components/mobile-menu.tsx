"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { allTopics } from "@/lib/topics";
import { LogoPlaceholder } from "./logo-placeholder";

export function MobileMenu({
  buttonClassName = "rounded-2xl bg-ink/5",
}: {
  buttonClassName?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        aria-label="Menüyü aç"
        onClick={() => dialog.current?.showModal()}
        className={`grid size-11 place-items-center lg:hidden ${buttonClassName}`}
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        aria-label="Site menüsü"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-white p-4 text-ink"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <LogoPlaceholder />
            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => dialog.current?.close()}
              className="grid size-11 place-items-center rounded-2xl bg-ink/5"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Ana menü" className="mt-5 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {allTopics.map((topic) => (
                <li key={topic.label}>
                  <a
                    href={topic.href}
                    className="flex items-center gap-3 rounded-2xl p-2 active:bg-ink/5"
                  >
                    <Image src={topic.icon} alt="" width={44} height={44} className="shrink-0" />
                    <span>
                      <span className="block font-semibold">{topic.label}</span>
                      <span className="block text-sm text-ink/65">{topic.description}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid grid-cols-2 gap-2 pt-4 font-semibold">
            <Link href="/giris" className="rounded-2xl bg-ink/5 py-3.5 text-center">
              Giriş yap
            </Link>
            <Link href="/uye-ol" className="rounded-2xl bg-coral py-3.5 text-center">
              Üye ol
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
