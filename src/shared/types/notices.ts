/**
 * 공지사항 타입 정의
 */
export interface Notice {
  id: number;
  title: string;
  category: string;
  content: string;
  created_at: string;
  updated_at: string;
  views: number;
  has_attachment?: boolean;
}

/**
 * 공지사항 카테고리 타입 정의
 */
export interface NoticeCategory {
  id: number;
  name: string;
  created_at: string;
}

/**
 * 공지사항 필터 타입 정의
 */
export interface NoticeFilter {
  category?: string;
  search?: string;
}

/**
 * 공지사항 정렬 타입 정의
 */
export type NoticeSortField = 'id' | 'created_at' | 'updated_at' | 'views' | 'title';
export type SortDirection = 'asc' | 'desc';

export interface NoticeSort {
  field: NoticeSortField;
  direction: SortDirection;
}
