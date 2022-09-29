import PostLayout from '@xmark/theme-docs/layouts/PostLayout';
import { InjectProvider, useInjectContext } from 'virtual:context';
import { findByName } from '../lib/templates';

export default function TemplatePage(props) {
  const injectContextValue = useInjectContext();
  const { page, useLocaleContext } = injectContextValue;
  const { locale = 'en' } = useLocaleContext() || {};
  const templateName = page.frontmatter.template;
  const template = findByName(templateName);
  console.log(444, page)
  const newInjectContextValue = {
    ...injectContextValue,
    page: {
      ...page,
      frontmatter: {
        ...page.frontmatter,
        title: template.displayName,
        description: template.desc[locale],
      }
    }
  }
  return (
    <InjectProvider value={newInjectContextValue}>
      <PostLayout {...props} />
    </InjectProvider>
  );
}