/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { OrderedRecord } from '@aigne/core';
import { Runtime } from '@aigne/runtime/client';
import { SendRounded } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Container,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import React, { memo, useState } from 'react';

import { ChatbotResponse } from '../../api/src/agents/type';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ScrollView from '../components/ScrollView';
import './home.css';

interface MessageItem extends ChatbotResponse {
  id: string;
  question?: string;
  loading?: boolean;
  error?: Error;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<OrderedRecord<MessageItem>>(() => OrderedRecord.fromArray([]));

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuestion('');

    const message: MessageItem = {
      id: nanoid(),
      question,
      $text: '',
      loading: true,
    };

    setMessages((prev) => produce(prev, (draft) => OrderedRecord.push(draft, message)));

    try {
      const chatbot = new Runtime({ id: '526280358526713856' });
      const stream = await (await chatbot.resolve('chatbot')).run({ question }, { stream: true });
      const reader = stream.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        setMessages((prev) =>
          produce(prev, (draft) => {
            const m = draft[message.id]!;
            Object.assign(m, value.delta);
          }),
        );
      }
    } catch (error) {
      setMessages((prev) =>
        produce(prev, (draft) => {
          const m = draft[message.id]!;
          m.error = error;
        }),
      );
    } finally {
      setMessages((prev) =>
        produce(prev, (draft) => {
          const m = draft[message.id]!;
          m.loading = false;
        }),
      );
    }
  };

  return (
    <ScrollView scroll="window">
      <Container>
        <Typography variant="h4" textAlign="center" my={6}>
          Aigne Chatbot
        </Typography>

        <Stack gap={2} mb={10}>
          {OrderedRecord.map(messages, (message) => (
            <MessageView key={message.id} message={message} />
          ))}
        </Stack>

        <Stack component="form" onSubmit={run} position="sticky" bottom={0} py={2} bgcolor="white">
          <Input
            fullWidth
            disableUnderline
            sx={{ border: 1, borderColor: 'divider', py: 1, pl: 2, borderRadius: 10 }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button type="submit">
                  <SendRounded />
                </Button>
              </InputAdornment>
            }
          />
        </Stack>
      </Container>
    </ScrollView>
  );
}

const MessageView = memo(({ message }: { message: MessageItem }) => {
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <Avatar>🧑</Avatar>

        <Stack flex={1} pt={1} gap={1}>
          <Typography>{message.question}</Typography>
        </Stack>
      </Stack>

      <Stack direction="row" gap={2}>
        <Avatar>🤖</Avatar>
        <Stack flex={1} pt={1} gap={2}>
          {message.$text && (
            <Stack gap={1}>
              <MarkdownRenderer citations={message.relatedDocuments}>{message.$text}</MarkdownRenderer>
            </Stack>
          )}

          {message.loading && message.status?.loading && (
            <Stack direction="row" gap={2} alignItems="center">
              <CircularProgress size={16} />
              <Typography variant="caption">{message.status.message}</Typography>
            </Stack>
          )}

          {message.error && (
            <Alert severity="error" variant="outlined">
              {message.error.message}
            </Alert>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
});
