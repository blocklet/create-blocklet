import { OpenaiLLMModel } from '@aigne/core';
import { AIGNERuntime } from '@aigne/runtime';
import config from '@blocklet/sdk/lib/config';

export const llmModel = new OpenaiLLMModel({
  model: 'gpt-4o-mini',
  apiKey: config.env.OPENAI_API_KEY || '',
});

export const runtime = new AIGNERuntime({
  llmModel,
});

config.events.on(config.Events.envUpdate, () => {
  llmModel.setApiKey(config.env.OPENAI_API_KEY || '');
});
