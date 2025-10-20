'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getAllSnippets } from '@/lib/snippets';

const FindSnippetOutputSchema = z.object({
  slug: z.string().optional().describe('The slug of the most relevant snippet. If no relevant snippet is found, this can be empty.'),
});

export async function findSnippet(query: string) {
  const allSnippets = getAllSnippets();
  const snippetsAsText = allSnippets.map(s => `SLUG: ${s.slug}\nTITLE: ${s.title}\nDESCRIPTION: ${s.description}\nTAGS: ${s.tags.join(', ')}`).join('\n---\n');

  const prompt = ai.definePrompt(
    {
      name: 'findSnippetPrompt',
      input: {
        schema: z.object({
          query: z.string(),
          context: z.string(),
        }),
      },
      output: {
        schema: FindSnippetOutputSchema,
      },
      prompt: `Bạn là một trợ lý AI thông minh có nhiệm vụ tìm kiếm trong một danh sách các code snippet.
Dựa vào câu hỏi của người dùng và danh sách các snippet có sẵn, hãy tìm ra snippet phù hợp nhất.
Chỉ trả về 'slug' của snippet đó. Nếu không tìm thấy snippet nào thực sự liên quan, hãy trả về một slug rỗng.

## Câu hỏi của người dùng:
{{{query}}}

## Danh sách các Snippet có sẵn (định dạng: SLUG, TITLE, DESCRIPTION, TAGS):
{{{context}}}
`,
    },
  );

  const { output } = await prompt({ query, context: snippetsAsText });
  return output || { slug: '' };
}
