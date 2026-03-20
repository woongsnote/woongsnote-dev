// ── pagefind-integration.ts ─────────────────────────
// Astro 6 통합: 빌드 후 Pagefind 인덱스를 자동 생성
//
// 사용법: astro.config.ts 의 integrations 배열에 추가
//   import pagefindIntegration from "./integrations/pagefind";
//   integrations: [pagefindIntegration()]

import { execSync } from 'node:child_process';
import type { AstroIntegration } from 'astro';

export default function pagefindIntegration(): AstroIntegration {
  return {
    name: 'pagefind',
    hooks: {
      'astro:build:done': ({ logger }) => {
        const startTime = performance.now();
        logger.info('Pagefind 인덱스 생성 중...');

        try {
          execSync('npx pagefind --site dist --output-subdir pagefind', {
            stdio: 'inherit',
          });
          const elapsed = (performance.now() - startTime).toFixed(0);
          logger.info(`Pagefind 인덱스 생성 완료 (${elapsed}ms)`);
        } catch (error) {
          logger.error('Pagefind 인덱스 생성 실패');
          throw error;
        }
      },
    },
  };
}
