

import OpenAI from 'openai';
const openai = new OpenAI();

export function query(question: string): string {
  const chatCompletion = openai.chat.completions.create({
    messages: [{ role: 'user', content: question }],
    model: 'gpt-3.5-turbo',
  });
  return JSON.stringify(chatCompletion);
}
