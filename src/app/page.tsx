
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileUpload } from "@/components/loanpulse/file-upload";
import { Button } from "@/components/ui/button";
import { SampleDashboard } from "@/components/loanpulse/sample-dashboard";
import { ArrowRight, FileSignature } from "lucide-react";

export default function Home() {
  const [showFileUpload, setShowFileUpload] = useState(false);

  if (showFileUpload) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
            <div className="w-full max-w-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="font-headline text-4xl font-bold text-center text-primary mb-2">LoanPulse AI</h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Upload your loan agreement to begin.
                    </p>
                    <FileUpload />
                </motion.div>
            </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 md:p-8">
        <div className="text-center w-full max-w-4xl mx-auto">
            <div className="flex justify-center items-center gap-4 mb-4">
                <FileSignature className="h-12 w-12 text-primary" />
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                    Welcome to LoanPulse AI
                </h1>
            </div>

            <p className="text-muted-foreground md:text-xl mb-8 max-w-3xl mx-auto">
                LoanPulse AI elevates your credit portfolio management by transforming dense, static LMA loan agreements into a live, interactive dashboard. Proactively monitor financial covenants, track ESG KPIs, and get instant AI-driven risk summaries to stay ahead of potential breaches.
            </p>
            
            <Button 
                size="lg" 
                className="z-20 relative mb-12"
                onClick={() => setShowFileUpload(true)}
            >
                Get Started <ArrowRight className="ml-2" />
            </Button>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
            >
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
                <SampleDashboard />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-10" />
            </motion.div>

        </div>
    </main>
  );
}
