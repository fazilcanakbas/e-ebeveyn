import Image from "next/image";
import { MomentAge } from "./moment-age";

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
