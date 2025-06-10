import { QueryClient } from '@tanstack/react-query';

// import { qaApi } from '@/shared/api/qa';
// import { queryKeys } from '@/shared/lib/queryKeys';

/**
 * Q&A 목록 prefetch
 * TODO: qaApi와 queryKeys가 구현되면 활성화
 */
export async function prefetchQAs(queryClient: QueryClient, options?: { limit?: number }) {
  // const { limit = 10 } = options || {};

  // return queryClient.prefetchQuery({
  //   queryKey: queryKeys.qa.list(limit),
  //   queryFn: async () => {
  //     const response = await qaApi.getQAs({ limit });
  //     if (response.error) {
  //       throw new Error(response.error.message);
  //     }
  //     return response.data || [];
  //   },
  //   staleTime: 1000 * 60 * 5, // 5분
  // });

  console.log('QA prefetch - TODO: Implement when qaApi is ready');
  return Promise.resolve();
}

/**
 * 특정 Q&A prefetch
 * TODO: qaApi와 queryKeys가 구현되면 활성화
 */
export async function prefetchQA(queryClient: QueryClient, id: number) {
  // return queryClient.prefetchQuery({
  //   queryKey: queryKeys.qa.detail(id),
  //   queryFn: async () => {
  //     const response = await qaApi.getQA(id);
  //     if (response.error) {
  //       throw new Error(response.error.message);
  //     }
  //     return response.data;
  //   },
  //   staleTime: 1000 * 60 * 10, // 10분
  // });

  console.log(`QA prefetch for id ${id} - TODO: Implement when qaApi is ready`);
  return Promise.resolve();
}
