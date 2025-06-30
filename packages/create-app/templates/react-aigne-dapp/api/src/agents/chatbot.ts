import { AIAgent } from '@aigne/core';
import { DefaultMemory } from '@aigne/agent-library/default-memory/index.js';

export const chatbot = AIAgent.from({
  name: 'chatbot',
  instructions:
    'You are a helpful assistant. You can answer questions, provide information, and assist with various tasks.',
  memory: new DefaultMemory(),
});
