import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "İletişim | e-ebeveyn",
  description: "e-ebeveyn'e soru, içerik hatası, reklam ve KVKK başvuruları için yazın.",
};

const notes = [
  {
    title: "Acil bir durum mu?",
    body: <>Bu form acil durumlar için uygun değil. Bebeğiniz veya sizin için acil bir durumda 112&apos;yi arayın.</>,
  },
  {
    title: "Tıbbi bir soru mu?",
    body: <>Bu formdan tıbbi yanıt veremiyoruz. Sağlık sorularınız için doktorunuza danışın.</>,
  },
  {
    title: "Verilerinizle mi ilgili?",
    body: (
      <>
        Konu olarak KVKK başvurusunu seçin. Haklarınızı{" "}
        <Link href="/gizlilik" className="text-cobalt underline underline-offset-4">
          Gizlilik ve KVKK
        </Link>{" "}
        sayfasında bulabilirsiniz.
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-[clamp(3rem,7vw,7rem)] leading-[1.02] tracking-[-0.025em]">İletişim</h1>
      <p className="mt-5 max-w-[42rem] text-lg leading-snug text-ink/70 lg:mt-7 lg:text-xl">
        Bir sorunuz varsa, içeriklerde hata gördüyseniz veya birlikte çalışmak istiyorsanız bize yazın.
      </p>

      <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <ul className="space-y-6 lg:col-span-4 lg:col-start-9">
          {notes.map((note) => (
            <li key={note.title} className="border-t border-ink pt-4">
              <h2 className="text-2xl leading-tight tracking-[-0.015em]">{note.title}</h2>
              <p className="mt-2 leading-snug text-ink/70">{note.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
