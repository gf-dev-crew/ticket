import { ApiError } from '../types/error';

/**
 * Supabase 에러를 처리하고 표준화된 ApiError 형식으로 반환하는 함수
 * @param error Supabase 에러 객체
 */
export function handleSupabaseError(error: any): ApiError {
  console.error('Supabase 에러:', error);

  // 에러가 비어있거나 정의되지 않은 경우
  if (!error || Object.keys(error).length === 0) {
    return {
      status: 500,
      message: '알 수 없는 오류가 발생했습니다',
    };
  }

  return {
    status: error.status || (error.code === 'PGRST116' ? 404 : 500),
    message: error.message || error.error_description || '알 수 없는 오류가 발생했습니다',
    code: error.code,
    details: error.details,
  };
}

/**
 * 에러 상황에 따른 사용자 친화적인 메시지를 반환합니다.
 */
export function getFriendlyErrorMessage(error: ApiError): string {
  switch (error.status) {
    case 401:
      return '로그인이 필요합니다';
    case 403:
      return '접근 권한이 없습니다';
    case 404:
      return '요청하신 정보를 찾을 수 없습니다';
    case 429:
      return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요';
    case 500:
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요';
    default:
      return error.message || '오류가 발생했습니다';
  }
}
