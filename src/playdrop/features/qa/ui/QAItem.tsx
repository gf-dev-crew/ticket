'use client';

import type { QA } from '@/shared/entities/qa/types/QA';
import { QAStatusBadge } from '@/shared/entities/qa/ui/QAStatusBadge';

interface QAItemProps {
  qa: QA;
  showFullName?: boolean;
}

export function QAItem({ qa, showFullName = false }: QAItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const displayName = showFullName ? qa.name : qa.name;

  return (
    <div className='overflow-hidden rounded-lg border bg-white'>
      {/* 문의 헤더 */}
      <div className='border-b bg-gray-50 px-6 py-4'>
        <div className='mb-2 flex items-start justify-between'>
          <h2 className='mr-4 flex-1 text-xl font-semibold text-gray-900'>{qa.title}</h2>
          <QAStatusBadge status={qa.status} />
        </div>

        <div className='flex items-center justify-between text-sm text-gray-600'>
          <span>작성자: {displayName}</span>
          <span>작성일: {formatDate(qa.createdAt)}</span>
        </div>

        {showFullName && <div className='mt-1 text-sm text-gray-600'>연락처: {qa.phone}</div>}
      </div>

      {/* 문의 내용 */}
      <div className='px-6 py-4'>
        <h3 className='mb-2 text-sm font-medium text-gray-700'>문의 내용</h3>
        <div className='leading-relaxed whitespace-pre-wrap text-gray-900'>{qa.content}</div>

        {/* 첨부 이미지 */}
        {qa.images && qa.images.length > 0 && (
          <div className='mt-4'>
            <h4 className='mb-2 text-sm font-medium text-gray-700'>첨부 이미지</h4>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {qa.images.map((imageUrl, index) => (
                <div key={index} className='relative'>
                  <img
                    src={imageUrl}
                    alt={`첨부 이미지 ${index + 1}`}
                    className='h-24 w-full rounded-lg border object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 답변 */}
      {qa.status === 'answered' && qa.answer && (
        <div className='border-t bg-blue-50 px-6 py-4'>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-sm font-medium text-blue-900'>관리자 답변</h3>
            {qa.answeredAt && (
              <span className='text-xs text-blue-600'>답변일: {formatDate(qa.answeredAt)}</span>
            )}
          </div>
          <div className='leading-relaxed whitespace-pre-wrap text-blue-900'>{qa.answer}</div>
        </div>
      )}

      {/* 답변 대기 상태 */}
      {qa.status === 'pending' && (
        <div className='border-t bg-yellow-50 px-6 py-4'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <svg className='h-5 w-5 text-yellow-400' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <p className='text-sm text-yellow-800'>
                답변을 준비 중입니다. 빠른 시간 내에 답변드리겠습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
