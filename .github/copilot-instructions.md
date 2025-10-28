## Quick context (big picture)

- Monorepo-like layout: a Vite React frontend under `client/` and an Express + Socket.IO backend under `server/`.
- Frontend communicates with backend over cookie-based auth (axios withCredentials) and real-time events via Socket.IO.
- API root: `/api` (server routes mounted at `/api/auth` and `/api/user`).

## Important files to read first

- `server/index.js` — server entry: HTTP server + Socket.IO, CORS settings, and DB connect.
- `server/src/webSocket.js` — central realtime logic and event names: `CreatePath`, `DeletePath`, `SendMessage`, `ReceiveMessage`, `NewMessageAlert`.
- `server/src/controllers/authController.js` — shows auth, OTP flows, and cookie/token generation.
- `server/src/utils/auth.js` — token creation and cookie behavior (check for cookie names/expiry).
- `client/src/config/Api.jsx` — axios instance (baseURL + withCredentials).
- `client/src/config/WebSocket.jsx` — socket.io-client instance and transport/reconnection settings.
- `client/src/context/AuthContext.jsx` — where user session is stored (`sessionStorage` key: `ChatUser`).

## Runtime notes (developer workflows)

- Start backend (dev): from `server/` run `npm install` then `npm run dev` (nodemon). Default port: `process.env.PORT || 5000` in `server/index.js`.
- Start frontend (dev): from `client/` run `npm install` then `npm run dev` (Vite, default at http://localhost:5173).
- Typical local workflow: run server and client in separate terminals. Ensure the backend PORT and the client `baseURL` match (see note below).

Example (PowerShell):

```powershell
cd server; npm install; npm run dev
# open new terminal
cd client; npm install; npm run dev
```

Note: the repo contains `client/src/config/Api.jsx` and `client/src/config/WebSocket.jsx` using `http://localhost:4505` as a base in places while `server/index.js` defaults to `5000`. Align `PORT` or client `baseURL` when running locally.

## Patterns & conventions (project-specific)

- Cookie-based auth: backend sets a cookie token (see `genToken` in `server/src/utils/auth.js`); frontend axios is configured with `withCredentials: true` so requests include cookies.
- Two-step/OTP flows are implemented server-side (`authController`). Expect endpoints that send OTPs and require them for register/login flows.
- Session storage usage: frontend keeps logged-in user in `sessionStorage` under `ChatUser` and exposes `isLogin` via `AuthContext`.
- WebSocket user presence: clients emit `CreatePath` with their userID to register socket.id in `OnlineUsers` on the server. Messages are sent with `SendMessage` and delivered to `ReceiveMessage` and `NewMessageAlert`.
- ESM modules everywhere (`"type": "module"` in package.json).

## Integration points & external deps to watch

- Socket.IO (server & client): `socket.io` and `socket.io-client` — make sure CORS options in `server/index.js` allow the Vite origin (default `http://localhost:5173`).
- MongoDB via `mongoose` (connection in `server/src/config/db.js`). Look there for connection string expectations/env var names.
- Email: `nodemailer` is used in `server/src/utils/sendEmail.js` for OTP emails — check `.env` for SMTP credentials.
- Auth: `bcrypt` for hashing, `jsonwebtoken` for tokens — inspect `server/src/utils/auth.js` for token cookie name/claims.

## What an agent should do first

1. Open `server/index.js`, `server/src/webSocket.js`, `client/src/config/Api.jsx`, and `client/src/config/WebSocket.jsx` to confirm ports/URLs and CORS.
2. Confirm `.env` keys expected by `server/src/config/db.js` and `server/src/utils/sendEmail.js` (MONGO_URI, SMTP_* etc.).
3. When changing auth or HTTP APIs, update both `client/src/config/Api.jsx` and any calls that expect cookie auth (all axios calls rely on `withCredentials`).

## Example snippets (use these names/events)

- WebSocket events: `CreatePath`, `DeletePath`, `SendMessage`, `ReceiveMessage`, `NewMessageAlert`.
- Axios base path: `baseURL` + `/api` (see `client/src/config/Api.jsx`).

## Small checks to avoid common mistakes

- Ensure the backend port and client baseURL match. The client currently targets `4505` in places; server defaults to `5000`.
- Keep `withCredentials: true` when adding axios calls that require auth.
- Use the `sessionStorage` key `ChatUser` if you need the active user on the frontend.

---
If you'd like, I can (a) align client/server ports in the config files, (b) add a short npm root-level script that starts both services together, or (c) expand this doc with exact env var names found in `server/src/config/db.js` and `server/src/utils/sendEmail.js`. Which would you prefer? 
