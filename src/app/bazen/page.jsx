'use client';

import { useEffect } from "react";
import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import { pageShowcaseContent } from "@data/showcase-content";
import { useSiteShowcase } from "@library/use-site-showcase";

export default function BazenPage() {
  const { showcase } = useSiteShowcase("bazen", pageShowcaseContent.bazen);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.AOS) {
      window.AOS.init({ duration: 1300, once: true });
    }
  }, []);

  return (
    <>
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
            <p>Osvezenje i opustanje u prirodnom ambijentu</p>
          </div>
        </div>

        <div className="about-section lefko">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>BAZEN</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Letnji kutak za <em>odmor i druzenje</em></h2>
            </div>
            <div className="section-content" data-aos="fade-up" data-aos-delay="250">
              <p>Bazen je idealan za dnevni odmor, porodično uživanje i osveženje tokom letnjih dana.</p>
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
                  <img src="/sobe/IMG_20230906_180646.jpg" alt="Relax zona Madera" />
                </div>
              </div>
              <div className="element-bottom-right">
                <div className="image-element parallax">
                  <img src="/sobe/IMG_20230906_180741.jpg" alt="Ambijent prostora" />
                </div>
                <div className="image-element parallax">
                  <img src="/sobe/IMG_20230906_180904.jpg" alt="Dodatni kadar prostora" />
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
              <div className="section-title"><p>LETNJA SEZONA</p></div>
              <div className="section-bigtitle">
                <h1>Uživajte u letu uz <em>Madera bazen</em></h1>
              </div>
              <div className="section-content">
                <p>Kontaktirajte nas za informacije o dostupnosti i dnevnim terminima.</p>
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
