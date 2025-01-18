export interface ChatbotResponse {
  $text: string;
  usedMemory?: string;
  allMemory?: string;
  relatedDocuments?: { id: string; url: string; title?: string; content?: string }[];
  status?: { loading?: boolean; message?: string };
}

export const chatbotOutputsSchema = {
  $text: {
    type: 'string',
  },
  usedMemory: {
    type: 'string',
  },
  allMemory: {
    type: 'string',
  },
  relatedDocuments: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          required: true,
        },
        url: {
          type: 'string',
          required: true,
        },
        title: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
      },
    },
  },
  status: {
    type: 'object',
    properties: {
      loading: {
        type: 'boolean',
      },
      message: {
        type: 'string',
      },
    },
  },
} as const;
