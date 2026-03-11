'use client';

import { useEffect } from "react";
import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import { pageShowcaseContent } from "@data/showcase-content";
import { useSiteShowcase } from "@library/use-site-showcase";

export default function RestoranPage() {
  const { showcase } = useSiteShowcase("restoran", pageShowcaseContent.restoran);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.AOS) {
      window.AOS.init({ duration: 1300, once: true });
    }
  }, []);

  return (
    <>
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
            <p>Autentičan ambijent, kvalitetna hrana, mirna lokacija</p>
          </div>
        </div>

        <div className="about-section lefko">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up">
              <p>O RESTORANU</p>
            </div>
            <div className="section-bigtitle" data-aos="fade-up">
              <h2>Uživajte u <em>autentičnoj kuhinji</em></h2>
            </div>
            <div className="section-content" data-aos="fade-up" data-aos-delay="250">
              <p>Naš restoran nudi tradicionalnu i modernu kuhinju prilagođenu svim godišnjim dobima. Svaki obrok je pripremljen s pažnjom i kvalitetnim namirnicama.</p>
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
                  <img src="/restoran/IMG_20250921_184124.jpg" alt="Restoran ambijent" />
                </div>
              </div>
              <div className="element-bottom-right">
                <div className="image-element parallax">
                  <img src="/restoran/IMG_20231024_175715.jpg" alt="Restoran prostor" />
                </div>
                <div className="image-element parallax">
                  <img src="/restoran/IMG_20250919_173541.jpg" alt="Restoran terasa" />
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
                  <p>ŠTA NUDIMO</p>
                </div>
                <div className="section-bigtitle" data-aos="fade-up">
                  <h2>Kompletan doživljaj</h2>
                </div>
              </div>
              <div className="grid-element-right">
                <div className="section-bottom">
                  <div className="element-story" data-aos="fade-up" data-aos-delay="250">
                    <div className="element-story-top"><h4>Tradicionalna hrana</h4></div>
                    <div className="element-story-bottom"><p>Recepti inspirisani lokalnom kuhinjom i svetskim specijalitetima.</p></div>
                  </div>
                  <div className="story-line"></div>
                  <div className="element-story" data-aos="fade-up" data-aos-delay="350">
                    <div className="element-story-top"><h4>Vrhunski servis</h4></div>
                    <div className="element-story-bottom"><p>Ljubazan i profesionalan tim posvećen vašem zadovoljstvu.</p></div>
                  </div>
                  <div className="story-line"></div>
                  <div className="element-story" data-aos="fade-up" data-aos-delay="450">
                    <div className="element-story-top"><h4>Prirodno okruženje</h4></div>
                    <div className="element-story-bottom"><p>Otvoren prostor s pogledom na prirodu i mirnom atmosferom.</p></div>
                  </div>
                  <div className="story-line"></div>
                </div>
                <a href="/kontakt" className="button" data-aos="fade-up" data-aos-delay="550">Rezerviši termin</a>
              </div>
            </div>
          </div>
        </div>

        <ImmersiveGallery {...showcase} />

        <div className="opportunity-section">
          <div className="opportunity-background" style={{ backgroundImage: "url('/restoran/IMG_20250921_184124.jpg')" }}></div>
          <div className="background-filter"></div>
          <div className="opportunity-content">
            <div className="pagewrap">
              <div className="section-title"><p>ISKUSTVO</p></div>
              <div className="section-bigtitle">
                <h1>Nezaboravna jela i <em>ugodna atmosfera</em></h1>
              </div>
              <div className="section-content">
                <p>Dođite da uživate u specijalitetima naše kuhinje u miru i komforu.</p>
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
