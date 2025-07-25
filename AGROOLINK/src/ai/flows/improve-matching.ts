'use server';
/**
 * @fileOverview This file defines a Genkit flow to improve the matching process between farmers and helpers.
 *
 * - improveMatching - A function that takes a request and suggests the best helpers based on historical data.
 * - ImproveMatchingInput - The input type for the improveMatching function.
 * - ImproveMatchingOutput - The return type for the improveMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveMatchingInputSchema = z.object({
  requestId: z.string().describe('The ID of the help request.'),
  taskType: z.string().describe('The type of task (e.g., Transport, Repair).'),
  location: z.string().describe('The location of the task (e.g., LGA).'),
  description: z.string().describe('A short description of the task.'),
});
export type ImproveMatchingInput = z.infer<typeof ImproveMatchingInputSchema>;

const ImproveMatchingOutputSchema = z.object({
  suggestedHelperIds: z
    .array(z.string())
    .describe('An array of helper IDs suggested for the task.'),
  reasoning: z
    .string()
    .describe(
      'The AI reasoning behind the helper suggestions based on historical data.'
    ),
});
export type ImproveMatchingOutput = z.infer<typeof ImproveMatchingOutputSchema>;

export async function improveMatching(input: ImproveMatchingInput): Promise<ImproveMatchingOutput> {
  return improveMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveMatchingPrompt',
  input: {schema: ImproveMatchingInputSchema},
  output: {schema: ImproveMatchingOutputSchema},
  prompt: `You are an AI assistant designed to improve the matching process between farmers and helpers on the AgroLinker platform.

  Given the following help request details, analyze historical data on task types, locations, helper skills, and successful task completions to identify patterns and predict the best helper(s) for this request.

  Help Request Details:
  - Task Type: {{{taskType}}}
  - Location: {{{location}}}
  - Description: {{{description}}}

  Based on your analysis, suggest a list of helper IDs that are most likely to successfully complete the task.
  Explain your reasoning for suggesting these helpers, referencing relevant historical data and patterns.

  Ensure that the output is formatted as a JSON object with 'suggestedHelperIds' (an array of helper IDs) and 'reasoning' (the AI's reasoning).
  Do not include any additional text outside of the JSON object.

  Output: {
  "suggestedHelperIds": [helperId1, helperId2, ...],
  "reasoning": "Explanation of why these helpers are suggested..."
  }`,
});

const improveMatchingFlow = ai.defineFlow(
  {
    name: 'improveMatchingFlow',
    inputSchema: ImproveMatchingInputSchema,
    outputSchema: ImproveMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
