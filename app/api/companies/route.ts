import { NextResponse } from "next/server";
import { fallbackCompanyData } from "@/lib/companyData";
import { CompanyRawMetrics } from "@/lib/types";

const companies = fallbackCompanyData.map((company) => ({
  key: company.key,
  companyName: company.companyName,
  ticker: company.ticker
}));

async function fetchAlphaVantageOverview(
  ticker: string,
  apiKey: string
): Promise<Partial<CompanyRawMetrics> | null> {
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as Record<string, string>;
  if (!data || !data.Symbol) {
    return null;
  }

  const marketCap = Number(data.MarketCapitalization || 0) / 1_000_000_000;
  const grossMargin = Number(data.GrossProfitTTM || 0);
  const revenueTtm = Number(data.RevenueTTM || 0);
  const grossMarginPercent = revenueTtm > 0 ? (grossMargin / revenueTtm) * 100 : NaN;

  return {
    marketCapBillionsUsd: Number.isFinite(marketCap) ? marketCap : undefined,
    netMargin: Number(data.ProfitMargin) * 100 || undefined,
    debtToEquity: Number(data.DebtToEquity) || undefined,
    grossMargin: Number.isFinite(grossMarginPercent) ? grossMarginPercent : undefined
  };
}

export async function GET() {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const mergedData: CompanyRawMetrics[] = [...fallbackCompanyData];

  if (apiKey) {
    await Promise.all(
      companies.map(async (company) => {
        const live = await fetchAlphaVantageOverview(company.ticker, apiKey);
        if (!live) {
          return;
        }

        const target = mergedData.find((item) => item.ticker === company.ticker);
        if (!target) {
          return;
        }

        target.marketCapBillionsUsd = live.marketCapBillionsUsd ?? target.marketCapBillionsUsd;
        target.netMargin = live.netMargin ?? target.netMargin;
        target.debtToEquity = live.debtToEquity ?? target.debtToEquity;
        target.grossMargin = live.grossMargin ?? target.grossMargin;
      })
    );
  }

  return NextResponse.json({
    source: apiKey ? "Fallback + Alpha Vantage live overrides" : "Fallback public dataset",
    companies: mergedData
  });
}
