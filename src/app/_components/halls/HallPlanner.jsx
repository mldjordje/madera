"use client";

import { format, startOfDay, startOfMonth } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";

import HallBookingForm from "./HallBookingForm";
import HallCalendar from "./HallCalendar";

const HallPlanner = ({ halls }) => {
  const [activeHall, setActiveHall] = useState(halls[0]?.slug || "velika");
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [availability, setAvailability] = useState({ reservations: [], blackouts: [], source: "loading" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="sb-halls-board sb-card sb-mb-60">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="sb-hall-list">
            <div className="sb-panel-heading">
              <div>
                <p className="sb-label">Odaberi salu</p>
                <h4 className="sb-m-0">Direktan pregled kalendara</h4>
              </div>
              <button type="button" className="sb-chip sb-chip--ghost" onClick={loadAvailability} disabled={loading}>
                Osvezi
              </button>
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

            <div className="sb-meta-box">
              <p className="sb-label">Izvor podataka</p>
              <p className="sb-m-0">
                {availability.source === "database"
                  ? "Railway PostgreSQL (tabele hall_reservations / hall_blackouts)"
                  : availability.reason || "Nema podataka"}
              </p>
              {error && <div className="sb-alert sb-alert-error sb-mt-10">{error}</div>}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="sb-hall-panel">
            <div className="sb-hall-panel__top">
              <div>
                <p className="sb-label">{hallMeta?.name}</p>
                <h4 className="sb-m-0">Pregled termina i zakazivanje</h4>
                <p className="sb-label sb-label-muted">
                  Poslednje azuriranje: {format(selectedDate, "dd.MM.yyyy.")}
                </p>
              </div>
              <div className="sb-chip">{hallMeta?.capacity}</div>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallPlanner;
