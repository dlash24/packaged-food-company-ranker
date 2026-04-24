import { CompanyScoredMetrics } from "@/lib/types";

interface Props {
  companies: CompanyScoredMetrics[];
}

export function Leaderboard({ companies }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <h2 className="text-lg font-semibold">Overall Ranking Leaderboard</h2>
      <div className="mt-4 space-y-3">
        {companies.map((company) => (
          <div
            key={company.key}
            className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 font-bold text-emerald-300">
                {company.rank}
              </span>
              <div>
                <div className="font-medium">{company.companyName}</div>
                <div className="text-xs text-slate-400">{company.ticker}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-emerald-300">{company.overallScore}</div>
              <div className="text-xs text-slate-400">Composite score</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
