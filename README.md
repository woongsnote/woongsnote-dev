# woongsnote

A Korean personal blog for documenting development, projects, and lessons learned.

[Visit Blog](https://www.woongsnote.dev)

## Overview

woongsnote is a personal blog built to organize and share what I learn through development and personal projects.

It focuses on a minimal reading experience, static-first performance, and a maintainable content workflow using Markdown and Astro Content Collections.

## Features

* Static site generation with Astro
* Markdown-based post management with a type-safe content schema
* Full-text search powered by Pagefind
* Light and dark themes
* Reading time and syntax highlighting for code blocks
* SEO metadata, sitemap, RSS, and dynamic Open Graph images
* Giscus-powered comments

## Tech Stack

Astro · TypeScript · Tailwind CSS · Pagefind · Giscus · Vercel

## Local Development

### Prerequisites

* Node.js 24
* npm

```bash
git clone https://github.com/woongsnote/woongsnote-dev.git
cd woongsnote-dev
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Technical Highlights

* Type-safe Markdown content management with Astro Content Collections
* Static full-text search without an external search service
* Dynamic Open Graph image generation for individual posts

## History

The blog was originally built with Next.js and later migrated to Astro for a simpler content workflow and a more static-first architecture.

## Author

**Jiwoong Moon**

* Blog: [woongsnote.dev](https://www.woongsnote.dev)
* GitHub: [@woongsnote](https://github.com/woongsnote)
