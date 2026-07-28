# Adazo handoff

## Pair owners
- Steve Simonson (@SteveSimonson)
- Dennis Simonson (@DennisSimonson)

## Stack
Vite + React 19 + TS + Tailwind v4 → Cloudflare Worker (`adazo`) on adazo.com

## Amazon Associates
Set `VITE_AMAZON_ASSOCIATE_TAG` in `.env` (and Creators API credentials for BSR import).
Default tag falls back to the account tag used in development — create an Adazo-specific Store ID in Associates when ready.

## Weekly BSR
```bash
npm run import:bsr
npm run refresh:weekly
```

Beauty nodes live in `scripts/bsr/categories.json`.

## Deploy
```bash
npm run deploy
```
