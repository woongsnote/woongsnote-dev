import { format } from 'date-fns';
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

/**
 * 홈용 날짜 표시
 * 날짜를 "YY. MM. DD" 형식으로 변환
 * @param date Date 객체
 * @returns "26. 01. 25" 같은 문자열
 */
export const fmtHomeDateShort = (date: Date) => {
  return format(date, 'yy.MM.dd');
};
