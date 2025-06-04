'use client';

import { Providers as QueryProviders } from '@/shared/providers/Providers';

/**
 * 앱의 모든 Provider를 관리하는 컴포넌트
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProviders>{children}</QueryProviders>;
}
