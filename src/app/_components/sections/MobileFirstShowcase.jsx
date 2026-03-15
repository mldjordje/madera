"use client";

import { useEffect, useRef } from "react";
import { Button, Card, CardBody, CardHeader, Chip, Image } from "@heroui/react";

const showcaseCards = [
  {
    eyebrow: "Svecane sale",
    title: "Velika sala za vencanja i svecane veceri",
    text: "Elegantna postavka za dogadjaje koji traze reprezentativan ambijent, dobar raspored i lep prvi utisak.",
    tag: "Do 300 gostiju",
    image: "/svecanasala/IMG_20250918_165838.jpg",
  },
  {
    eyebrow: "Restoran",
    title: "Restoran za rucak, veceru i dogovorene susrete",
    text: "Topao enterijer, prijatan servis i kuhinja koja odgovara i porodicnim gostima i poslovnim okupljanjima.",
    tag: "A la carte",
    image: "/restoran/IMG_20250921_184124.jpg",
  },
  {
    eyebrow: "Mala sala",
    title: "Diskretan prostor za privatna slavlja",
    text: "Pravi izbor za rodjendane, krstenja i porodicne trenutke koji traze bliskiju i topliju atmosferu.",
    tag: "Privatno",
    image: "/svecanasala/IMG_20250919_161505.jpg",
  },
  {
    eyebrow: "Relax zona",
    title: "Kutak za predah unutar Madera kompleksa",
    text: "Uredjen prostor za opustanje koji upotpunjuje boravak i daje Maderi smiren, gostoprimljiv karakter.",
    tag: "Komfor",
    image: "/sobe/IMG_20230906_180919.jpg",
  },
  {
    eyebrow: "Bazen",
    title: "Letnji ritam koji zaokruzuje boravak",
    text: "Sezonski sadrzaj koji Maderi daje jos jednu dimenziju za osvezenje, odmor i prijatnu letnju atmosferu.",
    tag: "Sezonski",
    image: "/img/gallery/11.jpg",
  },
];

const highlights = [
  "2 odvojene sale",
  "Bazen + restoran",
  "Mirna lokacija",
  "Podrska tima",
];

export default function MobileFirstShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    const items = Array.from(section.querySelectorAll("[data-reveal]"));
    if (!items.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="madera-mobile-showcase lefko" ref={sectionRef}>
      <div className="pagewrap">
        <div className="madera-mobile-showcase__intro" data-reveal style={{ "--reveal-delay": "0ms" }}>
          <Chip className="madera-mobile-showcase__chip" radius="full" size="sm" variant="flat">
            MADERA NA JEDNOM MESTU
          </Chip>
          <h2>Brz pregled prostora koji odmah pokazuje zasto se Madera bira za vazne trenutke</h2>
          <p>
            Vec na pocetku posetioci vide sale, restoran, relax zonu i letnje kadrove,
            pa lakse procenjuju da li Madera odgovara njihovom povodu, gostima i zeljenoj atmosferi.
          </p>
        </div>

        <div className="madera-mobile-showcase__highlights" data-reveal style={{ "--reveal-delay": "70ms" }}>
          {highlights.map((item) => (
            <Chip className="madera-mobile-showcase__highlight-chip" key={item} radius="full" size="sm" variant="bordered">
              {item}
            </Chip>
          ))}
        </div>

        <div className="madera-mobile-showcase__grid">
          {showcaseCards.map((card, index) => (
            <Card
              className={`madera-glow-card ${index === 0 ? "madera-glow-card--featured" : ""}`}
              data-reveal
              key={card.title}
              style={{ "--reveal-delay": `${130 + index * 85}ms` }}
            >
              <CardBody className="madera-glow-card__media-wrap">
                <Image
                  alt={card.title}
                  className="madera-glow-card__image"
                  radius="none"
                  removeWrapper
                  src={card.image}
                />
              </CardBody>
              <CardHeader className="madera-glow-card__header">
                <div>
                  <p className="madera-glow-card__eyebrow">{card.eyebrow}</p>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
                <Chip className="madera-glow-card__tag" radius="full" size="sm" variant="flat">
                  {card.tag}
                </Chip>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="madera-mobile-showcase__cta" data-reveal style={{ "--reveal-delay": "180ms" }}>
          <p>Zelite da proverite raspoloziv termin ili da najpre vidite koji prostor vam najvise odgovara?</p>
          <div className="madera-mobile-showcase__actions">
            <Button as="a" className="madera-mobile-showcase__button" href="/svecanasala" radius="full" size="md" variant="shadow">
              Pogledaj sale
            </Button>
            <Button as="a" className="madera-mobile-showcase__button madera-mobile-showcase__button--ghost" href="/kontakt" radius="full" size="md" variant="bordered">
              Posalji upit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
