# Madera Frontend

Ovaj projekat sada sadrzi:
- javni frontend sa fokusom na `svecanasala`, `restoran`, `bazen`
- upload slika na **Vercel Blob**
- cuvanje metadata i settings u **Neon PostgreSQL**

## 1) Instalacija

```bash
npm install
```

## 2) Env promenljive

Kopiraj `.env.example` u `.env.local` i popuni:

- `DATABASE_URL` (Neon connection string)
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob RW token)
- `ADMIN_TOKEN` (za buduci admin modul)

## 3) Kreiranje tabela (Neon)

```bash
psql "$DATABASE_URL" -f scripts/neon-schema.sql
```

## 4) Lokalni start

```bash
npm run dev
```

Frontend: `http://localhost:3000`  
Admin: `http://localhost:3000/admin` (trenutno pauziran ekran)
