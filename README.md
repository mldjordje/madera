# Madera

## Brzo pokretanje (lokalno)
1. Instalirajte zavisnosti: `npm install`
2. Kopirajte `.env.example` u `.env.local` i popunite vrednosti.
3. (Opcionalno) Pokrenite razvojni server: `npm run dev`
4. (Opcionalno) Proverite da CMS endpoint radi: `npm run check:gallery` uz podešene promenljive okruženja.
5. (Opcionalno) Kreirajte tabele na Railway bazi direktno iz projekta: `npm run db:setup` (koristi `DATABASE_URL`).

## Podešavanje galerije (CMS)
- Postavite `CMS_GALLERY_ENDPOINT` na URL koji vraća JSON payload oblika `{ intro, categories: [{ slug, title, description, items: [{ url, orientation, alt, sort }] }] }`.
- Ako CMS zahteva ključ/token, upišite ga u `CMS_GALLERY_TOKEN`; helper automatski dodaje `Authorization: Bearer <token>` header ka CMS-u.
- Backend i stranice (`/gallery` i `/gallery-2`) čitaju podatke preko `src/app/_lib/gallery.js` i automatski koriste CMS ako je promenljiva definisana.
- Za brzu proveru konekcije pre deploy-a pokrenite `npm run check:gallery`; skripta javlja status/preview odgovora.

## Railway / PostgreSQL
- Postavite `DATABASE_URL` na Railway connection string koji ste dobili u Railway Project Settings (na primer `postgresql://postgres:<password>@caboose.proxy.rlwy.net:47179/railway`).
- Vrednost čuvajte u `.env.local` (datoteka je ignorisana u git-u) i podesite iste vrednosti u Railway project variables za produkciju.
- Kada kasnije dodamo ORM/migracije, koristiće isti `DATABASE_URL` za spajanje na bazu.

### SQL šema za Railway
Za brzi početak bez ORM-a možete ručno kreirati tabele pomoću `scripts/railway-schema.sql`:

1. U Railway → **Database** → **Connect** kopirajte **PSQL** string (ili koristite Connection URL koji ste već dobili).
2. U terminalu pokrenite psql (zamenite `<connection-string>` Railway URL-om):
   ```bash
   psql "<connection-string>"
   ```
3. U psql konzoli izvršite skriptu:
   ```sql
   \i scripts/railway-schema.sql
   ```

Za automatizovanu primenu iz projekta (npr. lokalno ili u CI), možete pokrenuti:
```bash
npm run db:setup
```
Skripta koristi `DATABASE_URL` iz okruženja i izvršava `scripts/railway-schema.sql` preko Node `pg` klijenta.

Skripta pravi sledeće tabele:
- `gallery_categories` i `gallery_items` — odgovaraju strukturi iz `src/data/gallery.json` i CMS payload-u (slug, title, description, url, orientation `h|v`, alt, sort, FK veza).
- `hall_blackouts` — blokirani datumi po hali (`hall_type` vrednosti `velika`/`mala`).
- `hall_reservations` — termini za svečanu/malu salu sa statusima (`pending`, `confirmed`, `rejected`, `cancelled`). Dodata je GIST ograničavajuća provera koja sprečava preklapanje termina po hali za statuse `pending` i `confirmed`.

## Deploy na Vercel preko GitHub-a
- U Vercel Project Settings → Environment Variables dodajte `CMS_GALLERY_ENDPOINT`, `CMS_GALLERY_TOKEN` (ako treba) i `DATABASE_URL` sa istim vrednostima kao u `.env.local`.
- Pošto je projekat povezan na GitHub, svaki `git push` će pokrenuti Vercel build i deploy; nije potrebno ručno pokretati dev server.
- Po potrebi možete pokrenuti `npm run build` lokalno samo za proveru, ali Vercel će sve odraditi u produkcijskom okruženju.

### Kako da Vercel vidi Railway bazu (korak-po-korak)
1. Uđite u Railway projekt → sekcija **Database** → klik na PostgreSQL instancu → kopirajte **Connection URL** (počinje sa `postgresql://...`).
2. Otvorite Vercel Project Settings → **Environment Variables** i dodajte novu varijablu:
   - Name: `DATABASE_URL`
   - Value: Connection URL koji ste kopirali iz Railway-a
   - Environment: izaberite **Production** (i **Preview** ako koristite Preview deploye)
3. Snimite promene; Vercel će ih automatski primeniti pri sledećem build-u koji se okida na `git push`.
4. (Opcionalno) Ako imate CMS koji zahteva token, dodajte i `CMS_GALLERY_ENDPOINT` / `CMS_GALLERY_TOKEN` u istom delu.
5. Kada se deploy završi, aplikacija na Vercel-u će koristiti Railway bazu jer Next.js automatski čita `DATABASE_URL` iz env varijable.

## Lint
- ESLint je konfigurisano preko `.eslintrc.json` sa Next.js "core-web-vitals" postavkom.
- Pokretanje: `npm run lint`.
