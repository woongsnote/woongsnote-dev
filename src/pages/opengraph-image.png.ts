import type { APIRoute } from 'astro';
import { BRAND_DOMAIN, siteConfig } from '@/config';
import { OG, renderOgResponse } from '@/lib/og';

export const GET: APIRoute = () =>
  renderOgResponse({
    top: {
      type: 'div',
      props: {
        style: { display: 'flex', fontSize: '20px', color: OG.fgMuted },
        children: BRAND_DOMAIN,
      },
    },
    middle: {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: '24px' },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '96px',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: OG.fg,
              },
              children: siteConfig.name,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '28px',
                lineHeight: 1.4,
                color: OG.fgMuted,
                maxWidth: '880px',
                wordBreak: 'keep-all',
              },
              children: siteConfig.description,
            },
          },
        ],
      },
    },
    bottom: {
      type: 'div',
      props: { style: { display: 'flex', height: '20px' } },
    },
  });
