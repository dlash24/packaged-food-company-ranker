import { CompanyScoredMetrics } from "@/lib/types";

interface Props {
  companies: CompanyScoredMetrics[];
}

const pct = (value: number) => `${value.toFixed(2)}%`;

export function ComparisonTable({ companies }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <h2 className="text-lg font-semibold">Side-by-Side Comparison</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left text-slate-300">
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Revenue Growth YoY</th>
              <th className="px-3 py-2">Gross Margin</th>
              <th className="px-3 py-2">Net Margin</th>
              <th className="px-3 py-2">Major Brands</th>
              <th className="px-3 py-2">Market Cap (B USD)</th>
              <th className="px-3 py-2">ESG Score</th>
              <th className="px-3 py-2">Debt/Equity</th>
              <th className="px-3 py-2">Overall</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.key} className="border-b border-slate-800/80">
                <td className="px-3 py-2 font-medium">{company.companyName}</td>
                <td className="px-3 py-2">{pct(company.revenueGrowthYoy)}</td>
                <td className="px-3 py-2">{pct(company.grossMargin)}</td>
                <td className="px-3 py-2">{pct(company.netMargin)}</td>
                <td className="px-3 py-2">{company.majorBrandCount}</td>
                <td className="px-3 py-2">{company.marketCapBillionsUsd.toFixed(1)}</td>
                <td className="px-3 py-2">{company.esgScore.toFixed(1)}</td>
                <td className="px-3 py-2">{company.debtToEquity.toFixed(2)}</td>
                <td className="px-3 py-2 font-semibold text-emerald-300">{company.overallScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
