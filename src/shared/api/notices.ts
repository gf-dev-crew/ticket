import { supabase } from '../supabase/client';
import { ApiResponse } from '../types/error';
import { Notice, NoticeCategory, NoticeFilter, NoticeSort } from '../types/notices';

import { api } from './index';

/**
 * 공지사항 API 함수
 */
export const noticesApi = {
  /**
   * 공지사항 목록을 가져옵니다.
   */
  getNotices: async (
    filter?: NoticeFilter,
    sort?: NoticeSort,
    limit?: number,
    range?: [number, number],
  ): Promise<ApiResponse<Notice[]>> => {
    return api.get<Notice[]>('notices', {
      filters: filter,
      sort: sort?.field,
      sortDirection: sort?.direction,
      limit,
      range,
    });
  },

  /**
   * 특정 공지사항을 가져옵니다.
   */
  getNotice: async (id: number): Promise<ApiResponse<Notice>> => {
    try {
      if (!id || isNaN(id)) {
        return {
          data: null,
          error: {
            status: 400,
            message: '유효하지 않은 공지사항 ID입니다',
          },
        };
      }

      const response = await api.get<Notice[]>('notices', {
        filters: { id },
      });

      if (response.error) {
        return {
          data: null,
          error: response.error,
        };
      }

      if (!response.data || response.data.length === 0) {
        return {
          data: null,
          error: {
            status: 404,
            message: '공지사항을 찾을 수 없습니다',
          },
        };
      }

      return {
        data: response.data[0],
        error: null,
      };
    } catch (err) {
      console.error('공지사항 조회 중 오류 발생:', err);
      return {
        data: null,
        error: {
          status: 500,
          message: '공지사항을 조회하는 중 오류가 발생했습니다',
        },
      };
    }
  },

  /**
   * 조회수를 증가시킵니다.
   */
  incrementViews: async (id: number): Promise<ApiResponse<void>> => {
    return api.rpc<void>('increment_view', { notice_id: id });
  },

  /**
   * 공지사항을 생성합니다.
   */
  createNotice: async (
    notice: Omit<Notice, 'id' | 'created_at' | 'updated_at' | 'views'>,
  ): Promise<ApiResponse<Notice>> => {
    return api.post<Notice>('notices', notice);
  },

  /**
   * 공지사항을 수정합니다.
   */
  updateNotice: async (
    id: number,
    notice: Partial<Omit<Notice, 'id' | 'created_at' | 'updated_at' | 'views'>>,
  ): Promise<ApiResponse<Notice>> => {
    return api.put<Notice>('notices', id, {
      ...notice,
      updated_at: new Date().toISOString(),
    });
  },

  /**
   * 공지사항을 삭제합니다.
   */
  deleteNotice: async (id: number): Promise<ApiResponse<Notice>> => {
    return api.delete<Notice>('notices', id);
  },

  /**
   * 카테고리 목록을 가져옵니다.
   */
  getCategories: async (): Promise<ApiResponse<NoticeCategory[]>> => {
    return api.get<NoticeCategory[]>('notice_categories');
  },

  /**
   * 이전 공지사항을 가져옵니다.
   */
  getPreviousNotice: async (id: number): Promise<ApiResponse<Notice | null>> => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .gt('id', id)
        .order('id', { ascending: true })
        .limit(1)
        .single();

      if (error || !data) {
        return { data: null, error: null };
      }

      return { data, error: null };
    } catch (err) {
      console.error('이전 공지사항 조회 중 오류 발생:', err);
      return { data: null, error: null };
    }
  },

  /**
   * 다음 공지사항을 가져옵니다.
   */
  getNextNotice: async (id: number): Promise<ApiResponse<Notice | null>> => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .lt('id', id)
        .order('id', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        return { data: null, error: null };
      }

      return { data, error: null };
    } catch (err) {
      console.error('다음 공지사항 조회 중 오류 발생:', err);
      return { data: null, error: null };
    }
  },
};
