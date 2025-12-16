
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  File as FileIcon,
  X,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { processLoanAgreement } from "@/ai/flows/process-loan-agreement";
import { ScanningAnimation } from "./scanning-animation";


export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();


  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only PDF, DOC, and DOCX files are allowed.");
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isProcessing) return;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleClick = () => {
    if (isProcessing) return;
    fileInputRef.current?.click();
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        if (!base64Data) {
            toast({
                variant: "destructive",
                title: "File Read Error",
                description: "Could not read the file contents.",
            });
            setIsProcessing(false);
            return;
        }

        try {
            const result = await processLoanAgreement({ fileDataUri: base64Data });
            sessionStorage.setItem('loanData', JSON.stringify(result));
            // The isProcessing state change will trigger the scanning animation,
            // which then handles the redirect.
        } catch (err) {
            console.error("Processing error:", err);
            toast({
                variant: "destructive",
                title: "Processing Failed",
                description: "Could not analyze the loan agreement file. The AI model may have had an issue with the document format or content.",
            });
            setIsProcessing(false);
        }
    };
    
    reader.onerror = () => {
        console.error("File reading error:", reader.error);
        toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "Could not read the selected file.",
        });
        setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };


  if (isProcessing) {
    return <ScanningAnimation fileName={file?.name || 'file'} />;
  }

  return (
    <Card>
      <CardContent className="p-0">
          <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors relative"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
              accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            {!file ? (
                <div className="text-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-2 mx-auto" />
                    <p className="font-semibold">Drop Loan Agreement here</p>
                    <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX</p>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center">
                    <FileIcon className="h-10 w-10 text-primary" />
                    <p className="mt-2 font-semibold truncate max-w-xs">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-7 w-7"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
             {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </div>

          {file && !isProcessing && (
            <div className="p-4 border-t">
                 <Button onClick={handleProcess} className="w-full" disabled={isProcessing || !!error}>
                    {isProcessing ? <Loader2 className="animate-spin" /> : 'Process Agreement'}
                </Button>
            </div>
           )}
      </CardContent>
    </Card>
  );
}
