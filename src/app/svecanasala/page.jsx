import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import StructuredData from "@components/StructuredData";
import { getHallBookingEnabled, getShowcaseForPage } from "@library/site-content";
import { buildEventVenueSchema, buildFaqSchema, buildMetadata } from "../_lib/seo";

export const metadata = buildMetadata({
  title: "Svecane sale za vencanja, rodjendane i poslovne dogadjaje",
  description:
    "Svecane sale Madera kod Nisa nude elegantan prostor za vencanja, krstenja, rodjendane, jubileje i poslovne dogadjaje uz podrsku tima i dogovor oko organizacije.",
  path: "/svecanasala",
  image: "/svecanasala/IMG_20250919_161505.jpg",
  keywords: [
    "svecana sala Nis",
    "vencanja Nis",
    "sala za proslave Nis",
    "krstenja Nis",
    "poslovni dogadjaji Nis",
  ],
});

const pageSchema = buildEventVenueSchema({
  name: "Svecane sale Madera",
  description:
    "Velika i mala svecana sala Madera kod Nisa za vencanja, rodjendane, krstenja, jubileje i poslovna okupljanja.",
  path: "/svecanasala",
  image: "/svecanasala/IMG_20250919_161505.jpg",
});

const saleFaqs = [
  {
    question: "Za koje proslave su pogodne svecane sale Madera?",
    answer:
      "Velika i mala sala Madera prilagodjene su vencanjima, rodjendanima, krstenjima, jubilejima i poslovnim okupljanjima, u zavisnosti od broja gostiju i formata dogadjaja.",
  },
  {
    question: "Kako se proverava dostupnost termina?",
    answer:
      "Najbrzi nacin je telefonski poziv, kada odmah mozete proveriti okvirnu dostupnost termina i dobiti smernice za sledeci korak.",
  },
  {
    question: "Da li Madera pomaze oko organizacije sale i rasporeda?",
    answer:
      "Da. Tim Madera pomaze oko izbora sale, rasporeda gostiju, osnovnog toka veceri i uskladjivanja usluge sa tipom proslave.",
  },
];

const pageGraph = {
  "@context": "https://schema.org",
  "@graph": [pageSchema, buildFaqSchema(saleFaqs)].filter(Boolean),
};

export default async function SvecanaSalaPage() {
  const [showcase, hallBookingEnabled] = await Promise.all([
    getShowcaseForPage("svecanasala"),
    getHallBookingEnabled(),
  ]);

  return (
    <>
      <StructuredData id="madera-svecanasala-schema" data={pageGraph} />
      <TemplateHeader />
      <div id="svecanasala-page">
        <div className="hero-section">
          <div className="background-element"></div>
          <div
            className="hero-image-desktop"
            style={{ backgroundImage: "url('/svecanasala/IMG_20250919_161505.jpg')" }}
            aria-hidden="true"
          ></div>
          <div className="titlos-element">
            <h1>Svecane sale <em>Madera</em></h1>
          </div>
          <div className="small-title">
            <p>Elegantna pozornica za velike trenutke i proslave koje se pamte</p>
          </div>
        </div>

        <div className="about-section lefko">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>SVECANE SALE</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Prostor koji se prilagodjava vasem povodu, broju gostiju i utisku koji zelite da ostavite</h2>
            </div>
            <div className="section-content" data-aos="fade-up" data-aos-delay="250">
              <p>
                U Maderi su na raspolaganju velika i mala sala, pa lako birate
                da li vam je potrebna reprezentativna scena za veliko slavlje ili
                topliji ambijent za porodicno okupljanje. Organizacija ostaje
                pregledna, a prostor uredjen i spreman za vazan dan.
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
                  <img src="/svecanasala/IMG_20250919_161505.jpg" alt="Velika svecana sala Madera" />
                </div>
              </div>
              <div className="element-bottom-right">
                <div className="image-element parallax">
                  <img src="/svecanasala/20240429_155233_0000.png" alt="Mala sala Madera" />
                </div>
                <div className="image-element parallax">
                  <img src="/svecanasala/IMG_20250918_165826.jpg" alt="Detalji dekoracije u sali Madera" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sustainability-section lefko">
          <div className="pagewrap">
            <div className="grid-2-elements">
              <div className="grid-element-left">
                <div className="section-title" data-aos="fade-up">
                  <p>DOGADJAJI</p>
                </div>
                <div className="section-bigtitle" data-aos="fade-up">
                  <h2>Sale za trenutke koji traze i lepotu prostora i sigurnost organizacije</h2>
                </div>
              </div>
              <div className="grid-element-right">
                <div className="section-bottom">
                  <div className="element-story" data-aos="fade-up" data-aos-delay="250">
                    <div className="element-story-top"><h4>Vencanja i velike proslave</h4></div>
                    <div className="element-story-bottom"><p>Prostor koji izgleda reprezentativno na docek, ceremoniju, fotografije i zavrsetak veceri.</p></div>
                  </div>
                  <div className="story-line"></div>
                  <div className="element-story" data-aos="fade-up" data-aos-delay="350">
                    <div className="element-story-top"><h4>Porodicna slavlja</h4></div>
                    <div className="element-story-bottom"><p>Topla atmosfera za rodjendane, krstenja, jubileje i okupljanja vise generacija.</p></div>
                  </div>
                  <div className="story-line"></div>
                  <div className="element-story" data-aos="fade-up" data-aos-delay="450">
                    <div className="element-story-top"><h4>Poslovni dogadjaji</h4></div>
                    <div className="element-story-bottom"><p>Uredan raspored i ozbiljan ambijent za ruckove, proslave firmi i formalna okupljanja.</p></div>
                  </div>
                  <div className="story-line"></div>
                </div>
                <a href="/kontakt" className="button" data-aos="fade-up" data-aos-delay="550">
                  {hallBookingEnabled ? "Zakazi obilazak i termin" : "Pozovi za dostupnost"}
                </a>
              </div>
            </div>
          </div>
        </div>

        <ImmersiveGallery {...showcase} />

        <div className="faq-section">
          <div className="pagewrapbig">
            <div className="section-bottom">
              <div className="faq-container">
                {saleFaqs.map((item, idx) => (
                  <div className="faq" key={`sale-faq-${idx}`}>
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
          <div className="opportunity-background" style={{ backgroundImage: "url('/svecanasala/IMG_20250918_165838.jpg')" }}></div>
          <div className="background-filter"></div>
          <div className="opportunity-content">
            <div className="pagewrap">
              <div className="section-title"><p>UTISAK KOJI OSTAJE</p></div>
              <div className="section-bigtitle">
                <h1>Sala koja izgleda svecano, a funkcionise <em>bez improvizacije</em></h1>
              </div>
              <div className="section-content">
                <p>Javite datum i broj gostiju, a najbrze cemo vas usmeriti telefonom ka sali i organizaciji koja vam najvise odgovara.</p>
              </div>
              <a href="tel:+381607180659" className="button">Pozovi za termin</a>
            </div>
          </div>
        </div>
      </div>
      <TemplateFooter />
    </>
  );
}
