import { memo } from "react";

const Utterance = () => {
  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElement = document.createElement("script");
        scriptElement.src = "https://utteranc.es/client.js";
        scriptElement.async = true;
        scriptElement.setAttribute("repo", "woongsnote/my-tech-blog");
        scriptElement.setAttribute("issue-term", "pathname");
        scriptElement.setAttribute("theme", "preferred-color-scheme");
        scriptElement.crossOrigin = "anonymous";
        elem.appendChild(scriptElement);
      }}
    />
  );
};

export default memo(Utterance);
