# Cloudflare Email for adazo.com

## Status

| Piece | State |
|-------|--------|
| Email Sending domain | **Enabled** for `adazo.com` |
| DNS (cf-bounce SPF/DKIM, DMARC) | Auto-provisioned on Cloudflare zone |
| Worker binding | `EMAIL` in `wrangler.jsonc` |
| From | `hello@adazo.com` (display name **Adazo**) |
| Allowed senders | `hello@`, `vibe@`, `noreply@` @adazo.com |
| Welcome mail path | Quiz opt-in → Cloudflare Email (GHL CRM upsert still runs; GHL email is fallback only) |

## Commands

```bash
# Domain
npx wrangler email sending list
npx wrangler email sending settings adazo.com
npx wrangler email sending dns get adazo.com

# Manual test send (use a real inbox you control)
npx wrangler email sending send \
  --from hello@adazo.com \
  --from-name "Adazo" \
  --to you@example.com \
  --subject "Adazo mail test" \
  --text "Cloudflare Email Sending works for adazo.com."

# After wrangler.jsonc binding changes
npx wrangler types
npm run deploy
```

## DNS notes

Sending uses the **cf-bounce** return-path subdomain (SPF + DKIM + MX). Apex SPF may still include Outlook for other tools; DMARC is `p=reject` on `_dmarc.adazo.com`.

Verify:

```bash
dig +short MX cf-bounce.adazo.com
dig +short TXT cf-bounce.adazo.com
dig +short TXT cf-bounce._domainkey.adazo.com
dig +short TXT _dmarc.adazo.com
```

## Email Routing (inbound) — optional

Inbound is **not** enabled yet (`Email Routing: unconfigured`). To receive mail at `@adazo.com`:

```bash
npx wrangler email routing enable adazo.com
npx wrangler email routing addresses create your-inbox@gmail.com
# Verify the destination email, then create rules in dashboard or CLI
npx wrangler email routing dns get adazo.com
```

Be careful: enabling zone MX for routing can conflict with other mail hosts (e.g. Microsoft 365) on the apex. Prefer a subdomain for CF routing if Outlook still owns apex mail.

## Deliverability

See [email-deliverability.md](./email-deliverability.md). Prefer transactional sends only; welcome email content is moderate-richness and first-party links only.
