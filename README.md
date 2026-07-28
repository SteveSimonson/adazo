# Adazo

Curated Amazon Associates storefront for **women’s health and beauty** — weekly Best Seller edits, concern-first shopping, and SEO-ready product pages.

Live: [adazo.com](https://adazo.com)

## Pair

- Steve Simonson ([@SteveSimonson](https://github.com/SteveSimonson))
- Dennis Simonson ([@DennisSimonson](https://github.com/DennisSimonson))

## Stack

- Vite + React 19 + TypeScript + Tailwind CSS v4
- Cloudflare Workers (`wrangler deploy`)
- Amazon Associates + optional Creators API BSR import

## Quick start

```bash
npm install
cp .env.example .env   # set VITE_AMAZON_ASSOCIATE_TAG
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run deploy
npm run import:bsr      # weekly Best Sellers import
npm run refresh:weekly  # import + build + deploy
```

## License

Private business asset; public source for collaboration. All rights reserved.
