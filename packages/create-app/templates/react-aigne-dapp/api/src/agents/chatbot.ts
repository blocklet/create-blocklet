import { LLMAgent } from '@aigne/core';
import { runtime } from './runtime';

const chatbot = LLMAgent.create({
  context: runtime,
  name: 'chatbot',
  inputs: {
    question: {
      type: 'string',
      required: true,
    },
  },
  modelOptions: {
    model: 'gpt-4o',
    temperature: 0.1,
  },
  messages: [
    { role: 'system', content: 'You are a AI chat bot' },
    { role: 'user', content: '{{question}}' },
  ],
  outputs: {
    $text: {
      type: 'string',
      required: true,
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export { chatbot };
