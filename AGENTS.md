# AGENTS.md — Adazo

Instructions for coding agents working in this repository.

## Pair programming

- **Owners / pair:** Steve Simonson (`SteveSimonson`) and Dennis Simonson (`DennisSimonson`)
- Treat both as product co-owners for review, catalog judgment, and ship decisions.
- Prefer PRs both can see; do not land non-trivial work straight to `main`.

## Ship gate (all repos)

Global skill **`pr-ship-gate`** applies: branch → issue (when trackable) → PR → CI → independent review → merge → deploy.

## Product

**Adazo** is a public Amazon Associates storefront for women’s health and beauty.
Buy buttons go to Amazon with the Associates tag from `VITE_AMAZON_ASSOCIATE_TAG`.
Live site: [adazo.com](https://adazo.com).

## Stack

- Vite + React 19 + TypeScript + Tailwind v4
- Cloudflare Workers static assets (`wrangler deploy`)
- Affiliate links: `src/lib/amazon.ts`

## Catalog rules

- Weekly limited-time merchandising: `npm run import:bsr`
- Target ≥20 items per category when filling BSR quotas
- Never strip affiliate tags from product links
- Images: prefer Amazon list CDN URLs
- Do not invent medical claims

## Build

```bash
npm ci
npm run lint
npm run build
```

## Deploy

```bash
npm run deploy
```
