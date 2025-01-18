import { LLMAgent } from '@aigne/core';
import { ChatHistory } from '@aigne/memory';
import { Runtime } from '@aigne/runtime';
import { join } from 'path';
import config from '@blocklet/sdk/lib/config';

const chatHistory = new ChatHistory({
  path: join(config.env.dataDir, 'chat-history'),
});

const chatbot = LLMAgent.create({
  context: new Runtime(),
  name: 'chatbot',
  inputs: {
    question: {
      type: 'string',
      required: true,
    },
  },
  memories: {
    history: {
      name: 'chat-history',
      memory: chatHistory,
      primary: true,
      query: {
        fromVariable: 'question',
      },
      options: {
        k: 10,
      },
    },
  },
  modelOptions: {
    model: 'gpt-4o',
    temperature: 0.1,
  },
  messages: [
    { role: 'system', content: 'You are a AI chat bot, use memory to answer the question' },
    { role: 'user', content: '{{question}}' },
  ],
  outputs: {
    $text: {
      type: 'string',
      required: true,
    },
  },
});

export default chatbot;
