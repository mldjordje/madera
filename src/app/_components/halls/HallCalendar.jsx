"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React, { useMemo } from "react";

const formatDayKey = (date) => format(date, "yyyy-MM-dd");

const getDayStatus = (day, reservations, blackouts) => {
  const blackout = blackouts.find((item) =>
    isWithinInterval(day, {
      start: startOfDay(new Date(item.startDate)),
      end: endOfDay(new Date(item.endDate)),
    })
  );

  if (blackout) {
    return { state: "blocked", title: blackout.reason || "Nije dostupno", items: [blackout] };
  }

  const dayReservations = reservations.filter((item) =>
    isWithinInterval(day, {
      start: startOfDay(new Date(item.startAt)),
      end: endOfDay(new Date(item.endAt)),
    })
  );

  if (!dayReservations.length) {
    return { state: "available", title: "Dostupno", items: [] };
  }

  const hasConfirmed = dayReservations.some((item) => item.status === "confirmed");
  const hasPending = dayReservations.some((item) => item.status === "pending");

  if (hasConfirmed) {
    return { state: "reserved", title: "Rezervisano", items: dayReservations };
  }

  if (hasPending) {
    return { state: "pending", title: "Upit u obradi", items: dayReservations };
  }

  return { state: "available", title: "Dostupno", items: dayReservations };
};

const HallCalendar = ({
  month,
  onMonthChange,
  reservations = [],
  blackouts = [],
  selectedDate,
  onSelectDate,
  isLoading,
  source,
}) => {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start,
        end,
      }),
    [start, end]
  );

  return (
    <div className="sb-hall-calendar">
      <div className="sb-hall-calendar__header">
        <div>
          <p className="sb-label">Mesec</p>
          <h4 className="sb-m-0">{format(month, "LLLL yyyy")}</h4>
          {source && (
            <p className="sb-label sb-label-muted">
              {source === "database" ? "Povezano na bazu" : "Demo podaci (podesi DATABASE_URL)"}
            </p>
          )}
        </div>
        <div className="sb-hall-calendar__nav">
          <button
            type="button"
            className="sb-nav-btn"
            onClick={() => onMonthChange(addMonths(month, -1))}
            aria-label="Prethodni mesec"
            disabled={isLoading}
          >
            <
          </button>
          <button
            type="button"
            className="sb-nav-btn"
            onClick={() => onMonthChange(new Date())}
            aria-label="Danas"
            disabled={isLoading}
          >
            Today
          </button>
          <button
            type="button"
            className="sb-nav-btn"
            onClick={() => onMonthChange(addMonths(month, 1))}
            aria-label="Sledeci mesec"
            disabled={isLoading}
          >
            >
          </button>
        </div>
      </div>

      <div className="sb-hall-calendar__grid">
        <div className="sb-hall-calendar__weekday">Pon</div>
        <div className="sb-hall-calendar__weekday">Uto</div>
        <div className="sb-hall-calendar__weekday">Sre</div>
        <div className="sb-hall-calendar__weekday">Cet</div>
        <div className="sb-hall-calendar__weekday">Pet</div>
        <div className="sb-hall-calendar__weekday">Sub</div>
        <div className="sb-hall-calendar__weekday">Ned</div>

        {days.map((day) => {
          const { state, title, items } = getDayStatus(day, reservations, blackouts);
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const isMuted = !isSameMonth(day, month);
          const badge =
            state === "blocked"
              ? "Zatvoreno"
              : state === "reserved"
              ? "Rezervisano"
              : state === "pending"
              ? "Upit"
              : "Slobodno";

          return (
            <button
              key={formatDayKey(day)}
              type="button"
              className={`sb-hall-calendar__day state-${state} ${isSelected ? "is-selected" : ""} ${
                isMuted ? "is-muted" : ""
              }`}
              onClick={() => onSelectDate(day)}
              title={title}
            >
              <span className="sb-day-number">{format(day, "d")}</span>
              <span className="sb-day-badge">{badge}</span>
              {items.length > 0 && <span className="sb-day-meta">{items.length} termina</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HallCalendar;
