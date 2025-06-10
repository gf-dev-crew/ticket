import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { prefetchRecentNotices } from '@/shared/entities/notice';
import { HeroSection, ProductSection, RecentNotice } from '@/shared/features/home';

export default async function Home() {
  /* 공지사항 최근 5개 데이터 prefetch */
  const queryClient = new QueryClient();
  await prefetchRecentNotices(queryClient, 5);

  return (
    <main>
      <HeroSection />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecentNotice />
      </HydrationBoundary>
      <ProductSection />
    </main>
  );
}
