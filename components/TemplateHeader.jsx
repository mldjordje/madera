const NAV_ITEMS = [
  { href: "/", label: "Pocetna" },
  { href: "/svecanasala", label: "Svecane sale" },
  { href: "/restoran", label: "Restoran" },
  { href: "/bazen", label: "Bazen" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function TemplateHeader() {
  return (
    <>
      <div id="menuholder">
        <div className="pagewrap">
          <div className="flex-elements">
            <div className="flex-element-left">
              <a href="/">
                <img src="/img/ui/madera-logo.png" alt="Madera logo" />
              </a>
            </div>

            <div className="flex-element-right">
              <div className="desktop-menu">
                <div className="menu-elements">
                  <ul className="menu">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.href}>
                        <a href={item.href}>
                          <span>{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="enquiry-element">
                  <a href="/kontakt" className="button">
                    Upit
                  </a>
                </div>
              </div>

              <div className="mobile-menu toggle">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="overlay">
        <div className="pagewrap">
          <div className="overlay-menu-top">
            <div className="grid-2-elements">
              <div className="grid-element-menu-left">
                <ul>
                  {NAV_ITEMS.map((item) => (
                    <li key={`overlay-${item.href}`}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid-element-menu-right">
                <ul>
                  <li>
                    <p>Telefon</p>
                  </li>
                  <li>
                    <a href="tel:+381607180659">+381 60 718 06 59</a>
                  </li>
                  <li>
                    <a href="tel:+381183100971">+381 18 310 09 71</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <p>Lokacija</p>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/52x387CwuJdTroXb7" target="_blank" rel="noreferrer">
                      Otvori mapu
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

