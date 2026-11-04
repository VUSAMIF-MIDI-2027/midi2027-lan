# ASP.NET backend

This directory is reserved for the ASP.NET application. No backend or database is implemented yet.

The React frontend runs independently. Its JSON transport, tournament response contract, registration request and confirmation contracts, development proxy, and error handling are ready for an ASP.NET JSON API. Registration submission is disabled until the backend is implemented and `VITE_ENABLE_REGISTRATION=true` is configured.

See [ASP.NET integration](../docs/aspnet-integration.md) for the endpoint contract, a minimal API example, development URLs, and production hosting configuration.

Place the API project here when backend development begins, for example `backend/Midi.Api/`. Keep controllers/endpoints, application services, persistence, and migrations on the server; do not put secrets in frontend environment variables.
