import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import {
  fileGenerator,
  remarkDocGen,
  remarkInstall,
  typescriptGenerator,
} from 'fumadocs-docgen';
import createMDX from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';
import rehypeKatex from 'rehype-katex';

const withMDX = createMDX({
  mdxOptions: {
    rehypeCodeOptions: {
      transformers: [
        ...rehypeCodeDefaultOptions.transformers,
        transformerTwoslash(),
        {
          name: 'fumadocs:remove-escape',
          code(element) {
            element.children.forEach((line) => {
              if (line.type !== 'element') return;

              line.children.forEach((child) => {
                if (child.type !== 'element') return;
                const textNode = child.children[0];
                if (!textNode || textNode.type !== 'text') return;

                textNode.value = textNode.value.replace(/\[\\!code/g, '[!code');
              });
            });

            return element;
          },
        },
      ],
    },
    lastModifiedTime: 'git',
    remarkPlugins: [
      [remarkInstall, { Tabs: 'InstallTabs' }],
      [remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withMDX(config);
