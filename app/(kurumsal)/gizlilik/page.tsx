import type { Metadata } from "next";
import Link from "next/link";
import { Blank, LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Gizlilik ve KVKK | e-ebeveyn",
  description: "e-ebeveyn'in kişisel verileri nasıl işlediğini ve KVKK kapsamındaki haklarınızı anlatan aydınlatma metni.",
};

// Taslak: 6698 sayılı KVKK'nın 5, 6, 9, 10, 11, 13 ve 14. maddelerine göre hazırlandı, hukuki görüş değildir.
const sections: LegalSection[] = [
  {
    id: "veri-sorumlusu",
    title: "Veri sorumlusu",
    body: (
      <p>
        e-ebeveyn, <Blank>şirket unvanı</Blank> (<Blank>adres</Blank>, MERSİS: <Blank>numara</Blank>) tarafından
        işletilir. Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun 10. maddesi uyarınca veri sorumlusu
        olarak sizi bilgilendirmek için hazırlanmıştır.
      </p>
    ),
  },
  {
    id: "islenen-veriler",
    title: "Hangi verileri işliyoruz?",
    body: (
      <>
        <ul>
          <li>
            <strong>Hesap bilgileri:</strong> ad soyad, e-posta adresi ve şifrenizin şifrelenmiş hâli.
          </li>
          <li>
            <strong>Dönem bilgisi:</strong> üye olurken isteğe bağlı olarak seçtiğiniz hamilelik veya bebek dönemi.
          </li>
          <li>
            <strong>Paylaşımlarınız:</strong> forum yazılarınız ve asistana sorduğunuz sorular.
          </li>
          <li>
            <strong>İletişim bilgileri:</strong> iletişim formunda yazdığınız ad, e-posta ve mesaj.
          </li>
          <li>
            <strong>Kullanım ve cihaz bilgileri:</strong> IP adresi, tarayıcı türü, ziyaret kayıtları ve çerez verileri.
          </li>
        </ul>
        <p>
          Ana sayfadaki doğum tarihi hesabı tarayıcınızda yapılır. Seçtiğiniz tarih bize ulaşmaz ve kaydedilmez.
        </p>
      </>
    ),
  },
  {
    id: "saglik-ve-cocuk",
    title: "Sağlık ve çocuk verileri",
    body: (
      <>
        <p>
          Hamilelik, doğum ve bebeğinizin sağlığı hakkında yazdıklarınız KVKK&apos;nın 6. maddesi kapsamında özel nitelikli
          kişisel veri sayılabilir. Bu verileri yalnızca Kanun&apos;un öngördüğü şartlarla işleriz.
        </p>
        <p>
          Hizmet ebeveynlere yöneliktir; çocukların doğrudan hesap açması beklenmez. Forumda bebeğinizin adı, fotoğrafı
          veya sağlık kayıtları gibi kimliğini belli eden bilgileri paylaşmamanızı öneririz.
        </p>
      </>
    ),
  },
  {
    id: "amaclar",
    title: "Verileri neden işliyoruz?",
    body: (
      <ul>
        <li>Üyelik oluşturmak ve hesabınızı yönetmek</li>
        <li>İçerikleri bebeğinizin dönemine göre göstermek</li>
        <li>Forum ve asistan gibi özellikleri çalıştırmak</li>
        <li>Sorularınıza ve başvurularınıza yanıt vermek</li>
        <li>Hizmetin güvenliğini sağlamak ve kötüye kullanımı önlemek</li>
        <li>Hizmeti ücretsiz tutan reklamları göstermek</li>
        <li>Yasal yükümlülükleri yerine getirmek</li>
      </ul>
    ),
  },
  {
    id: "hukuki-sebepler",
    title: "Hukuki sebepler",
    body: (
      <>
        <p>
          Verilerinizi KVKK&apos;nın 5. maddesindeki şu sebeplere dayanarak işleriz: sözleşmenin kurulması ve ifası, hukuki
          yükümlülüklerin yerine getirilmesi, temel hak ve özgürlüklerinize zarar vermemek kaydıyla meşru menfaatlerimiz
          ve gereken durumlarda açık rızanız.
        </p>
        <p>
          Kişiselleştirilmiş reklam ve ticari elektronik ileti için onayınızı ayrıca alırız. Onayınızı istediğiniz zaman
          geri çekebilirsiniz.
        </p>
      </>
    ),
  },
  {
    id: "aktarim",
    title: "Veriler kimlere aktarılır?",
    body: (
      <>
        <p>
          Hizmeti sunmak için çalıştığımız barındırma, e-posta, analiz ve reklam sağlayıcılarıyla (<Blank>sağlayıcı
          listesi</Blank>) gerektiği kadar veri paylaşılır. Yasal zorunluluk varsa yetkili kurum ve kuruluşlara da
          aktarım yapılabilir.
        </p>
        <p>
          Sağlayıcının yurt dışında olması hâlinde aktarım KVKK&apos;nın 9. maddesindeki şartlara uygun yapılır:{" "}
          <Blank>ülke ve dayanak</Blank>.
        </p>
      </>
    ),
  },
  {
    id: "saklama",
    title: "Ne kadar saklıyoruz?",
    body: (
      <p>
        Verileri işleme amacı devam ettiği sürece ve mevzuatın öngördüğü süreler boyunca saklarız: <Blank>veri türüne göre
        saklama süreleri</Blank>. Süre dolduğunda veriler silinir, yok edilir veya anonim hâle getirilir.
      </p>
    ),
  },
  {
    id: "cerezler",
    title: "Çerezler",
    body: (
      <p>
        Oturumunuzu açık tutmak gibi zorunlu işler için çerez kullanırız. Analiz ve reklam çerezleri için tercihinizi
        ayrıca sorarız: <Blank>çerez listesi ve tercih yönetimi</Blank>. Tarayıcı ayarlarınızdan da çerezleri
        silebilirsiniz.
      </p>
    ),
  },
  {
    id: "haklariniz",
    title: "Haklarınız",
    body: (
      <>
        <p>KVKK&apos;nın 11. maddesi uyarınca şu haklara sahipsiniz:</p>
        <ul>
          <li>Verilerinizin işlenip işlenmediğini öğrenmek ve işlendiyse bilgi istemek</li>
          <li>İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenmek</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı kişileri bilmek</li>
          <li>Eksik veya yanlış işlenen verilerin düzeltilmesini istemek</li>
          <li>Şartları oluştuğunda verilerin silinmesini veya yok edilmesini istemek</li>
          <li>Düzeltme ve silme işlemlerinin aktarılan kişilere bildirilmesini istemek</li>
          <li>Yalnızca otomatik sistemlerle yapılan analiz sonucu aleyhinize çıkan bir sonuca itiraz etmek</li>
          <li>Kanuna aykırı işleme nedeniyle zarara uğradıysanız zararın giderilmesini talep etmek</li>
        </ul>
      </>
    ),
  },
  {
    id: "basvuru",
    title: "Nasıl başvurabilirsiniz?",
    body: (
      <p>
        Başvurunuzu <Blank>KVKK başvuru e-postası</Blank> veya <Blank>posta adresi</Blank> üzerinden yazılı olarak
        iletebilirsiniz; <Link href="/iletisim">iletişim sayfasından</Link> da bize ulaşabilirsiniz. Başvurunuz en geç 30
        gün içinde sonuçlandırılır. Yanıtı yetersiz bulursanız Kişisel Verileri Koruma Kurulu&apos;na şikâyette
        bulunabilirsiniz.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Gizlilik ve KVKK"
      intro="Hangi verilerinizi neden işlediğimizi, kimlerle paylaştığımızı ve verileriniz üzerindeki haklarınızı burada anlatıyoruz."
      sections={sections}
    />
  );
}
