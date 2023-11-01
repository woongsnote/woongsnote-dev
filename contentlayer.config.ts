import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string', required: true },
    imgUrl: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    isPublished: { type: 'boolean', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `${post._raw.flattenedPath.split('/')[1]}`,
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw).text.split(' ')[0],
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [[remarkGfm, { singleTilde: false }]],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          options: {
            theme: 'material-theme',
            defaultLang: 'plaintext',
          },
        },
      ],
    ],
  },
});
