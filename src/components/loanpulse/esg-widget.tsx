import type { EsgKpi } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";

type EsgWidgetProps = {
  kpi: EsgKpi;
};

export function EsgWidget({ kpi }: EsgWidgetProps) {
  const progressPercentage = (kpi.current / kpi.target) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Leaf className="text-green-600" />
          <span>ESG KPI</span>
        </CardTitle>
        <CardDescription>{kpi.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-baseline">
          <p className="text-2xl font-bold text-primary">{kpi.current}{kpi.unit.startsWith('%') ? '%' : ''}</p>
          <p className="text-sm text-muted-foreground">Target: {kpi.target}{kpi.unit.startsWith('%') ? '%' : ''}</p>
        </div>
        <Progress value={progressPercentage} className="h-3" />
         <p className="text-xs text-muted-foreground pt-1">{kpi.unit}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground font-medium bg-green-50 border border-green-200 rounded-md p-2 w-full">
            <span className="font-bold text-green-700">Commercial Impact: </span>{kpi.commercial_impact}
        </p>
      </CardFooter>
    </Card>
  );
}
