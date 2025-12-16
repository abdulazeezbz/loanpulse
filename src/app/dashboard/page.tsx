
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { LoanData } from "@/lib/types";
import { DashboardHeader } from "@/components/loanpulse/dashboard-header";
import { CovenantCard } from "@/components/loanpulse/covenant-card";
import { EsgWidget } from "@/components/loanpulse/esg-widget";
import { AlertFeed } from "@/components/loanpulse/alert-feed";
import { MarketChatter } from "@/components/loanpulse/market-chatter";
import { CureCalculatorModal } from "@/components/loanpulse/cure-calculator-modal";
import { FileQuestion, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [data, setData] = useState<LoanData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = sessionStorage.getItem("loanData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground mb-4">Loading dashboard...</p>
        <p className="text-sm text-muted-foreground">No data found? <Button variant="link" onClick={() => router.push('/')}>Go back</Button></p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader meta={data.meta} />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 grid gap-6">
            {data.financial_covenants.map((covenant) => (
              <CovenantCard key={covenant.id} covenant={covenant} />
            ))}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex justify-end">
              <CureCalculatorModal />
            </div>
            <MarketChatter companyName={data.meta.borrower_name} />
            <EsgWidget kpi={data.esg_kpi} />
            <AlertFeed />
          </div>
        </div>
      </main>
      <footer className="p-4 md:p-8 text-center text-muted-foreground text-sm">
        LoanPulse AI &copy; 2025
      </footer>
    </div>
  );
}
