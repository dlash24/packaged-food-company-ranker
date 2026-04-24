---
project: Packaged Food Company Ranker
stack: Next.js + React + TypeScript + Tailwind + Recharts
last_updated: 2026-04-24
sections_completed:
  - technology-stack
  - architecture-patterns
  - implementation-rules
  - workflow-rules
---

# Project Context

This file captures the most important implementation rules and conventions for AI-assisted development in this repository.

## Technology Stack

- Next.js 14 (App Router)
- React 18
- TypeScript (strict)
- Tailwind CSS 3
- Recharts 2
- Node.js runtime with Vercel deployment

## Architecture Patterns

- Keep UI route entry in `app/page.tsx` and compose with presentational components in `components/`.
- Keep domain/data logic in `lib/` (`scoring`, static datasets, shared types).
- Keep backend endpoints in `app/api/**/route.ts`.
- API responses should remain JSON and typed in frontend interfaces before use.

## Critical Implementation Rules

- **Type safety first:** keep explicit interfaces/types in `lib/types.ts` and update both API and UI when payload shape changes.
- **Scoring consistency:** any metric additions must update:
  - raw types in `lib/types.ts`
  - normalization/scoring in `lib/scoring.ts`
  - UI table/charts/components using that metric
- **Data source transparency:** when changing datasets or API merges, keep source labels clear in the API `source` field and UI.
- **Chart behavior:** chart components must handle partial historical data without crashing (empty arrays, variable year counts).
- **No secret leakage:** never commit real secrets; keep new env keys in `.env.example`.

## Conventions

- File naming:
  - Components: PascalCase filenames in `components/`
  - Library modules: camelCase filenames in `lib/`
- Imports:
  - Prefer root alias imports via `@/` for project files
- Styling:
  - Tailwind utility classes inline in TSX
  - Keep dark dashboard visual consistency

## API and Data Rules

- `GET /api/companies` should continue to return:
  - `source`
  - `companies`
  - `debtToEbitdaHistory`
- Optional Alpha Vantage fields are merge-overrides only; fallback data remains authoritative for missing values.

## Development Workflow Rules

- Validate changes with `npm run build` before deploys.
- For production updates:
  1. Commit to `main`
  2. Push to GitHub
  3. Deploy with `npx vercel --prod`
- Keep README deployment instructions aligned with actual CLI flow.

## High-Risk Areas

- Any change to API response shape can break `app/page.tsx` and `components/ChartsPanel.tsx`.
- Any metric key rename can silently break ranking or charts if not updated everywhere.
- Mixed fallback/live calculations may drift; keep formulas explicit and documented.
