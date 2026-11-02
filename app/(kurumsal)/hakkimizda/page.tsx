import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guideStages } from "@/lib/age-stages";
import { allTopics } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Hakkımızda | e-ebeveyn",
  description: "e-ebeveyn'in ne olduğu, içeriklerinin nereden geldiği ve nasıl ücretsiz kaldığı.",
};

const notes = [
  {
    title: "İçerikler nereden geliyor?",
    text: "Dönem içeriklerimiz şu an taslak. CDC, AASM, ACOG ve DSÖ gibi kuruluşların yayımladığı bilgilere dayanıyor.",
  },
  {
    title: "Nasıl ücretsiz?",
    text: "Temel kullanım ücretsiz ve reklamlarla destekleniyor.",
  },
  {
    title: "Doktorun yerini tutmaz.",
    text: "Burada okuduklarınız bilgilendirme amaçlıdır; tanı ve tedavi için doktorunuza danışın. Acil bir durumda 112'yi arayın.",
  },
];

// Fotoğraf geçici, stok görsel.
export default function AboutPage() {
  return (
    <div>
      <h1 className="text-[clamp(3rem,7vw,7rem)] leading-[1.02] tracking-[-0.025em]">Hakkımızda</h1>
      <p className="mt-5 max-w-[46rem] text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.15] tracking-[-0.015em] lg:mt-7">
        e-ebeveyn, hamilelikten 3 yaşa kadar ebeveynlerin aklına takılanları tek yerde toplayan bir platform.
      </p>

      <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#2a201b] sm:aspect-[21/9] lg:mt-16">
        <Image
          src="/images/stories/aileler.jpg"
          alt="Yatakta sırtüstü yatan bebeğe gülümseyerek bakan anne ve baba"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
      </div>

      <div className="mt-14 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
        <section className="lg:col-span-6">
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-[-0.02em]">Neler var?</h2>
          <ul className="mt-5 border-t border-ink/15">
            {allTopics.map((topic) => (
              <li key={topic.label} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-3.5">
                <span className="text-xl tracking-[-0.01em]">{topic.label}</span>
                <span className="text-right text-ink/60">{topic.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-5 lg:col-start-8">
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-[-0.02em]">Hangi dönemler için?</h2>
          <p className="mt-3 text-lg leading-snug text-ink/70">
            Her dönemin uykusu, beslenmesi ve gelişimi farklı; rehberler de buna göre ayrılıyor.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {guideStages.map((stage) => (
              <li key={stage.id}>
                {/* Dönem kartları hashchange dinler; Link bu olayı tetiklemediği için düz bağlantı. */}
                <a
                  href={`/#donem-${stage.id}`}
                  className="block rounded-full border border-ink/20 px-4 py-2.5 font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                >
                  {stage.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <ul className="mt-14 grid gap-8 md:grid-cols-3 lg:mt-24 lg:gap-8">
        {notes.map((note) => (
          <li key={note.title} className="border-t border-ink pt-4">
            <h2 className="text-2xl leading-tight tracking-[-0.015em]">{note.title}</h2>
            <p className="mt-2 leading-snug text-ink/70">{note.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14 lg:mt-24">
        <Link
          href="/iletisim"
          className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-ink"
        >
          Bize yazın
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
