# MIDI 2027 LAN

MIDI 2027 LAN is the English and Lithuanian website for the MIDI 2027 LAN Party. Players and visitors can browse tournaments, check the venue and schedule, meet the organisers, and find contact and community links.

The frontend uses React, TypeScript, Vite, and Tailwind CSS v4. It runs independently with local data. An ASP.NET Core API is planned for tournament data and registration submissions.

## Run locally

Install Node.js 22.12 or later and npm. Run these commands from the repository root.

```sh
npm ci
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173).

| Command | Purpose |
| --- | --- |
| `npm run typecheck` | Check TypeScript without building |
| `npm test` | Run API and registration service tests |
| `npm run test:pages` | Check page rendering, translations, and registration deep links |
| `npm run build` | Type-check and build production files into `frontend/dist/` |
| `npm run preview` | Serve the production build locally after running the build |

## Site pages

| Page | Route | Current content |
| --- | --- | --- |
| About | `/`, `/about` | Event introduction, tournament lineup, partners, and community links |
| Gallery | `/gallery` | Twenty-one event photos optimized as WebP images, with lazy loading below the first three tiles |
| Games | `/games` | Coming-soon page |
| Register | `/register` | Four main and four side tournament cards. Each opens a registration status dialog. |
| Event Details | `/details` | Venue map, two-day schedule, and organiser team |
| Contact | `/contact` | Email, social media, and Discord links |

The About tournament lineup and Event Details schedule still show April 2026 dates. Before publishing, update both with the confirmed 2027 schedule.

## Project layout

| Path | Contents |
| --- | --- |
| [`frontend/src/pages/`](frontend/src/pages/) | Page components mapped in [`routes.tsx`](frontend/src/routes.tsx) |
| [`frontend/src/components/`](frontend/src/components/) | Shared layout and page sections, including the [venue and schedule](frontend/src/components/details/VenueAndSchedule.tsx) |
| [`frontend/src/data/`](frontend/src/data/) | Local tournament, registration card, and partner data |
| [`frontend/src/i18n/`](frontend/src/i18n/) | English and Lithuanian translations and language context |
| [`frontend/public/`](frontend/public/) | Static images organised into `icons/`, `logos/`, `banners/`, and `gallery/`. The site references these through public URLs. |
| [`frontend/src/styles/`](frontend/src/styles/) | Tailwind entry point and shared page styles |
| [`frontend/src/services/`](frontend/src/services/), [`frontend/src/types/`](frontend/src/types/) | API clients and TypeScript contracts |
| [`backend/`](backend/) | Reserved for the ASP.NET Core application |

## ASP.NET Core integration

Once the API implements `GET /api/tournaments`, copy [`frontend/.env.example`](frontend/.env.example) to `frontend/.env.local`, set `API_PROXY_TARGET` to the ASP.NET Core launch URL, and set `VITE_USE_API=true`. Restart Vite to load the configuration. The development server forwards requests under `/api` to the configured URL.

Live registration still needs frontend forms and an ASP.NET Core endpoint that validates and stores submissions. The repository includes the registration service and API contracts. See the [ASP.NET integration notes](docs/aspnet-integration.md) for endpoint contracts and production hosting.
