import Link from "next/link";

import AppData from "@data/app.json";

export const metadata = {
  title: {
    default: "Admin",
  },
  description: AppData.settings.siteDescription,
};

const AdminPage = () => {
  return (
    <>
      <section className="sb-banner sb-banner-color">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="sb-main-title-frame">
                <div className="sb-main-title">
                  <span className="sb-suptitle sb-mb-30">Admin</span>
                  <h1 className="sb-mb-30">Pregled rezervacija i sadržaja</h1>
                  <p className="sb-text sb-text-lg sb-mb-30">
                    Administratorska stranica je dostupna i na telefonu. Odavde možete
                    pratiti rezervacije sale i sadržaj sajta ili se vratiti na javne
                    stranice dok ne bude potrebno uređivanje.
                  </p>

                  <ul className="sb-breadcrumbs">
                    <li>
                      <Link href="/">Početna</Link>
                    </li>
                    <li>
                      <Link href="/reservation">Rezervacija sale</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="sb-contact-form-frame">
                <div className="sb-main-content">
                  <h3 className="sb-mb-20">Brzi linkovi</h3>
                  <ul className="sb-list sb-mb-30">
                    <li>
                      <b>Pregled rezervacija: </b>
                      <span>Kontaktirajte tim ili proverite prijem u sandučetu</span>
                    </li>
                    <li>
                      <b>Rezervišite salu: </b>
                      <span>
                        <Link href="/reservation">Otvorite javnu formu za rezervaciju</Link>
                      </span>
                    </li>
                    <li>
                      <b>Podrška: </b>
                      <span>+381 11 555 333 ili info@madera.rs</span>
                    </li>
                  </ul>

                  <div className="d-flex flex-wrap gap-2">
                    <Link href="/" className="sb-btn sb-btn-2">
                      <span className="sb-icon">
                        <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                      </span>
                      <span>Početna</span>
                    </Link>
                    <Link href="/reservation" className="sb-btn sb-btn-2 sb-btn-gray">
                      <span className="sb-icon">
                        <img src="/img/ui/icons/arrow.svg" alt="icon" />
                      </span>
                      <span>Rezerviši salu</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminPage;
