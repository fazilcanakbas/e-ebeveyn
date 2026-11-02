// Taslak içerik. Kaynak: CDC gelişim basamakları, AASM uyku süreleri, DSÖ beslenme önerisi, ACOG (hamilelik),
// Sleep Foundation (yenidoğan uykusu). Yayından önce uzman onayı gerekir.
// Fotoğraflar geçici, Pexels: 5853667, 3270224, 10190040, 6209327, 3933107, 3933039.
export type AgeStage = {
  id: string;
  label: string;
  // Dönemin bittiği ay (hariç). Doğum tarihinden dönem bulmak için.
  untilMonth: number;
  headline: string;
  facts: { topic: string; text: string }[];
  photo: string;
  photoAlt: string;
  photoPosition: string;
};

// Doğumla biter; bebek dönemleri ageStages'ta, sayfadaki tam sıra guideStages'ta.
export const pregnancyStage: AgeStage = {
  id: "hamilelik",
  label: "Hamilelik",
  untilMonth: 0,
  headline: "Doğuma hazırlanılan kırk hafta.",
  facts: [
    { topic: "Uyku", text: "Yan yatmak önerilir" },
    { topic: "Beslenme", text: "Folik asit ve demir" },
    { topic: "Gelişim", text: "18–20. haftada ilk tekmeler" },
  ],
  photo: "/images/stages/hamilelik.jpg",
  photoAlt: "Elleriyle karnını tutan hamile kadın",
  photoPosition: "50% 62%",
};

export const ageStages: AgeStage[] = [
  {
    id: "0-3-ay",
    label: "0–3 ay",
    untilMonth: 4,
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
    untilMonth: 7,
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
    untilMonth: 12,
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
    untilMonth: 24,
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
    untilMonth: 36,
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

export const guideStages: AgeStage[] = [pregnancyStage, ...ageStages];
