
"use client";

import { useState, useEffect } from "react";
import { summarizeMarketSentiment, type SummarizeMarketSentimentOutput } from "@/ai/flows/summarize-market-sentiment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type MarketChatterProps = {
  companyName: string;
};

const sentimentStyles = {
  Positive: {
    icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    badge: "bg-green-100 text-green-800 border-green-200",
  },
  Neutral: {
    icon: <Minus className="h-6 w-6 text-yellow-500" />,
    badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  Negative: {
    icon: <TrendingDown className="h-6 w-6 text-red-500" />,
    badge: "bg-red-100 text-red-800 border-red-200",
  },
};

export function MarketChatter({ companyName }: MarketChatterProps) {
  const [result, setResult] = useState<SummarizeMarketSentimentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSentiment = async () => {
      setIsLoading(true);
      try {
        const sentimentResult = await summarizeMarketSentiment({ companyName });
        setResult(sentimentResult);
      } catch (error) {
        console.error("Error getting market sentiment:", error);
        // Optionally set an error state here
      } finally {
        setIsLoading(false);
      }
    };
    getSentiment();
  }, [companyName]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Market Chatter</CardTitle>
          <CardDescription>AI-powered market sentiment analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return null; // Or show an error state
  }

  const { sentiment, summary, confidence_score } = result;
  const styles = sentimentStyles[sentiment];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center justify-between">
          <span>Market Chatter</span>
           <Badge variant="outline" className={cn("font-semibold", styles.badge)}>
            {styles.icon}
            <span className="ml-2">{sentiment}</span>
          </Badge>
        </CardTitle>
        <CardDescription>AI-powered market sentiment analysis.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{summary}</p>
        <p className="text-xs text-muted-foreground mt-2">
            Confidence: {Math.round(confidence_score * 100)}%
        </p>
      </CardContent>
    </Card>
  );
}
