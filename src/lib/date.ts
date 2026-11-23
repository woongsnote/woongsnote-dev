/**
 * 날짜를 "YYYY. MM. DD" 또는 "MM.DD" 형식으로 변환
 */
export const formatDate = (
  date: Date | string | number,
  format: 'full' | 'month-day' = 'full'
): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 2자리 월
  const day = String(d.getDate()).padStart(2, '0'); // 2자리 일

  return format === 'month-day'
    ? `${month}.${day}`
    : `${year}. ${month}. ${day}`;
};
