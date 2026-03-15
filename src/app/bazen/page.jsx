import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import StructuredData from "@components/StructuredData";
import { getShowcaseForPage } from "@library/site-content";
import { buildMetadata, buildPoolSchema } from "../_lib/seo";

export const metadata = buildMetadata({
  title: "Letnji bazen i relax zona u okviru kompleksa Madera",
  description:
    "Letnji bazen Madera kod Nisa donosi opustanje, osvezenje i dodatni sadrzaj u okviru kompleksa, idealan za dnevni predah i letnja okupljanja.",
  path: "/bazen",
  image: "/img/4.jpg",
  keywords: [
    "bazen Nis",
    "letnji bazen Nis",
    "relax zona Nis",
    "Madera bazen",
    "bazen kod Nisa",
  ],
});

const pageSchema = buildPoolSchema({
  name: "Letnji bazen Madera",
  description:
    "Letnji bazen Madera kod Nisa upotpunjuje ponudu kompleksa kao sezonski prostor za osvezenje, odmor i opustenu atmosferu.",
  path: "/bazen",
  image: "/img/4.jpg",
});

export default async function BazenPage() {
  const showcase = await getShowcaseForPage("bazen");

  return (
    <>
      <StructuredData id="madera-bazen-schema" data={pageSchema} />
      <TemplateHeader />
      <div id="bazen-page">
        <div className="hero-section">
          <div className="background-element"></div>
          <div
            className="hero-image-desktop"
            style={{ backgroundImage: "url('/img/4.jpg')" }}
            aria-hidden="true"
          ></div>
          <div className="titlos-element">
            <h1>Letnji bazen <em>Madera</em></h1>
          </div>
          <div className="small-title">
            <p>Sezonski prostor za osvezenje i predah u mirnom ambijentu</p>
          </div>
        </div>

        <div className="about-section lefko">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>LETNJI SADRZAJ</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Bazen koji Maderi daje opusteniji ritam tokom toplih meseci</h2>
            </div>
            <div className="section-content" data-aos="fade-up" data-aos-delay="250">
              <p>
                Uz restoran i svecane sale, letnji bazen dopunjuje ponudu Madera
                kompleksa kao prostor za osvezenje, mirniji dnevni boravak i
                prijatan letnji predah. Ambijent ostaje uredjen, pregledan i
                prijatan za goste koji zele da uspore tempo i provedu dan lepo.
              </p>
            </div>
          </div>
        </div>

        <div className="scroll-section">
          <div className="pagewrap">
            <div className="element-top">
              <img src="/img/ui/madera-logo.png" alt="Madera" />
            </div>
            <div className="element-bottom">
              <div className="element-bottom-left">
                <div className="image-element parallax">
                  <img src="/sobe/IMG_20230906_180646.jpg" alt="Relax zona Madera bazena" />
                </div>
              </div>
              <div className="element-bottom-right">
                <div className="image-element parallax">
                  <img src="/sobe/IMG_20230906_180741.jpg" alt="Dodatni kadar relax zone Madera" />
                </div>
                <div className="image-element parallax">
                  <img src="/sobe/IMG_20230906_180904.jpg" alt="Letnji ambijent Madera kompleksa" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ImmersiveGallery {...showcase} />

        <div className="opportunity-section">
          <div className="opportunity-background" style={{ backgroundImage: "url('/img/4.jpg')" }}></div>
          <div className="background-filter"></div>
          <div className="opportunity-content">
            <div className="pagewrap">
              <div className="section-title"><p>LETNJI UZITAK</p></div>
              <div className="section-bigtitle">
                <h1>Mesto za predah koje uz restoran i sale zaokruzuje <em>Madera iskustvo</em></h1>
              </div>
              <div className="section-content">
                <p>Kontaktirajte nas za informacije o sezoni, dostupnosti i nacinu koriscenja letnjih sadrzaja.</p>
              </div>
              <a href="/kontakt" className="button">Posaljite upit</a>
            </div>
          </div>
        </div>
      </div>
      <TemplateFooter />
    </>
  );
}
