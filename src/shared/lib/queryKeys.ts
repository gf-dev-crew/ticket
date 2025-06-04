/**
 * TanStack Query 쿼리 키 관리
 * 모든 쿼리 키를 중앙에서 관리하여 타입 안전성과 일관성을 보장
 */
import { NoticeFilter, NoticeSort } from '@/shared/types/notices';

export const queryKeys = {
  // 공지사항 관련 쿼리 키
  notices: {
    all: ['notices'] as const,
    lists: () => [...queryKeys.notices.all, 'list'] as const,
    list: (filter?: NoticeFilter, sort?: NoticeSort, limit?: number) =>
      [...queryKeys.notices.lists(), { filter, sort, limit }] as const,
    details: () => [...queryKeys.notices.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.notices.details(), id] as const,
    recent: (limit: number = 5) => [...queryKeys.notices.all, 'recent', limit] as const,
  },

  // 공지사항 카테고리 관련 쿼리 키
  noticeCategories: {
    all: ['noticeCategories'] as const,
    lists: () => [...queryKeys.noticeCategories.all, 'list'] as const,
  },
} as const;

/**
 * 쿼리 키 타입 추출 유틸리티
 */
export type QueryKeys = typeof queryKeys;
