# Nordic Table

**Fagprøve – webudvikler**

| | |
|---|---|
| **Opgave** | Nordic Table – webapplikation til restaurant |
| **Navn** | Jonas Rasmussen |
| **Klasse** | WebH125-1 |
| **Skole** | [UDFYLD: skole] |
| **Afleveringsdato** | 02-10-2026 |

*Jeg bekræfter hermed, at jeg selvstændigt og uden uretmæssig hjælp har udviklet det afleverede eksamensprojekt i overensstemmelse med gældende regler for prøven.*

Dato: 02-10-2026  Underskrift: [UDFYLD: indsæt underskrift]

---

## 1. Vurdering af egen indsats

**Hvad gik godt?**
Kernekravene i prioriteringslisten (punkt 1–7) er løst: alle fem sider er bygget mobile-first efter Figma, menuen og signaturretterne hentes fra API'et, bordreservation sender til API'et med validering og kvittering, og backoffice har fuld CRUD på retter. Jeg er især tilfreds med, at al API-kommunikation går gennem én lille funktion (`src/services/api.js`), så fejlhåndtering kun er skrevet ét sted, og at reglerne for booking og retter ligger i rene funktioner, der kan testes uden browser.

**Hvad var udfordrende – og hvordan løste jeg det?**

- **API'et svarer ikke altid med en HTTP-fejlkode.** Ved forkert login og ugyldigt token svarer det `200 OK` med `status: "error"` i body. Derfor tjekker `api()` både `res.ok` og `data.status`, så alle fejl ender som en `Error`, komponenterne kan vise.
- **`/dishes` omdirigerede.** API'et har en statisk mappe med samme navn, så kaldet uden afsluttende skråstreg blev omdirigeret. Løsningen er at kalde `/dishes/`.
- **Retter skal sendes som `multipart/form-data`** på grund af billed-upload, mens booking og login er JSON. `api()` opdager selv, om body er `FormData`, og sætter kun `Content-Type` ved JSON.
- **Datoer og tidszoner.** `toISOString()` giver UTC-datoen, så "i dag" kunne blive i går sent om aftenen. Jeg bruger i stedet lokal dato (`toLocaleDateString('sv-SE')`) til validering og omregner først til ISO, når bookingen sendes.
- **Tidspunkter skal passe til åbningstiderne.** Åbningstiderne ligger ét sted (`src/data/info.js`) og bruges både i footer, på booking-siden og til at beregne de ledige halvtimes-tider, så de tre steder ikke kan komme ud af trit.

**Hvad ville jeg gøre anderledes?**

- Committe oftere og med beskrivende beskeder. Historikken består af tre store commits ("new structure", "new changes"), hvilket gør processen svær at følge bagefter.
- Føre tidsregistrering fra første dag i stedet for at rekonstruere den.
- Optimere billederne tidligere. Flere af de udleverede PNG-filer er 2–3 MB og burde konverteres til WebP i passende størrelser.
- [UDFYLD: evt. dit eget punkt.]

**Hvordan har jeg udviklet mig fagligt?**
[UDFYLD: skriv selv 3–5 sætninger. Forslag til emner, som projektet har berørt: JWT og route guards, tilgængelige formularer med `aria-invalid`/`aria-describedby`, at adskille forretningsregler fra komponenter, fejlhåndtering mod et API der ikke opfører sig helt efter REST.]

## 2. Tidsplan og proces

Projektet blev brudt ned efter opgavens prioriteringsliste. Kolonnen "Udført" er aflæst fra git-historikken.

| # | Opgave | Estimat | Faktisk | Udført |
|---|---|---|---|---|
| 1 | Opsætning: Vite, routing, mappestruktur, SCSS-variabler | [UDFYLD] | [UDFYLD] | 28/9 |
| 2 | Layout: header, navigation, footer, hero | [UDFYLD] | [UDFYLD] | 30/9 |
| 3 | Forside: signaturretter (GET), om-sektion, nøgletal, teaser | [UDFYLD] | [UDFYLD] | 30/9 |
| 4 | Menu-side: retter fra API grupperet efter kategori | [UDFYLD] | [UDFYLD] | 30/9 |
| 5 | Booking: info-kort, formular, validering, POST, kvittering | [UDFYLD] | [UDFYLD] | 30/9 |
| 6 | Login med JWT, AuthContext, route guard, logout | [UDFYLD] | [UDFYLD] | 1/10 |
| 7 | Backoffice: oversigt, opret, redigér, slet retter | [UDFYLD] | [UDFYLD] | 1/10 |
| 8 | 404-side, tomme lister, fejlbeskeder, finpudsning af design | [UDFYLD] | [UDFYLD] | 1/10 |
| 9 | Rapport | [UDFYLD] | [UDFYLD] | [UDFYLD] |

## 3. Tech stack

| Teknologi | Brug | Begrundelse |
|---|---|---|
| **React 19** | Frontend-framework | Komponentbaseret og det framework, vi har arbejdet mest med i undervisningen. |
| **Vite 8** | Udviklingsserver og build | Hurtig opstart og hot reload, minimal konfiguration. |
| **React Router 7** | Routing | Giver klient-routing, `NavLink` til aktivt menupunkt, `Navigate` til route guard og en `*`-route til 404. |
| **Sass (SCSS)** | Styling | Variabler til farver, skrifter og breakpoint samt nesting. Én SCSS-fil pr. komponent med BEM-navngivning. |
| **oxlint** | Linting | Fanger fejl og ubrugte variabler under udvikling. |
| **Node test runner** | Unit tests | Indbygget i Node (`npm test`), så der ikke skal installeres et testframework. |

Jeg har bevidst holdt antallet af pakker nede. Der er kun tre runtime-afhængigheder (`react`, `react-dom`, `react-router-dom`). Der bruges indbygget `fetch` i stedet for axios, React-state i stedet for et state-bibliotek, egne SVG-ikoner i stedet for en ikonpakke og browserens egne `<input type="date">` og `<select>` i stedet for en datepicker. Det giver mindre kode at vedligeholde og hurtigere indlæsning.

## 4. Faglige valg og dokumentation

**Arkitektur og mappestruktur.** Applikationen er en SPA. `src` er delt efter ansvar:

```
src/
  components/   genbrugelige dele: layout (Header, Footer, Layout), Hero, DishCard, Icon, ProtectedRoute
  pages/        én mappe pr. side med komponent, SCSS og sidens egne regler/tests
  context/      AuthContext (login-tilstand)
  services/     api.js (al kommunikation med API'et)
  data/         info.js (åbningstider, kontakt, SoMe)
  styles/       globale variabler og basis-styles
```

Kode, der kun bruges af én side, ligger i sidens mappe (fx `BookingForm` og `bookingRules.js` under `pages/Booking`). Kun det, der reelt genbruges, er flyttet til `components`.

**Komponenter.** `Layout` omkranser de offentlige sider med header og footer via `<Outlet />` og vælger header-variant ud fra ruten (over hero på forsiden, hvid bar på login og 404). Backoffice ligger uden for `Layout`, fordi den ifølge Figma har sin egen header og ingen footer. `Hero` genbruges på forside, menu og booking med props til størrelse og indhold. `DishForm` bruges både til at oprette og redigere; forælderen giver den `key={ret-id}`, så formularen nulstilles, når man skifter ret.

**State management.** Der er kun én global tilstand – hvem der er logget ind – og den ligger i `AuthContext`. Alt andet er lokal `useState` i den komponent, der bruger det (hentede retter, formularfelter, loading/fejl). Et state-bibliotek ville være overflødigt i en applikation af denne størrelse.

**API-håndtering.** `api(path, { method, body, token })` er eneste sted, der kalder `fetch`. Den tilføjer `Authorization: Bearer`-header, håndterer JSON og FormData, og oversætter netværksfejl og API-fejl til én `Error` med en læsbar besked. Base-URL'en kommer fra miljøvariablen `VITE_API_URL`. Alle fire metoder bruges:

| Metode | Endpoint | Hvor |
|---|---|---|
| GET | `/dishes/` | Forside (signaturretter), menu, backoffice |
| POST | `/booking` | Booking-formular |
| POST | `/auth/signin` | Login |
| POST | `/dish` | Opret ret (backoffice) |
| PUT | `/dish` | Redigér ret (backoffice) |
| DELETE | `/dish/:id` | Slet ret (backoffice) |

Alle steder, der henter data, har tre tilstande: indlæser (`role="status"`), fejl (`role="alert"`) og tom liste med forklarende tekst.

**Validering.** Reglerne ligger i rene funktioner (`bookingRules.js`, `dishRules.js`), som returnerer et objekt med fejlbeskeder. Booking tjekker navn, email, at datoen ikke er i fortiden, at restauranten har åbent den dag, at tidspunktet ligger i åbningstiden, og at antal gæster er 1–12. Grænserne for retter følger API'ets model (titel 2–80 tegn, beskrivelse 5–200, pris ≥ 0). Funktionerne er dækket af 6 unit tests, som alle består.

**Tilgængelighed, SEO og responsivitet.** Semantisk HTML (`header`, `nav`, `main`, `section`, `table` med `caption` og `scope`), `lang="da"`, meta description, synlig `:focus-visible`, labels på alle felter, fejl koblet til felter med `aria-invalid` og `aria-describedby`, og fokus flyttes til første fejlfelt ved ugyldig booking. Burgermenuen har `aria-expanded`. Billeder har `width`/`height` og `loading="lazy"`. Styles er skrevet mobile-first med ét hovedbreakpoint på 1024px.

**Ændring i forhold til designet.** Guldfarven bruges i en lysere variant (`#c9a96a`) på mørk baggrund for at overholde kontrastkrav.

**Ændringer i backend.** Ingen. API'et bruges, som det er udleveret.

## 5. Tilvalgsopgaver

**Løst: 1. Rollebaseret login med JWT**

- Login sker via API'ets `/auth/signin`.
- Rollen læses fra tokenets payload; kun `admin` får adgang, andre får beskeden "Din bruger har ikke adgang til backoffice".
- Tokenet gemmes i `localStorage`, så login huskes. Udløbne tokens (`exp`) ignoreres ved indlæsning.
- Logout-knap i backoffice fjerner tokenet og sender brugeren til forsiden.
- `ProtectedRoute` beskytter `/backoffice` og omdirigerer til `/login`.

Ikke løst: 2 (filtrering af menu), 3 (administrer brugere), 4 (bordbestillinger i backoffice).

## 6. Anvendelse af tredjepart og AI

**Tredjepartspakker:** `react`, `react-dom`, `react-router-dom` (runtime) samt `vite`, `@vitejs/plugin-react`, `sass`, `oxlint`, `@types/react`, `@types/react-dom` (udvikling). Skrifttyperne Cormorant Garamond og Inter hentes fra Google Fonts. Der er ikke brugt færdige scripts, plugins eller UI-biblioteker.

**AI:** Jeg har brugt Claude Code (Anthropic) som kodeassistent i VS Code til følgende dele:

- **Login:** JWT-håndteringen i `AuthContext`, route guard og login-formularen.
- **Backoffice:** oversigten over retter samt opret, redigér og slet.
- **Styling:** dele af SCSS-koden.
- **Rapport:** et udkast til denne rapport er lavet med samme værktøj ud fra koden og git-historikken. Jeg har selv udfyldt og rettet den til.

Resten af løsningen har jeg skrevet selv.

## 7. Testoplysninger

- **GitHub:** https://github.com/Sanoj280398/nordic_table
- **Frontend:** `npm install` og `npm run dev`. Kræver en `.env` med `VITE_API_URL`, der peger på det udleverede API.
- **Backend:** det udleverede API (`mcd_web_nordic_table_server`) skal køre lokalt med databasen importeret.
- **Unit tests:** `npm test`
- **Admin-login:** [UDFYLD: email og password fra API'ets seed-data]

## 8. Særlige punkter til bedømmelse

- **Én kilde til åbningstider.** `data/info.js` styrer footer, info-kortet på booking-siden og hvilke tidspunkter der kan vælges i formularen. Vælger man en mandag, får man beskeden "Vi har lukket den dag".
- **Kvittering efter booking** med dato, tidspunkt, antal gæster og email, så gæsten kan se, hvad der er bestilt.
- **Fejl vises, hvor de opstår.** Fejl ved gem af en ret vises ved formularen, mens fejl ved sletning vises som besked over tabellen. Sletning kræver bekræftelse.
- **Få afhængigheder** som bevidst valg, jf. afsnit 3.
- **Kendte mangler:** store billedfiler er ikke optimeret, og backoffice er kun designet til desktop (hvilket opgaven tillader).
