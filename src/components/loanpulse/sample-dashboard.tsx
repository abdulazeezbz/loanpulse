
"use client";

import { DashboardHeader } from "@/components/loanpulse/dashboard-header";
import { CovenantCard } from "@/components/loanpulse/covenant-card";
import { EsgWidget } from "@/components/loanpulse/esg-widget";
import { AlertFeed } from "@/components/loanpulse/alert-feed";
import { CureCalculatorModal } from "@/components/loanpulse/cure-calculator-modal";
import sampleData from "@/data/loan-data.json";

export function SampleDashboard() {
  const data = sampleData;

  return (
    <div className="flex flex-col min-h-screen bg-background rounded-lg border shadow-2xl shadow-primary/10 overflow-hidden pointer-events-none scale-90">
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
                {/* The button is disabled for the sample view */}
                <div className="scale-90 opacity-70">
                    <CureCalculatorModal />
                </div>
            </div>
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
