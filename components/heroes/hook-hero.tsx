import Image from "next/image";

const ages = ["0–3 ay", "4–6 ay", "7–12 ay", "1–2 yaş", "2–3 yaş"];

// Fotoğraf geçici, Pexels: 10190040. Metne yer açmak için aynalanır.
export function HookHero() {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="hook-photo absolute inset-x-0 bottom-0 h-[60%] overflow-hidden lg:top-0 lg:left-[22%] lg:h-full">
        <Image
          src="/images/pexels-10190040.jpg"
          alt="Yüzüstü uzanmış, doğrudan kameraya bakan bebek"
          fill
          preload
          sizes="(min-width: 1024px) 78vw, 100vw"
          className="-scale-x-100 object-cover object-[46%_40%] lg:object-[70%_50%]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col px-4 pt-6 lg:flex-1 lg:justify-center lg:px-5 lg:pt-0">
        <h1 className="max-w-[50rem] text-[clamp(2.5rem,min(5.4vw,10.5svh),5.75rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
          Bebekler kullanım kılavuzuyla gelmez.{" "}
          <span className="text-[#d9442f]">Kılavuzunuz burada.</span>
        </h1>
        <p className="mt-4 hidden max-w-[32rem] text-xl leading-snug text-ink/75 lg:mt-5 lg:block [@media(max-height:700px)]:hidden">
          Uykudan beslenmeye, gelişimden doktorlara: her dönem için ihtiyacınız olan her şey.
        </p>

        <div className="mt-5 lg:mt-8">
          <p id="age-label" className="font-semibold lg:text-lg">
            Bebeğiniz kaç aylık?
          </p>
          <ul aria-labelledby="age-label" className="mt-2.5 flex gap-1.5 lg:gap-2">
            {ages.map((age) => (
              <li key={age} className="flex-1 lg:flex-none">
                <a
                  href="#"
                  className="block rounded-2xl bg-white py-3 text-center text-[0.8125rem] font-semibold whitespace-nowrap shadow-soft transition-colors hover:bg-ink hover:text-white sm:text-base lg:px-6 lg:py-4 lg:text-lg"
                >
                  {age}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
