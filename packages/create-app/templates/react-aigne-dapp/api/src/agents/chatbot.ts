import { AIAgent } from '@aigne/core';

export const chatbot = AIAgent.from({
  name: 'chatbot',
  instructions:
    'You are a helpful assistant. You can answer questions, provide information, and assist with various tasks.',
  memory: true,
});
