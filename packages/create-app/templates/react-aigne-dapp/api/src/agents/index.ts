import { AIGNE } from '@aigne/core';
import { OpenAIChatModel } from '@aigne/openai';
import config from '@blocklet/sdk/lib/config';
import { Router } from 'express';

import { chatbot } from './chatbot';

const model = new OpenAIChatModel({
  model: 'gpt-4o-mini',
  apiKey: config.env.OPENAI_API_KEY || '',
});

const aigne = new AIGNE({
  model,
});

export const router = Router();

router.post('/chat', async (req, res) => {
  const result = await aigne.invoke(chatbot, { message: req.body });
  res.json(result);
});
