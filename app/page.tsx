"use client";

import { useEffect, useMemo, useState } from "react";
import { Leaderboard } from "@/components/Leaderboard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ChartsPanel } from "@/components/ChartsPanel";
import { MetricWeightsPanel } from "@/components/MetricWeights";
import { defaultWeights, scoreCompanies } from "@/lib/scoring";
import { CompanyRawMetrics, MetricWeights } from "@/lib/types";

interface CompanyApiResponse {
  source: string;
  companies: CompanyRawMetrics[];
}

export default function HomePage() {
  const [companies, setCompanies] = useState<CompanyRawMetrics[]>([]);
  const [weights, setWeights] = useState<MetricWeights>(defaultWeights);
  const [source, setSource] = useState<string>("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      try {
        const response = await fetch("/api/companies", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }
        const data = (await response.json()) as CompanyApiResponse;
        setCompanies(data.companies);
        setSource(data.source);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    void fetchCompanies();
  }, []);

  const rankedCompanies = useMemo(() => scoreCompanies(companies, weights), [companies, weights]);

  const onWeightChange = (key: keyof MetricWeights, value: number) => {
    setWeights((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Packaged Food Company Comparison Dashboard</h1>
        <p className="mt-2 max-w-3xl text-slate-300">
          Compare and rank Nestle, Kraft Heinz, General Mills, Conagra, and Unilever using
          revenue growth, margins, brand strength, market cap, ESG, and debt leverage.
        </p>
        <p className="mt-2 text-sm text-slate-400">Data source: {source}</p>
      </header>

      {loading && <p className="text-slate-300">Loading company data...</p>}
      {error && <p className="text-red-400">Error loading data: {error}</p>}

      {!loading && !error && (
        <div className="space-y-6">
          <MetricWeightsPanel weights={weights} onChange={onWeightChange} />
          <Leaderboard companies={rankedCompanies} />
          <ChartsPanel companies={rankedCompanies} />
          <ComparisonTable companies={rankedCompanies} />
        </div>
      )}
    </main>
  );
}
