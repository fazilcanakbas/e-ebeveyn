import type { Metadata } from "next";
import Link from "next/link";
import { Blank, LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | e-ebeveyn",
  description: "e-ebeveyn'i kullanırken geçerli olan kurallar, sorumluluklar ve haklar.",
};

const sections: LegalSection[] = [
  {
    id: "taraflar",
    title: "Taraflar ve kabul",
    body: (
      <p>
        Bu koşullar, e-ebeveyn&apos;i işleten <Blank>şirket unvanı</Blank> ile hizmeti kullanan siz arasında geçerlidir.
        Siteyi veya uygulamayı kullandığınızda bu koşulları kabul etmiş olursunuz.
      </p>
    ),
  },
  {
    id: "hizmet",
    title: "Hizmet",
    body: (
      <p>
        e-ebeveyn; hamilelik ve bebeklik dönemlerine göre uyku, beslenme, gelişim ve aktivite içerikleri, doktor
        bilgileri, forum ve yapay zekâ asistanı sunan bir bilgilendirme platformudur. Özellikler zaman içinde değişebilir.
      </p>
    ),
  },
  {
    id: "tibbi-uyari",
    title: "Tıbbi tavsiye değildir",
    body: (
      <>
        <p>
          <strong>
            e-ebeveyn&apos;deki içerikler bilgilendirme amaçlıdır. Tanı, tedavi veya doktor muayenesinin yerine geçmez.
          </strong>{" "}
          Sizin veya bebeğinizin sağlığıyla ilgili kararlar için doktorunuza danışın.
        </p>
        <p>
          <strong>Acil bir durumda 112&apos;yi arayın.</strong> Forumu veya asistanı acil durumlar için kullanmayın.
        </p>
      </>
    ),
  },
  {
    id: "uyelik",
    title: "Üyelik",
    body: (
      <ul>
        <li>Üye olmak için 18 yaşını doldurmuş olmanız gerekir.</li>
        <li>Verdiğiniz bilgilerin doğru olmasından siz sorumlusunuz.</li>
        <li>Şifrenizi korumak ve hesabınızda yapılan işlemler sizin sorumluluğunuzdadır.</li>
        <li>Hesabınızın izinsiz kullanıldığını düşünüyorsanız bize hemen haber verin.</li>
      </ul>
    ),
  },
  {
    id: "forum",
    title: "Forum kuralları",
    body: (
      <>
        <p>Forumda paylaştıklarınızdan siz sorumlusunuz. Şunlara izin verilmez:</p>
        <ul>
          <li>Hakaret, taciz, nefret söylemi ve başka ebeveynleri aşağılamak</li>
          <li>Kendinizi sağlık profesyoneli olarak yanlış tanıtmak veya ilaç ve doz önermek</li>
          <li>Reklam, spam ve yanıltıcı bilgi paylaşmak</li>
          <li>Çocukları tanınır kılan bilgi veya uygunsuz görüntü paylaşmak</li>
          <li>Başkalarının kişisel bilgilerini veya telif hakkıyla korunan içeriklerini izinsiz paylaşmak</li>
        </ul>
        <p>Bu kurallara uymayan içerikleri kaldırabilir, gerekirse hesabı kısıtlayabiliriz.</p>
      </>
    ),
  },
  {
    id: "asistan",
    title: "Yapay zekâ asistanı",
    body: (
      <p>
        Asistanın yanıtları otomatik üretilir ve yanlış veya eksik olabilir. Tanı koymaz, tedavi önermez. Önemli kararlar
        almadan önce yanıtı bir doktorla doğrulayın. Asistana yazdıklarınızın nasıl işlendiği{" "}
        <Link href="/gizlilik">Gizlilik ve KVKK</Link> sayfasında anlatılır.
      </p>
    ),
  },
  {
    id: "doktorlar",
    title: "Doktorlar",
    body: (
      <p>
        Doktor bölümündeki bilgiler size kolaylık sağlamak içindir. Bir sağlık profesyoneliyle kuracağınız ilişki sizinle o
        kişi arasındadır; verilen hizmetten e-ebeveyn sorumlu değildir.
      </p>
    ),
  },
  {
    id: "ucretler",
    title: "Ücretler ve reklamlar",
    body: (
      <p>
        Temel kullanım ücretsizdir ve reklamlarla desteklenir. Reklam içeriklerinden reklamveren sorumludur. İleride
        ücretli bir özellik eklenirse fiyatı ve koşulları satın almadan önce açıkça gösterilir.
      </p>
    ),
  },
  {
    id: "fikri-mulkiyet",
    title: "Fikri mülkiyet",
    body: (
      <p>
        Sitedeki metin, tasarım ve görseller e-ebeveyn&apos;e veya lisans verenlerine aittir; izinsiz kopyalanamaz. Forumda
        paylaştığınız içeriklerin hakları sizde kalır, ancak bunları hizmet içinde göstermemiz için bize izin vermiş
        olursunuz.
      </p>
    ),
  },
  {
    id: "sorumluluk",
    title: "Sorumluluğun sınırı",
    body: (
      <p>
        Hizmeti kesintisiz ve hatasız sunmaya çalışırız, ancak bunu garanti edemeyiz. Kullanıcıların paylaştığı
        içeriklerden ve içeriklere dayanarak verilen kararlardan, kanunen sorumlu olduğumuz hâller dışında sorumlu
        değiliz. Tüketici mevzuatından doğan haklarınız saklıdır.
      </p>
    ),
  },
  {
    id: "hesap-kapatma",
    title: "Hesabın kapatılması",
    body: (
      <p>
        Hesabınızı istediğiniz zaman kapatabilirsiniz. Bu koşulları ağır veya tekrar eden biçimde ihlal eden hesapları
        askıya alabilir veya kapatabiliriz.
      </p>
    ),
  },
  {
    id: "degisiklikler",
    title: "Değişiklikler",
    body: (
      <p>
        Bu koşulları güncelleyebiliriz. Önemli değişiklikleri yürürlüğe girmeden önce site üzerinden veya e-postayla
        duyururuz.
      </p>
    ),
  },
  {
    id: "hukuk",
    title: "Uygulanacak hukuk",
    body: (
      <p>
        Bu koşullara Türkiye Cumhuriyeti hukuku uygulanır. Uyuşmazlıklarda <Blank>yetkili mahkeme</Blank> yetkilidir;
        tüketici hakem heyetlerine ve tüketici mahkemelerine başvuru hakkınız saklıdır. Sorularınız için{" "}
        <Link href="/iletisim">iletişim sayfasını</Link> kullanabilirsiniz.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Kullanım Koşulları"
      intro="e-ebeveyn'i kullanırken geçerli olan kurallar, sizin ve bizim sorumluluklarımız."
      sections={sections}
    />
  );
}
