# midi2027-lan
Official website for the MIDI 2027 LAN event.

The website is imported from the supplied Figma Make design, using React, TypeScript, Vite, and Tailwind CSS v4. About, Gallery, Games, Register, Event Details, and Contact share the original styling, navigation, and EN/LT language system.

## Development

Requires Node.js 22.12+ (Node 24 recommended) and npm.

```sh
npm install
npm run dev
```

Open http://localhost:5173. Both `/` and `/about` show the About page. Run commands from this repository root; npm workspaces route them to `frontend/`.

```sh
npm run typecheck
npm test
npm run test:pages
npm run build
npm run preview
```

## Structure

```text
midi2027-lan/
  frontend/
    public/                 Static files copied directly to the build
    src/
      assets/images/        Figma event photos, game artwork, partner logos
      components/about/     Hero, tournaments, partners, community sections
      components/layout/    Site header, footer, shared page layout
      data/                 Local tournament and partner display data
      hooks/                Tournament loading and presentation
      i18n/                 EN/LT translations and language context
      pages/                About, Gallery, Games, Register, Details, Contact
      services/             ASP.NET JSON transport and API validation
      styles/               Tailwind theme and Figma styles
      types/                Server response contracts
      App.tsx
      main.tsx
      routes.tsx
    .env.example
    vite.config.ts
  backend/                  Reserved for the ASP.NET API
  docs/                     API contract and hosting instructions
  package.json              Workspace scripts
```

All pages present in the supplied Figma export are connected: About (`/` and `/about`), Gallery, Games, Register, Event Details, and Contact. Games retains the design's "Coming soon" state. Gallery retains its nine crops of the same placeholder event photo; replace these with final photos before launch. Privacy and cookie links still need actual policy content because the supplied design has none.

Registration includes the four game cards and the original forms, including Valorant's five-player and captain fields. `/register?game=cs2`, `lol`, `valorant` (or `val`), and `tft` open the matching dialog. Forms can be previewed, but submission stays disabled until an ASP.NET endpoint is configured and `VITE_ENABLE_REGISTRATION=true`. There is no simulated success, local storage of submissions, or promised email delivery.

Tournament dates on the About page are the original April 2026 Figma placeholders, not confirmed 2027 dates; update `frontend/src/data/tournaments.tsx` before publication. The registration page uses the project year, 2027. Images and sponsor logos are imported from your design for fidelity; the original game image filenames do not always match their visible game, so retain the existing mapping when replacing banners.

The Dosis font currently loads from Google Fonts, as in Figma. All event and partner images are local. Edit sections in `frontend/src/components/about/` and translations in `frontend/src/i18n/translations.ts`.

## ASP.NET

The website runs without a backend by default. Opt-in tournament loading and registration submission, a configurable `/api` development proxy, typed DTOs, and Problem Details handling are included. See [ASP.NET integration](docs/aspnet-integration.md). The server and database are not implemented yet.
