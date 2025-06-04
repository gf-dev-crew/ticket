/**
 * Q&A 상태 타입
 */
export type QAStatus = 'pending' | 'answered';

/**
 * Q&A 기본 타입
 */
export interface QA {
  id: number;
  title: string;
  content: string;
  name: string;
  phone: string; // 휴대전화번호 (01012345678 형식)
  password: string; // 비밀번호 (해시화됨)
  status: QAStatus;
  images?: string[]; // 이미지 URL 배열 (최대 5개)
  answer?: string; // 관리자 답변
  answeredAt?: string; // 답변 일시
  createdAt: string;
  updatedAt: string;
}

/**
 * Q&A 생성 요청 타입
 */
export interface CreateQARequest {
  title: string;
  content: string;
  name: string;
  phone: string;
  password: string;
  images?: File[]; // 업로드할 이미지 파일들
}

/**
 * Q&A 조회 요청 타입 (비밀번호 인증)
 */
export interface QAAuthRequest {
  phone: string;
  password: string;
}

/**
 * Q&A 답변 요청 타입 (관리자용)
 */
export interface AnswerQARequest {
  id: number;
  answer: string;
}

/**
 * Q&A 목록 조회 응답 타입
 */
export interface QAListResponse {
  items: QA[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
