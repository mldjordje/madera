import TemplateHeader from "@/components/TemplateHeader";
import TemplateFooter from "@/components/TemplateFooter";
import { buildMetadata } from "../_lib/seo";
import CenovnikClient from "./CenovnikClient";

export const metadata = buildMetadata({
  title: "Cenovnik",
  description: "Pregled cenovnika Madera u formatima A4 i A5, prikazan direktno na sajtu.",
  path: "/cenovnik",
  image: "/img/4.jpg",
  keywords: ["cenovnik Madera", "Madera cene", "Madera Nis cenovnik"],
});

export default function CenovnikPage() {
  return (
    <>
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

        <CenovnikClient />
      </div>
      <TemplateFooter />
    </>
  );
}

