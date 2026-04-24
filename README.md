# Packaged Food Company Ranker

Full-stack web app that compares and ranks:

- Nestle
- Kraft Heinz
- General Mills
- Conagra
- Unilever

## Stack

- Frontend: Next.js (React) + Tailwind CSS + Recharts
- Backend: Next.js API route (`/api/companies`)
- Deploy: Vercel (free tier)

## Features

- Company scoring across:
  - Revenue growth (YoY %)
  - Profit margins (gross + net)
  - Brand portfolio strength
  - Market cap
  - ESG / sustainability score
  - Debt-to-equity ratio
- Leaderboard ranking
- Side-by-side comparison table
- Bar + radar charts
- Live weight sliders to reprioritize metrics

## Data source behavior

- Default: Uses included fallback dataset (recent public company disclosures and summaries).
- Optional live overrides: If `ALPHA_VANTAGE_API_KEY` is set, the API route fetches available live fields from Alpha Vantage and merges them over fallback values.

## Local run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel (from scratch)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Login:

```bash
vercel login
```

3. (Optional) Add Alpha Vantage key:

```bash
vercel env add ALPHA_VANTAGE_API_KEY
```

4. Deploy preview:

```bash
vercel
```

5. Deploy production:

```bash
vercel --prod
```

The CLI prints your public URL after deployment.

## Free Alpha Vantage API key

1. Visit [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)
2. Request a free key
3. Paste it into:
   - Local: `.env.local` as `ALPHA_VANTAGE_API_KEY=your_key`
   - Vercel: `vercel env add ALPHA_VANTAGE_API_KEY`
