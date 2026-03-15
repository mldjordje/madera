import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import ImmersiveGallery from "@/components/ImmersiveGallery";
import StructuredData from "@components/StructuredData";
import { pageShowcaseContent } from "@data/showcase-content";
import { buildContactPageSchema, buildMetadata } from "../_lib/seo";

export const metadata = buildMetadata({
  title: "Kontakt, rezervacije i upiti",
  description:
    "Kontaktirajte Maderu za dostupnost termina, rezervaciju sale ili restorana i sva pitanja u vezi sa proslavama, okupljanjima i letnjim sadrzajima.",
  path: "/kontakt",
  image: "/restoran/IMG_20250921_184124.jpg",
  keywords: [
    "kontakt Madera",
    "rezervacija sale Nis",
    "rezervacija restorana Nis",
    "upit za proslavu Nis",
    "Madera telefon",
  ],
});

const pageSchema = buildContactPageSchema({
  description:
    "Kontakt stranica Madera kompleksa za rezervacije, provere termina i dogovor oko proslava, restorana i letnjih sadrzaja.",
});

export default function KontaktPage() {
  return (
    <>
      <StructuredData id="madera-kontakt-schema" data={pageSchema} />
      <TemplateHeader />
      <div id="contactpage">
        <div className="contact-us-section">
          <div className="pagewrap">
            <div className="section-title" data-aos="fade-up"> <p>KONTAKT I REZERVACIJE</p> </div>
            <div className="grid-2-elements">
              <div className="contact-us-grid-left">
                <div className="section-content">
                  <h1 data-aos="fade-up" data-aos-delay="200">Recite nam kakav trenutak planirate, a mi cemo predloziti kako da ga <em>Madera</em> iznese na pravi nacin.</h1>
                  <h4 data-aos="fade-up" data-aos-delay="400">Posaljite datum, povod i okviran broj gostiju. Odgovor dobijate brzo, sa jasnim sledecim korakom za obilazak, rezervaciju ili dogovor.</h4>
                </div>
              </div>

              <div className="contact-us-grid-right">
                <div className="grid-right-1" data-aos="fade-up" data-aos-delay="500">
                  <div className="element">
                    <div className="title"><p>Telefon</p></div>
                    <ul>
                      <li><a href="tel:+381607180659">+381 60 718 06 59</a></li>
                      <li><a href="tel:+381183100971">+381 18 310 09 71</a></li>
                    </ul>
                  </div>
                  <div className="element">
                    <div className="title"><p>Lokacija</p></div>
                    <ul>
                      <li><p>Okolina Nisa, Srbija</p></li>
                      <li>
                        <a href="https://maps.app.goo.gl/52x387CwuJdTroXb7" target="_blank" rel="noreferrer">
                          Otvori mapu i pravac dolaska
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
                          <input type="text" className="ff-el-form-control" placeholder="Kako da vam se obratimo?" />
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
                              <input type="text" className="ff-el-form-control" placeholder="+381..." />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ff-el-group">
                        <div className="ff-el-input--label ff-el-is-required asterisk-right">
                          <label>Poruka</label>
                        </div>
                        <div className="ff-el-input--content">
                          <textarea className="ff-el-form-control" placeholder="Napisite datum, broj gostiju, povod i sve sto vam je vazno za organizaciju." rows={4}></textarea>
                        </div>
                      </div>
                      <div className="ff-el-group ff-text-right ff_submit_btn_wrapper">
                        <button type="button" className="ff-btn ff-btn-submit ff-btn-md ff_btn_style">Posalji upit</button>
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
