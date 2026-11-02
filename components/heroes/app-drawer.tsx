"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { brandIcons } from "@/lib/brand-icons";

// Örnek ekran içeriği; gerçek uygulama görselleri gelince değişecek.
const screenCards = [
  { icon: "/images/icons/uyku.png", label: "Sıradaki uyku", value: "13:00" },
  { icon: "/images/icons/beslenme.png", label: "Bugünün öğünü", value: "Kabak püresi" },
  { icon: "/images/icons/aktiviteler.png", label: "Bugünün oyunu", value: "Ce-e" },
  { icon: "/images/icons/doktorlar.png", label: "Sıradaki kontrol", value: "9. ay taraması" },
];

const stores = [
  { name: "App Store", icon: brandIcons.apple },
  { name: "Google Play", icon: brandIcons.googlePlay },
];

export function AppDrawer() {
  const dialog = useRef<HTMLDialogElement>(null);

  const finish = () => {
    const node = dialog.current;
    if (!node) return;
    node.close();
    delete node.dataset.state;
    document.documentElement.style.overflow = "";
  };

  const open = () => {
    const node = dialog.current;
    if (!node) return;
    node.showModal();
    node.dataset.state = "open";
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    const node = dialog.current;
    if (!node || node.dataset.state !== "open") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
    } else {
      node.dataset.state = "closing";
      // Süre, globals.css'teki app-panel-out ile aynıdır; CSS yüklenmese de panel kapanır.
      window.setTimeout(finish, 280);
    }
  };

  // İçerik paneli tamamen kapladığı için dialog'un kendisine gelen tıklama arka plandandır.
  const onBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialog.current) close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Uygulamayı indirin"
        className="moment-line group flex cursor-pointer items-center gap-2 px-3 font-medium lg:border-l lg:px-4 xl:px-5"
      >
        <svg
          viewBox="0 0 40 40"
          className="app-buzz size-9 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <rect x="13" y="6" width="14" height="28" rx="3.5" />
          <path d="M18.5 10h3" />
          <circle cx="20" cy="20" r="2.5" fill="#6d84ff" stroke="none" />
          <path className="app-buzz-wave" d="M7.5 15.5a10 10 0 0 0 0 9M3.5 12.5a15 15 0 0 0 0 15" />
          <path className="app-buzz-wave" d="M32.5 15.5a10 10 0 0 1 0 9M36.5 12.5a15 15 0 0 1 0 15" />
        </svg>
        <span className="hidden whitespace-nowrap transition-opacity group-hover:opacity-70 xl:inline">
          Cebinize alın
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label="Uygulamayı indirin"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={onBackdrop}
        className="app-panel fixed top-auto bottom-0 left-0 m-0 h-[90dvh] max-h-none w-full max-w-none overflow-hidden rounded-t-[2rem] bg-[#1c3cff] text-white lg:top-0 lg:right-0 lg:left-auto lg:h-dvh lg:w-[32rem] lg:rounded-t-none lg:rounded-l-[2rem]"
      >
        <div className="flex h-full flex-col px-6 pt-6 lg:px-10 lg:pt-10">
          <button
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="app-rise absolute top-4 right-4 grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-white hover:text-[#1c3cff] lg:top-6 lg:right-6"
          >
            <X className="size-6" aria-hidden="true" />
          </button>

          <h2 className="app-rise max-w-[26rem] pr-10 text-[clamp(2.5rem,min(11vw,7svh),3.5rem)] leading-[1] font-normal tracking-[-0.025em]">
            Gece üçte de cebinizde.
          </h2>
          <p className="app-rise mt-3 max-w-[24rem] text-lg leading-snug text-white/85 [@media(max-height:640px)]:hidden">
            Uyku ve beslenmeyi takip edin, doktor bulun, ailelerle konuşun.
          </p>

          <div className="app-rise mt-5 flex gap-2">
            {stores.map((store) => (
              <a
                key={store.name}
                href="#"
                className="flex flex-1 items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 text-[#141b4d] transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="size-7 shrink-0" fill="currentColor" aria-hidden="true">
                  <path d={store.icon} />
                </svg>
                <span className="min-w-0">
                  <span className="block text-xs">İndirin</span>
                  <span className="block leading-tight font-semibold whitespace-nowrap sm:text-lg">
                    {store.name}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="relative mt-6 min-h-0 flex-1 overflow-hidden">
            <div className="app-phone mx-auto min-h-[calc(100%+1rem)] w-[16rem] rounded-t-[2.5rem] border-[7px] border-b-0 border-[#0b1140] bg-white px-3.5 pt-3.5 pb-8 text-[#141b4d]">
              <div className="mx-auto h-5 w-20 rounded-full bg-[#0b1140]" />
              <p className="mt-4 text-sm text-[#141b4d]/65">Bugün, 7 aylık</p>
              <p className="text-xl leading-tight font-semibold tracking-[-0.01em]">Merhaba</p>
              <ul className="mt-3 space-y-2">
                {screenCards.map((card, index) => (
                  <li
                    key={card.label}
                    className="app-card flex items-center gap-2.5 rounded-2xl bg-[#eef1ff] p-2"
                    style={{ animationDelay: `${520 + index * 110}ms` }}
                  >
                    <Image src={card.icon} alt="" width={40} height={40} className="size-8" />
                    <span className="leading-tight">
                      <span className="block text-[0.6875rem] text-[#141b4d]/65">{card.label}</span>
                      <span className="block text-sm font-semibold">{card.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
