export type HeadProps = {
  /** 페이지 제목(사이트명 합치기 전) */
  title?: string;
  /** 페이지 설명 */
  description?: string;
  /** '/slug/' 처럼 path 또는 absolute 모두 가능 (BaseHead에서 절대 URL로 정규화 권장) */
  canonicalUrl?: string;
  /** '/slug/og.png' 또는 absolute */
  ogImage?: string;

  /** 옵션: OG 전용 오버라이드가 필요할 때만 */
  ogTitle?: string;
  ogDescription?: string;
};
