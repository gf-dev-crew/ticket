/**
 * 날짜 문자열을 한국 형식으로 포맷합니다
 * @param dateString - 포맷할 날짜 문자열
 * @returns 포맷된 날짜 문자열 (YYYY.MM.DD 형식)
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * 날짜 문자열을 한국 형식으로 포맷합니다 (시간 포함)
 * @param dateString - 포맷할 날짜 문자열
 * @returns 포맷된 날짜 문자열 (YYYY.MM.DD HH:MM 형식)
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
