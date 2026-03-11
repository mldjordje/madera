export const metadata = {
  title: "Admin | Madera",
  description: "Admin je trenutno na pauzi.",
};

export default function AdminPage() {
  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "40px 20px", background: "#121212", color: "#fff" }}>
      <div style={{ maxWidth: 680, width: "100%", border: "1px solid #303030", borderRadius: 14, padding: 24, background: "#1b1b1b" }}>
        <p style={{ margin: 0, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d2b48c", fontSize: 12 }}>Admin</p>
        <h1 style={{ margin: "8px 0 12px 0", fontSize: 32, lineHeight: 1.2 }}>Panel je privremeno na pauzi</h1>
        <p style={{ margin: 0, color: "#c7c7c7", lineHeight: 1.7 }}>
          Fokus je trenutno na frontend prezentaciji. Admin upload i booking kontrole cemo vratiti u sledecoj fazi.
        </p>
        <a href="/" style={{ marginTop: 18, display: "inline-block", color: "#fff", textDecoration: "underline" }}>
          Nazad na pocetnu
        </a>
      </div>
    </div>
  );
}
