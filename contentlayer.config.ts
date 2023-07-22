import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypePrettyCode from 'rehype-pretty-code';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blogs/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}));

const Tag = defineNestedType(() => ({
  name: 'Tag',
  fields: {
    title: { type: 'string', required: true },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the project',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the project',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the project',
      required: true,
    },
    coverImage: {
      type: 'string',
      description: 'The coverImage of the project',
      required: true,
    },
    tags: {
      type: 'list',
      description: 'The tags of the project',
      of: Tag,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}));

const options = {
  theme: 'dracula-soft',
};

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options], rehypeHighlight],
  },
});
