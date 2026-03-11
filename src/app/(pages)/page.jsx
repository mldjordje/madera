import AppData from "@data/app.json";
import Image from "next/image";
import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import MobileFirstShowcase from "@components/sections/MobileFirstShowcase";
import { pageShowcaseContent } from "@data/showcase-content";
export const metadata = {
  title: {
    default: "Home",
    template: "%s | " + AppData.settings.siteName,
  },
  description: AppData.settings.siteDescription,
};

export default function HomePage() {
  return (
    <>
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
            <p>Okolina Niša, Srbija</p>
          </div>
        </div>

        <div className="about-section">
          <div className="pagewrap">
            <div className="section-title">
              <p>INTRODUCTION</p>
            </div>
            <div className="section-bigtitle">
              <h2>
                Dve sale za proslave, restoran za svaki dan i letnji bazen u
                mirnom ambijentu nadomak Niša.
              </h2>
            </div>
            <div className="section-subtitle">
              <h4>
                Idealno mesto za svadbe, rodendane, krštenja i poslovne dogadaje.
              </h4>
            </div>
            <div className="home-intro-copy">
              <p>
                U Maderi možete organizovati intimna okupljanja i velike dogadaje na jednom mestu,
                uz jasnu komunikaciju sa timom, fleksibilnu ponudu menija i prostor koji se prilagodava
                vašem broju gostiju.
              </p>
            </div>
          </div>
        </div>

        <MobileFirstShowcase />

        <section className="madera-quick-facts">
          <div className="pagewrap">
            <div className="madera-quick-facts__grid">
              {[
                { value: "2", label: "Svecane sale", text: "Velika i mala sala za razlicite tipove proslava." },
                { value: "1", label: "Restoran", text: "A la carte ponuda i meni po dogovoru." },
                { value: "1", label: "Letnji bazen", text: "Dodatna vrednost tokom toplih dana." },
                { value: "24/7", label: "Podrska", text: "Brza komunikacija tokom planiranja dogadjaja." },
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
                  <p>ISKUSTVO</p>
                </div>
                <div className="section-bigtitle">
                  <h2>Kako izgleda dogadaj u <em>Maderi</em></h2>
                </div>
                <p>
                  Od prvog poziva do završetka proslave, naš tim vodi vas kroz svaki korak:
                  izbor sale, predlog posluženja, raspored sedenja i dinamiku dogadaja.
                </p>
                <p>
                  Cilj nam je da domacini budu rastereceni, a gosti zadovoljni atmosferom,
                  uslugom i kvalitetom hrane.
                </p>
              </div>
              <div className="story-points" data-aos="fade-up" data-aos-delay="200">
                <div className="point-item">
                  <h4>Planiranje bez stresa</h4>
                  <p>Dobijate jasan predlog organizacije i okvir troškova pre potvrde termina.</p>
                </div>
                <div className="point-item">
                  <h4>Tim koji je prisutan</h4>
                  <p>Tokom dogadaja prisutna je ekipa koja prati ritam veceri i potrebe gostiju.</p>
                </div>
                <div className="point-item">
                  <h4>Ambijent za fotografije</h4>
                  <p>Prostor i okolina nude više lepih kadrova za uspomene koje ostaju.</p>
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
                  <Image src="/restoran/IMG_20250921_184124.jpg" alt="Madera sala" width={1600} height={1100} />
                </div>
              </div>
              <div className="element-bottom-right">
                <div className="image-element parallax">
                  <Image src="/svecanasala/IMG_20250919_161505.jpg" alt="Madera ambijent" width={1600} height={1100} />
                </div>
                <div className="image-element parallax">
                  <Image src="/img/gallery/3.jpg" alt="Madera bazen" width={1400} height={960} />
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
                  <p>PROSLAVE</p>
                </div>
                <div className="section-bigtitle" data-aos="fade-up">
                  <h2>DVE SALE</h2>
                </div>
                <div className="section-content" data-aos="fade-up">
                  <h3>Organizujemo sve vrste proslava i dogadaja.</h3>
                  <p>
                    Kapacitet i raspored prilagodavamo broju gostiju i vrsti
                    dogadaja, uz kompletnu uslugu.
                  </p>
                </div>
                <a href="/kontakt" className="button" data-aos="fade-up">
                  Zakaži termin
                </a>
              </div>

              <div className="grid-element-right">
                <div className="section-title" data-aos="fade-up">
                  <p>RESTORAN</p>
                </div>

                <div className="section-bottom">
                  <div className="element-story" data-aos="fade-up" data-aos-delay="250">
                    <div className="element-story-top">
                      <h4>Mala sala</h4>
                    </div>
                    <div className="element-story-bottom">
                      <p>Idealna za porodicne proslave i intimna okupljanja.</p>
                    </div>
                  </div>

                  <div className="story-line" data-aos="fade-up" data-aos-delay="300"></div>

                  <div className="element-story" data-aos="fade-up" data-aos-delay="350">
                    <div className="element-story-top">
                      <h4>Velika sala</h4>
                    </div>
                    <div className="element-story-bottom">
                      <p>Kapacitet za svadbe, krštenja i poslovne dogadaje.</p>
                    </div>
                  </div>

                  <div className="story-line" data-aos="fade-up" data-aos-delay="400"></div>

                  <div className="element-story" data-aos="fade-up" data-aos-delay="450">
                    <div className="element-story-top">
                      <h4>Letnji bazen</h4>
                    </div>
                    <div className="element-story-bottom">
                      <p>Ambijent za opuštanje tokom toplih dana.</p>
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
              <p>STA DOBIJATE</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Kompletna usluga od ideje do realizacije</h2>
            </div>
            <div className="madera-service-strip__grid">
              {[
                {
                  title: "Plan prostora",
                  text: "Predlog rasporeda stolova, bine i prolaza prema broju gostiju.",
                },
                {
                  title: "Meni po meri",
                  text: "Opcije posluzenja i korekcije menija prema vrsti dogadjaja.",
                },
                {
                  title: "Vremenski plan",
                  text: "Jasna satnica za pripremu, dolazak gostiju i tok veceri.",
                },
                {
                  title: "Koordinacija tima",
                  text: "Operativna podrska tokom celog dogadjaja na licu mesta.",
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
              <p>ORGANIZACIJA</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Kako izgleda proces rezervacije</h2>
            </div>
            <div className="madera-flow-section__grid">
              {[
                { step: "01", title: "Upit", text: "Posaljite okviran datum, broj gostiju i tip dogadjaja." },
                { step: "02", title: "Ponuda", text: "Dobijate predlog sale, menija i osnovni plan realizacije." },
                { step: "03", title: "Potvrda", text: "Zakljucujemo detalje i rezervisemo termin." },
                { step: "04", title: "Dogadjaj", text: "Tim vodi realizaciju, a vi se fokusirate na goste." },
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
                  <a href="/kontakt" className="button white">Kontakt</a>
                </div>
              </div>
            </div>

            <div className="section-bottom">
              <div className="faq-container">
                {[
                  {
                    title: "DVE SALE ZA PROSLAVE",
                    text: "Imamo malu i veliku salu koje prilagodavamo dogadaju.",
                  },
                  {
                    title: "MENI PO DOGOVORU",
                    text: "Jelovnik prilagodavamo dogadaju i broju gostiju.",
                  },
                  {
                    title: "KAKO REZERVISATI TERMIN",
                    text: "Pozovite nas ili pošaljite email za dogovor termina.",
                  },
                ].map((item, idx) => (
                  <div className="faq" key={`faq-${idx}`}>
                    <div className="faq-inside">
                      <div className="faq-question">
                        <h3>{item.title}</h3>
                        <div className="faq-btn">
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                      <div className="faq-answer">
                        <p>{item.text}</p>
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
              <div className="section-title"> <p>ZAŠTO MADERA</p> </div>
              <div className="section-bigtitle">
                <h1>Ugodna atmosfera <em>i kompletna usluga</em></h1>
              </div>
              <div className="section-content">
                <p>Spoj prirode, kvalitetne kuhinje i prostora za proslave na jednom mestu.</p>
              </div>
              <a href="/kontakt" className="button">Kontaktirajte nas</a>
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
                  <h1>Mirna lokacija uz <em>prirodu</em></h1>
                </div>
                <div className="section-content">
                  <p>Restoran se nalazi u mirnom ambijentu, idealnom za opuštanje i proslave.</p>
                </div>
                <a href="/kontakt" className="button">Kako do nas</a>
              </div>
            </div>

            <div className="section-elements-bottom">
              <div className="grid-2-elements">
                <div className="grid-element-left parallax" data-aos="fade-up">
                  <Image src="/restoran/IMG_20250919_173541.jpg" alt="Madera priroda" width={1500} height={1000} />
                </div>
                <div className="grid-element-right parallax" data-aos="fade-up">
                  <Image src="/img/gallery/6.jpg" alt="Madera bazen okolina" width={1500} height={1000} />
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
              <h2>Zašto gosti biraju <em>Maderu</em></h2>
            </div>
            <div className="madera-benefits-grid">
              {[
                {
                  title: "Kompletna organizacija",
                  text: "Od rasporeda stolova do toka veceri, naš tim vodi racuna o svakom detalju.",
                },
                {
                  title: "Domaca kuhinja",
                  text: "Meni prilagodavamo dogadaju i broju gostiju, sa fokusom na kvalitet i svežinu.",
                },
                {
                  title: "Mirna lokacija",
                  text: "Ambijent u prirodi daje privatnost i prijatan osecaj tokom celog dogadaja.",
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
              <p>PAKETI</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Predlog paketa za dogadaje</h2>
            </div>
            <div className="madera-packages-grid">
              {[
                {
                  name: "Porodicna proslava",
                  details: "Mala sala, meni po dogovoru i fleksibilan raspored za rucak ili veceru.",
                },
                {
                  name: "Svadbeni paket",
                  details: "Velika sala, kompletna usluga i podrška tima od pocetka do kraja dogadaja.",
                },
                {
                  name: "Biznis okupljanje",
                  details: "Formalniji raspored, uskladen meni i miran prostor za timske dogadaje.",
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
                <h3>Spremni ste za rezervaciju termina?</h3>
                <p>Pozovite nas ili pošaljite upit i dobicete odgovor u najkracem roku.</p>
              </div>
              <div className="cta-actions">
                <a href="/kontakt" className="button white">Pošalji upit</a>
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




