"use client";

import { useEffect, useRef } from "react";
import { Button, Card, CardBody, CardHeader, Chip, Image } from "@heroui/react";

const showcaseCards = [
  {
    eyebrow: "Svecane sale",
    title: "Velika sala za svadbe i vecernje proslave",
    text: "Prostor za veci broj gostiju sa rasvetom i rasporedom stolova koji se prilagodjava formatu dogadjaja.",
    tag: "Do 300 gostiju",
    image: "/svecanasala/IMG_20250918_165838.jpg",
  },
  {
    eyebrow: "Restoran",
    title: "Topli restoran za svakodnevni rucak",
    text: "Domaca kuhinja, pouzdana usluga i ambijent koji je podjednako prijatan za porodice i poslovne goste.",
    tag: "A la carte",
    image: "/restoran/IMG_20250921_184124.jpg",
  },
  {
    eyebrow: "Mala sala",
    title: "Intiman prostor za privatna okupljanja",
    text: "Prakticna opcija za rodjendane, krstenja i manje porodicne dogadjaje sa fleksibilnim rasporedom.",
    tag: "Privatno",
    image: "/svecanasala/IMG_20250919_161505.jpg",
  },
  {
    eyebrow: "Sobe",
    title: "Komforne sobe za goste i odmor",
    text: "Smestaj u okviru kompleksa olaksava organizaciju kada gosti dolaze iz drugih gradova.",
    tag: "Hotel",
    image: "/sobe/IMG_20230906_180919.jpg",
  },
  {
    eyebrow: "Bazen",
    title: "Letnji momenat za dnevna i vecernja desavanja",
    text: "Bazen donosi dodatni vizuelni kvalitet prostoru i opusteniji ritam tokom toplih meseci.",
    tag: "Sezonski",
    image: "/img/gallery/11.jpg",
  },
];

const highlights = [
  "2 odvojene sale",
  "Bazen + restoran",
  "Smestaj za goste",
  "Podrska tima 24/7",
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
            VIZUELNI SADRZAJ
          </Chip>
          <h2>Vise prostora, vise fotografija i jasniji pregled ponude</h2>
          <p>
            Posle hero sekcije odmah prikazujemo realne kadrove iz sala, restorana, smestaja i bazena da
            posetioci na telefonu brzo steknu kompletan utisak.
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
          <p>Zelite da proverite raspoloziv termin ili dogovorite obilazak prostora?</p>
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