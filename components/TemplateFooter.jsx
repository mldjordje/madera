const FOOTER_ITEMS = [
  { href: "/", label: "Pocetna" },
  { href: "/svecanasala", label: "Svecane sale" },
  { href: "/restoran", label: "Restoran" },
  { href: "/bazen", label: "Bazen" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function TemplateFooter() {
  return (
    <div id="footer">
      <div className="pagewrap">
        <div className="footer-top">
          <div className="flex-elements">
            <div className="footer-top-element-left">
              <img src="/img/ui/madera-logo.png" alt="Madera" />
            </div>

            <div className="footer-top-element-right">
              {FOOTER_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="button white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-middle-top">
            <div className="footer-element-middle">
              <div className="flex-elements">
                <div className="element-title">
                  <p>KONTAKT</p>
                </div>
                <div className="element-informations">
                  <ul>
                    <li>
                      <p>Okolina Nisa, Srbija</p>
                    </li>
                    <li>
                      <p>
                        Tel: <a href="tel:+381607180659">+381 60 718 06 59</a> /{" "}
                        <a href="tel:+381183100971">+381 18 310 09 71</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        Mapa:{" "}
                        <a href="https://maps.app.goo.gl/52x387CwuJdTroXb7" target="_blank" rel="noreferrer">
                          Otvori lokaciju
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex-elements">
                <div className="element-title">
                  <p>REZERVACIJE</p>
                </div>
                <div className="element-informations">
                  <ul>
                    <li>
                      <p>Pozovite za slobodne termine i detalje organizacije.</p>
                    </li>
                    <li>
                      <a href="/kontakt">Posaljite upit online</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex-elements">
                <div className="element-title">
                  <p>MENI</p>
                </div>
                <div className="element-informations">
                  <ul className="menu">
                    {FOOTER_ITEMS.map((item) => (
                      <li key={`footer-menu-${item.href}`}>
                        <a href={item.href}>
                          <span>{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-element-right">
              <div className="footer-line"></div>
              <p>(c) 2026 Hotel-Restoran Madera</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
