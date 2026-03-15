import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import StructuredData from "@components/StructuredData";
import { getShowcaseForPage } from "@library/site-content";
import { buildFaqSchema, buildMetadata, buildRestaurantSchema } from "../_lib/seo";

export const metadata = buildMetadata({
  title: "Restoran u prirodi za porodicna i poslovna okupljanja",
  description:
    "Restoran Madera kod Nisa nudi prijatan ambijent, domacu kuhinju i prostor za porodicne ruckove, vecere, poslovne sastanke i dogovorene proslave.",
  path: "/restoran",
  image: "/restoran/IMG_20250921_184124.jpg",
  keywords: [
    "restoran Nis",
    "restoran u prirodi Nis",
    "porodicni rucak Nis",
    "restoran za proslave Nis",
    "Madera restoran",
  ],
});

const pageSchema = buildRestaurantSchema({
  name: "Restoran Madera",
  description:
    "Restoran Madera kod Nisa spaja domacu kuhinju, prirodno okruzenje i ugodan ambijent za svakodnevne goste i rezervacije po dogovoru.",
  path: "/restoran",
  image: "/restoran/IMG_20250921_184124.jpg",
});

const restoranFaqs = [
  {
    question: "Da li restoran Madera radi samo za proslave?",
    answer:
      "Ne. Restoran Madera je namenjen i svakodnevnim gostima, porodicnim ruckovima, vecerama i poslovnim susretima, kao i dogovorenim okupljanjima.",
  },
  {
    question: "Kako se rezervise sto ili termin za grupu?",
    answer:
      "Najjednostavnije je da pozovete telefonom, kako biste odmah proverili raspolozivost i dobili preporuku za termin ili prostor.",
  },
  {
    question: "Po cemu se restoran Madera izdvaja?",
    answer:
      "Goste najcesce privlace mirna lokacija, topao ambijent, domaca kuhinja i mogucnost da se na istoj lokaciji povezu restoran, sale i letnji sadrzaji.",
  },
];

const restoranGraph = {
  "@context": "https://schema.org",
  "@graph": [pageSchema, buildFaqSchema(restoranFaqs)].filter(Boolean),
};

export default async function RestoranPage() {
  const showcase = await getShowcaseForPage("restoran");

  return (
    <>
      <StructuredData id="madera-restoran-schema" data={restoranGraph} />
      <TemplateHeader />
      <div id="restoran-page">
        <div className="hero-section">
          <div className="background-element"></div>
          <div
            className="hero-image-desktop"
            style={{ backgroundImage: "url('/restoran/IMG_20250921_184124.jpg')" }}
            aria-hidden="true"
          ></div>
          <div className="titlos-element">
            <h1>Restoran <em>Madera</em></h1>
          </div>
          <div className="small-title">
            <p>Mesto gde mirna lokacija i dobra kuhinja daju razlog da se ostane duze</p>
          </div>
        </div>

        <div className="about-section lefko">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>RESTORAN</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Hrana, usluga i ambijent koji jednako prijaju svakodnevnom rucku i posebnim prilikama</h2>
            </div>
            <div className="section-content" data-aos="fade-up" data-aos-delay="250">
              <p>
                Restoran Madera je prostor u kome se lako prelazi iz poslovnog
                rucka u porodicno okupljanje ili veceru sa gostima. Atmosfera je
                mirna, enterijer topao, a posluzenje organizovano tako da se
                svako oseca prijatno i dobro doslo.
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
                  <img src="/restoran/IMG_20250921_184124.jpg" alt="Restoran Madera enterijer" />
                </div>
              </div>
              <div className="element-bottom-right">
                <div className="image-element parallax">
                  <img src="/restoran/IMG_20231024_175715.jpg" alt="Prilaz restoranu Madera" />
                </div>
                <div className="image-element parallax">
                  <img src="/restoran/IMG_20250919_173541.jpg" alt="Terasa restorana Madera" />
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
                  <p>STA GOSTI NAJVISE CENE</p>
                </div>
                <div className="section-bigtitle" data-aos="fade-up">
                  <h2>Restoran koji ostavlja dobar utisak bez prenaglasene formalnosti</h2>
                </div>
              </div>
              <div className="grid-element-right">
                <div className="section-bottom">
                  <div className="element-story" data-aos="fade-up" data-aos-delay="250">
                    <div className="element-story-top"><h4>Domaca i poznata kuhinja</h4></div>
                    <div className="element-story-bottom"><p>Ukusi koji prijaju sirokom krugu gostiju, uz dogovor kada je potreban meni za grupu ili dogadjaj.</p></div>
                  </div>
                  <div className="story-line"></div>
                  <div className="element-story" data-aos="fade-up" data-aos-delay="350">
                    <div className="element-story-top"><h4>Prijatan servis</h4></div>
                    <div className="element-story-bottom"><p>Ljubazan tempo usluge i prostor u kome se gosti osecaju opusteno i dobro prihvaceno.</p></div>
                  </div>
                  <div className="story-line"></div>
                  <div className="element-story" data-aos="fade-up" data-aos-delay="450">
                    <div className="element-story-top"><h4>Ambijent u prirodi</h4></div>
                    <div className="element-story-bottom"><p>Terasa i okolina doprinose utisku da ste izdvojeni od gradske guzve, a ipak blizu Nisa.</p></div>
                  </div>
                  <div className="story-line"></div>
                </div>
                <a href="/kontakt" className="button" data-aos="fade-up" data-aos-delay="550">Rezervisi sto ili posalji upit</a>
              </div>
            </div>
          </div>
        </div>

        <ImmersiveGallery {...showcase} />

        <div className="faq-section">
          <div className="pagewrapbig">
            <div className="section-bottom">
              <div className="faq-container">
                {restoranFaqs.map((item, idx) => (
                  <div className="faq" key={`restoran-faq-${idx}`}>
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
          <div className="opportunity-background" style={{ backgroundImage: "url('/restoran/IMG_20250921_184124.jpg')" }}></div>
          <div className="background-filter"></div>
          <div className="opportunity-content">
            <div className="pagewrap">
              <div className="section-title"><p>DOZIVLJAJ RESTORANA</p></div>
              <div className="section-bigtitle">
                <h1>Mesto za rucak, veceru ili dogovor koji zelite da odrzi <em>dobar ton i meru</em></h1>
              </div>
              <div className="section-content">
                <p>Pozovite kada zelite da brzo proverite termin za rucak, veceru ili dolazak vece grupe gostiju.</p>
              </div>
              <a href="tel:+381607180659" className="button">Pozovi restoran</a>
            </div>
          </div>
        </div>
      </div>
      <TemplateFooter />
    </>
  );
}
