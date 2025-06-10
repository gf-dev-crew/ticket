import { QueryClient } from '@tanstack/react-query';

import { noticesApi } from '@/shared/api/notices';
import { queryKeys } from '@/shared/lib/queryKeys';
import { NoticeFilter, NoticeSort } from '@/shared/types/notices';

/**
 * 최근 공지사항 prefetch
 */
export async function prefetchRecentNotices(queryClient: QueryClient, limit: number = 5) {
  return queryClient.prefetchQuery({
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
    staleTime: 1000 * 60 * 3, // 3분
  });
}

/**
 * 공지사항 목록 prefetch
 */
export async function prefetchNotices(
  queryClient: QueryClient,
  options?: {
    filter?: NoticeFilter;
    sort?: NoticeSort;
    limit?: number;
  },
) {
  const { filter, sort, limit } = options || {};

  return queryClient.prefetchQuery({
    queryKey: queryKeys.notices.list(filter, sort, limit),
    queryFn: async () => {
      const response = await noticesApi.getNotices(filter, sort, limit);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data || [];
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
}

/**
 * 특정 공지사항 prefetch
 */
export async function prefetchNotice(queryClient: QueryClient, id: number) {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.notices.detail(id),
    queryFn: async () => {
      const response = await noticesApi.getNotice(id);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10분
  });
}
