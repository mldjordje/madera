"use client";

import { addHours, format } from "date-fns";
import React, { useEffect, useState } from "react";

const HallBookingForm = ({ activeHall, selectedDate, onSubmitted }) => {
  const [form, setForm] = useState({
    date: format(selectedDate, "yyyy-MM-dd"),
    startTime: "17:00",
    durationHours: 5,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    notes: "",
  });

  const [state, setState] = useState({ status: "idle", message: "" });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      date: format(selectedDate, "yyyy-MM-dd"),
    }));
  }, [selectedDate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ status: "submitting", message: "" });

    const start = new Date(`${form.date}T${form.startTime}:00`);
    const duration = Number(form.durationHours || 0) || 0;
    const end = addHours(start, duration || 1);

    try {
      const response = await fetch("/api/halls/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hallType: activeHall,
          startAt: start.toISOString(),
          endAt: end.toISOString(),
          guestName: form.guestName,
          guestEmail: form.guestEmail,
          guestPhone: form.guestPhone,
          notes: form.notes,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Nije uspelo slanje upita.");
      }

      setState({
        status: "success",
        message: "Upit je sacuvan kao pending. Javicemo se za potvrdu.",
      });

      setForm((prev) => ({
        ...prev,
        guestName: "",
        guestEmail: "",
        guestPhone: "",
        notes: "",
      }));

      if (onSubmitted) {
        onSubmitted();
      }
    } catch (error) {
      setState({
        status: "error",
        message: error.message,
      });
    } finally {
      setTimeout(() => {
        setState((prev) => ({ ...prev, status: prev.status === "submitting" ? "idle" : prev.status }));
      }, 1200);
    }
  };

  const isSubmitting = state.status === "submitting";

  return (
    <div className="sb-hall-form">
      <div className="sb-panel-heading">
        <div>
          <p className="sb-label">Upit za termin</p>
          <h4 className="sb-m-0">Sala: {activeHall === "velika" ? "Svecana" : "Mala"}</h4>
        </div>
        <div className="sb-chip sb-chip--ghost">Status: pending do potvrde</div>
      </div>

      <form className="sb-form" onSubmit={handleSubmit}>
        <div className="sb-form-row">
          <label>
            Datum
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
          <label>
            Pocetak
            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
          </label>
          <label>
            Trajanje (h)
            <input
              type="number"
              name="durationHours"
              min="1"
              max="12"
              value={form.durationHours}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="sb-form-row">
          <label>
            Vase ime i prezime
            <input
              type="text"
              name="guestName"
              value={form.guestName}
              onChange={handleChange}
              required
              placeholder="Ime i prezime"
            />
          </label>
        </div>

        <div className="sb-form-row">
          <label>
            Email
            <input
              type="email"
              name="guestEmail"
              value={form.guestEmail}
              onChange={handleChange}
              placeholder="primer@email.com"
            />
          </label>
          <label>
            Telefon
            <input
              type="tel"
              name="guestPhone"
              value={form.guestPhone}
              onChange={handleChange}
              placeholder="+381 60 123 4567"
            />
          </label>
        </div>

        <div className="sb-form-row">
          <label>
            Napomena (meni, dekoracija...)
            <textarea
              name="notes"
              rows="3"
              value={form.notes}
              onChange={handleChange}
              placeholder="Opcioni detalji koji nam pomazu da pripremimo ponudu."
            />
          </label>
        </div>

        <button type="submit" className="sb-btn sb-btn-2" disabled={isSubmitting}>
          <span className="sb-icon">
            <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
          </span>
          <span>{isSubmitting ? "Saljemo..." : "Posalji upit"}</span>
        </button>
      </form>

      {state.message && (
        <div className={`sb-alert ${state.status === "error" ? "sb-alert-error" : "sb-alert-success"}`}>{state.message}</div>
      )}
    </div>
  );
};

export default HallBookingForm;
