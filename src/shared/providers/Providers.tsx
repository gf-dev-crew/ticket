import { useState } from 'react';

import {
  DehydratedState,
  HydrationBoundary,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getFriendlyErrorMessage } from '../supabase/error-handler';
import { ApiError } from '../types/error';

interface ProvidersProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}

export function Providers({ children, dehydratedState }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: any, query) => {
            // 이미 개별 쿼리에서 에러가 처리된 경우 스킵
            if (query.state.data !== undefined) return;

            // 에러를 ApiError 타입으로 변환
            const apiError = error as ApiError;

            // 공통 에러 처리 로직
            console.error('쿼리 에러:', apiError);

            // 에러 상태에 따른 처리
            switch (apiError.status) {
              case 401:
                // 인증 오류 처리 (로그인 페이지로 리다이렉트 등)
                console.error('인증이 필요합니다.');
                break;
              case 403:
                // 권한 오류 처리
                console.error('접근 권한이 없습니다.');
                break;
              default:
                // 기타 오류 처리
                console.error(getFriendlyErrorMessage(apiError));
                break;
            }
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5분
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: 1,
          },
          mutations: {
            retry: false,
            onError: (error: any) => {
              // 에러를 ApiError 타입으로 변환
              const apiError = error as ApiError;
              console.error('뮤테이션 에러:', apiError);
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <ToastContainer
          transition={Slide}
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          theme='light'
          limit={3}
          role='alert'
        />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
