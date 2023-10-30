'use client';

import Giscus from '@giscus/react';

export const Comments = () => {
  return (
    <Giscus
      id="comments"
      repo="woongsnote/woongsnote-dev"
      repoId="R_kgDOIZVQXA"
      category="Comments"
      categoryId="DIC_kwDOIZVQXM4Caihi"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark_dimmed"
      lang="ko"
      loading="lazy"
    />
  );
};
