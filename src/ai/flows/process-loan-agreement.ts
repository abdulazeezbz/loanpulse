'use server';

/**
 * @fileOverview Processes a loan agreement document.
 *
 * - processLoanAgreement - A function that handles the loan agreement processing.
 * - ProcessLoanAgreementInput - The input type for the processLoanAgreement function.
 * - ProcessLoanAgreementOutput - The return type for the processLoanAgreement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { LoanData } from '@/lib/types';


const ProcessLoanAgreementInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "A loan agreement document (PDF, DOC, DOCX), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ProcessLoanAgreementInput = z.infer<typeof ProcessLoanAgreementInputSchema>;

const ProcessLoanAgreementOutputSchema = z.object({
  meta: z.object({
    loan_id: z.string(),
    borrower_name: z.string(),
    sector: z.string(),
    status: z.enum(["active_warning", "active_healthy", "breached"]),
  }),
  financial_covenants: z.array(z.object({
    id: z.string(),
    title: z.string(),
    clause_ref: z.string(),
    definition: z.string(),
    limit: z.number(),
    limit_type: z.enum(["max", "min"]),
    limit_snippet: z.string(),
    current_value: z.number(),
    status: z.enum(["warning", "healthy", "breach"]),
    trend_data: z.array(z.object({
      month: z.string(),
      value: z.number(),
    })),
    risk_analysis: z.string(),
  })),
  esg_kpi: z.object({
    title: z.string(),
    target: z.number(),
    current: z.number(),
    unit: z.string(),
    commercial_impact: z.string(),
  }),
});

export type ProcessLoanAgreementOutput = z.infer<typeof ProcessLoanAgreementOutputSchema>;


export async function processLoanAgreement(input: ProcessLoanAgreementInput): Promise<ProcessLoanAgreementOutput> {
  return processLoanAgreementFlow(input);
}

const extractLoanDataPrompt = ai.definePrompt({
    name: 'extractLoanDataPrompt',
    input: { schema: ProcessLoanAgreementInputSchema },
    output: { schema: ProcessLoanAgreementOutputSchema },
    prompt: `You are an expert financial analyst specializing in corporate loans. Your task is to extract key information from the provided loan agreement document.

    Analyze the document and extract the following information:
    - Loan metadata (loan ID, borrower name, sector).
    - All financial covenants, including their title, clause reference, definition, limit, and the exact snippet from the text.
    - For each covenant, determine its current status (healthy, warning, breach) based on the provided data.
    - Provide a brief risk analysis for each covenant.
    - Generate plausible trend data for the last 4 months for each covenant.
    - Extract any ESG (Environmental, Social, and Governance) KPIs, including their target, current value, and commercial impact.
    - Determine the overall status of the loan (active_healthy, active_warning, breached).

    Document:
    {{media url=fileDataUri}}
    `,
});


const processLoanAgreementFlow = ai.defineFlow(
  {
    name: 'processLoanAgreementFlow',
    inputSchema: ProcessLoanAgreementInputSchema,
    outputSchema: ProcessLoanAgreementOutputSchema,
  },
  async input => {
    console.log("Processing file with AI...");
    const { output } = await extractLoanDataPrompt(input);
    if (!output) {
      throw new Error("Failed to extract loan data from the document.");
    }
    console.log("File processed successfully.");
    return output;
  }
);
