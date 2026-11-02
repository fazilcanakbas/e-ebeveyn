import Image from "next/image";
import type { CSSProperties } from "react";

// Fotoğraflar geçici, Pexels: 11369371, 8590499, 4669022, 3875222, 7491346.
const moments = [
  {
    photo: "/images/questions/uyanma.jpg",
    alt: "Yatakta uzanan bebek ve ona uzanan ebeveyn elleri",
    question: "Neden bu kadar sık uyanıyor?",
    tilt: "-3deg",
    place: "ml-[4vw] w-[66vw] aspect-[5/4] lg:ml-[5vw] lg:w-[min(34vw,32rem)]",
  },
  {
    photo: "/images/questions/aglama.jpg",
    alt: "Çocuk odasının zemininde emekleyen bebek",
    question: "Bu kadar ağlaması normal mi?",
    tilt: "3deg",
    place: "ml-auto mr-[4vw] mt-[8svh] w-[56vw] aspect-[4/5] lg:mr-[7vw] lg:-mt-[8svh] lg:w-[min(24vw,23rem)]",
  },
  {
    photo: "/images/questions/ek-gida.jpg",
    alt: "Mama sandalyesinde gülen bebek",
    question: "Ek gıdaya ne zaman başlamalıyım?",
    tilt: "2deg",
    place: "ml-[8vw] mt-[8svh] w-[64vw] aspect-[5/4] lg:ml-[22vw] lg:mt-[10svh] lg:w-[min(30vw,29rem)]",
  },
  {
    photo: "/images/questions/emekleme.jpg",
    alt: "Yerde yüzüstü uzanmış, oyuncağına bakan bebek",
    question: "Ne zaman emeklemeye başlar?",
    tilt: "-2deg",
    place: "ml-auto mr-[6vw] mt-[8svh] w-[66vw] aspect-[5/4] lg:mr-[12vw] lg:-mt-[4svh] lg:w-[min(32vw,30rem)]",
  },
  {
    photo: "/images/questions/oyun.jpg",
    alt: "Babasıyla yerde halka oyuncakla oynayan bebek",
    question: "Bu oyun yaşına uygun mu?",
    tilt: "-3deg",
    place: "ml-[5vw] mt-[8svh] w-[56vw] aspect-[4/5] lg:ml-[9vw] lg:mt-[6svh] lg:w-[min(24vw,23rem)]",
  },
];

export function BigQuestion() {
  return (
    <section className="relative">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-4 pt-14 text-center lg:pt-[4.5rem]">
        <h2 className="max-w-[20ch] text-[clamp(2.75rem,min(7.4vw,15svh),8rem)] leading-[1.02] font-normal tracking-[-0.03em]">
          Her ay yeni bir bebek, binlerce yeni soru.
        </h2>
        <p className="mt-5 max-w-[46rem] text-lg leading-snug text-ink/70 lg:text-xl">
          Uyku, beslenme, gelişim, doktorlar, aileler ve yapay zekâ asistanı. Hepsi tek yerde.
        </p>
      </div>

      <div className="relative z-10 -mt-[32svh] pb-[75svh]">
        {moments.map((moment) => (
          <figure
            key={moment.question}
            style={{ "--moment-tilt": moment.tilt } as CSSProperties}
            className={`moment-card relative overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.4)] ${moment.place}`}
          >
            <Image
              src={moment.photo}
              alt={moment.alt}
              fill
              sizes="(min-width: 1024px) 34vw, 66vw"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0)_58%,rgb(0_0_0/0.72)_100%)]"
            />
            <figcaption className="absolute inset-x-4 bottom-3.5 text-[1.0625rem] leading-snug text-white lg:inset-x-5 lg:bottom-4 lg:text-xl">
              {moment.question}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
