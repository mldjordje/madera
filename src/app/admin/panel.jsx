"use client";

import { useEffect, useMemo, useState } from "react";

const TOKEN_STORAGE_KEY = "madera_admin_token";

const EMPTY_FORM = {
  id: null,
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  altText: "",
  layout: "default",
  sortOrder: 0,
};

async function requestJson(url, token, options = {}) {
  const hasFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = { ...(options.headers || {}) };

  if (!hasFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["x-admin-token"] = token;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return payload;
}

export default function AdminPanel() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState("svecana_velika");
  const [hallBookingEnabled, setHallBookingEnabled] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploadFile, setUploadFile] = useState(null);

  const logout = (message = "") => {
    setToken("");
    setTokenInput("");
    setSections([]);
    setForm(EMPTY_FORM);
    setUploadFile(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setStatus("");
    setError(message);
  };

  const loadData = async (tokenValue = token) => {
    if (!tokenValue) return;

    setStatus("Ucitavanje podataka...");
    setError("");

    try {
      const [content, settings] = await Promise.all([
        requestJson("/api/admin/site-content", tokenValue),
        requestJson("/api/admin/site-settings", tokenValue),
      ]);

      const nextSections = content.sections || [];
      setSections(nextSections);
      setHallBookingEnabled(Boolean(settings.hallBookingEnabled));

      if (!nextSections.some((section) => section.key === activeSection) && nextSections.length) {
        setActiveSection(nextSections[0].key);
      }

      setStatus("");
    } catch (err) {
      if (err.status === 401) {
        logout("Token nije prihvacen. Proveri ADMIN_TOKEN u env varijablama.");
        return;
      }
      setStatus("");
      setError(err.message || "Neuspesno ucitavanje podataka.");
    }
  };

  // Load saved token once on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) return;

    setToken(storedToken);
    setTokenInput(storedToken);
    loadData(storedToken);
  }, []);

  const currentSection = useMemo(
    () => sections.find((section) => section.key === activeSection) || null,
    [sections, activeSection],
  );

  const sectionItems = currentSection?.items || [];
  const hasOnlyFallback = sectionItems.length > 0 && sectionItems.every((item) => item.isFallback);
  const persistedImages = useMemo(
    () => sections.reduce((sum, section) => sum + section.items.filter((item) => !item.isFallback).length, 0),
    [sections],
  );

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setUploadFile(null);
  };

  const startEdit = (item) => {
    if (!item?.id) return;
    setForm({
      id: item.id,
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      imageUrl: item.imageUrl || "",
      altText: item.altText || "",
      layout: item.layout || "default",
      sortOrder: item.sortOrder ?? 0,
    });
    setUploadFile(null);
  };

  const uploadToBlob = async () => {
    if (!uploadFile) return "";

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("sectionKey", activeSection);

    const payload = await requestJson("/api/admin/upload", token, {
      method: "POST",
      body: formData,
    });

    return payload.url || "";
  };

  const saveItem = async (event) => {
    event.preventDefault();
    setError("");
    setStatus(form.id ? "Azuriranje slike..." : "Dodavanje slike...");

    try {
      let finalUrl = form.imageUrl.trim();
      if (!finalUrl && uploadFile) {
        finalUrl = await uploadToBlob();
      }

      if (!finalUrl) {
        throw new Error("Unesi URL ili izaberi fajl za upload.");
      }

      const payload = {
        ...form,
        sectionKey: activeSection,
        imageUrl: finalUrl,
        sortOrder: Number(form.sortOrder) || 0,
      };

      if (form.id) {
        await requestJson("/api/admin/site-content", token, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await requestJson("/api/admin/site-content", token, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      resetForm();
      await loadData();
      setStatus("Sacuvano.");
    } catch (err) {
      setStatus("");
      setError(err.message || "Neuspesno cuvanje slike.");
    }
  };

  const removeItem = async (itemId) => {
    if (!itemId) return;
    if (typeof window !== "undefined" && !window.confirm("Obrisati ovu sliku?")) {
      return;
    }

    setStatus("Brisanje slike...");
    setError("");

    try {
      await requestJson("/api/admin/site-content", token, {
        method: "DELETE",
        body: JSON.stringify({ id: itemId }),
      });

      if (form.id === itemId) {
        resetForm();
      }

      await loadData();
      setStatus("Slika obrisana.");
    } catch (err) {
      setStatus("");
      setError(err.message || "Neuspesno brisanje slike.");
    }
  };

  const toggleBooking = async (enabled) => {
    setSettingsLoading(true);
    setError("");
    try {
      const payload = await requestJson("/api/admin/site-settings", token, {
        method: "PATCH",
        body: JSON.stringify({ hallBookingEnabled: enabled }),
      });
      setHallBookingEnabled(Boolean(payload.hallBookingEnabled));
    } catch (err) {
      setError(err.message || "Neuspesna izmena booking opcije.");
    } finally {
      setSettingsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="sb-admin-wrapper">
        <div className="container">
          <div className="sb-card sb-admin-auth">
            <h3>Admin pristup</h3>
            <p className="sb-text">Unesi ADMIN_TOKEN koji je postavljen u `.env.local` ili Vercel env.</p>
            <input
              type="password"
              className="sb-admin-input"
              placeholder="ADMIN_TOKEN"
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
            />
            <button
              type="button"
              className="sb-btn sb-btn-2"
              onClick={async () => {
                const value = tokenInput.trim();
                if (!value) {
                  setError("Unesi token.");
                  return;
                }
                setToken(value);
                localStorage.setItem(TOKEN_STORAGE_KEY, value);
                await loadData(value);
              }}
            >
              Udji u admin
            </button>
            {error && <div className="sb-alert sb-alert-error sb-mt-10">{error}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sb-admin-wrapper">
      <div className="container sb-admin-grid sb-admin-grid--compact">
        <div className="sb-admin-header">
          <h2>Madera admin</h2>
          <div className="sb-chip-row">
            <span className="sb-chip">Ukupno snimljenih slika: {persistedImages}</span>
            <button className="sb-chip sb-chip--ghost" type="button" onClick={() => loadData()}>
              Osvezi
            </button>
            <button className="sb-chip sb-chip--ghost" type="button" onClick={() => logout()}>
              Odjavi se
            </button>
          </div>
          {status && <div className="sb-alert sb-alert-info sb-mt-10">{status}</div>}
          {error && <div className="sb-alert sb-alert-error sb-mt-10">{error}</div>}
        </div>

        <div className="sb-card sb-admin-card">
          <div className="sb-panel-heading">
            <div>
              <p className="sb-label">Sekcije</p>
              <h4 className="sb-m-0">Izaberi stranicu za upload</h4>
            </div>
          </div>
          <div className="sb-admin-switcher">
            {sections.map((section) => (
              <button
                type="button"
                key={section.key}
                className={`sb-admin-tile ${section.key === activeSection ? "is-active" : ""}`}
                onClick={() => {
                  setActiveSection(section.key);
                  resetForm();
                }}
              >
                <div>
                  <p className="sb-label">{section.label}</p>
                  <h5 className="sb-m-0">{section.items.length} slika</h5>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="sb-card sb-admin-card">
          <div className="sb-panel-heading">
            <div>
              <p className="sb-label">Upload slike</p>
              <h4 className="sb-m-0">{currentSection?.label || "Sekcija"}</h4>
            </div>
          </div>

          <form className="sb-form sb-admin-form" onSubmit={saveItem}>
            <div className="sb-form-row">
              <label>
                Naslov
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="Naslov slike"
                />
              </label>
              <label>
                Kategorija
                <input
                  type="text"
                  value={form.category}
                  onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                  placeholder="npr. Velika sala"
                />
              </label>
            </div>

            <div className="sb-form-row">
              <label>
                URL slike (ili upload)
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
                  placeholder="https://..."
                />
              </label>
              <label>
                Upload fajla
                <input type="file" accept="image/*" onChange={(event) => setUploadFile(event.target.files?.[0] || null)} />
              </label>
            </div>

            <div className="sb-form-row">
              <label>
                Opis
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder="Kratak opis slike"
                />
              </label>
              <label>
                ALT tekst
                <input
                  type="text"
                  value={form.altText}
                  onChange={(event) => setForm((prev) => ({ ...prev, altText: event.target.value }))}
                  placeholder="SEO alt tekst"
                />
              </label>
            </div>

            <div className="sb-form-row">
              <label>
                Layout
                <select
                  value={form.layout}
                  onChange={(event) => setForm((prev) => ({ ...prev, layout: event.target.value }))}
                >
                  <option value="default">Default</option>
                  <option value="wide">Wide</option>
                  <option value="tall">Tall</option>
                </select>
              </label>
              <label>
                Sort
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(event) => setForm((prev) => ({ ...prev, sortOrder: event.target.value }))}
                />
              </label>
            </div>

            <div className="sb-form-actions">
              <button type="submit" className="sb-btn sb-btn-2">
                {form.id ? "Sacuvaj izmene" : "Dodaj sliku"}
              </button>
              {form.id && (
                <button type="button" className="sb-btn sb-btn-2 sb-btn-gray" onClick={resetForm}>
                  Otkazi izmenu
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="sb-card sb-admin-card">
          <div className="sb-panel-heading">
            <div>
              <p className="sb-label">Slike sekcije</p>
              <h4 className="sb-m-0">{currentSection?.label || "Sekcija"}</h4>
            </div>
            {hasOnlyFallback && <span className="sb-chip sb-chip--ghost">Fallback slike (dok Neon nije popunjen)</span>}
          </div>
          <div className="sb-admin-items-grid sb-admin-items-grid--simple">
            {sectionItems.map((item) => (
              <div key={item.id || `${item.sectionKey}-${item.imageUrl}-${item.sortOrder}`} className="sb-admin-item-card">
                <div className="sb-admin-thumb">
                  <img src={item.imageUrl} alt={item.altText || item.title || "slika"} />
                </div>
                <div className="sb-admin-item-body">
                  <p className="sb-label">{item.category || "Galerija"}</p>
                  <h5 className="sb-m-0">{item.title || "Bez naslova"}</h5>
                  <p className="sb-text-sm sb-m-0">Sort: {item.sortOrder}</p>
                  {item.isFallback && <p className="sb-label sb-label-muted">Fallback primer</p>}
                </div>
                {!item.isFallback && (
                  <div className="sb-chip-row">
                    <button type="button" className="sb-chip" onClick={() => startEdit(item)}>
                      Uredi
                    </button>
                    <button type="button" className="sb-chip sb-chip--ghost" onClick={() => removeItem(item.id)}>
                      Obrisi
                    </button>
                  </div>
                )}
              </div>
            ))}
            {!sectionItems.length && <div className="sb-alert sb-alert-info">Nema slika za izabranu sekciju.</div>}
          </div>
        </div>

        <div className={`sb-card sb-admin-card sb-admin-booking ${hallBookingEnabled ? "is-enabled" : "is-disabled"}`}>
          <div className="sb-panel-heading">
            <div>
              <p className="sb-label">Termini i booking (svecane sale)</p>
              <h4 className="sb-m-0">{hallBookingEnabled ? "Aktivno" : "Iskljuceno"}</h4>
            </div>
            <label className="sb-toggle">
              <input
                type="checkbox"
                checked={hallBookingEnabled}
                disabled={settingsLoading}
                onChange={(event) => toggleBooking(event.target.checked)}
              />
              <span className="sb-toggle-slider" />
              <span className="sb-toggle-label">{hallBookingEnabled ? "Ukljuceno" : "Iskljuceno"}</span>
            </label>
          </div>
          <div className="sb-admin-booking-placeholder">
            {hallBookingEnabled
              ? "Booking modul je ukljucen. Ovde kasnije mozemo dodati upravljanje terminima."
              : "Booking i termini su trenutno sivi/zakljucani. Aktiviraju se samo preko switch-a iznad."}
          </div>
        </div>
      </div>
    </div>
  );
}
