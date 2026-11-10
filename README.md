# MIDI 2027 LAN

Website for the MIDI 2027 LAN Party, based on the Figma Make design. Built with React, TypeScript, Vite, and Tailwind CSS v4, with support for English and Lithuanian.

## Current features

| Page | Route | What’s available |
| --- | --- | --- |
| About | `/`, `/about` | Event introduction, horizontally scrolling tournament cards, partner tiles, and community links |
| Gallery | `/gallery` | Responsive staggered layout with mixed tile sizes and placeholder photography |
| Games | `/games` | Coming-soon page |
| Register | `/register` | Four tournament cards with registration status notices |
| Event Details | `/details` | Venue map, two-day tournament schedule, and organiser team cards with cat silhouettes |
| Contact | `/contact` | Two business email cards followed by a separate group of social media and Discord links |
| Privacy and cookies | `/privacy`, `/cookies` | Placeholder policy pages |

## Run locally

Install Node.js 22.12 or later and run these commands from the repository root.

```sh
npm ci
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173).

| Command | Purpose |
| --- | --- |
| `npm run typecheck` | Check TypeScript |
| `npm test` | Run API and registration service tests |
| `npm run test:pages` | Check page rendering, translations, and registration links |
| `npm run build` | Build the production frontend |
| `npm run preview` | Preview the production build locally |

## Backend status

The site runs with local tournament data by default. To connect an ASP.NET tournament API during development, copy `frontend/.env.example` to `frontend/.env.local`, set `API_PROXY_TARGET` to the API’s local URL, and set `VITE_USE_API=true`. Vite forwards `/api` requests to that URL.

The frontend includes registration request types and a submission service. Live registration still requires a frontend form and an ASP.NET endpoint. The server and database are pending. See the [ASP.NET integration notes](docs/aspnet-integration.md) for API contracts and deployment options.

## Before publishing

- Confirm the 2027 tournament dates. The About cards and Event Details schedule still show April 2026 dates from the design.
- Replace the gallery placeholders with the final event photos.
- Add the privacy and cookie policy content.
