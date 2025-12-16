import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-covenant-risk.ts';
import '@/ai/flows/process-loan-agreement.ts';
import '@/ai/flows/summarize-market-sentiment.ts';
