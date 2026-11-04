# ASP.NET integration

## Current behavior

The About page works without a backend. `frontend/src/data/tournaments.tsx` contains the original Figma demonstration data. `VITE_USE_API=false` avoids requests to a server that does not exist yet.

To connect a backend:

1. Copy `frontend/.env.example` to `frontend/.env.local`.
2. Set `API_PROXY_TARGET` to your ASP.NET launch URL. The example uses `http://localhost:5000`.
3. Implement `GET /api/tournaments` with the contract below.
4. Set `VITE_USE_API=true` and restart Vite.

Browser requests go to `/api/tournaments` on Vite's origin. Vite forwards them to ASP.NET, preserving `/api`. Development does not require browser CORS for this arrangement. The proxy uses normal certificate verification. For HTTPS, trust your ASP.NET development certificate; do not disable verification.

## Tournament contract

Return a JSON array with camelCase property names. IDs matching the supplied artwork are `lol`, `cs2`, `val`, `tft`, `nba`, `fifa`, and `tkn`. Use null dates until the 2027 dates are confirmed. Image URLs must be HTTPS or root-relative; root-relative images must also be reachable on the frontend origin. Registration paths must start with `/register` and may include a query string.

```json
[
  {
    "id": "lol",
    "game": "League of Legends",
    "category": "Main",
    "date": null,
    "imageUrl": null,
    "registrationPath": "/register?game=lol"
  }
]
```

`category` is the string `Main` or `Side`. The TypeScript DTO is in `frontend/src/types/tournament.ts`. Null image URLs reuse the local game artwork where an ID matches. Empty arrays render an empty-state message. Loading, failure, retry, and request cancellation are implemented; an API failure does not silently display demonstration data.

ASP.NET Core minimal API example for a future `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
var app = builder.Build();
app.UseExceptionHandler();

app.MapGet("/api/tournaments", () => Results.Ok(new[]
{
    new TournamentDto("lol", "League of Legends", "Main", null, null,
        "/register?game=lol")
}));

app.Run();

record TournamentDto(string Id, string Game, string Category,
    DateOnly? Date, string? ImageUrl, string RegistrationPath);
```

ASP.NET's web JSON defaults serialize these record properties in camelCase. The client handles JSON Problem Details error responses. Registration submission is opt-in as described below. Authentication, cookie/CSRF handling, database access, and payments are not implemented by this frontend.

## Registration contract

The Register page includes the original four tournament cards and registration dialogs. The forms are available to preview, but submit buttons stay disabled unless `VITE_ENABLE_REGISTRATION=true` is set in `frontend/.env.local`. Restart Vite after changing it. Keep this false until the real backend validates and persists submissions.

Implement `POST /api/registrations` accepting JSON:

```json
{
  "tournamentId": "lol",
  "fullName": "Test Player",
  "email": "player@example.com"
}
```

Valid game IDs are `cs2`, `lol`, `valorant`, and `tft`. Valorant additionally sends `age` (number), `phone`, `riotIds` (five strings), `highestRank`, `currentRank`, `challengermodeUsername`, and `discordUsername`. See `frontend/src/types/registration.ts` for the TypeScript contract.

Return HTTP 200 or 201 with a JSON confirmation after persistence succeeds:

```json
{
  "id": "server-generated-registration-id",
  "tournamentId": "lol"
}
```

The frontend requires a nonempty ID and a matching tournament ID before displaying confirmation. It prevents duplicate in-flight submissions, cancels requests when the dialog closes, and displays ASP.NET validation errors without clearing entered fields. For validation failures, return HTTP 400 with Problem Details and an `errors` object whose values are arrays of error strings.

Validate all fields and game eligibility on the server, apply appropriate request limits, and implement idempotency or duplicate checks there. Aborting a client request does not undo a server write. If cookie-based authentication is added later, configure its antiforgery contract before enabling authenticated writes; the current form is a public JSON endpoint integration.

## Production

Build with `npm ci` then `npm run build` from the repository root. Deploy the contents of `frontend/dist/` to the ASP.NET project's `wwwroot`, or serve them through a separate static host and reverse proxy `/api` to ASP.NET. Keep `VITE_API_BASE_URL=/api` for a same-origin deployment.

If ASP.NET serves the SPA, add static files and a fallback after the API endpoints:

```csharp
app.UseDefaultFiles();
app.UseStaticFiles();
// Map API endpoints here.
// Prevent unknown API routes from returning the SPA's HTML shell.
app.MapMethods("/api/{**path}",
    ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    () => Results.NotFound());
app.MapFallbackToFile("index.html");
```

The fallback lets direct visits to `/about`, `/register`, and other client routes resolve. This is a Vite SPA: no Razor dependency or Node server is required in production.

For separate production origins, set `VITE_API_BASE_URL` to the public API URL at build time and configure ASP.NET CORS for the exact frontend origin. Client environment variables are public build-time values; never include credentials or connection strings.
