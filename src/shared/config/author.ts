export const AUTHOR = {
  name: '문지웅',
  nickname: 'woongsnote',

  bio: '학습한 새로운 기술과 지식으로 아이디어를 시각적으로 구현하는 것을 좋아합니다.',

  tech: ['Astro', 'React', 'Next.js', 'TypeScript'],
} as const;

export type Author = typeof AUTHOR;
