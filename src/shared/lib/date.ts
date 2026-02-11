/**
 * 날짜를 "YYYY. MM. DD" 형식으로 변환
 * @param date Date 객체
 * @returns "2026. 01. 25" 같은 문자열
 */
export const formatDate = (date: Date | string | number): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 2자리 월
  const day = String(d.getDate()).padStart(2, '0'); // 2자리 일

  return `${year}. ${month}. ${day}`;
};
// ✅ 홈용 날짜(연도 포함) 예: 24.08.02
export const fmtHomeDate = (d: Date) =>
  new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })
    .format(d)
    .replaceAll('. ', '.')
    .replace(/\.$/, '') // 끝에 '.' 제거
    .trim();
// ✅ 더 미니멀한 버전(연도 제외) 예: 08.02 (원하면 교체)
export const fmtHomeDateShort = (d: Date) =>
  new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
  })
    .format(d)
    .replaceAll('. ', '-')
    .replace('.', '');
