import React from "react";

import AppData from "@data/app.json";
import halls from "@data/halls.json";
import hallSettings from "@data/hall-settings.json";

import ContactInfoSection from "@components/sections/ContactInfo";
import ContactMapSection from "@components/sections/ContactMap";
import HallPlanner from "@components/halls/HallPlanner";

export const metadata = {
  title: {
    default: "Sale i zakazivanje",
  },
  description: AppData.settings.siteDescription,
};

const HallsPage = () => {
  return (
    <>
      <section className="sb-banner sb-banner-color sb-hall-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="sb-main-title-frame sb-main-title-frame-alt">
                <div className="sb-main-title">
                  <span className="sb-suptitle sb-mb-20">Sale za dogadjaje</span>
                  <h1 className="sb-mb-20">Proveri kalendar i zakazi salu onlajn</h1>
                  <p className="sb-text sb-text-lg sb-mb-25">
                    Nova klijentska stranica sa pregledom zauzetosti, blokiranim datumima i brzim unosom upita za
                    Svecanu ili Malu salu. Rezervacije se cuvaju u Railway/PostgreSQL tabelama.
                  </p>
                  <div className="sb-chip-row">
                    <span className="sb-chip">Svecana sala</span>
                    <span className="sb-chip sb-chip--ghost">Mala sala</span>
                    <span className="sb-chip sb-chip--ghost">Railway ready</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="sb-hall-hero-card">
                <p className="sb-label">Sta je novo</p>
                <h4>Vizuelni kalendar + klijentska forma</h4>
                <ul>
                  <li>Pregled rezervacija i blokada po sali</li>
                  <li>Zakazivanje upisa u tabelu hall_reservations (pending)</li>
                  <li>Fallback demo podaci ako DB nije povezana</li>
                </ul>
                <div className="sb-meta-box">
                  <p className="sb-m-0">Railway je prazan? Pokreni <code>npm run db:setup</code> uz DATABASE_URL.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sb-halls-wrapper">
        <div className="container">
          <HallPlanner halls={halls.halls} initialSettings={hallSettings} />
        </div>
      </section>

      <ContactInfoSection />
      <ContactMapSection />
    </>
  );
};

export default HallsPage;
