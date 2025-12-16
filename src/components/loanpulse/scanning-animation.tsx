"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  FileScan,
  DatabaseZap,
  CheckCircle2,
  UploadCloud,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
   {
    text: "Analyzing Document Structure...",
    icon: <FileScan className="h-6 w-6 text-primary" />,
    duration: 2000,
  },
  {
    text: "Extracting Financial Covenants...",
    icon: <DatabaseZap className="h-6 w-6 text-primary" />,
    duration: 2500,
  },
  {
    text: "Success!",
    icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
    duration: 1500,
  },
];

type ScanningAnimationProps = {
  fileName: string;
};


export function ScanningAnimation({fileName}: ScanningAnimationProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const router = useRouter();

   useEffect(() => {
    setCurrentStep(0);
  }, []);

  useEffect(() => {
    if (currentStep === -1) return;

    if (currentStep < steps.length - 1) {
      const timer = setTimeout(
        () => setCurrentStep((prev) => prev + 1),
        steps[currentStep].duration
      );
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(
        () => router.push("/dashboard"),
        steps[currentStep].duration
      );
      return () => clearTimeout(timer);
    }
  }, [currentStep, router]);


  return (
    <Card
      className="transition-all duration-300 bg-transparent shadow-none border-none"
    >
      <CardContent className="p-0">
        <motion.div
            key="progress"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-48"
        >
            <AnimatePresence mode="wait">
            {currentStep > -1 &&
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-4"
                >
                    {steps[currentStep].icon}
                    <span className="text-lg font-medium">
                    {steps[currentStep].text}
                    </span>
                </motion.div>
            }
            </AnimatePresence>
        </motion.div>
      </CardContent>
    </Card>
  );
}
