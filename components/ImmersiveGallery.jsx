"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const defaultCategory = "Sve";

export default function ImmersiveGallery({
  sectionId,
  eyebrow,
  title,
  description,
  highlights = [],
  items = [],
  ctaPrimary,
  ctaSecondary,
  theme = "light",
}) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [open, setOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const categories = useMemo(() => {
    const values = new Set(
      items
        .map((item) => item.category)
        .filter(Boolean),
    );

    return [defaultCategory, ...Array.from(values)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === defaultCategory) {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const slides = useMemo(
    () => filteredItems.map((item) => ({ src: item.src, alt: item.alt || item.title })),
    [filteredItems],
  );

  const openLightboxAt = (index) => {
    setActiveSlide(index);
    setOpen(true);
  };

  if (!items.length) {
    return null;
  }

  return (
    <section
      id={sectionId}
      className={`sbx-gallery-section ${theme === "dark" ? "is-dark" : ""}`}
    >
      <div className="pagewrap">
        <div className="sbx-spotlight-frame" data-aos="fade-up">
          <div className="sbx-spotlight-glow" aria-hidden="true"></div>
          <span className="sbx-badge">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>

          {highlights.length ? (
            <div className="sbx-highlight-grid">
              {highlights.map((highlight) => (
                <div className="sbx-highlight-card" key={highlight.title}>
                  <span className="sbx-badge sbx-badge-outline">{highlight.kicker}</span>
                  <h4>{highlight.title}</h4>
                  <p>{highlight.text}</p>
                </div>
              ))}
            </div>
          ) : null}

          {(ctaPrimary || ctaSecondary) && (
            <div className="sbx-cta-row">
              {ctaPrimary ? (
                <a href={ctaPrimary.href} className="button">
                  {ctaPrimary.label}
                </a>
              ) : null}
              {ctaSecondary ? (
                <a href={ctaSecondary.href} className="button noborder">
                  {ctaSecondary.label}
                </a>
              ) : null}
            </div>
          )}
        </div>

        {categories.length > 1 ? (
          <div className="sbx-filter-row" data-aos="fade-up" data-aos-delay="80">
            {categories.map((category) => (
              <button
                className={`sbx-tab ${category === activeCategory ? "is-active" : ""}`}
                type="button"
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}

        <div className="sbx-bento-grid" data-aos="fade-up" data-aos-delay="120">
          {filteredItems.map((item, index) => (
            <button
              type="button"
              className={`sbx-bento-card ${
                item.layout === "wide" ? "sbx-layout-wide" : ""
              } ${item.layout === "tall" ? "sbx-layout-tall" : ""}`}
              key={`${item.src}-${item.title}`}
              onClick={() => openLightboxAt(index)}
            >
              <div className="sbx-bento-media">
                <img src={item.src} alt={item.alt || item.title} loading="lazy" />
              </div>
              <div className="sbx-bento-overlay">
                <span className="sbx-badge sbx-badge-outline">{item.category || "Galerija"}</span>
                <h3>{item.title}</h3>
                {item.text ? <p>{item.text}</p> : null}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        index={activeSlide}
        close={() => setOpen(false)}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(15, 16, 20, 0.94)" } }}
      />
    </section>
  );
}
