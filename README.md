# First Cut

This is the First Cut marketing website.

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Waitlist email integration

The "Request access" form posts to the `/api/waitlist` API route, which sends an
email notification through [Resend](https://resend.com). The Resend API key is
only ever read on the server inside `src/app/api/waitlist/route.ts` and is never
exposed to the client.

### Required environment variables

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key (from the Resend dashboard). |
| `WAITLIST_TO_EMAIL` | The address that receives access-request notifications. |
| `WAITLIST_FROM_EMAIL` | The verified sender address Resend sends from. Must be on a domain verified in your Resend account. |

### Local setup

1. Copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in the three values in `.env.local`.
3. Restart the dev server so the new variables are loaded.

When a visitor submits the form, an email with the subject
**"New First Cut access request"** is sent to `WAITLIST_TO_EMAIL` containing the
submitted email, role, what they are trying to cut, how many hours of footage
they have, and a submission timestamp.

### Vercel setup

In your Vercel project, add the following Environment Variables (Project
Settings → Environment Variables) for the Production (and Preview, if desired)
environments:

- `RESEND_API_KEY`
- `WAITLIST_TO_EMAIL`
- `WAITLIST_FROM_EMAIL`

Redeploy after adding them so the API route picks up the values.
