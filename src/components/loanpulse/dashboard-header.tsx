import type { LoanData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { FileText, Building, BarChart, FileSignature } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  meta: LoanData["meta"];
};

const statusStyles = {
  active_healthy: "bg-green-100 text-green-800 border-green-200",
  active_warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  breached: "bg-red-100 text-red-800 border-red-200",
};

export function DashboardHeader({ meta }: DashboardHeaderProps) {
  const status =
    meta.status === "active_warning"
      ? "active_warning"
      : meta.status === "breached"
      ? "breached"
      : "active_healthy";

  return (
    <header className="bg-card border-b p-4 md:p-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
                <FileSignature className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-headline text-2xl md:text-3xl font-bold text-primary">
                LoanPulse AI
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Risk Monitoring Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{meta.loan_id}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{meta.borrower_name}</span>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "capitalize text-sm font-semibold",
                statusStyles[status]
              )}
            >
              {meta.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
