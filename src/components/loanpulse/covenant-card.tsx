
"use client";

import type { FinancialCovenant } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import { cn } from "@/lib/utils";
import { Info, Target } from "lucide-react";
import { RiskSummary } from "./risk-summary";

type CovenantCardProps = {
  covenant: FinancialCovenant;
};

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
  limit: {
    label: "Limit",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

export function CovenantCard({ covenant }: CovenantCardProps) {
  const { current_value, limit, limit_type, trend_data } = covenant;

  let status: "healthy" | "warning" | "breach" = "healthy";

  if (limit_type === "max") {
    if (current_value >= limit) {
      status = "breach";
    } else if (current_value > limit * 0.9) {
      status = "warning";
    }
  } else {
    // min
    if (current_value <= limit) {
      status = "breach";
    } else if (current_value < limit * 1.1) {
      status = "warning";
    }
  }

  const statusStyles = {
    healthy: {
      badge: "bg-chart-2/10 text-chart-2 border-chart-2/20",
      text: "text-chart-2",
      card: "border-border",
    },
    warning: {
      badge: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      text: "text-chart-4",
      card: "border-chart-4/80 shadow-lg shadow-chart-4/10",
    },
    breach: {
      badge: "bg-destructive/10 text-destructive border-destructive/20",
      text: "text-destructive",
      card: "border-destructive/80 shadow-lg shadow-destructive/10",
    },
  };

  const domainMargin = Math.max(...trend_data.map(d => d.value)) * 0.2;
  const yDomain: [number, number] = [
    Math.min(...trend_data.map(d => d.value)) - domainMargin,
    Math.max(...trend_data.map(d => d.value), limit) + domainMargin
  ]

  return (
    <Card className={cn("transition-all", statusStyles[status].card)}>
      <CardHeader className="grid grid-cols-2">
        <div>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            {covenant.title}
             <Badge variant="outline" className={statusStyles[status].badge}>
              {status}
            </Badge>
          </CardTitle>
          <CardDescription className="font-code">{covenant.clause_ref}</CardDescription>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Current Value</p>
          <p className={`text-3xl font-bold ${statusStyles[status].text}`}>
            {covenant.current_value.toFixed(2)}x
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-muted-foreground flex items-center justify-end gap-1 cursor-help">
                  <Info className="h-3 w-3" />
                  {`Limit: ${covenant.limit.toFixed(2)}x (${covenant.limit_type})`}
                </p>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs font-code text-sm" side="top">
                <p>{covenant.limit_snippet}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-48">
          <ChartContainer config={chartConfig} className="pointer-events-none">
            <LineChart
              data={trend_data}
              margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
              accessibilityLayer
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
               <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={yDomain}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                wrapperStyle={{ pointerEvents: 'auto' }}
              />
              <ReferenceLine y={covenant.limit} stroke="hsl(var(--destructive))" strokeDasharray="3 3" strokeWidth={2}>
                 <Target className="h-4 w-4 text-destructive" />
              </ReferenceLine>
              <Line
                dataKey="value"
                type="monotone"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--primary))",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <RiskSummary covenantTitle={covenant.title} riskAnalysis={covenant.risk_analysis} />
      </CardContent>
    </Card>
  );
}
