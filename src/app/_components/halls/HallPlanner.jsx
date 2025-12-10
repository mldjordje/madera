"use client";

import { format, startOfDay, startOfMonth } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";

import HallBookingForm from "./HallBookingForm";
import HallCalendar from "./HallCalendar";

const HallPlanner = ({ halls, initialSettings }) => {
  const [activeHall, setActiveHall] = useState(halls[0]?.slug || "velika");
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [availability, setAvailability] = useState({ reservations: [], blackouts: [], source: "loading" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(
    initialSettings || { allowReservations: true, contactPhone: "+38163000000" }
  );
  const [photos, setPhotos] = useState({ velika: [], mala: [] });
  const [photoIndex, setPhotoIndex] = useState({ velika: 0, mala: 0 });

  const loadAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/halls/availability?months=6", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Neuspesno ucitavanje termina.");
      }
      setAvailability(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAvailability();
    (async () => {
      try {
        const resp = await fetch("/api/halls/settings", { cache: "no-store" });
        const data = await resp.json();
        setSettings((prev) => ({
          allowReservations: data.allowReservations !== false,
          contactPhone: data.contactPhone || prev.contactPhone,
        }));
      } catch (err) {
        // keep default
      }
    })();
    (async () => {
      try {
        const resp = await fetch("/api/halls/photos", { cache: "no-store" });
        const payload = await resp.json();
        setPhotos(payload.photos || {});
      } catch (err) {
        // fallback handled via API defaults; ignore
      }
    })();
  }, []);

  const hallReservations = useMemo(
    () => (availability.reservations || []).filter((item) => item.hallType === activeHall),
    [availability, activeHall]
  );

  const hallBlackouts = useMemo(
    () => (availability.blackouts || []).filter((item) => item.hallType === activeHall),
    [availability, activeHall]
  );

  const hallMeta = halls.find((hall) => hall.slug === activeHall) || halls[0];
  const hallPhotos = (photos[activeHall] && photos[activeHall].length
    ? photos[activeHall]
    : [{ url: hallMeta?.image, alt: hallMeta?.name || "Sala", hallType: activeHall }]
  );
  const activeIndex = photoIndex[activeHall] || 0;
  const setActivePhotoIndex = (idx) =>
    setPhotoIndex((prev) => ({
      ...prev,
      [activeHall]: Math.max(0, Math.min(idx, hallPhotos.length - 1)),
    }));
  const nextPhoto = () => setActivePhotoIndex(hallPhotos.length ? (activeIndex + 1) % hallPhotos.length : 0);
  const prevPhoto = () =>
    setActivePhotoIndex(hallPhotos.length ? (activeIndex - 1 + hallPhotos.length) % hallPhotos.length : 0);

  useEffect(() => {
    setActivePhotoIndex(0);
  }, [activeHall, photos]);

  const telHref = settings.contactPhone ? `tel:${settings.contactPhone.replace(/[^+\\d]/g, "")}` : "tel:+38163000000";

  return (
    <div className="sb-halls-board sb-card sb-mb-60">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="sb-hall-list">
            <div className="sb-panel-heading">
              <div>
                <p className="sb-label">Odaberi salu</p>
                <h4 className="sb-m-0">
                  {settings.allowReservations ? "Direktan pregled kalendara" : "Zakazivanje je iskljuceno"}
                </h4>
              </div>
              {settings.allowReservations && (
                <button type="button" className="sb-chip sb-chip--ghost" onClick={loadAvailability} disabled={loading}>
                  Osvezi
                </button>
              )}
            </div>

            {halls.map((hall) => (
              <button
                key={hall.slug}
                type="button"
                className={`sb-hall-card ${activeHall === hall.slug ? "is-active" : ""}`}
                onClick={() => setActiveHall(hall.slug)}
              >
                <div className="sb-hall-card__image">
                  <img src={hall.image} alt={hall.name} />
                  <span className="sb-badge">{hall.capacity}</span>
                </div>
                <div className="sb-hall-card__body">
                  <div className="sb-hall-card__title">
                    <div>
                      <p className="sb-label">{hall.size}</p>
                      <h5 className="sb-m-0">{hall.name}</h5>
                    </div>
                    <span className="sb-chip sb-chip--ghost">{hall.slug === "velika" ? "Svecana" : "Mala"}</span>
                  </div>
                  <p className="sb-text-sm">{hall.summary}</p>
                  <ul className="sb-hall-card__list">
                    {hall.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </button>
            ))}

            {settings.allowReservations ? (
              <div className="sb-meta-box">
                <p className="sb-label">Izvor podataka</p>
                <p className="sb-m-0">
                  {availability.source === "database"
                    ? "Railway PostgreSQL (tabele hall_reservations / hall_blackouts)"
                    : availability.reason || "Nema podataka"}
                </p>
                {error && <div className="sb-alert sb-alert-error sb-mt-10">{error}</div>}
              </div>
            ) : (
              <div className="sb-meta-box">
                <p className="sb-label">Kontakt</p>
                <p className="sb-m-0">Pozovi za rezervaciju sala.</p>
                <a className="sb-btn sb-btn-2 sb-mt-10" href={telHref}>
                  <span className="sb-icon">
                    <img src="/img/ui/icons/arrow.svg" alt="phone" />
                  </span>
                  <span>{settings.contactPhone || "Pozovi"}</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-8">
          <div className="sb-hall-panel">
            <div className="sb-hall-panel__top">
              <div>
                <p className="sb-label">{hallMeta?.name}</p>
                <h4 className="sb-m-0">
                  {settings.allowReservations ? "Pregled termina i zakazivanje" : "Kontakt za dogadjaje"}
                </h4>
                {settings.allowReservations ? (
                  <p className="sb-label sb-label-muted">Poslednje azuriranje: {format(selectedDate, "dd.MM.yyyy.")}</p>
                ) : (
                  <p className="sb-label sb-label-muted">Pozovi {settings.contactPhone || "kontakt telefon"} za termine.</p>
                )}
              </div>
              <div className="sb-chip">{hallMeta?.capacity}</div>
            </div>

            <div className="sb-hall-slider">
              <div className="sb-hall-slider__image">
                {hallPhotos[activeIndex] && <img src={hallPhotos[activeIndex].url} alt={hallPhotos[activeIndex].alt || hallMeta?.name || "Sala"} />}
                {hallPhotos.length > 1 && (
                  <div className="sb-hall-slider__controls">
                    <button type="button" className="sb-chip sb-chip--ghost" onClick={prevPhoto}>
                      ◀
                    </button>
                    <span className="sb-label sb-label-muted">
                      {activeIndex + 1}/{hallPhotos.length}
                    </span>
                    <button type="button" className="sb-chip sb-chip--ghost" onClick={nextPhoto}>
                      ▶
                    </button>
                  </div>
                )}
              </div>
              {hallPhotos.length > 1 && (
                <div className="sb-hall-slider__dots">
                  {hallPhotos.map((_, idx) => (
                    <button
                      key={`${activeHall}-dot-${idx}`}
                      type="button"
                      className={`sb-hall-slider__dot ${idx === activeIndex ? "is-active" : ""}`}
                      onClick={() => setActivePhotoIndex(idx)}
                      aria-label={`Slika ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {settings.allowReservations ? (
              <>
                <HallCalendar
                  month={month}
                  onMonthChange={(value) => {
                    setMonth(startOfMonth(value));
                    setSelectedDate(startOfDay(value));
                  }}
                  reservations={hallReservations}
                  blackouts={hallBlackouts}
                  selectedDate={selectedDate}
                  onSelectDate={(date) => setSelectedDate(startOfDay(date))}
                  isLoading={loading}
                  source={availability.source}
                />

                <div className="sb-calendar-legend">
                  <div className="sb-legend-dot state-available" /> Slobodno
                  <div className="sb-legend-dot state-pending" /> Upit u obradi
                  <div className="sb-legend-dot state-reserved" /> Rezervisano
                  <div className="sb-legend-dot state-blocked" /> Blokirano
                </div>

                {hallReservations.length === 0 && hallBlackouts.length === 0 && (
                  <div className="sb-alert sb-alert-error sb-mt-10">Trenutno nema unosa za ovu salu.</div>
                )}

                <HallBookingForm activeHall={activeHall} selectedDate={selectedDate} onSubmitted={loadAvailability} />
              </>
            ) : (
              <div className="sb-contact-cta">
                <p className="sb-text">Online rezervacije sala su trenutno iskljucene.</p>
                <a className="sb-btn" href={telHref}>
                  <span className="sb-icon">
                    <img src="/img/ui/icons/arrow.svg" alt="phone" />
                  </span>
                  <span>Pozovi {settings.contactPhone || ""}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallPlanner;
