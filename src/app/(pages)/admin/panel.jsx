"use client";

import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "madera_admin_token";
const STATUS_LABELS = {
  pending: "Na cekanju",
  confirmed: "Potvrdjeno",
  rejected: "Odbijeno",
  cancelled: "Otkazano",
};

const SECTIONS = [
  { id: "gallery", title: "Galerija", description: "Slike i kategorije" },
  { id: "dishes", title: "Izdvojena jela", description: "Most popular slider" },
  { id: "halls", title: "Sale", description: "Rezervacije i blokade" },
];

async function fetchJson(url, token, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["x-admin-token"] = token;
  const res = await fetch(url, { ...options, headers, cache: "no-store" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(body.error || "Request failed");
    error.status = res.status;
    throw error;
  }
  return body;
}

const AdminPanel = () => {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [status, setStatus] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const [gallery, setGallery] = useState({ categories: [], items: [] });
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [halls, setHalls] = useState({ reservations: [], blackouts: [] });
  const [hallPhotos, setHallPhotos] = useState({ velika: [], mala: [] });
  const [settings, setSettings] = useState({ allowReservations: true, contactPhone: "+381 63 000 000" });
  const [selectedCategory, setSelectedCategory] = useState("new");
  const [galleryFile, setGalleryFile] = useState(null);
  const [dishFile, setDishFile] = useState(null);
  const [form, setForm] = useState({
    categorySlug: "",
    categoryTitle: "",
    categoryDescription: "",
    url: "",
    orientation: "h",
    alt: "",
    sort: 0,
  });
  const [dishForm, setDishForm] = useState({
    id: null,
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    sort: 0,
  });
  const [hallPhotoForm, setHallPhotoForm] = useState({
    id: null,
    hallType: "velika",
    url: "",
    alt: "",
    sort: 0,
  });
  const [hallPhotoFile, setHallPhotoFile] = useState(null);
  const [blackoutForm, setBlackoutForm] = useState({ hallType: "velika", startDate: "", endDate: "", reason: "" });
  const [activeReservation, setActiveReservation] = useState(null);
  const [activeSection, setActiveSection] = useState("gallery");

  const logout = (message = "") => {
    setToken("");
    setTokenInput("");
    localStorage.removeItem(STORAGE_KEY);
    setStatus("");
    setAuthStatus(message);
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTokenInput(stored);
      setToken(stored);
      loadData(stored);
    }
  }, []);

  const loadData = async (tokenArg = "", options = {}) => {
    const authToken = tokenArg || token;
    if (!authToken) return;
    const activeId = options.activeReservationId || activeReservation?.id;
      setStatus("Ucitavanje podataka...");
      setAuthStatus("");
      try {
        const [g, h, d, s, p] = await Promise.all([
          fetchJson("/api/admin/gallery", authToken),
          fetchJson("/api/admin/halls", authToken),
          fetchJson("/api/admin/featured-dishes", authToken),
          fetchJson("/api/admin/halls/settings", authToken),
          fetchJson("/api/admin/halls/photos", authToken),
        ]);
        setGallery(g);
        if (g.categories?.length && selectedCategory === "new") {
          setSelectedCategory(g.categories[0].slug);
          setForm((prev) => ({
          ...prev,
          categorySlug: g.categories[0].slug,
          categoryTitle: g.categories[0].title,
          categoryDescription: g.categories[0].description || "",
        }));
      }
      setFeaturedDishes(d.items || []);
      setHalls(h);
        setSettings({
          allowReservations: s.allowReservations !== false,
          contactPhone: s.contactPhone || "+381 63 000 000",
        });
        setHallPhotos(p.photos || { velika: [], mala: [] });
        if (activeId) {
          const refreshed = h.reservations?.find((r) => r.id === activeId);
          if (refreshed) {
            setActiveReservation(refreshed);
          }
      }
      setStatus("");
    } catch (error) {
      if (error.status === 401) {
        logout("Token nije prihvacen. Unesi isti ADMIN_TOKEN koji je postavljen na serveru (.env).");
        return;
      }
      setStatus(error.message);
    }
  };

  const fileToDataUrl = (selectedFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(selectedFile);
    });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Snima se...");
    try {
      let finalUrl = form.url;
      if (!finalUrl && galleryFile) {
        finalUrl = await fileToDataUrl(galleryFile);
      }
      if (!finalUrl) {
        throw new Error("Unesi URL ili izaberi fajl.");
      }
      await fetchJson("/api/admin/gallery", token, {
        method: "POST",
        body: JSON.stringify({ ...form, url: finalUrl, sort: Number(form.sort) || 0 }),
      });
      setStatus("Sacuvano.");
      setForm((prev) => ({ ...prev, url: "", alt: "", sort: 0 }));
      setGalleryFile(null);
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

  const resetDishForm = () => {
    setDishForm({ id: null, title: "", description: "", imageUrl: "", price: "", sort: 0 });
    setDishFile(null);
  };

  const submitDish = async (e) => {
    e.preventDefault();
    setStatus("Snima se jelo...");
    try {
      let finalImage = dishForm.imageUrl;
      if (!finalImage && dishFile) {
        finalImage = await fileToDataUrl(dishFile);
      }
      if (!dishForm.title.trim() || !finalImage) {
        throw new Error("Naslov i slika su obavezni.");
      }

      const payload = {
        ...dishForm,
        title: dishForm.title.trim(),
        description: dishForm.description?.trim() || "",
        imageUrl: finalImage,
        price: dishForm.price?.trim() || "",
        sort: Number(dishForm.sort) || 0,
      };

      const method = dishForm.id ? "PATCH" : "POST";

      await fetchJson("/api/admin/featured-dishes", token, {
        method,
        body: JSON.stringify(payload),
      });

      setStatus("Jelo je sacuvano.");
      resetDishForm();
      await loadData();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const startEditDish = (dish) => {
    setDishForm({
      id: dish.id,
      title: dish.title || "",
      description: dish.description || "",
      imageUrl: dish.imageUrl || "",
      price: dish.price || "",
      sort: dish.sort ?? 0,
    });
    setDishFile(null);
  };

  const deleteDish = async (dishId) => {
    if (!dishId) return;
    if (typeof window !== "undefined" && !window.confirm("Obrisati ovo jelo?")) {
      return;
    }
    setStatus("Brisanje jela...");
    try {
      await fetchJson("/api/admin/featured-dishes", token, {
        method: "DELETE",
        body: JSON.stringify({ id: dishId }),
      });
      if (dishForm.id === dishId) {
        resetDishForm();
      }
      setStatus("Jelo obrisano.");
      await loadData();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const updateReservationStatus = async (reservationId, nextStatus) => {
    if (!reservationId || !nextStatus) return;
    setStatus("Azuriranje rezervacije...");
    try {
      const response = await fetchJson("/api/admin/halls", token, {
        method: "PATCH",
        body: JSON.stringify({ id: reservationId, status: nextStatus }),
      });
      if (response.reservation) {
        setActiveReservation(response.reservation);
      }
      setStatus("Status azuriran.");
      await loadData({ activeReservationId: reservationId });
    } catch (error) {
      setStatus(error.message);
    }
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch (err) {
      return String(value);
    }
  };

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

  const sectionStats = {
    gallery: `${gallery.items?.length || 0} slika`,
    dishes: `${featuredDishes?.length || 0} jela`,
    halls: settings.allowReservations
      ? `${halls.reservations?.length || 0} rez. / ${(hallPhotos.velika?.length || 0) + (hallPhotos.mala?.length || 0)} foto`
      : "Rezervacije iskljucene",
  };

  const toggleReservations = async (enabled) => {
    setStatus("Snima se podesavanje...");
    try {
      const next = await fetchJson("/api/admin/halls/settings", token, {
        method: "PATCH",
        body: JSON.stringify({ allowReservations: enabled }),
      });
      setSettings({
        allowReservations: next.allowReservations !== false,
        contactPhone: next.contactPhone || settings.contactPhone,
      });
      setStatus(enabled ? "Rezervacije ukljucene." : "Rezervacije iskljucene.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const resetHallPhotoForm = () => {
    setHallPhotoForm({ id: null, hallType: "velika", url: "", alt: "", sort: 0 });
    setHallPhotoFile(null);
  };

  const submitHallPhoto = async (e) => {
    e.preventDefault();
    setStatus("Snima se slika sale...");
    try {
      let finalUrl = hallPhotoForm.url;
      if (!finalUrl && hallPhotoFile) {
        finalUrl = await fileToDataUrl(hallPhotoFile);
      }
      if (!finalUrl) {
        throw new Error("Unesi URL ili izaberi sliku.");
      }

      const payload = {
        hallType: hallPhotoForm.hallType,
        url: finalUrl,
        alt: hallPhotoForm.alt?.trim() || "",
        sort: Number(hallPhotoForm.sort) || 0,
      };

      const method = hallPhotoForm.id ? "PATCH" : "POST";
      const body = hallPhotoForm.id ? { ...payload, id: hallPhotoForm.id } : payload;

      await fetchJson("/api/admin/halls/photos", token, {
        method,
        body: JSON.stringify(body),
      });

      setStatus("Slika sacuvana.");
      resetHallPhotoForm();
      await loadData();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const startEditHallPhoto = (photo) => {
    setHallPhotoForm({
      id: photo.id,
      hallType: photo.hallType,
      url: photo.url,
      alt: photo.alt || "",
      sort: photo.sort ?? 0,
    });
    setHallPhotoFile(null);
  };

  const deleteHallPhoto = async (id) => {
    if (!id) return;
    if (typeof window !== "undefined" && !window.confirm("Obrisati ovu sliku?")) {
      return;
    }
    setStatus("Brisanje slike...");
    try {
      await fetchJson("/api/admin/halls/photos", token, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (hallPhotoForm.id === id) {
        resetHallPhotoForm();
      }
      setStatus("Slika obrisana.");
      await loadData();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const submitBlackout = async (e) => {
    e.preventDefault();
    setStatus("Dodavanje blokade...");
    try {
      if (!blackoutForm.startDate || !blackoutForm.endDate) {
        throw new Error("Odaberi pocetni i krajnji datum.");
      }
      const start = new Date(blackoutForm.startDate);
      const end = new Date(blackoutForm.endDate);
      if (start > end) {
        throw new Error("Pocetni datum mora biti pre krajnjeg.");
      }
      await fetchJson("/api/admin/halls/blackouts", token, {
        method: "POST",
        body: JSON.stringify({
          hallType: blackoutForm.hallType,
          startDate: blackoutForm.startDate,
          endDate: blackoutForm.endDate,
          reason: blackoutForm.reason,
        }),
      });
      setStatus("Blokada dodata.");
      setBlackoutForm({ hallType: "velika", startDate: "", endDate: "", reason: "" });
      await loadData();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const deleteBlackout = async (id) => {
    if (!id) return;
    if (typeof window !== "undefined" && !window.confirm("Obrisati blokadu?")) return;
    setStatus("Brisanje blokade...");
    try {
      await fetchJson("/api/admin/halls/blackouts", token, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setStatus("Blokada obrisana.");
      await loadData();
    } catch (error) {
      setStatus(error.message);
    }
  };

  if (!token) {
    return (
      <div className="sb-admin-wrapper">
        <div className="container">
          <div className="sb-card sb-admin-auth">
            <h3>Admin login</h3>
            <p className="sb-text">Unesi ADMIN_TOKEN (isti string koji si postavio u .env / Vercel varijabli).</p>
            <p className="sb-label sb-mb-5">Ako vidis "Unauthorized", token ne odgovara env vrednosti.</p>
            <input
              type="password"
              className="sb-admin-input"
              placeholder="Admin token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
            <button
              className="sb-btn sb-btn-2"
              onClick={async () => {
                const val = (tokenInput || "").trim();
                if (!val) {
                  setAuthStatus("Unesi token.");
                  return;
                }
                setToken(val);
                localStorage.setItem(STORAGE_KEY, val);
                await loadData(val);
              }}
            >
              Udji
            </button>
            {authStatus && <div className="sb-alert sb-alert-error sb-mt-10">{authStatus}</div>}
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
          <div className="sb-admin-switcher">
            {SECTIONS.map((section) => (
              <button
                type="button"
                key={section.id}
                className={`sb-admin-tile ${activeSection === section.id ? "is-active" : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                <div>
                  <p className="sb-label">{section.title}</p>
                  <h4 className="sb-m-0">{section.description}</h4>
                </div>
                <span className="sb-chip sb-chip--ghost">{sectionStats[section.id]}</span>
              </button>
            ))}
          </div>
          <div className="sb-chip-row sb-mt-10">
            <button className="sb-chip" type="button" onClick={loadData}>
              Osvezi
            </button>
            <button className="sb-chip sb-chip--ghost" type="button" onClick={() => logout()}>
              Odjavi se
            </button>
          </div>
          {status && <div className="sb-alert sb-alert-error sb-mt-10">{status}</div>}
        </div>

        {activeSection === "gallery" && (
          <div className="sb-card sb-admin-card">
            <div className="sb-panel-heading">
              <div>
                <p className="sb-label">Galerija</p>
                <h4 className="sb-m-0">Dodaj sliku</h4>
              </div>
              <span className="sb-chip sb-chip--ghost">{gallery.categories?.length || 0} kategorija</span>
            </div>
            <form className="sb-form sb-admin-form" onSubmit={submit}>
              <div className="sb-form-row">
                <label>
                  Kategorija
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedCategory(value);
                      if (value === "new") {
                        setForm((prev) => ({
                          ...prev,
                          categorySlug: "",
                          categoryTitle: "",
                          categoryDescription: "",
                        }));
                      } else {
                        const cat = gallery.categories.find((c) => c.slug === value);
                        if (cat) {
                          setForm((prev) => ({
                            ...prev,
                            categorySlug: cat.slug,
                            categoryTitle: cat.title,
                            categoryDescription: cat.description || "",
                          }));
                        }
                      }
                    }}
                  >
                    {gallery.categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.title || cat.slug}
                      </option>
                    ))}
                    <option value="new">+ Nova kategorija</option>
                  </select>
                </label>
              </div>
              <div className="sb-form-row">
                <label>
                  Category slug
                  <input
                    name="categorySlug"
                    value={form.categorySlug}
                    onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                    required
                    disabled={selectedCategory !== "new"}
                  />
                </label>
                <label>
                  Category title
                  <input
                    name="categoryTitle"
                    value={form.categoryTitle}
                    onChange={(e) => setForm({ ...form, categoryTitle: e.target.value })}
                    disabled={selectedCategory !== "new"}
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
                    disabled={selectedCategory !== "new"}
                  />
                </label>
              </div>
              <div className="sb-form-row">
                <label>
                  Slika URL (opciono ako upload)
                  <input name="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
                </label>
                <label>
                  Upload fajl
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setGalleryFile(e.target.files?.[0] || null)}
                  />
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
                  <input
                    type="number"
                    name="sort"
                    value={form.sort}
                    onChange={(e) => setForm({ ...form, sort: e.target.value })}
                  />
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
                            {item.orientation === "h" ? "Horizontal" : "Vertical"} - sort {item.sort}
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
        )}

        {activeSection === "dishes" && (
          <div className="sb-card sb-admin-card">
            <div className="sb-panel-heading">
              <div>
                <p className="sb-label">Izdvojena jela</p>
                <h4 className="sb-m-0">Sekcija "Most popular dishes"</h4>
              </div>
              <span className="sb-chip sb-chip--ghost">{featuredDishes.length} jela</span>
            </div>

            <form className="sb-form sb-admin-form" onSubmit={submitDish}>
              <div className="sb-form-row">
                <label>
                  Naslov jela
                  <input
                    name="title"
                    value={dishForm.title}
                    onChange={(e) => setDishForm({ ...dishForm, title: e.target.value })}
                    required
                    placeholder="Naziv koji se prikazuje"
                  />
                </label>
              </div>
              <div className="sb-form-row">
                <label>
                  Kratak opis
                  <textarea
                    name="description"
                    rows="2"
                    value={dishForm.description}
                    onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                    placeholder="Tekst ispod naslova (opciono)"
                  />
                </label>
              </div>
              <div className="sb-form-row">
                <label>
                  Slika URL (ili upload)
                  <input
                    name="imageUrl"
                    value={dishForm.imageUrl}
                    onChange={(e) => setDishForm({ ...dishForm, imageUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </label>
                <label>
                  Upload fajl
                  <input type="file" accept="image/*" onChange={(e) => setDishFile(e.target.files?.[0] || null)} />
                </label>
              </div>
              <div className="sb-form-row">
                <label>
                  Cena / tag (opciono)
                  <input
                    name="price"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })}
                    placeholder="npr. 1200 RSD"
                  />
                </label>
                <label>
                  Sort
                  <input
                    type="number"
                    name="dishSort"
                    value={dishForm.sort}
                    onChange={(e) => setDishForm({ ...dishForm, sort: e.target.value })}
                  />
                </label>
              </div>
              <div className="sb-form-actions">
                <button type="submit" className="sb-btn sb-btn-2">
                  <span className="sb-icon">
                    <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                  </span>
                  <span>{dishForm.id ? "Sacuvaj izmene" : "Dodaj jelo"}</span>
                </button>
                {dishForm.id && (
                  <button type="button" className="sb-btn sb-btn-2 sb-btn-gray" onClick={resetDishForm}>
                    Otkazi izmene
                  </button>
                )}
              </div>
            </form>

            <div className="sb-admin-items-grid sb-admin-dishes">
              {featuredDishes.map((dish) => (
                <div key={dish.id} className="sb-admin-item-card sb-admin-dish-card">
                  <div className="sb-admin-thumb">
                    <img src={dish.imageUrl} alt={dish.title || "jelo"} />
                  </div>
                  <div className="sb-admin-item-body">
                    <p className="sb-label">Sort {dish.sort}</p>
                    <h5 className="sb-m-0">{dish.title}</h5>
                    {dish.description && <p className="sb-text-sm">{dish.description}</p>}
                    {dish.price && <p className="sb-label sb-label-muted">{dish.price}</p>}
                  </div>
                  <div className="sb-admin-dish-actions">
                    <button type="button" className="sb-chip" onClick={() => startEditDish(dish)}>
                      Uredi
                    </button>
                    <button type="button" className="sb-chip sb-chip--ghost" onClick={() => deleteDish(dish.id)}>
                      Obrisi
                    </button>
                  </div>
                </div>
              ))}
              {featuredDishes.length === 0 && (
                <div className="sb-alert sb-alert-error">Dodaj jelo da se prikaze na sajtu.</div>
              )}
            </div>
          </div>
        )}

        {activeSection === "halls" && (
          <div className="sb-card sb-admin-card">
            <div className="sb-panel-heading">
              <div>
                <p className="sb-label">Sale</p>
                <h4 className="sb-m-0">Rezervacije i blokade</h4>
              </div>
              <span className="sb-chip sb-chip--ghost">{halls.reservations?.length || 0} rezervacija</span>
            </div>
            <div className="sb-form sb-admin-form sb-mb-20">
              <div className="sb-form-row">
                <label className="sb-toggle">
                  <input
                    type="checkbox"
                    checked={settings.allowReservations}
                    onChange={(e) => toggleReservations(e.target.checked)}
                  />
                  <span className="sb-toggle-slider" />
                  <span className="sb-toggle-label">
                    {settings.allowReservations ? "Rezervacije ukljucene" : "Rezervacije iskljucene"}
                  </span>
                </label>
              </div>
              <div className="sb-form-row">
                <label>
                  Kontakt telefon (CTA kada je iskljuceno)
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    onBlur={async (e) => {
                      const val = e.target.value.trim();
                      if (!val) return;
                      try {
                        const next = await fetchJson("/api/admin/halls/settings", token, {
                          method: "PATCH",
                          body: JSON.stringify({ contactPhone: val }),
                        });
                        setSettings({
                          allowReservations: next.allowReservations !== false,
                          contactPhone: next.contactPhone || val,
                        });
                      } catch (error) {
                        setStatus(error.message);
                      }
                    }}
                    placeholder="+381 63 000 000"
                  />
                </label>
              </div>
            </div>
            <div className="sb-form sb-admin-form sb-mb-20">
              <div className="sb-panel-heading">
                <div>
                  <p className="sb-label">Blokade datuma</p>
                  <h4 className="sb-m-0">Telefon rezervacije - zatvori online termin</h4>
                </div>
                <span className="sb-chip sb-chip--ghost">{halls.blackouts?.length || 0} blokada</span>
              </div>
              <form className="sb-form" onSubmit={submitBlackout}>
                <div className="sb-form-row">
                  <label>
                    Sala
                    <select
                      value={blackoutForm.hallType}
                      onChange={(e) => setBlackoutForm((prev) => ({ ...prev, hallType: e.target.value }))}
                    >
                      <option value="velika">Svecana sala</option>
                      <option value="mala">Mala sala</option>
                    </select>
                  </label>
                  <label>
                    Od datuma
                    <input
                      type="date"
                      value={blackoutForm.startDate}
                      onChange={(e) => setBlackoutForm((prev) => ({ ...prev, startDate: e.target.value }))}
                      required
                    />
                  </label>
                  <label>
                    Do datuma
                    <input
                      type="date"
                      value={blackoutForm.endDate}
                      onChange={(e) => setBlackoutForm((prev) => ({ ...prev, endDate: e.target.value }))}
                      required
                    />
                  </label>
                </div>
                <div className="sb-form-row">
                  <label>
                    Razlog (opciono)
                    <input
                      type="text"
                      value={blackoutForm.reason}
                      onChange={(e) => setBlackoutForm((prev) => ({ ...prev, reason: e.target.value }))}
                      placeholder="Vec rezervisano telefonom"
                    />
                  </label>
                </div>
                <button type="submit" className="sb-btn sb-btn-2">
                  <span className="sb-icon">
                    <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                  </span>
                  <span>Dodaj blokadu</span>
                </button>
              </form>
            </div>

            <div className="sb-form sb-admin-form sb-mb-20">
              <div className="sb-panel-heading">
                <div>
                  <p className="sb-label">Slike sala</p>
                  <h4 className="sb-m-0">Slider za veliku i malu salu</h4>
                </div>
                <span className="sb-chip sb-chip--ghost">
                  {(hallPhotos.velika?.length || 0) + (hallPhotos.mala?.length || 0)} slika
                </span>
              </div>
              <form className="sb-form" onSubmit={submitHallPhoto}>
                <div className="sb-form-row">
                  <label>
                    Sala
                    <select
                      value={hallPhotoForm.hallType}
                      onChange={(e) => setHallPhotoForm((prev) => ({ ...prev, hallType: e.target.value }))}
                    >
                      <option value="velika">Svecana sala</option>
                      <option value="mala">Mala sala</option>
                    </select>
                  </label>
                  <label>
                    Slika URL (ili upload)
                    <input
                      name="hallPhotoUrl"
                      value={hallPhotoForm.url}
                      onChange={(e) => setHallPhotoForm((prev) => ({ ...prev, url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </label>
                  <label>
                    Upload fajl
                    <input type="file" accept="image/*" onChange={(e) => setHallPhotoFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <div className="sb-form-row">
                  <label>
                    Alt opis (seo)
                    <input
                      name="hallPhotoAlt"
                      value={hallPhotoForm.alt}
                      onChange={(e) => setHallPhotoForm((prev) => ({ ...prev, alt: e.target.value }))}
                      placeholder="Sala dekoracija..."
                    />
                  </label>
                  <label>
                    Sort
                    <input
                      type="number"
                      name="hallPhotoSort"
                      value={hallPhotoForm.sort}
                      onChange={(e) => setHallPhotoForm((prev) => ({ ...prev, sort: e.target.value }))}
                    />
                  </label>
                </div>
                <div className="sb-form-actions">
                  <button type="submit" className="sb-btn sb-btn-2">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                    </span>
                    <span>{hallPhotoForm.id ? "Sacuvaj sliku" : "Dodaj sliku"}</span>
                  </button>
                  {hallPhotoForm.id && (
                    <button type="button" className="sb-btn sb-btn-2 sb-btn-gray" onClick={resetHallPhotoForm}>
                      Otkazi izmene
                    </button>
                  )}
                </div>
              </form>

              <div className="sb-admin-hall-photos">
                {["velika", "mala"].map((hallKey) => (
                  <div key={hallKey} className="sb-admin-hall-photos__column">
                    <div className="sb-admin-list-header">
                      <div>
                        <p className="sb-label">{hallKey === "velika" ? "Svecana sala" : "Mala sala"}</p>
                        <h5 className="sb-m-0">Slider ({hallPhotos[hallKey]?.length || 0})</h5>
                      </div>
                    </div>
                    <div className="sb-admin-items-grid sb-admin-dishes">
                      {(hallPhotos[hallKey] || []).map((photo) => (
                        <div key={photo.id} className="sb-admin-item-card sb-admin-dish-card">
                          <div className="sb-admin-thumb">
                            <img src={photo.url} alt={photo.alt || "hall"} />
                          </div>
                          <div className="sb-admin-item-body">
                            <p className="sb-label">Sort {photo.sort}</p>
                            <h5 className="sb-m-0">{photo.alt || "Slika sale"}</h5>
                          </div>
                          <div className="sb-admin-dish-actions">
                            <button type="button" className="sb-chip" onClick={() => startEditHallPhoto(photo)}>
                              Uredi
                            </button>
                            <button type="button" className="sb-chip sb-chip--ghost" onClick={() => deleteHallPhoto(photo.id)}>
                              Obrisi
                            </button>
                          </div>
                        </div>
                      ))}
                      {(hallPhotos[hallKey] || []).length === 0 && (
                        <div className="sb-alert sb-alert-error">Dodaj bar jednu sliku za ovu salu.</div>
                      )}
                    </div>
                  </div>
                ))}
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
                      <div
                        key={r.id}
                        className={`sb-admin-reservation-row ${activeReservation?.id === r.id ? "is-active" : ""}`}
                        onClick={() => setActiveReservation(r)}
                      >
                        <div>
                          <p className="sb-label">
                            {formatDateTime(r.startAt)}
                            {" -> "}
                            {formatDateTime(r.endAt)}
                          </p>
                          <p className="sb-m-0">{r.guestName || "?"}</p>
                          <p className="sb-text-sm sb-m-0">{r.guestEmail || r.guestPhone || ""}</p>
                          {r.notes && <p className="sb-text-sm">{r.notes}</p>}
                        </div>
                        <span className="sb-chip sb-chip--ghost">{STATUS_LABELS[r.status] || r.status}</span>
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
                      <div key={b.id} className="sb-admin-reservation-row is-static">
                        <div>
                          <p className="sb-label">
                            {new Date(b.startDate).toLocaleDateString()}
                            {" -> "}
                            {new Date(b.endDate).toLocaleDateString()}
                          </p>
                          <p className="sb-m-0">{b.reason || "Blokirano"}</p>
                        </div>
                        <div className="sb-chip-row">
                          <button
                            type="button"
                            className="sb-chip sb-chip--ghost"
                            onClick={() => deleteBlackout(b.id)}
                          >
                            Obrisi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {activeReservation && settings.allowReservations && (
              <div className="sb-admin-reservation-detail">
                <div className="sb-panel-heading">
                  <div>
                    <p className="sb-label">{activeReservation.hallType === "velika" ? "Svecana sala" : "Mala sala"}</p>
                    <h4 className="sb-m-0">{activeReservation.guestName || "Rezervacija"}</h4>
                    <p className="sb-label sb-label-muted">
                      Status: {STATUS_LABELS[activeReservation.status] || activeReservation.status}
                    </p>
                    <p className="sb-label sb-label-muted">
                      Azurirano: {formatDateTime(activeReservation.updatedAt || activeReservation.createdAt)}
                    </p>
                  </div>
                  <div className="sb-chip sb-chip--ghost">ID #{activeReservation.id}</div>
                </div>

                <div className="sb-reservation-meta">
                  <div>
                    <p className="sb-label">Vreme</p>
                    <p className="sb-m-0">{formatDateTime(activeReservation.startAt)}</p>
                    <p className="sb-label sb-label-muted">do {formatDateTime(activeReservation.endAt)}</p>
                  </div>
                  <div>
                    <p className="sb-label">Kontakt</p>
                    <p className="sb-m-0">{activeReservation.guestEmail || "-"}</p>
                    {activeReservation.guestPhone && <p className="sb-m-0">{activeReservation.guestPhone}</p>}
                  </div>
                  <div>
                    <p className="sb-label">Napomena gosta</p>
                    <p className="sb-m-0">{activeReservation.notes || "Nema napomene."}</p>
                  </div>
                </div>

                <div className="sb-reservation-actions">
                  <button
                    type="button"
                    className="sb-btn sb-btn-2"
                    onClick={() => updateReservationStatus(activeReservation.id, "confirmed")}
                  >
                    Potvrdi
                  </button>
                  <button
                    type="button"
                    className="sb-btn sb-btn-2 sb-btn-gray"
                    onClick={() => updateReservationStatus(activeReservation.id, "pending")}
                  >
                    Vrati na cekanje
                  </button>
                  <button
                    type="button"
                    className="sb-btn sb-btn-2 sb-btn-gray"
                    onClick={() => updateReservationStatus(activeReservation.id, "cancelled")}
                  >
                    Otkazi
                  </button>
                  <button
                    type="button"
                    className="sb-btn sb-btn-2 sb-btn-danger"
                    onClick={() => updateReservationStatus(activeReservation.id, "rejected")}
                  >
                    Odbij
                  </button>
                  <button
                    type="button"
                    className="sb-btn sb-btn-2 sb-btn-gray"
                    onClick={() => setActiveReservation(null)}
                  >
                    Zatvori pregled
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
