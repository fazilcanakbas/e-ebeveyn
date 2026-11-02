import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

// Fotoğraf geçici, Pexels: 27176791.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh flex-1 bg-white lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex min-h-svh flex-col px-5 py-5 sm:px-10 lg:px-14 lg:py-7">
        <Link href="/" className="text-xl font-semibold tracking-[-0.02em]">
          e-ebeveyn
        </Link>
        <main className="mx-auto flex w-full max-w-[27rem] flex-1 flex-col justify-center py-8">
          {children}
        </main>
      </div>

      <div className="sticky top-0 hidden h-svh p-3 lg:block">
        <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#2a201b]">
          <Image
            src="/images/pexels-27176791.jpg"
            alt="Yenidoğan bebeğine sarılmış, gözleri kapalı anne"
            fill
            preload
            sizes="55vw"
            className="auth-photo object-cover object-[52%_40%]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0)_55%,rgb(0_0_0/0.65)_100%)]"
          />
          <p className="absolute right-8 bottom-8 left-8 text-[clamp(2.25rem,4vw,4rem)] leading-[1.02] tracking-[-0.025em] text-white">
            İlk günden
            <br />
            ilk adımına.
          </p>
        </div>
      </div>
    </div>
  );
}
