import { createFetch } from '@blocklet/js-sdk';
import Header from '@blocklet/ui-react/lib/Header';
import { SendRounded } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
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

import blockletLogo from '../assets/blocklet.svg';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ScrollView from '../components/ScrollView';
import { useSessionContext } from '../contexts/session';
import './home.css';

const fetch = createFetch();

interface MessageItem {
  $message: string;
  id: string;
  question?: string;
  loading?: boolean;
  error?: Error;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const { session } = useSessionContext();

  const run = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.did) {
      session.login();
      return;
    }

    setQuestion('');
    const message: MessageItem = {
      id: nanoid(),
      question,
      $message: '',
      loading: true,
    };

    setMessages((prev) =>
      produce(prev, (draft) => {
        draft.push(message);
      }),
    );

    try {
      const result = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          $message: question,
        }),
      }).then((res) => res.json());

      setMessages((prev) =>
        produce(prev, (draft) => {
          const m = draft.find((i) => i.id === message.id)!;
          Object.assign(m, result);
        }),
      );
    } catch (error) {
      setMessages((prev) =>
        produce(prev, (draft) => {
          const m = draft.find((i) => i.id === message.id)!;
          m.error = error;
        }),
      );
    } finally {
      setMessages((prev) =>
        produce(prev, (draft) => {
          const m = draft.find((i) => i.id === message.id)!;
          m.loading = false;
        }),
      );
    }
  };

  return (
    <ScrollView scroll="window" sx={{ minHeight: '100vh' }}>
      <Box component={Header} sx={{ position: 'sticky', top: 0, '.header-container': { maxWidth: '100%' } }} />
      <Box sx={{
        textAlign: "center"
      }}>
        <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
          <img src={blockletLogo} className="logo blocklet" alt="Blocklet logo" />
        </a>
        <h1>Vite + React + AIGNE Framework SDK</h1>
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            my: 6
          }}>
          AIGNE Chatbot
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            my: 6
          }}>
          This is a simple demo to help you quickly use the AIGNE framework SDK
        </Typography>
      </Box>
      <Container sx={{ display: 'flex', flexDirection: 'column', py: 3 }} maxWidth="md">
        <Stack sx={{ flex: 1, height: 0, display: 'flex', flexDirection: 'column', gap: 3, mb: 5 }}>
          {messages.map((message) => (
            <MessageView key={message.id} message={message} />
          ))}
        </Stack>

        <Box
          component="form"
          onSubmit={run}
          sx={{
            '@media (min-height: 100vh)': {
              position: 'sticky',
              bottom: 24,
            },
          }}>
          <Input
            fullWidth
            disableUnderline
            sx={{ border: 1, bgcolor: 'white', borderColor: 'divider', py: 1, pl: 2, borderRadius: 10 }}
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
        </Box>
      </Container>
    </ScrollView>
  );
}

const MessageView = memo(({ message }: { message: MessageItem }) => {
  return (
    <Stack sx={{
      gap: 2
    }}>
      <Stack direction="row" sx={{
        gap: 2
      }}>
        <Avatar>🧑</Avatar>

        <Stack
          sx={{
            flex: 1,
            pt: 1,
            gap: 1
          }}>
          <Typography>{message.question}</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{
        gap: 2
      }}>
        <Avatar>🤖</Avatar>
        <Stack
          sx={{
            flex: 1,
            pt: 1,
            gap: 2
          }}>
          {message.$message && (
            <Stack sx={{
              gap: 1
            }}>
              <MarkdownRenderer citations={[]}>{message.$message}</MarkdownRenderer>
            </Stack>
          )}

          {message.loading && (
            <Stack
              direction="row"
              sx={{
                gap: 2,
                alignItems: "center"
              }}>
              <CircularProgress size={16} />
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
