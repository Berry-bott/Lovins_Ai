# Backend setup

The API uses PostgreSQL through Prisma. Copy the required environment values into the backend environment before starting it:

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: secret used to sign login tokens.
- `ENCRYPTION_KEY`: 32-byte key encoded as 64 hexadecimal characters, used to encrypt platform credentials. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- `FRONTEND_URL` or `FRONTEND_URLS`: allowed browser origin or comma-separated origins.
- `API_PUBLIC_URL`: local development only; set this to an externally reachable HTTPS tunnel URL. On Render, the API automatically uses Render's `RENDER_EXTERNAL_URL`.
- `SMTP_EMAIL` and `SMTP_PASSWORD`: optional password-reset email configuration.

After changing the Prisma schema, apply it to the database with `npm run prisma:push`. Then start the API with `npm run dev`.

When a customer connects a Telegram bot, the API validates its token, stores its credentials encrypted, and registers a webhook at `/api/webhooks/telegram/:connectionId`. Incoming webhook requests are checked against Telegram's secret-token header and deduplicated by update ID. The initial command handler saves `/note <text>` (or `note: <text>`) into that customer's connection and replies in Telegram.

For local Telegram work, `API_PUBLIC_URL` must point to a temporary HTTPS tunnel that forwards to the local API. Reconnect the bot after changing the public URL so Telegram receives the updated webhook address.
