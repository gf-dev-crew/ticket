'use client';

import { useEffect, useState } from 'react';

import type { QA } from '@/shared/entities/qa/types/QA';
import { QAStatusBadge } from '@/shared/entities/qa/ui/QAStatusBadge';

import { QAItem } from './QAItem';

interface QAListProps {
  phone: string;
}

// 임시 샘플 데이터
const sampleQAs: QA[] = [
  {
    id: 1,
    title: '로그인이 안 됩니다',
    content: '계정 로그인 시 오류가 발생합니다. 도움이 필요합니다.',
    name: '김철수',
    phone: '01012345678',
    password: 'hashed_password',
    status: 'answered',
    answer: '안녕하세요. 비밀번호 재설정을 통해 해결하실 수 있습니다.',
    answeredAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    title: '결제 관련 문의',
    content: '결제가 완료되었는데 서비스가 활성화되지 않았습니다.',
    name: '김철수',
    phone: '01012345678',
    password: 'hashed_password',
    status: 'pending',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-16T09:15:00Z',
  },
];

export function QAList({ phone }: QAListProps) {
  const [qaList, setQAList] = useState<QA[]>([]);
  const [selectedQA, setSelectedQA] = useState<QA | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQAList = async () => {
      setIsLoading(true);
      try {
        // TODO: API 호출 구현
        // 임시로 샘플 데이터 사용
        const filteredQAs = sampleQAs.filter((qa) => qa.phone === phone);
        setQAList(filteredQAs);
      } catch (error) {
        console.error('Q&A 목록 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQAList();
  }, [phone]);

  const maskName = (name: string) => {
    if (name.length === 2) {
      return name[0] + '*';
    } else if (name.length === 3) {
      return name[0] + '*' + name[2];
    } else if (name.length >= 4) {
      return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    }
    return name;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-500'>문의 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (qaList.length === 0) {
    return (
      <div className='py-8 text-center'>
        <div className='mb-2 text-gray-500'>등록된 문의가 없습니다.</div>
        <p className='text-sm text-gray-400'>새로운 문의를 작성해 보세요.</p>
      </div>
    );
  }

  if (selectedQA) {
    return (
      <div>
        <button
          type='button'
          onClick={() => setSelectedQA(null)}
          className='mb-4 text-sm text-gray-500 hover:text-gray-700'
        >
          ← 목록으로 돌아가기
        </button>
        <QAItem qa={selectedQA} showFullName />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {qaList.map((qa) => (
        <div
          key={qa.id}
          className='cursor-pointer rounded-lg border bg-white p-4 transition-shadow hover:shadow-md'
          onClick={() => setSelectedQA(qa)}
        >
          <div className='mb-2 flex items-start justify-between'>
            <h3 className='mr-4 flex-1 font-medium text-gray-900'>{qa.title}</h3>
            <QAStatusBadge status={qa.status} />
          </div>

          <div className='mb-3 line-clamp-2 text-sm text-gray-600'>{qa.content}</div>

          <div className='flex items-center justify-between text-xs text-gray-500'>
            <span>작성자: {maskName(qa.name)}</span>
            <span>{formatDate(qa.createdAt)}</span>
          </div>

          {qa.status === 'answered' && qa.answeredAt && (
            <div className='mt-2 text-xs text-green-600'>
              답변 완료: {formatDate(qa.answeredAt)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
