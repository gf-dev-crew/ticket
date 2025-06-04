import { supabase } from '../supabase/client';
import { handleSupabaseError } from '../supabase/error-handler';
import { ApiError, ApiResponse } from '../types/error';

/**
 * API 요청을 래핑하는 유틸리티 함수
 * @param fetcher API 요청 함수
 * @returns 표준화된 API 응답
 */
export async function apiRequest<T>(fetcher: () => Promise<any>): Promise<ApiResponse<T>> {
  try {
    const response = await fetcher();

    // response가 undefined인 경우 처리
    if (!response) {
      return {
        data: null,
        error: {
          status: 500,
          message: '서버로부터 응답을 받지 못했습니다',
        },
      };
    }

    const { data, error } = response;

    if (error) {
      return {
        data: null,
        error: handleSupabaseError(error),
      };
    }

    return {
      data,
      error: null,
    };
  } catch (error: any) {
    console.error('API 요청 실패:', error);
    return {
      data: null,
      error: handleSupabaseError(error),
    };
  }
}

/**
 * 기본 API 객체
 */
export const api = {
  supabase,

  /**
   * GET 요청 수행
   */
  get: async <T>(table: string, options?: any): Promise<ApiResponse<T>> => {
    let query = supabase.from(table).select('*');

    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value);
        }
      });
    }

    if (options?.search && options?.searchColumn) {
      query = query.ilike(options.searchColumn, `%${options.search}%`);
    }

    // 사용자 정의 필터 추가
    if (options?.custom) {
      query = query.or(options.custom);
    }

    if (options?.sort && options?.sortDirection) {
      query = query.order(options.sort, { ascending: options.sortDirection === 'asc' });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.range) {
      const [from, to] = options.range;
      query = query.range(from, to);
    }

    // 타입 캐스팅을 통해 Supabase 쿼리 빌더 타입 이슈 해결
    return apiRequest<T>(async () => await query);
  },

  /**
   * POST 요청 수행
   */
  post: async <T>(table: string, data: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>(async () => await supabase.from(table).insert(data).select().single());
  },

  /**
   * PUT 요청 수행
   */
  put: async <T>(table: string, id: number | string, data: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>(
      async () => await supabase.from(table).update(data).eq('id', id).select().single(),
    );
  },

  /**
   * DELETE 요청 수행
   */
  delete: async <T>(table: string, id: number | string): Promise<ApiResponse<T>> => {
    return apiRequest<T>(
      async () => await supabase.from(table).delete().eq('id', id).select().single(),
    );
  },

  /**
   * RPC 호출 수행
   */
  rpc: async <T>(functionName: string, params?: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>(async () => await supabase.rpc(functionName, params));
  },
};
