// Taslak içerik. Kaynak: CDC gelişim basamakları, AASM uyku süreleri, DSÖ beslenme önerisi,
// Sleep Foundation (yenidoğan uykusu). Yayından önce uzman onayı gerekir.
// Fotoğraflar geçici, Pexels: 3270224, 10190040, 6209327, 3933107, 3933039.
export type AgeStage = {
  id: string;
  label: string;
  headline: string;
  facts: { topic: string; text: string }[];
  photo: string;
  photoAlt: string;
  photoPosition: string;
};

export const ageStages: AgeStage[] = [
  {
    id: "0-3-ay",
    label: "0–3 ay",
    headline: "Her şeyin ilk kez olduğu haftalar.",
    facts: [
      { topic: "Uyku", text: "Günde 16–18 saat, parça parça" },
      { topic: "Beslenme", text: "Anne sütü veya mama" },
      { topic: "Gelişim", text: "Sesinize gülümser" },
    ],
    photo: "/images/stages/0-3-ay.jpg",
    photoAlt: "Annesinin örgü kazağına sarılmış yenidoğan bebek",
    photoPosition: "42% 50%",
  },
  {
    id: "4-6-ay",
    label: "4–6 ay",
    headline: "Dünya birden ilginçleşiyor.",
    facts: [
      { topic: "Uyku", text: "Günde 12–16 saat" },
      { topic: "Beslenme", text: "6. ayda ek gıda başlar" },
      { topic: "Gelişim", text: "Karnından sırtına döner" },
    ],
    photo: "/images/stages/4-6-ay.jpg",
    photoAlt: "Yüzüstü uzanmış, kameraya bakan bebek",
    photoPosition: "42% 40%",
  },
  {
    id: "7-12-ay",
    label: "7–12 ay",
    headline: "Artık yerinde durmuyor.",
    facts: [
      { topic: "Uyku", text: "Günde 12–16 saat" },
      { topic: "Beslenme", text: "Dokulu yiyecekler" },
      { topic: "Gelişim", text: "Desteksiz oturur" },
    ],
    photo: "/images/stages/7-12-ay.jpg",
    photoAlt: "Ahşap zeminde emekleyen bebek",
    photoPosition: "60% 50%",
  },
  {
    id: "1-2-yas",
    label: "1–2 yaş",
    headline: "İlk adımlar, ilk sözcükler.",
    facts: [
      { topic: "Uyku", text: "Günde 11–14 saat" },
      { topic: "Beslenme", text: "Kaşıkla kendi yer" },
      { topic: "Gelişim", text: "Koşar, topa vurur" },
    ],
    photo: "/images/stages/1-2-yas.jpg",
    photoAlt: "Oyuncak evin önünde ayakta oynayan küçük çocuk",
    photoPosition: "36% 40%",
  },
  {
    id: "2-3-yas",
    label: "2–3 yaş",
    headline: "Her şeye bir “neden?”",
    facts: [
      { topic: "Uyku", text: "Günde 10–14 saat" },
      { topic: "Beslenme", text: "Çatal kullanır" },
      { topic: "Gelişim", text: "Karşılıklı sohbet eder" },
    ],
    photo: "/images/stages/2-3-yas.jpg",
    photoAlt: "Ahşap bloklarla oynayan küçük çocuk",
    photoPosition: "60% 40%",
  },
];
