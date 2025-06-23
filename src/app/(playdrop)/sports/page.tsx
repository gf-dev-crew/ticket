import { SportsPage as SportsFeature } from '@/playdrop/features/sports';

/**
 * 스포츠 페이지 - playdrop/features/sports로 위임
 * App Router의 페이지는 최대한 얇게 유지하고 실제 로직은 feature layer에서 처리
 */

export default function SportsPage() {
  return <SportsFeature />;
}
