export type TrendData = {
  month: string;
  value: number;
};

export type FinancialCovenant = {
  id: string;
  title: string;
  clause_ref: string;
  definition: string;
  limit: number;
  limit_type: "max" | "min";
  limit_snippet: string;
  current_value: number;
  status: "warning" | "healthy" | "breach";
  trend_data: TrendData[];
  risk_analysis: string;
};

export type EsgKpi = {
  title: string;
  target: number;
  current: number;
  unit: string;
  commercial_impact: string;
};

export type LoanData = {
  meta: {
    loan_id: string;
    borrower_name: string;
    sector: string;
    status: "active_warning" | "active_healthy" | "breached";
  };
  financial_covenants: FinancialCovenant[];
  esg_kpi: EsgKpi;
};
