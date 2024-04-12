import Giscus from '@giscus/react';
import { useState, useEffect } from 'react';

const id = 'inject-comments';

const Comments = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id={id}>
      {mounted ? (
        <Giscus
          id="comments"
          repo="woongsnote/woongsnote-dev"
          repoId="R_kgDOIZVQXA"
          category="Comments"
          categoryId="DIC_kwDOIZVQXM4Caihi"
          mapping="url"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="dark_tritanopia"
          lang="en"
          loading="lazy"
        />
      ) : null}
    </div>
  );
};

export default Comments;
