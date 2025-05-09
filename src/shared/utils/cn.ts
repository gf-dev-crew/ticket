import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 여러 Tailwind CSS 클래스를 조건부로 결합하는 유틸리티 함수
 * clsx와 tailwind-merge를 사용하여 클래스명 충돌을 방지하고 조건부 스타일링을 지원합니다.
 *
 * @param inputs - 결합할 클래스명들 (문자열, 객체, 배열 등 가능)
 * @returns 병합된 클래스명 문자열
 *
 * @example
 * // 기본 사용법
 * cn('text-red-500', 'bg-blue-500');
 *
 * // 조건부 클래스 적용
 * cn('text-sm', isLarge && 'text-lg');
 *
 * // 객체 형태로 조건부 클래스 적용
 * cn('rounded', { 'bg-red-500': isError, 'bg-green-500': isSuccess });
 */

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
