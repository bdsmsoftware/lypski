# Lypski portfolio website

hello 

## Email setup (Resend)

1. Install deps (already in repo):

```
pnpm add resend
```

2. Add environment variables in `.env.local`:

```
RESEND_API_KEY=your_resend_api_key
# Optional overrides (defaults shown)
CONTACT_TO_EMAIL=marcinlypski@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

3. Usage:
- Contact form posts to a server action at `app/actions/send-contact.ts`.
- Email content is rendered by `emails/ContactEmail.tsx`.

4. Notes:
- For production, verify a domain in Resend and set `CONTACT_FROM_EMAIL` to an address on that domain (e.g. `noreply@yourdomain`).
- Basic anti-spam is enabled (honeypot + quick-submit timing). Consider adding Turnstile if needed.
