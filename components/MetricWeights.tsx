"use client";

import { MetricWeights } from "@/lib/types";

interface Props {
  weights: MetricWeights;
  onChange: (key: keyof MetricWeights, value: number) => void;
}

const metricLabels: Record<keyof MetricWeights, string> = {
  revenueGrowthYoy: "Revenue Growth YoY",
  profitMargins: "Profit Margins",
  majorBrandCount: "Brand Portfolio Strength",
  marketCapBillionsUsd: "Market Cap",
  esgScore: "ESG / Sustainability",
  debtToEquity: "Debt-to-Equity"
};

export function MetricWeightsPanel({ weights, onChange }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <h2 className="text-lg font-semibold">Weighting Controls</h2>
      <p className="mt-1 text-sm text-slate-300">
        Adjust priorities. Scores re-rank instantly based on your chosen weights.
      </p>

      <div className="mt-4 space-y-4">
        {(Object.keys(weights) as Array<keyof MetricWeights>).map((key) => (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>{metricLabels[key]}</span>
              <span className="font-semibold text-emerald-300">{weights[key]}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={weights[key]}
              onChange={(event) => onChange(key, Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
