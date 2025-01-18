import { Box, Link, Stack, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from '@mui/material';
import React, { ComponentProps, ReactElement, ReactNode, Suspense } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ReactSyntaxHighlighter = React.lazy(() => import('react-syntax-highlighter').then((m) => ({ default: m.Prism })));

const MarkdownRenderer = styled(
  (props: ComponentProps<typeof Markdown> & { citations?: { title?: string; url: string }[] }) => (
    <Markdown
      {...props}
      remarkPlugins={[remarkGfm]}
      components={{
        pre: MarkdownPre,
        table: ({ className, children }) => {
          return (
            <Box sx={{ overflow: 'auto', my: 1 }}>
              <table className={className}>{children}</table>
            </Box>
          );
        },
        a: ({ href, children }) => {
          const index = Number(href) - 1;
          const citation = props.citations?.[index];
          if (!citation && !index) return <a href={href}>{children}</a>;
          if (!citation) return null;

          return (
            <HtmlTooltip title={<LinkPreviewContent {...citation} />}>
              <Box
                component="a"
                href={citation.url}
                target="_blank"
                rel="noreferrer"
                sx={{
                  bgcolor: 'grey.300',
                  borderRadius: 10,
                  px: 0.5,
                  mx: 0.5,
                  textDecoration: 'none',
                  fontSize: 14,
                  verticalAlign: 'top',
                }}>
                {index + 1}
              </Box>
            </HtmlTooltip>
          );
        },
      }}>
      {props.children
        ?.replaceAll(/\[\s*citation:(\d+)\s*]/gi, '[citation]($1)')
        .replaceAll(/【\s*citation:(\d+)\s*】/gi, '[citation]($1)')}
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

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    border: `1px solid ${theme.palette.divider}`,
  },
}));

function LinkPreviewContent({ title, url, content }: { title?: string; url: string; content?: string }) {
  return (
    <Stack gap={1} sx={{ mark: { bgcolor: 'transparent', color: 'inherit' } }}>
      <Link href={url} target="_blank">
        <Typography variant="body2">{title}</Typography>
      </Link>

      <Typography
        variant="body2"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 5,
          overflow: 'hidden',
        }}>
        {content}
      </Typography>
    </Stack>
  );
}

function MarkdownPre({ children, ...props }: { children?: ReactNode }) {
  const childrenProps = (children as ReactElement)?.props;

  if (!childrenProps?.children) return null;

  const match = /language-(\w+)/.exec(childrenProps.className || '');
  const language = match?.[1];

  return (
    <Box
      component="div"
      sx={{
        fontSize: 14,
        borderRadius: 1,
        bgcolor: 'rgb(245, 242, 240)',
        '> pre': { mt: '0 !important' },
      }}>
      <Stack direction="row" alignItems="center" p={0.5} pl={1.5} borderBottom={1} borderColor="grey.200">
        <Box>{language}</Box>
      </Stack>

      <Suspense>
        <Box
          component={ReactSyntaxHighlighter}
          language={match?.[1]}
          {...props}
          sx={{ borderRadius: 1, bgcolor: 'red' }}>
          {String(childrenProps.children).replace(/\n$/, '')}
        </Box>
      </Suspense>
    </Box>
  );
}
