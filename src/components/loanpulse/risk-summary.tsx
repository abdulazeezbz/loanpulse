
"use client";

import { useState } from "react";
import { summarizeCovenantRisk } from "@/ai/flows/summarize-covenant-risk";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type RiskSummaryProps = {
  covenantTitle: string;
  riskAnalysis: string;
};

export function RiskSummary({ covenantTitle, riskAnalysis }: RiskSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click events
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeCovenantRisk({ covenantTitle, riskAnalysis });
      setSummary(result.summary);
    } catch (error) {
      console.error("Error summarizing risk:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate risk summary.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Alert>
        <AlertTitle className="font-semibold">Risk Analysis</AlertTitle>
        <AlertDescription className="text-sm">
          {riskAnalysis}
        </AlertDescription>
      </Alert>

      {summary && (
        <Alert variant="default" className="bg-primary/5 border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-semibold">AI Summary</AlertTitle>
          <AlertDescription>
            {summary}
          </AlertDescription>
        </Alert>
      )}

      {!summary && (
        <Button onClick={handleSummarize} disabled={isLoading} size="sm" className="pointer-events-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Summary
            </>
          )}
        </Button>
      )}
    </div>
  );
}
