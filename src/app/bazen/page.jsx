import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import StructuredData from "@components/StructuredData";
import { getShowcaseForPage } from "@library/site-content";
import { buildFaqSchema, buildMetadata, buildPoolSchema } from "../_lib/seo";

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

const bazenFaqs = [
  {
    question: "Da li je bazen poseban sadrzaj u okviru Madera kompleksa?",
    answer:
      "Da. Letnji bazen je sezonski deo Madera ponude i dopunjuje restoran i svecane sale kao prostor za osvezenje i opusteniji boravak.",
  },
  {
    question: "Kako mogu da dobijem informacije o sezoni i dostupnosti?",
    answer:
      "Najbrzi nacin je da pozovete telefonom i proverite aktuelne informacije, termine i nacin koriscenja letnjih sadrzaja.",
  },
  {
    question: "Kakav je ambijent bazena?",
    answer:
      "Ambijent je miran i prirodan, sa uredjenom relax zonom i atmosferom koja vise odgovara odmoru i laganijem boravku nego gradskoj guzvi.",
  },
];

const bazenGraph = {
  "@context": "https://schema.org",
  "@graph": [pageSchema, buildFaqSchema(bazenFaqs)].filter(Boolean),
};

export default async function BazenPage() {
  const showcase = await getShowcaseForPage("bazen");

  return (
    <>
      <StructuredData id="madera-bazen-schema" data={bazenGraph} />
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

        <div className="faq-section">
          <div className="pagewrapbig">
            <div className="section-bottom">
              <div className="faq-container">
                {bazenFaqs.map((item, idx) => (
                  <div className="faq" key={`bazen-faq-${idx}`}>
                    <div className="faq-inside">
                      <div className="faq-question">
                        <h3>{item.question.toUpperCase()}</h3>
                        <div className="faq-btn">
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
                <p>Pozovite za aktuelne informacije o sezoni, dostupnosti i nacinu koriscenja letnjih sadrzaja.</p>
              </div>
              <a href="tel:+381607180659" className="button">Pozovi za informacije</a>
            </div>
          </div>
        </div>
      </div>
      <TemplateFooter />
    </>
  );
}
