export type Topic = {
  label: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  tint: string;
};

export type MainTopic = Topic & {
  // Başlıkta dönen sözcük; forumun karşılığı yok, önceki sözcük kalır.
  word?: string;
  question: string;
  photo: string;
  photoAlt: string;
};

// İkonlar geçici: Microsoft Fluent Emoji 3D (MIT), public/images/icons/LICENSE.txt
// Fotoğraflar geçici, Pexels: 18649629, 4669022, 6209327, 7491346, 7653108, 11369189.
export const topics: MainTopic[] = [
  {
    label: "Uyku",
    description: "Düzen ve uyanmalar",
    href: "#",
    icon: "/images/icons/uyku.png",
    color: "#5b4fe0",
    tint: "#e7e4ff",
    word: "uykusu",
    question: "Gece uyanmaları normal mi?",
    photo: "/images/topics/uyku.jpg",
    photoAlt: "Beyaz yatakta uyuyan yenidoğan bebek",
  },
  {
    label: "Beslenme",
    description: "Emzirme ve ek gıda",
    href: "#",
    icon: "/images/icons/beslenme.png",
    color: "#0e8a5f",
    tint: "#d8f4e6",
    word: "beslenmesi",
    question: "Ek gıdaya ne zaman başlamalıyım?",
    photo: "/images/topics/beslenme.jpg",
    photoAlt: "Mama sandalyesinde gülen bebek",
  },
  {
    label: "Gelişim",
    description: "Ay ay takip",
    href: "#",
    icon: "/images/icons/gelisim.png",
    color: "#c2600a",
    tint: "#ffedc7",
    word: "gelişimi",
    question: "Bu ay neler bekleyebilirim?",
    photo: "/images/topics/gelisim.jpg",
    photoAlt: "Ahşap zeminde emekleyen bebek",
  },
  {
    label: "Aktiviteler",
    description: "Yaşına uygun oyunlar",
    href: "#",
    icon: "/images/icons/aktiviteler.png",
    color: "#d1337f",
    tint: "#ffdfed",
    word: "oyunları",
    question: "Evde hangi oyunları oynayabiliriz?",
    photo: "/images/topics/aktiviteler.jpg",
    photoAlt: "Babasıyla yerde halka oyuncakla oynayan bebek",
  },
  {
    label: "Doktorlar",
    description: "Uzmana danışın",
    href: "#",
    icon: "/images/icons/doktorlar.png",
    color: "#1f74c9",
    tint: "#d9ecff",
    word: "sağlığı",
    question: "Ateşi çıktı, doktora gitmeli miyim?",
    photo: "/images/topics/doktorlar.jpg",
    photoAlt: "Çocuğu stetoskopla muayene eden doktor",
  },
  {
    label: "Forum",
    description: "Ailelerle konuşun",
    href: "#",
    icon: "/images/icons/forum.png",
    color: "#0f8791",
    tint: "#d5f3f4",
    question: "Aynı dönemden geçen aileler ne yapıyor?",
    photo: "/images/topics/forum.jpg",
    photoAlt: "Anne ve babasıyla oyuncak penguenle oynayan bebek",
  },
];

export const assistant: Topic = {
  label: "AI Asistan",
  description: "Aklınıza takılanı sorun",
  href: "#",
  icon: "/images/icons/asistan.png",
  color: "#d9442f",
  tint: "#ffb9a8",
};

export const allTopics: Topic[] = [...topics, assistant];
