import { useQuery } from '@tanstack/react-query';

import { noticesApi } from '@/shared/api/notices';
import { queryKeys } from '@/shared/lib/queryKeys';

interface UseNoticeOptions {
  enabled?: boolean;
}

/**
 * 단일 공지사항을 조회하는 훅
 */
export function useNotice(id: number, options: UseNoticeOptions = {}) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.notices.detail(id),
    queryFn: async () => {
      const response = await noticesApi.getNotice(id);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 10, // 10분 (상세 페이지는 덜 자주 변경됨)
  });
}
