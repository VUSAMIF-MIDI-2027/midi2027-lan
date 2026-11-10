# MIDI 2027 LAN

MIDI 2027 LAN is a bilingual website for the MIDI 2027 LAN Party. It gives players and visitors one place to explore the tournament lineup, check the schedule and venue map, meet the organisers, and find contact and community links. The current version is an informational site in English and Lithuanian. As the event approaches, it will also serve as the registration hub for players and teams.

## Tech stack

- **React and TypeScript** for the frontend
- **Vite** for local development and production builds
- **Tailwind CSS v4** for styling and responsive layouts
- **ASP.NET Core** for the planned backend

## Run locally

Install Node.js 22.12 or later, then run these commands from the repository root.

```sh
npm ci
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). To create a production build, run `npm run build`.

## Future ASP.NET Core implementation

The frontend currently runs with local tournament data and displays registration status notices. The planned ASP.NET Core API will provide tournament data and accept registration submissions. The frontend already includes TypeScript API contracts, a registration service, and a Vite development proxy for `/api` requests.

Once the backend is available, copy `frontend/.env.example` to `frontend/.env.local`, set `API_PROXY_TARGET` to the local ASP.NET Core URL, and set `VITE_USE_API=true` to load tournament data from the API. Live registration will also require frontend forms and backend storage for submissions.
