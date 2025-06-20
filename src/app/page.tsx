import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { prefetchRecentNotices } from '@/shared/entities/notice';
import { CTASection, HeroSection, RecentNotice } from '@/shared/features/home';

export default async function Home() {
  /* 공지사항 최근 5개 데이터 prefetch */
  const queryClient = new QueryClient();
  await prefetchRecentNotices(queryClient, 5);

  return (
    <main className='gap-5xl flex flex-col'>
      <HeroSection />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecentNotice />
      </HydrationBoundary>
      <CTASection />
    </main>
  );
}
