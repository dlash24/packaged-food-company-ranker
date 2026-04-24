import { CompanyRawMetrics } from "@/lib/types";

// Fallback dataset built from recent public annual reports / investor factsheets.
// Values are approximate to keep this app keyless and fully free to run.
export const fallbackCompanyData: CompanyRawMetrics[] = [
  {
    key: "nestle",
    companyName: "Nestle",
    ticker: "NSRGY",
    revenueGrowthYoy: 2.0,
    grossMargin: 46.8,
    netMargin: 9.6,
    majorBrandCount: 30,
    marketCapBillionsUsd: 280,
    esgScore: 78,
    debtToEquity: 1.2
  },
  {
    key: "kraftHeinz",
    companyName: "Kraft Heinz",
    ticker: "KHC",
    revenueGrowthYoy: 0.6,
    grossMargin: 34.2,
    netMargin: 11.2,
    majorBrandCount: 24,
    marketCapBillionsUsd: 44,
    esgScore: 69,
    debtToEquity: 0.4
  },
  {
    key: "generalMills",
    companyName: "General Mills",
    ticker: "GIS",
    revenueGrowthYoy: 3.1,
    grossMargin: 35.4,
    netMargin: 12.4,
    majorBrandCount: 18,
    marketCapBillionsUsd: 38,
    esgScore: 73,
    debtToEquity: 1.0
  },
  {
    key: "conagra",
    companyName: "Conagra",
    ticker: "CAG",
    revenueGrowthYoy: 1.7,
    grossMargin: 27.9,
    netMargin: 4.8,
    majorBrandCount: 17,
    marketCapBillionsUsd: 13,
    esgScore: 66,
    debtToEquity: 0.8
  },
  {
    key: "unilever",
    companyName: "Unilever",
    ticker: "UL",
    revenueGrowthYoy: 7.0,
    grossMargin: 43.5,
    netMargin: 10.8,
    majorBrandCount: 28,
    marketCapBillionsUsd: 125,
    esgScore: 82,
    debtToEquity: 1.5
  }
];
