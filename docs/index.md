# Project Documentation Index

Generated for brownfield onboarding and AI context.

## Project Overview

- **Name:** Packaged Food Company Ranker
- **Type:** Full-stack web dashboard
- **Purpose:** Compare and rank 5 packaged food companies across weighted financial and industry metrics
- **Deployment:** Vercel

## Architecture Summary

- **Framework:** Next.js App Router (`app/`)
- **Frontend:** React + Tailwind CSS + Recharts
- **Backend:** Next.js API route at `app/api/companies/route.ts`
- **Scoring engine:** `lib/scoring.ts`
- **Primary views/components:**
  - `components/MetricWeights.tsx`
  - `components/Leaderboard.tsx`
  - `components/ComparisonTable.tsx`
  - `components/ChartsPanel.tsx`

## Data Sources and Processing

- Fallback static company metrics in `lib/companyData.ts`
- Fallback Debt/EBITDA history in `lib/debtToEbitdaData.ts`
- Optional Alpha Vantage overrides in `app/api/companies/route.ts` when `ALPHA_VANTAGE_API_KEY` is set
- Weighted normalization and ranking in `lib/scoring.ts`

## API Contracts

- `GET /api/companies` returns:
  - `source` (string)
  - `companies` (array of raw company metrics)
  - `debtToEbitdaHistory` (per-company time series)

## Configuration

- TypeScript strict mode enabled (`tsconfig.json`)
- Tailwind configured via `tailwind.config.ts` + `postcss.config.js`
- Vercel config in `vercel.json`
- Env variable template in `.env.example`

## Recommended Next Documentation Files

- `docs/project-context.md` (implementation rules for AI agents)
- `docs/metric-definitions.md` (field-by-field calculation/source notes)
- `docs/deployment-runbook.md` (operational deploy/rollback procedure)
