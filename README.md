# MIDI 2027 LAN

<<<<<<< Updated upstream
MIDI 2027 LAN is a bilingual website for the MIDI 2027 LAN Party. It gives players and visitors one place to explore the tournament lineup, check the schedule and venue map, meet the organisers, and find contact and community links. The current version is an informational site in English and Lithuanian. As the event approaches, it will also serve as the registration hub for players and teams.

## Tech stack

- **React and TypeScript** for the frontend
- **Vite** for local development and production builds
- **Tailwind CSS v4** for styling and responsive layouts
- **ASP.NET Core** for the planned backend

## Run locally

Install Node.js 22.12 or later, then run these commands from the repository root.
=======
Website for the MIDI 2027 LAN Party, built with React, TypeScript, Vite, and Tailwind CSS v4. The frontend is based on the Figma Make design and supports English and Lithuanian.

## Current state

| Page | Route | What's available |
| --- | --- | --- |
| About | `/`, `/about` | Event introduction, a horizontally scrolling tournament lineup, partner tiles, and community links |
| Gallery | `/gallery` | Wide, staggered photo tiles with a compact mobile layout. The tiles currently show crops of one placeholder photo. |
| Games | `/games` | Coming-soon screen |
| Register | `/register` | Four tournament cards that open registration status notices. The page currently has no registration forms. |
| Event Details | `/details` | Venue map, two-day tournament schedule, and organiser roles illustrated with cat silhouettes |
| Contact | `/contact` | Two email cards followed by a separate group of social and Discord links |
| Privacy and cookies | `/privacy`, `/cookies` | Placeholder pages awaiting policy content |

The About cards and Details schedule still show April 2026 dates from the design. Confirm the 2027 schedule and update both pages before publishing. The gallery also needs its final photo files.

## Run locally

Use Node.js 22.12 or later and npm. Run these commands from the repository root.
>>>>>>> Stashed changes

```sh
npm ci
npm run dev
```

<<<<<<< Updated upstream
Open [http://127.0.0.1:5173](http://127.0.0.1:5173). To create a production build, run `npm run build`.

## Future ASP.NET Core implementation

The frontend currently runs with local tournament data and displays registration status notices. The planned ASP.NET Core API will provide tournament data and accept registration submissions. The frontend already includes TypeScript API contracts, a registration service, and a Vite development proxy for `/api` requests.

Once the backend is available, copy `frontend/.env.example` to `frontend/.env.local`, set `API_PROXY_TARGET` to the local ASP.NET Core URL, and set `VITE_USE_API=true` to load tournament data from the API. Live registration will also require frontend forms and backend storage for submissions.
=======
Open [http://127.0.0.1:5173](http://127.0.0.1:5173).

| Command | Purpose |
| --- | --- |
| `npm run typecheck` | Check TypeScript without building |
| `npm test` | Run API and registration service tests |
| `npm run test:pages` | Check page rendering, translations, and registration deep links |
| `npm run build` | Type-check and build production files into `frontend/dist/` |
| `npm run preview` | Preview the production build locally |

## Project layout

- `frontend/src/pages/` contains the route-level pages. The route table lives in `frontend/src/routes.tsx`.
- `frontend/src/components/` contains shared layout, About, Details, and registration components.
- `frontend/src/assets/images/` contains local photos, game artwork, partner logos, and SVG illustrations.
- `frontend/src/data/` contains local tournament and partner data. The two-day schedule lives in `frontend/src/components/details/VenueAndSchedule.tsx`.
- `frontend/src/i18n/` contains translations and language context. Some section-specific labels live in the components.
- `frontend/src/styles/` contains the Tailwind entry point and shared page styles. The site uses Dosis from Google Fonts.
- `frontend/src/services/` and `frontend/src/types/` contain API clients and request and response contracts.
- `backend/` is reserved for the ASP.NET application. `docs/` contains integration and hosting notes.

## Backend status

The frontend runs independently with local tournament data by default. To test a future ASP.NET tournament endpoint, copy `frontend/.env.example` to `frontend/.env.local`, set `API_PROXY_TARGET` to the API's local URL, and set `VITE_USE_API=true`. Vite forwards development requests under `/api`.

Registration request types and service code remain in the repo for future integration. Live submissions require both an implemented ASP.NET endpoint and a restored frontend form. The server and database are pending. See [ASP.NET integration notes](docs/aspnet-integration.md) for the API contracts and deployment options.
>>>>>>> Stashed changes
