export type CompanyKey =
  | "nestle"
  | "kraftHeinz"
  | "generalMills"
  | "conagra"
  | "unilever";

export interface CompanyRawMetrics {
  key: CompanyKey;
  companyName: string;
  ticker: string;
  revenueGrowthYoy: number;
  grossMargin: number;
  netMargin: number;
  majorBrandCount: number;
  marketCapBillionsUsd: number;
  esgScore: number;
  debtToEquity: number;
}

export interface CompanyScoredMetrics extends CompanyRawMetrics {
  normalized: {
    revenueGrowthYoy: number;
    profitMargins: number;
    majorBrandCount: number;
    marketCapBillionsUsd: number;
    esgScore: number;
    debtToEquity: number;
  };
  overallScore: number;
  rank: number;
}

export interface MetricWeights {
  revenueGrowthYoy: number;
  profitMargins: number;
  majorBrandCount: number;
  marketCapBillionsUsd: number;
  esgScore: number;
  debtToEquity: number;
}

export interface DebtToEbitdaPoint {
  year: number;
  value: number;
}

export interface CompanyDebtToEbitdaHistory {
  key: CompanyKey;
  companyName: string;
  series: DebtToEbitdaPoint[];
}
