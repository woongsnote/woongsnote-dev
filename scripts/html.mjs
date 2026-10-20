import { parse } from 'parse5';

export function elements(html) {
  const result = [];
  const visit = (node) => {
    if (node.tagName) result.push(node);
    for (const child of node.childNodes ?? []) visit(child);
  };
  visit(parse(html));
  return result;
}

export const attr = (node, name) =>
  node.attrs?.find((a) => a.name === name)?.value;
export const text = (node) =>
  node.nodeName === '#text'
    ? node.value
    : (node.childNodes ?? []).map(text).join('');
