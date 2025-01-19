import { OpenaiLLMModel, LLMAgent, Runtime } from '@aigne/core';

const context = new Runtime({
  llmModel: new OpenaiLLMModel({
    model: 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY || '',
  }),
});

export const chatbot = LLMAgent.create({
  context,
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
