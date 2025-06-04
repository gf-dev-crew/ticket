import { HeroSection, ProductSection, RecentNotice } from '@/shared/features/home';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RecentNotice />
      <ProductSection />
    </main>
  );
}
