/**
 * 공지사항 기본 타입
 */
export interface Notice {
  id: number;
  title: string;
  content: string;
  isPinned: boolean; // 상단 고정 여부
  pinnedOrder?: number; // 고정 순서 (1-3)
  images?: string[]; // 이미지 URL 배열 (최대 5개)
  viewCount: number; // 조회수
  createdAt: string;
  updatedAt: string;
}

/**
 * 공지사항 생성 요청 타입
 */
export interface CreateNoticeRequest {
  title: string;
  content: string;
  isPinned?: boolean;
  pinnedOrder?: number;
  images?: File[]; // 업로드할 이미지 파일들
}

/**
 * 공지사항 수정 요청 타입
 */
export interface UpdateNoticeRequest {
  id: number;
  title?: string;
  content?: string;
  isPinned?: boolean;
  pinnedOrder?: number;
  images?: File[];
}

/**
 * 공지사항 목록 조회 응답 타입
 */
export interface NoticeListResponse {
  items: Notice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * 메인페이지용 최근 공지사항 타입
 */
export interface RecentNotice {
  id: number;
  title: string;
  createdAt: string;
}
