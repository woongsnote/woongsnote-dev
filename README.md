# woongsnote

A Korean personal blog for documenting development, projects, and lessons learned.

[Live Site](https://www.woongsnote.dev) · [Repository](https://github.com/woongsnote/woongsnote-dev)

## Overview

woongsnote is a personal blog built to organize and share what I learn through development and personal projects.

The blog focuses on a minimal reading experience, static-first performance, and a maintainable content workflow using Markdown and Astro Content Collections.

## Features

* Static site generation with Astro
* Markdown-based post management
* Type-safe content schema
* Full-text search powered by Pagefind
* Light and dark themes
* Responsive layout
* Reading time calculation
* Syntax highlighting for code blocks
* Automatically generated Open Graph images
* SEO metadata and structured page titles
* RSS feed and sitemap
* Giscus-powered comments
* Accessible keyboard navigation
* Deployed with Vercel

## Tech Stack

* [Astro](https://astro.build)
* [TypeScript](https://www.typescriptlang.org)
* [Tailwind CSS](https://tailwindcss.com)
* [DaisyUI](https://daisyui.com)
* [Pagefind](https://pagefind.app)
* [rehype-pretty-code](https://github.com/atomiks/rehype-pretty-code)
* [Satori](https://github.com/vercel/satori)
* [Sharp](https://sharp.pixelplumbing.com)
* [Giscus](https://giscus.app)
* [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

* Node.js 24
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/woongsnote/woongsnote-dev.git
```

Move into the project directory:

```bash
cd woongsnote-dev
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:4321` in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Runs Astro checks, builds the static site, and generates the Pagefind search index.

```bash
npm run preview
```

Previews the production build locally.

## Project Structure

```text
woongsnote-dev/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── content/
│   │   └── posts/
│   ├── icons/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   └── content.config.ts
├── astro.config.ts
├── remark-reading-time.mjs
├── package.json
└── tsconfig.json
```

## Writing a Post

Create a Markdown file inside:

```text
src/content/posts/
```

Example frontmatter:

```yaml
---
title: Post title
description: Short description of the post
publishedDate: 2026-01-01
category: Tech
tags:
  - Astro
  - TypeScript
author: Jiwoong Moon
---
```

Available categories:

* `Diary`
* `Tech`
* `Project`

## Technical Highlights

### Static-first architecture

The blog is generated as a static site with Astro, keeping the client-side JavaScript footprint small while providing fast navigation and content delivery.

### Content-driven structure

Posts are managed through Astro Content Collections with a typed schema, making frontmatter validation and content organization more predictable.

### Static search

Pagefind creates the search index after the Astro build, allowing full-text search without a separate server or external search service.

### Theme handling

The light and dark themes are implemented without a client framework and remain synchronized across page transitions.

### SEO and social previews

Each page includes SEO metadata, while post-specific Open Graph images are generated from content data.

## History

The blog was originally built with Next.js and later migrated to Astro for a simpler content workflow and a more static-first architecture.

## Author

**Jiwoong Moon**

* Blog: [woongsnote.dev](https://www.woongsnote.dev)
* GitHub: [@woongsnote](https://github.com/woongsnote)
* LinkedIn: [Jiwoong Moon](https://www.linkedin.com/in/woongsnote)
