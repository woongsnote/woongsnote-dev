import Giscus from '@giscus/react';
import { useState, useEffect } from 'react';

const Comments = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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

export default Comments;
