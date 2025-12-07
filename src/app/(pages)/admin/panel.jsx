"use client";

import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "madera_admin_token";

async function fetchJson(url, token, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["x-admin-token"] = token;
  const res = await fetch(url, { ...options, headers, cache: "no-store" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Request failed");
  return body;
}

const AdminPanel = () => {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [gallery, setGallery] = useState({ categories: [], items: [] });
  const [halls, setHalls] = useState({ reservations: [], blackouts: [] });
  const [form, setForm] = useState({
    categorySlug: "",
    categoryTitle: "",
    categoryDescription: "",
    url: "",
    orientation: "h",
    alt: "",
    sort: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (!token) return;
    localStorage.setItem(STORAGE_KEY, token);
    loadData();
  }, [token]);

  const loadData = async () => {
    try {
      const [g, h] = await Promise.all([
        fetchJson("/api/admin/gallery", token),
        fetchJson("/api/admin/halls", token),
      ]);
      setGallery(g);
      setHalls(h);
      setStatus("");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Snima se...");
    try {
      await fetchJson("/api/admin/gallery", token, {
        method: "POST",
        body: JSON.stringify({ ...form, sort: Number(form.sort) || 0 }),
      });
      setStatus("Sacuvano.");
      setForm((prev) => ({ ...prev, url: "", alt: "", sort: 0 }));
      await loadData();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const groupedItems = useMemo(() => {
    const map = new Map();
    gallery.categories.forEach((c) => map.set(c.id, { ...c, items: [] }));
    gallery.items.forEach((i) => {
      const bucket = map.get(i.categoryId);
      if (bucket) bucket.items.push(i);
    });
    return Array.from(map.values());
  }, [gallery]);

  const reservationsByHall = useMemo(
    () =>
      halls.reservations?.reduce(
        (acc, r) => {
          acc[r.hallType] = acc[r.hallType] || [];
          acc[r.hallType].push(r);
          return acc;
        },
        { velika: [], mala: [] }
      ),
    [halls]
  );

  const blockoutsByHall = useMemo(
    () =>
      halls.blackouts?.reduce(
        (acc, b) => {
          acc[b.hallType] = acc[b.hallType] || [];
          acc[b.hallType].push(b);
          return acc;
        },
        { velika: [], mala: [] }
      ),
    [halls]
  );

  if (!token) {
    return (
      <div className="sb-admin-wrapper">
        <div className="container">
          <div className="sb-card sb-admin-auth">
            <h3>Admin login</h3>
            <p className="sb-text">Unesi ADMIN_TOKEN.</p>
            <input
              type="password"
              className="sb-admin-input"
              placeholder="Admin token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <button className="sb-btn sb-btn-2" onClick={() => token && setToken(token.trim())}>
              Udji
            </button>
            {status && <div className="sb-alert sb-alert-error sb-mt-10">{status}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sb-admin-wrapper">
      <div className="container sb-admin-grid">
        <div className="sb-admin-header">
          <h2>Admin kontrolna tabla</h2>
          <div className="sb-chip-row">
            <span className="sb-chip">Galerija</span>
            <span className="sb-chip sb-chip--ghost">Sale</span>
            <button className="sb-chip sb-chip--ghost" type="button" onClick={loadData}>
              Osvezi
            </button>
          </div>
          {status && <div className="sb-alert sb-alert-error sb-mt-10">{status}</div>}
        </div>

        <div className="sb-card sb-admin-card">
          <div className="sb-panel-heading">
            <div>
              <p className="sb-label">Galerija</p>
              <h4 className="sb-m-0">Dodaj sliku</h4>
            </div>
          </div>
          <form className="sb-form sb-admin-form" onSubmit={submit}>
            <div className="sb-form-row">
              <label>
                Category slug
                <input
                  name="categorySlug"
                  value={form.categorySlug}
                  onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                  required
                />
              </label>
              <label>
                Category title
                <input
                  name="categoryTitle"
                  value={form.categoryTitle}
                  onChange={(e) => setForm({ ...form, categoryTitle: e.target.value })}
                />
              </label>
            </div>
            <div className="sb-form-row">
              <label>
                Category description
                <input
                  name="categoryDescription"
                  value={form.categoryDescription}
                  onChange={(e) => setForm({ ...form, categoryDescription: e.target.value })}
                />
              </label>
            </div>
            <div className="sb-form-row">
              <label>
                Slika URL
                <input name="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
              </label>
              <label>
                Orientation
                <select
                  name="orientation"
                  value={form.orientation}
                  onChange={(e) => setForm({ ...form, orientation: e.target.value })}
                >
                  <option value="h">Horizontal</option>
                  <option value="v">Vertical</option>
                </select>
              </label>
              <label>
                Sort
                <input type="number" name="sort" value={form.sort} onChange={(e) => setForm({ ...form, sort: e.target.value })} />
              </label>
            </div>
            <div className="sb-form-row">
              <label>
                Alt text
                <input name="alt" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
              </label>
            </div>
            <button type="submit" className="sb-btn sb-btn-2">
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
              </span>
              <span>Sacuvaj</span>
            </button>
          </form>

          <div className="sb-admin-list">
            {groupedItems.map((cat) => (
              <div key={cat.id} className="sb-admin-list-item">
                <div className="sb-admin-list-header">
                  <div>
                    <p className="sb-label">{cat.slug}</p>
                    <h5 className="sb-m-0">{cat.title}</h5>
                    {cat.description && <p className="sb-text-sm">{cat.description}</p>}
                  </div>
                  <span className="sb-chip sb-chip--ghost">{cat.items.length} slika</span>
                </div>
                <div className="sb-admin-items-grid">
                  {cat.items.map((item) => (
                    <div key={item.id} className="sb-admin-item-card">
                      <div className="sb-admin-thumb">
                        <img src={item.url} alt={item.alt || "img"} />
                      </div>
                      <div className="sb-admin-item-body">
                        <p className="sb-label">
                          {item.orientation === "h" ? "Horizontal" : "Vertical"} · sort {item.sort}
                        </p>
                        <p className="sb-m-0">{item.alt || "-"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sb-card sb-admin-card">
          <div className="sb-panel-heading">
            <div>
              <p className="sb-label">Sale</p>
              <h4 className="sb-m-0">Rezervacije i blokade</h4>
            </div>
          </div>
          <div className="sb-admin-halls">
            {["velika", "mala"].map((hall) => (
              <div key={hall} className="sb-admin-hall-column">
                <div className="sb-admin-list-header">
                  <div>
                    <p className="sb-label">{hall === "velika" ? "Svecana" : "Mala"}</p>
                    <h5 className="sb-m-0">Rezervacije</h5>
                  </div>
                  <span className="sb-chip sb-chip--ghost">{reservationsByHall[hall]?.length || 0}</span>
                </div>
                <div className="sb-admin-reservations">
                  {(reservationsByHall[hall] || []).map((r) => (
                    <div key={r.id} className="sb-admin-reservation-row">
                      <div>
                        <p className="sb-label">
                          {new Date(r.startAt).toLocaleString()} → {new Date(r.endAt).toLocaleString()}
                        </p>
                        <p className="sb-m-0">{r.guestName || "?"}</p>
                        {r.notes && <p className="sb-text-sm">{r.notes}</p>}
                      </div>
                      <span className="sb-chip sb-chip--ghost">{r.status}</span>
                    </div>
                  ))}
                </div>

                <div className="sb-admin-list-header">
                  <div>
                    <p className="sb-label">Blokade</p>
                    <h5 className="sb-m-0">Datumi</h5>
                  </div>
                  <span className="sb-chip sb-chip--ghost">{blockoutsByHall[hall]?.length || 0}</span>
                </div>
                <div className="sb-admin-reservations">
                  {(blockoutsByHall[hall] || []).map((b) => (
                    <div key={b.id} className="sb-admin-reservation-row">
                      <div>
                        <p className="sb-label">
                          {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
                        </p>
                        <p className="sb-m-0">{b.reason || "Blokirano"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

