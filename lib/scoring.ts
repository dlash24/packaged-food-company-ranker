import { CompanyRawMetrics, CompanyScoredMetrics, MetricWeights } from "@/lib/types";

const clamp = (value: number) => Math.max(0, Math.min(100, value));

const normalizeValues = (values: number[], reverse = false): number[] => {
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (max === min) {
    return values.map(() => 100);
  }

  return values.map((value) => {
    const normalized = ((value - min) / (max - min)) * 100;
    return clamp(reverse ? 100 - normalized : normalized);
  });
};

export const defaultWeights: MetricWeights = {
  revenueGrowthYoy: 20,
  profitMargins: 20,
  majorBrandCount: 15,
  marketCapBillionsUsd: 15,
  esgScore: 15,
  debtToEquity: 15
};

export const scoreCompanies = (
  companies: CompanyRawMetrics[],
  weights: MetricWeights
): CompanyScoredMetrics[] => {
  const revenueNormalized = normalizeValues(companies.map((company) => company.revenueGrowthYoy));
  const profitMarginNormalized = normalizeValues(
    companies.map((company) => (company.grossMargin + company.netMargin) / 2)
  );
  const brandsNormalized = normalizeValues(companies.map((company) => company.majorBrandCount));
  const marketCapNormalized = normalizeValues(
    companies.map((company) => company.marketCapBillionsUsd)
  );
  const esgNormalized = normalizeValues(companies.map((company) => company.esgScore));
  const debtToEquityNormalized = normalizeValues(
    companies.map((company) => company.debtToEquity),
    true
  );

  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0) || 1;

  const scored = companies.map((company, index) => {
    const normalized = {
      revenueGrowthYoy: revenueNormalized[index],
      profitMargins: profitMarginNormalized[index],
      majorBrandCount: brandsNormalized[index],
      marketCapBillionsUsd: marketCapNormalized[index],
      esgScore: esgNormalized[index],
      debtToEquity: debtToEquityNormalized[index]
    };

    const overallScore =
      (normalized.revenueGrowthYoy * weights.revenueGrowthYoy +
        normalized.profitMargins * weights.profitMargins +
        normalized.majorBrandCount * weights.majorBrandCount +
        normalized.marketCapBillionsUsd * weights.marketCapBillionsUsd +
        normalized.esgScore * weights.esgScore +
        normalized.debtToEquity * weights.debtToEquity) /
      totalWeight;

    return {
      ...company,
      normalized,
      overallScore: Number(overallScore.toFixed(2)),
      rank: 0
    };
  });

  return scored
    .sort((a, b) => b.overallScore - a.overallScore)
    .map((company, index) => ({
      ...company,
      rank: index + 1
    }));
};
