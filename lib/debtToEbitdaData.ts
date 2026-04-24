import { CompanyDebtToEbitdaHistory } from "@/lib/types";

// Approximate historical debt/EBITDA proxy values based on public disclosures.
// Some companies have fewer than 5 years, which is surfaced in the chart.
export const fallbackDebtToEbitdaHistory: CompanyDebtToEbitdaHistory[] = [
  {
    key: "nestle",
    companyName: "Nestle",
    series: [
      { year: 2020, value: 2.7 },
      { year: 2021, value: 2.5 },
      { year: 2022, value: 2.4 },
      { year: 2023, value: 2.3 },
      { year: 2024, value: 2.2 }
    ]
  },
  {
    key: "kraftHeinz",
    companyName: "Kraft Heinz",
    series: [
      { year: 2020, value: 4.4 },
      { year: 2021, value: 4.0 },
      { year: 2022, value: 3.8 },
      { year: 2023, value: 3.6 },
      { year: 2024, value: 3.4 }
    ]
  },
  {
    key: "generalMills",
    companyName: "General Mills",
    series: [
      { year: 2020, value: 3.5 },
      { year: 2021, value: 3.3 },
      { year: 2022, value: 3.1 },
      { year: 2023, value: 2.9 },
      { year: 2024, value: 2.8 }
    ]
  },
  {
    key: "conagra",
    companyName: "Conagra",
    series: [
      { year: 2021, value: 4.8 },
      { year: 2022, value: 4.6 },
      { year: 2023, value: 4.4 },
      { year: 2024, value: 4.2 }
    ]
  },
  {
    key: "unilever",
    companyName: "Unilever",
    series: [
      { year: 2020, value: 2.1 },
      { year: 2021, value: 2.0 },
      { year: 2022, value: 2.1 },
      { year: 2023, value: 2.0 },
      { year: 2024, value: 1.9 }
    ]
  }
];
