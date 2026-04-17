"use client";

import { useMemo, useState } from "react";

const PRICE_LISTS = [
  {
    key: "a4",
    label: "A4",
    src: "/cenovnik/madera-cenovnik-a4.pdf",
  },
  {
    key: "a5",
    label: "A5",
    src: "/cenovnik/madera-cenovnik-a5.pdf",
  },
];

export default function CenovnikClient() {
  const [activeKey, setActiveKey] = useState("a4");

  const active = useMemo(() => PRICE_LISTS.find((item) => item.key === activeKey) ?? PRICE_LISTS[0], [activeKey]);

  return (
    <section className="madera-pricelist">
      <div className="pagewrap">
        <div className="section-title" data-aos="fade-up">
          <p>CENOVNIK</p>
        </div>

        <div className="section-bigtitle" data-aos="fade-up">
          <h2>
            Cenovnik <em>Madera</em>
          </h2>
        </div>

        <div className="madera-pricelist__top" data-aos="fade-up" data-aos-delay="150">
          <div className="madera-pricelist__switch" role="tablist" aria-label="Izaberite format cenovnika">
            {PRICE_LISTS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`madera-pricelist__tab ${item.key === active.key ? "is-active" : ""}`}
                onClick={() => setActiveKey(item.key)}
                role="tab"
                aria-selected={item.key === active.key}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a className="madera-pricelist__open" href={active.src} target="_blank" rel="noreferrer">
            Otvori u novom tabu
          </a>
        </div>

        <div className="madera-pricelist__frame" data-aos="fade-up" data-aos-delay="220">
          <object data={active.src} type="application/pdf" className="madera-pricelist__object" aria-label={`Cenovnik (${active.label})`}>
            <iframe title={`Cenovnik (${active.label})`} src={active.src} className="madera-pricelist__iframe" />
          </object>
        </div>
      </div>
    </section>
  );
}

