'use client';

import { useEffect } from "react";
import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import { pageShowcaseContent } from "@data/showcase-content";

export default function KontaktPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    let tries = 0;
    const maxTries = 20;

    const initAos = () => {
      if (cancelled) return;

      if (window.AOS) {
        if (window.AOS.refreshHard) {
          window.AOS.refreshHard();
        }
        window.AOS.init({ duration: 1300, once: true });
        return;
      }

      tries += 1;
      if (tries < maxTries) {
        window.setTimeout(initAos, 120);
        return;
      }

      document.querySelectorAll("#contactpage [data-aos]").forEach((element) => {
        element.classList.add("aos-animate");
      });
    };

    initAos();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <TemplateHeader />
      <div id="contactpage">
        <div className="contact-us-section">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up"> <p>KONTAKT</p> </div>
            <div className="grid-2-elements">
              <div className="contact-us-grid-left">
                <div className="section-content">
                  <h1 data-aos="fade-up" data-aos-delay="200">Spremni za <em>Madera</em> iskustvo?</h1>
                  <h4 data-aos="fade-up" data-aos-delay="400">Pošaljite kontakt informacije i naš tim će vas pozvati u najkraćem roku.</h4>
                </div>
              </div>

              <div className="contact-us-grid-right">
                <div className="grid-right-1" data-aos="fade-up" data-aos-delay="500">
                  <div className="element">
                    <div className="title"><p>Telefon</p></div>
                    <ul>
                      <li><a href="tel:0183100971">018 3100971</a></li>
                    </ul>
                  </div>
                  <div className="element">
                    <div className="title"><p>Lokacija</p></div>
                    <ul>
                      <li>
                        <a href="https://maps.app.goo.gl/52x387CwuJdTroXb7" target="_blank" rel="noreferrer">
                          Otvori mapu
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="contact-form" data-aos="fade-up" data-aos-delay="600">
                  <div className="fluentform ff-default">
                    <form className="frm-fluent-form">
                      <div className="ff-el-group">
                        <div className="ff-el-input--label ff-el-is-required asterisk-right">
                          <label>Ime i prezime</label>
                        </div>
                        <div className="ff-el-input--content">
                          <input type="text" className="ff-el-form-control" placeholder="Unesite ime" />
                        </div>
                      </div>
                      <div className="ff-t-container ff-column-container ff_columns_total_2">
                        <div className="ff-t-cell ff-t-column-1" style={{ flexBasis: "50%" }}>
                          <div className="ff-el-group">
                            <div className="ff-el-input--label ff-el-is-required asterisk-right">
                              <label>Email</label>
                            </div>
                            <div className="ff-el-input--content">
                              <input type="email" className="ff-el-form-control" placeholder="email@primer.com" />
                            </div>
                          </div>
                        </div>
                        <div className="ff-t-cell ff-t-column-2" style={{ flexBasis: "50%" }}>
                          <div className="ff-el-group">
                            <div className="ff-el-input--label ff-el-is-required asterisk-right">
                              <label>Telefon</label>
                            </div>
                            <div className="ff-el-input--content">
                              <input type="text" className="ff-el-form-control" placeholder="018 3100971" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ff-el-group">
                        <div className="ff-el-input--label ff-el-is-required asterisk-right">
                          <label>Poruka</label>
                        </div>
                        <div className="ff-el-input--content">
                          <textarea className="ff-el-form-control" placeholder="Opšite datum i broj gostiju." rows={4}></textarea>
                        </div>
                      </div>
                      <div className="ff-el-group ff-text-right ff_submit_btn_wrapper">
                        <button type="button" className="ff-btn ff-btn-submit ff-btn-md ff_btn_style">Pošalji upit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ImmersiveGallery {...pageShowcaseContent.kontakt} />
      </div>
      <TemplateFooter />
    </>
  );
}
