"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CureCalculatorModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Cure
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center justify-between">
            Cure Options Calculator
            <Badge variant="outline">Simulated</Badge>
          </DialogTitle>
          <DialogDescription>
            Simulated options to cure the covenant breach.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm">
            To return the <span className="font-bold">Leverage Ratio</span> to compliance
            (below 4.00x), the Borrower could take one of the following actions:
          </p>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800">Option 1: Equity Injection</h3>
            <p>
              Inject <span className="font-bold text-lg text-green-900">$2.5M</span> in new equity.
            </p>
          </div>
          <div className="text-center text-sm font-semibold text-muted-foreground">OR</div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800">Option 2: Debt Reduction</h3>
            <p>
              Reduce total debt by <span className="font-bold text-lg text-blue-900">$1.8M</span>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
