'use server';

/**
 * @fileOverview Summarizes the potential risk associated with each covenant.
 *
 * - summarizeCovenantRisk - A function that summarizes the risk of a covenant.
 * - SummarizeCovenantRiskInput - The input type for the summarizeCovenantRisk function.
 * - SummarizeCovenantRiskOutput - The return type for the summarizeCovenantRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCovenantRiskInputSchema = z.object({
  covenantTitle: z.string().describe('The title of the covenant.'),
  riskAnalysis: z.string().describe('The risk analysis of the covenant.'),
});
export type SummarizeCovenantRiskInput = z.infer<typeof SummarizeCovenantRiskInputSchema>;

const SummarizeCovenantRiskOutputSchema = z.object({
  summary: z.string().describe('A summary of the potential risk associated with the covenant.'),
});
export type SummarizeCovenantRiskOutput = z.infer<typeof SummarizeCovenantRiskOutputSchema>;

export async function summarizeCovenantRisk(input: SummarizeCovenantRiskInput): Promise<SummarizeCovenantRiskOutput> {
  return summarizeCovenantRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCovenantRiskPrompt',
  input: {schema: SummarizeCovenantRiskInputSchema},
  output: {schema: SummarizeCovenantRiskOutputSchema},
  prompt: `Summarize the potential risk associated with the following covenant. Keep the summary to under 50 words.\n\nCovenant Title: {{{covenantTitle}}}\nRisk Analysis: {{{riskAnalysis}}}`,
});

const summarizeCovenantRiskFlow = ai.defineFlow(
  {
    name: 'summarizeCovenantRiskFlow',
    inputSchema: SummarizeCovenantRiskInputSchema,
    outputSchema: SummarizeCovenantRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
