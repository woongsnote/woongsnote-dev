type SocialLink = {
  name: string;
  url: string;
  svg: string;
};

type NavLink = {
  name: string;
  url: string;
};

type SiteConfig = {
  site: {
    title: string;
    base_url: string;
    base_path: string;
    favicon: string;
    logo: string;
    lang: string;
    description: string;
    pageSize: number;
  };
  features: {
    dark_mode: boolean;
  };
  metadata: {
    meta_author: string;
    meta_title: string;
    meta_description: string;
  };
  author: {
    name: string;
    bio: string;
    tech: string;
  };
  theme: {
    defaultTheme: string;
  };
  socialLinks: SocialLink[];

  navLinks: NavLink[];
};

const username = 'woongsnote';

const siteConfig: SiteConfig = {
  site: {
    title: 'Woongsnote',
    base_url: 'https://www.woongsnote.dev',
    base_path: '/',
    favicon: '/favicon.svg',
    logo: '/logo.png',
    lang: 'kr',
    description: 'tech blog by woongsnote',
    pageSize: 5,
  },
  features: {
    dark_mode: true,
  },
  metadata: {
    meta_author: `${username}`,
    meta_title: 'www.woongsnote.dev',
    meta_description:
      '개발 관련 학습한 지식과 구현한 프로젝트들을 기록하기 위한 공간입니다.',
  },
  author: {
    name: `@${username}`,
    bio: `안녕하세요. 개발자 문지웅입니다.
    새로운 기술을 학습하는 것을 즐기고, 아이디어를 시각적으로 구현하는 것을 좋아합니다.`,
    tech: 'React, Next.js, TypeScript',
  },
  theme: {
    defaultTheme: 'light',
  },
  navLinks: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Blog',
      url: '/blog',
    },
  ],
  socialLinks: [
    {
      name: 'github',
      url: `https://www.github.com/${username}`,
      svg: '<svg class= "w-6 h-6 cursor-pointer text-gray-400 hover:text-accent fill-current hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>GitHub</title><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>',
    },
    {
      name: 'instagram',
      url: `https://www.instagram.com/${username}`,
      svg: '<svg class= "w-6 h-6 cursor-pointer text-gray-400 hover:text-accent fill-current hover:scale-110" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path></svg>',
    },
    {
      name: 'linkedin',
      url: `https://www.linkedin.com/in/${username}`,
      svg: '<svg class= "w-6 h-6 cursor-pointer text-gray-400 hover:text-accent fill-current hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>Linkedin</title><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>',
    },
  ],
};

export default siteConfig;
