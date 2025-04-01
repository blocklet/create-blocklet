import { ExecutionEngine } from '@aigne/core';
import { OpenAIChatModel } from '@aigne/core/models/openai-chat-model';
import config from '@blocklet/sdk/lib/config';
import { Router } from 'express';

import { chatbot } from './chatbot';

const model = new OpenAIChatModel({
  model: 'gpt-4o-mini',
  apiKey: config.env.OPENAI_API_KEY || '',
});

const engine = new ExecutionEngine({
  model,
  agents: [chatbot],
});

export const router = Router();

router.post('/chat', async (req, res) => {
  const result = await engine.call(chatbot, req.body);

  res.json(result);
});
