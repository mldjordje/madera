import Image from "next/image";
import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import MobileFirstShowcase from "@components/sections/MobileFirstShowcase";
import StructuredData from "@components/StructuredData";
import { pageShowcaseContent } from "@data/showcase-content";
import {
  buildEventVenueSchema,
  buildFaqSchema,
  buildMetadata,
  buildPoolSchema,
  buildRestaurantSchema,
  buildWebSiteSchema,
} from "../_lib/seo";

export const metadata = buildMetadata({
  title: "Svecane sale, restoran i letnji bazen kod Nisa",
  description:
    "Madera je mesto kod Nisa za vencanja, rodjendane, porodicne i poslovne dogadjaje, uz restoran, svecane sale i letnji bazen u mirnom ambijentu.",
  path: "/",
  image: "/img/4.jpg",
  keywords: [
    "Madera Nis",
    "svecana sala Nis",
    "restoran za proslave Nis",
    "vencanja kod Nisa",
    "letnji bazen Nis",
  ],
});

const homeFaqs = [
  {
    question: "Koje vrste proslava mozete organizovati u Maderi?",
    answer:
      "U Maderi se organizuju vencanja, rodjendani, krstenja, jubileji, poslovni dogadjaji i druga privatna okupljanja, uz izbor sale i menija prema broju gostiju.",
  },
  {
    question: "Da li Madera ima vise prostora za razlicite tipove gostiju?",
    answer:
      "Da. Gostima su na raspolaganju dve svecane sale, restoran za svakodnevne ili dogovorene obroke i letnji bazen kao dodatni sadrzaj tokom toplijih meseci.",
  },
  {
    question: "Kako izgleda rezervacija termina?",
    answer:
      "Dovoljno je da posaljete okviran datum, broj gostiju i povod. Tim Madera zatim predlaze odgovarajuci prostor, osnovni model usluge i sledece korake do potvrde termina.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebSiteSchema(),
    buildEventVenueSchema({
      name: "Svecane sale Madera",
      description:
        "Svecane sale Madera kod Nisa namenjene su vencanjima, rodjendanima, krstenjima i poslovnim dogadjajima.",
      path: "/",
      image: "/svecanasala/IMG_20250919_161505.jpg",
    }),
    buildRestaurantSchema({
      name: "Restoran Madera",
      description:
        "Restoran Madera spaja domacu kuhinju, miran ambijent i prostor za porodicne i poslovne susrete kod Nisa.",
      path: "/",
      image: "/restoran/IMG_20250921_184124.jpg",
    }),
    buildPoolSchema({
      name: "Letnji bazen Madera",
      description:
        "Letnji bazen Madera dopunjuje ponudu kompleksa za opustanje, dnevni odmor i osvezenje tokom sezone.",
      path: "/",
      image: "/img/4.jpg",
    }),
    buildFaqSchema(homeFaqs),
  ].filter(Boolean),
};

export default function HomePage() {
  return (
    <>
      <StructuredData id="madera-home-schema" data={pageSchema} />
      <TemplateHeader />

      <div id="homepage">
        <div className="hero-section">
          <div className="background-element"></div>
          <div
            className="hero-image-desktop"
            style={{ backgroundImage: "url('/img/4.jpg')" }}
            aria-hidden="true"
          ></div>
          <div className="hero-shorts-mobile" aria-hidden="true">
            <iframe
              src="https://www.youtube.com/embed/05MQ4uFPUAA?autoplay=1&mute=1&loop=1&playlist=05MQ4uFPUAA&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
              title="Hotel Restoran Madera video"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="titlos-element">
            <h1>
              Hotel-Restoran <em>Madera</em>
            </h1>
          </div>
          <div className="small-title">
            <p>Proslave, restoran i letnji predah u prirodi nadomak Nisa</p>
          </div>
        </div>

        <div className="about-section">
          <div className="pagewrap">
            <div className="section-title">
              <p>MADERA</p>
            </div>
            <div className="section-bigtitle">
              <h2>
                Mesto gde se elegantne proslave, dobra hrana i mirna lokacija
                spajaju u jedno iskustvo.
              </h2>
            </div>
            <div className="section-subtitle">
              <h4>
                Za vencanja, rodjendane, krstenja, porodicne ruckove i poslovna
                okupljanja sa jasnom organizacijom.
              </h4>
            </div>
            <div className="home-intro-copy">
              <p>
                Madera nije samo prostor za rezervaciju, vec tim koji paze na
                ritam dogadjaja, utisak gostiju i svaki detalj koji domacinu
                donosi mir. Od prvog razgovora do poslednjih gostiju, cilj nam
                je da sve izgleda skladno, prirodno i dostojno prilike.
              </p>
            </div>
          </div>
        </div>

        <MobileFirstShowcase />

        <section className="madera-quick-facts">
          <div className="pagewrap">
            <div className="madera-quick-facts__grid">
              {[
                {
                  value: "2",
                  label: "Svecane sale",
                  text: "Velika i mala sala za intimne proslave i veca slavlja.",
                },
                {
                  value: "1",
                  label: "Restoran",
                  text: "Prijatan ambijent za svakodnevne goste i dogovorene menije.",
                },
                {
                  value: "1",
                  label: "Letnji bazen",
                  text: "Dodatni sadrzaj koji upotpunjuje boravak tokom sezone.",
                },
                {
                  value: "Brzo",
                  label: "Planiranje",
                  text: "Jasan dogovor oko termina, broja gostiju i modela usluge.",
                },
              ].map((fact, idx) => (
                <article className="madera-quick-facts__card" key={`fact-${idx}`}>
                  <p className="madera-quick-facts__value">{fact.value}</p>
                  <h4>{fact.label}</h4>
                  <p>{fact.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="madera-story-section">
          <div className="pagewrap">
            <div className="grid-2-elements">
              <div className="story-copy" data-aos="fade-up">
                <div className="section-title">
                  <p>ISKUSTVO GOSTA</p>
                </div>
                <div className="section-bigtitle">
                  <h2>Kako izgleda dan kada organizaciju prepustite <em>Maderi</em></h2>
                </div>
                <p>
                  Prvo biramo prostor koji odgovara povodu i broju gostiju, zatim
                  uskladjujemo posluzenje, tok veceri i detalje koji su domacinu
                  vazni. Sve je postavljeno tako da atmosfera ostane prirodna, a
                  organizacija pregledna.
                </p>
                <p>
                  Zato gosti Maderu pamte po toplini ambijenta, dobroj hrani i
                  osecaju da je svaka proslava vodjena sa merom i ukusom.
                </p>
              </div>
              <div className="story-points" data-aos="fade-up" data-aos-delay="200">
                <div className="point-item">
                  <h4>Jasan dogovor od starta</h4>
                  <p>Odmah znate koji prostor, koji kapacitet i koji tip usluge najbolje odgovara vasem planu.</p>
                </div>
                <div className="point-item">
                  <h4>Tim koji nosi organizaciju</h4>
                  <p>Na licu mesta imate podrsku ljudi koji brinu o tempu, servisu i utisku gostiju.</p>
                </div>
                <div className="point-item">
                  <h4>Ambijent koji lepo izgleda uzivo i na fotografijama</h4>
                  <p>Prirodno okruzenje, uredjeni enterijeri i vise scena za uspomene koje ostaju.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-section">
          <div className="pagewrap">
            <div className="element-top">
              <Image src="/img/ui/madera-logo.png" alt="Madera" width={230} height={88} />
            </div>
            <div className="element-bottom">
              <div className="element-bottom-left">
                <div className="image-element parallax">
                  <Image src="/restoran/IMG_20250921_184124.jpg" alt="Restoran Madera" width={1600} height={1100} />
                </div>
              </div>
              <div className="element-bottom-right">
                <div className="image-element parallax">
                  <Image src="/svecanasala/IMG_20250919_161505.jpg" alt="Svecana sala Madera" width={1600} height={1100} />
                </div>
                <div className="image-element parallax">
                  <Image src="/img/gallery/3.jpg" alt="Letnji ambijent Madera" width={1400} height={960} />
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
                  <p>PROSLAVE I BORAVAK</p>
                </div>
                <div className="section-bigtitle" data-aos="fade-up">
                  <h2>Dve sale, restoran i sezonski sadrzaji u jednom kompleksu</h2>
                </div>
                <div className="section-content" data-aos="fade-up">
                  <h3>Pravi izbor kada zelite lepo mesto i sigurnu organizaciju.</h3>
                  <p>
                    Bilo da planirate intimno porodicno slavlje ili veci
                    dogadjaj, Madera objedinjuje prostore i uslugu tako da sve
                    ostane pregledno, skladno i prijatno za goste.
                  </p>
                </div>
                <a href="/kontakt" className="button" data-aos="fade-up">
                  Proveri termin
                </a>
              </div>

              <div className="grid-element-right">
                <div className="section-title" data-aos="fade-up">
                  <p>STA GOSTI DOCEKAJU</p>
                </div>

                <div className="section-bottom">
                  <div className="element-story" data-aos="fade-up" data-aos-delay="250">
                    <div className="element-story-top">
                      <h4>Mala sala</h4>
                    </div>
                    <div className="element-story-bottom">
                      <p>Topao prostor za porodicne proslave, krstenja i manja okupljanja.</p>
                    </div>
                  </div>

                  <div className="story-line" data-aos="fade-up" data-aos-delay="300"></div>

                  <div className="element-story" data-aos="fade-up" data-aos-delay="350">
                    <div className="element-story-top">
                      <h4>Velika sala</h4>
                    </div>
                    <div className="element-story-bottom">
                      <p>Reprezentativan ambijent za vencanja, jubileje i poslovne veceri.</p>
                    </div>
                  </div>

                  <div className="story-line" data-aos="fade-up" data-aos-delay="400"></div>

                  <div className="element-story" data-aos="fade-up" data-aos-delay="450">
                    <div className="element-story-top">
                      <h4>Letnji bazen i terasa</h4>
                    </div>
                    <div className="element-story-bottom">
                      <p>Sezonski predah koji Maderi daje dodatnu sirinu i opustenu notu.</p>
                    </div>
                  </div>

                  <div className="story-line" data-aos="fade-up" data-aos-delay="500"></div>
                </div>

                <a href="/svecanasala" className="button" data-aos="fade-up" data-aos-delay="550">
                  Pogledaj sale
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="madera-service-strip lefko">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>USLUGA KOJA ULIVA POVERENJE</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Od prvog pitanja do poslednjeg gosta imate jasnu podrsku</h2>
            </div>
            <div className="madera-service-strip__grid">
              {[
                {
                  title: "Predlog prostora",
                  text: "Preporuka sale i rasporeda prema povodu, broju gostiju i zeljenoj atmosferi.",
                },
                {
                  title: "Meni po meri dogadjaja",
                  text: "Dogovor oko posluzivanja i ritma obroka tako da sve prati tok proslave.",
                },
                {
                  title: "Precizan plan veceri",
                  text: "Laksa koordinacija dolaska gostiju, posluzenja i najvaznijih trenutaka.",
                },
                {
                  title: "Tim na licu mesta",
                  text: "Podrska tokom dogadjaja kako bi domacin mogao da se posveti gostima.",
                },
              ].map((item, idx) => (
                <article key={`service-${idx}`} className="madera-service-strip__card" data-aos="fade-up" data-aos-delay={120 + idx * 80}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ImmersiveGallery {...pageShowcaseContent.home} />

        <section className="madera-flow-section">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>KAKO REZERVACIJA TECE</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Proces koji je jednostavan i za domacine i za tim Madera</h2>
            </div>
            <div className="madera-flow-section__grid">
              {[
                { step: "01", title: "Prvi kontakt", text: "Javite datum, povod i okviran broj gostiju da odmah procenimo najbolju opciju." },
                { step: "02", title: "Predlog resenja", text: "Dobijate preporuku prostora, model usluge i osnovni pravac organizacije." },
                { step: "03", title: "Dogovor detalja", text: "Potvrdjujemo meni, raspored i sve sto je vazno za tok dogadjaja." },
                { step: "04", title: "Dan realizacije", text: "Tim preuzima operativni deo, a vi docekate goste rastereceno." },
              ].map((item, idx) => (
                <article className="madera-flow-section__card" key={`flow-${idx}`} data-aos="fade-up" data-aos-delay={130 + idx * 90}>
                  <span>{item.step}</span>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="faq-section">
          <div className="pagewrapbig">
            <div className="section-top">
              <div className="flex-elements">
                <div className="flex-element-left">
                  <Image src="/img/ui/madera-logo.png" alt="Madera" width={328} height={126} />
                </div>
                <div className="flex-element-right">
                  <a href="/kontakt" className="button white">Posalji upit</a>
                </div>
              </div>
            </div>

            <div className="section-bottom">
              <div className="faq-container">
                {homeFaqs.map((item, idx) => (
                  <div className="faq" key={`faq-${idx}`}>
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
          <div className="opportunity-background" style={{ backgroundImage: "url('/restoran/IMG_20250919_174921.jpg')" }}></div>
          <div className="background-filter"></div>
          <div className="opportunity-content">
            <div className="pagewrap">
              <div className="section-title"> <p>ZASTO GOSTI BIRAJU MADERU</p> </div>
              <div className="section-bigtitle">
                <h1>Ambijent koji deluje otmeno, a ostaje <em>topao i prijatan</em></h1>
              </div>
              <div className="section-content">
                <p>U Maderi dobijate prostor koji ostavlja utisak i uslugu koja olaksava svaki vazan trenutak.</p>
              </div>
              <a href="/kontakt" className="button">Zatrazite ponudu</a>
            </div>
          </div>
        </div>

        <div className="location-section lefko">
          <div className="pagewrap">
            <div className="section-elements-top">
              <div className="location-content">
                <div className="section-title" data-aos="fade-up">
                  <p>LOKACIJA</p>
                  <Image src="/img/ui/madera-logo.png" alt="Madera" width={120} height={46} />
                </div>
                <div className="section-bigtitle">
                  <h1>Mirno okruzenje koje gostima daje <em>osecaj izdvojenosti</em></h1>
                </div>
                <div className="section-content">
                  <p>Blizina Nisa i ambijent u prirodi cine Maderu prakticnim izborom za goste koji zele lako dostupan, a ipak poseban prostor.</p>
                </div>
                <a href="/kontakt" className="button">Kako do nas</a>
              </div>
            </div>

            <div className="section-elements-bottom">
              <div className="grid-2-elements">
                <div className="grid-element-left parallax" data-aos="fade-up">
                  <Image src="/restoran/IMG_20250919_173541.jpg" alt="Okruzenje Madera restorana" width={1500} height={1000} />
                </div>
                <div className="grid-element-right parallax" data-aos="fade-up">
                  <Image src="/img/gallery/6.jpg" alt="Letnji ambijent Madera kompleksa" width={1500} height={1000} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="madera-benefits-section lefko">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>PREDNOSTI</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Razlozi zbog kojih se u <em>Maderu</em> dolazi sa poverenjem</h2>
            </div>
            <div className="madera-benefits-grid">
              {[
                {
                  title: "Ambijent za vazne trenutke",
                  text: "Prostor ostavlja lep prvi utisak, ali je dovoljno prijatan da se gosti brzo opuste.",
                },
                {
                  title: "Hrana koja prati povod",
                  text: "Od svakodnevnog restoranskog uzivanja do organizovanih menija za proslave i veca okupljanja.",
                },
                {
                  title: "Jedna lokacija, vise mogucnosti",
                  text: "Sale, restoran i letnji sadrzaji omogucavaju da Madera prati razlicite scenarije dogadjaja.",
                },
              ].map((item, idx) => (
                <div className="benefit-card" key={`benefit-${idx}`} data-aos="fade-up" data-aos-delay={150 + idx * 100}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="madera-packages-section">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>IDEJE ZA REZERVACIJU</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Tipovi dogadjaja koje gosti najcesce planiraju u Maderi</h2>
            </div>
            <div className="madera-packages-grid">
              {[
                {
                  name: "Porodicna proslava",
                  details: "Mala sala ili restoran, opustena atmosfera i dogovor oko menija prema gostima i terminu.",
                },
                {
                  name: "Svadba ili veliko slavlje",
                  details: "Velika sala, sveobuhvatna organizacija i prostor koji izgleda reprezentativno od doceka do zavrsetka veceri.",
                },
                {
                  name: "Poslovno okupljanje",
                  details: "Mirno okruzenje i uredan raspored za rucak, sastanak, prezentaciju ili timsko obelezavanje vaznih trenutaka.",
                },
              ].map((item, idx) => (
                <div className="package-item" key={`package-${idx}`} data-aos="fade-up" data-aos-delay={200 + idx * 100}>
                  <h4>{item.name}</h4>
                  <p>{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="madera-cta-strip">
          <div className="pagewrap">
            <div className="cta-strip-inner" data-aos="fade-up">
              <div className="cta-copy">
                <h3>Imate datum ili samo ideju od koje zelite da krenete?</h3>
                <p>Posaljite upit i dobicete brz odgovor sa predlogom prostora i sledecih koraka.</p>
              </div>
              <div className="cta-actions">
                <a href="/kontakt" className="button white">Posalji upit</a>
                <a href="tel:+381607180659" className="button white">Pozovi odmah</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TemplateFooter />
    </>
  );
}
