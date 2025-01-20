import { Box, styled } from '@mui/material';
import { ComponentProps } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = styled(
  (props: ComponentProps<typeof Markdown> & { citations?: { title?: string; url: string }[] }) => (
    <Markdown
      {...props}
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ className, children }) => {
          return (
            <Box sx={{ overflow: 'auto', my: 1 }}>
              <table className={className}>{children}</table>
            </Box>
          );
        },
        a: ({ href, children }) => {
          return <a href={href}>{children}</a>;
        },
      }}>
      {props.children}
    </Markdown>
  ),
)`
  width: 100%;
  overflow: hidden;
  word-break: break-word;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;

  > * {
    &:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
      margin-top: 0;
    }
    &:last-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
      margin-bottom: 0;
    }
  }

  pre {
    overflow: auto;
  }

  li {
    margin: 0;
    padding: 0;
  }

  li p {
    display: inline-block;
    vertical-align: top;
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    white-space: nowrap;

    th,
    td {
      border: 1px solid grey;
      padding: 4px 8px;
    }
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};

    :hover {
      text-decoration: underline;
    }
  }

  &.writing:empty,
  &.writing > *:last-child {
    &:after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      height: 1.2em;
      margin-top: -0.2em;
      margin-left: 0.1em;
      border-right: 0.2em solid orange;
      border-radius: 10px;
      animation: blink-caret 0.75s step-end infinite;

      @keyframes blink-caret {
        from,
        to {
          border-color: transparent;
        }
        50% {
          border-color: ${({ theme }) => theme.palette.secondary.main};
        }
      }
    }
  }
`;

export default MarkdownRenderer;
