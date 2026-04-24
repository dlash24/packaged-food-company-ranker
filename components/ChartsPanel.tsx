"use client";

import { useMemo, useState } from "react";
import { CompanyScoredMetrics } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface Props {
  companies: CompanyScoredMetrics[];
}

export function ChartsPanel({ companies }: Props) {
  const [selectedCompanyKey, setSelectedCompanyKey] = useState(companies[0]?.key);

  const selectedCompany = useMemo(
    () => companies.find((company) => company.key === selectedCompanyKey) ?? companies[0],
    [companies, selectedCompanyKey]
  );

  const leaderboardData = companies.map((company) => ({
    name: company.companyName,
    score: company.overallScore
  }));

  const radarData = selectedCompany
    ? [
        { metric: "Rev Growth", value: selectedCompany.normalized.revenueGrowthYoy },
        { metric: "Margins", value: selectedCompany.normalized.profitMargins },
        { metric: "Brands", value: selectedCompany.normalized.majorBrandCount },
        { metric: "Market Cap", value: selectedCompany.normalized.marketCapBillionsUsd },
        { metric: "ESG", value: selectedCompany.normalized.esgScore },
        { metric: "Debt/Eq", value: selectedCompany.normalized.debtToEquity }
      ]
    : [];

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
        <h2 className="text-lg font-semibold">Overall Score Bar Chart</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leaderboardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} interval={0} angle={-12} />
              <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Normalized Metric Radar</h2>
          <select
            value={selectedCompany?.key}
            onChange={(event) => setSelectedCompanyKey(event.target.value as CompanyScoredMetrics["key"])}
            className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
          >
            {companies.map((company) => (
              <option key={company.key} value={company.key}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94a3b8" }} />
              <Radar
                name={selectedCompany?.companyName}
                dataKey="value"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.45}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
