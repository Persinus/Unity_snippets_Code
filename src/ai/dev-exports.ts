'use server';
import { ai } from './genkit';
import { findSnippet } from './flows/find-snippet-flow';
import { z } from 'zod';

// This is a "debug" flow that is not used in the application,
// but is useful for inspecting the flow in the Genkit developer UI.
export const findSnippetFlow = ai.defineFlow(
  {
    name: 'findSnippetFlow',
    inputSchema: z.string(),
    outputSchema: z.object({ slug: z.string().optional() }),
  },
  async (query) => {
    return await findSnippet(query);
  }
);
