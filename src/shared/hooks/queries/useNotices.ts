import { useQuery } from '@tanstack/react-query';

import { noticesApi } from '@/shared/api/notices';
import { queryKeys } from '@/shared/lib/queryKeys';
import { Notice, NoticeFilter, NoticeSort } from '@/shared/types/notices';

interface UseNoticesOptions {
  filter?: NoticeFilter;
  sort?: NoticeSort;
  limit?: number;
  range?: [number, number];
  enabled?: boolean;
}

/**
 * 공지사항 목록을 조회하는 훅
 */
export function useNotices(options: UseNoticesOptions = {}) {
  const { filter, sort, limit, range, enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.notices.list(filter, sort, limit),
    queryFn: async () => {
      const response = await noticesApi.getNotices(filter, sort, limit, range);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data || [];
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5분
  });
}
