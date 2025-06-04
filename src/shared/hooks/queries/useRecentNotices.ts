import { useQuery } from '@tanstack/react-query';

import { noticesApi } from '@/shared/api/notices';
import { queryKeys } from '@/shared/lib/queryKeys';

interface UseRecentNoticesOptions {
  limit?: number;
  enabled?: boolean;
}

/**
 * 최근 공지사항을 조회하는 훅 (메인페이지용)
 *
 * 에러 처리는 다음 방법들을 사용하세요:
 * 1. 컴포넌트에서 error 상태 체크
 * 2. 전역 QueryCache의 onError 사용 (이미 설정됨)
 * 3. useEffect + error 상태로 특별한 처리
 */
export function useRecentNotices(options: UseRecentNoticesOptions = {}) {
  const { limit = 5, enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.notices.recent(limit),
    queryFn: async () => {
      const response = await noticesApi.getNotices(
        undefined, // filter
        { field: 'created_at', direction: 'desc' }, // sort
        limit,
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data || [];
    },
    enabled,
    staleTime: 1000 * 60 * 3, // 3분 (메인페이지는 좀 더 자주 업데이트)
  });
}
