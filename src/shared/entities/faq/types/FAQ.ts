/**
 * FAQ 카테고리 타입
 */
export type FAQCategory = '계정관리' | '결제문의' | '기술지원' | '서비스이용' | '기타';

/**
 * FAQ 상태 타입
 */
export type FAQStatus = 'published' | 'draft';

/**
 * FAQ 기본 타입
 */
export interface FAQ {
  id: number;
  title: string;
  content: string;
  category: FAQCategory;
  status: FAQStatus;
  order: number; // 카테고리 내 정렬 순서
  viewCount: number; // 조회수
  createdAt: string;
  updatedAt: string;
}

/**
 * FAQ 생성 요청 타입
 */
export interface CreateFAQRequest {
  title: string;
  content: string;
  category: FAQCategory;
  status: FAQStatus;
  order?: number;
}

/**
 * FAQ 수정 요청 타입
 */
export interface UpdateFAQRequest {
  id: number;
  title?: string;
  content?: string;
  category?: FAQCategory;
  status?: FAQStatus;
  order?: number;
}

/**
 * FAQ 목록 조회 응답 타입
 */
export interface FAQListResponse {
  items: FAQ[];
  total: number;
}

/**
 * FAQ 카테고리별 그룹 타입
 */
export interface FAQCategoryGroup {
  category: FAQCategory;
  items: FAQ[];
  count: number;
}
