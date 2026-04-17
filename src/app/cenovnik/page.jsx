import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import StructuredData from "@components/StructuredData";
import { buildLocalBusinessSchema, buildMetadata, buildWebPageSchema } from "../_lib/seo";
import CenovnikClient from "./CenovnikClient";

export const metadata = buildMetadata({
  title: "Cenovnik",
  description: "Pregled cenovnika Madera u formatima A4 i A5, prikazan direktno na sajtu.",
  path: "/cenovnik",
  image: "/img/4.jpg",
  keywords: ["cenovnik Madera", "Madera cene", "Madera Nis cenovnik"],
});

export default function CenovnikPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        name: "Cenovnik | Hotel-Restoran Madera",
        description: "Pregled cenovnika Madera u formatima A4 i A5, prikazan direktno na sajtu.",
        path: "/cenovnik",
        image: "/img/4.jpg",
      }),
      buildLocalBusinessSchema({
        path: "/",
        description:
          "Hotel-Restoran Madera kod Nisa za svecane sale, restoran, telefonske rezervacije i letnji bazen.",
      }),
    ].filter(Boolean),
  };

  return (
    <>
      <StructuredData id="madera-cenovnik-schema" data={pageSchema} />
      <TemplateHeader />
      <div id="cenovnik-page">
        <div className="hero-section">
          <div className="background-element"></div>
          <div className="hero-image-desktop" style={{ backgroundImage: "url('/img/4.jpg')" }} aria-hidden="true"></div>
          <div className="titlos-element">
            <h1>
              Cenovnik <em>Madera</em>
            </h1>
          </div>
          <div className="small-title">
            <p>Pregledajte kompletan cenovnik direktno na sajtu</p>
          </div>
        </div>

        <div className="about-section lefko">
          <div className="pagewrap">
            <div className="section-content" data-aos="fade-up">
              <h3>Pregled cenovnika u okviru sajta</h3>
              <p>
                Izaberite format <strong>A4</strong> ili <strong>A5</strong> i prelistajte kompletan cenovnik direktno ovde. Ako
                se PDF ne prikaze na uredjaju, koristite opciju <em>Otvori u novom tabu</em>.
              </p>
            </div>
          </div>
        </div>

        <CenovnikClient />
      </div>
      <TemplateFooter />
    </>
  );
}

