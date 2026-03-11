'use client';

import { useEffect } from "react";
import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import { pageShowcaseContent } from "@data/showcase-content";
import { useSiteShowcase } from "@library/use-site-showcase";

export default function SvecanaSalaPage() {
  const { showcase, hallBookingEnabled } = useSiteShowcase("svecanasala", pageShowcaseContent.svecanasala);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.AOS) {
      window.AOS.init({ duration: 1300, once: true });
    }
  }, []);

  return (
    <>
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
            <h1>Svečana sala <em>Madera</em></h1>
          </div>
          <div className="small-title">
            <p>Idealna za sve vrste događaja i proslava</p>
          </div>
        </div>

        <div className="about-section lefko">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>SVEČANE SALE</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Prostor za sve vrste <em>proslava i događaja</em></h2>
            </div>
            <div className="section-content" data-aos="fade-up" data-aos-delay="250">
              <p>Naše svečane sale nude fleksibilan prostor sa modernom opremom. Idealne su za venčanja, rođendane, krštenja i poslovne konferencije.</p>
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
                  <img src="/svecanasala/IMG_20250919_161505.jpg" alt="Sala" />
                </div>
              </div>
              <div className="element-bottom-right">
                <div className="image-element parallax">
                  <img src="/svecanasala/20240429_155233_0000.png" alt="Sala" />
                </div>
                <div className="image-element parallax">
                  <img src="/svecanasala/IMG_20250918_165826.jpg" alt="Sala" />
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
                  <p>DOGAĐAJI</p>
                </div>
                <div className="section-bigtitle" data-aos="fade-up">
                  <h2>Sve vrste proslava</h2>
                </div>
              </div>
              <div className="grid-element-right">
                <div className="section-bottom">
                  <div className="element-story" data-aos="fade-up" data-aos-delay="250">
                    <div className="element-story-top"><h4>Venčanja</h4></div>
                    <div className="element-story-bottom"><p>Kompletan servis za vaš poseban dan.</p></div>
                  </div>
                  <div className="story-line"></div>
                  <div className="element-story" data-aos="fade-up" data-aos-delay="350">
                    <div className="element-story-top"><h4>Korporativni događaji</h4></div>
                    <div className="element-story-bottom"><p>Konferencije i seminari uz profesionalnu podršku.</p></div>
                  </div>
                  <div className="story-line"></div>
                  <div className="element-story" data-aos="fade-up" data-aos-delay="450">
                    <div className="element-story-top"><h4>Privatne proslave</h4></div>
                    <div className="element-story-bottom"><p>Rođendani, krštenja, jubileji - nezaboravni momenti.</p></div>
                  </div>
                  <div className="story-line"></div>
                </div>
                <a href="/kontakt" className="button" data-aos="fade-up" data-aos-delay="550">
                  {hallBookingEnabled ? "Zakazi termin" : "Pozovi za dostupnost"}
                </a>
              </div>
            </div>
          </div>
        </div>

        <ImmersiveGallery {...showcase} />

        <div className="opportunity-section">
          <div className="opportunity-background" style={{ backgroundImage: "url('/svecanasala/IMG_20250918_165838.jpg')" }}></div>
          <div className="background-filter"></div>
          <div className="opportunity-content">
            <div className="pagewrap">
              <div className="section-title"><p>PROSLAVE</p></div>
              <div className="section-bigtitle">
                <h1>Nezaboravni momenti <em>u Maderi</em></h1>
              </div>
              <div className="section-content">
                <p>Dajte nam priliku da vaš događaj učinimo posebnim.</p>
              </div>
              <a href="/kontakt" className="button">Kontaktirajte nas</a>
            </div>
          </div>
        </div>
      </div>
      <TemplateFooter />
    </>
  );
}
