'use client';

import { ReactNode } from 'react';

interface DataListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  className?: string;
  isLoading?: boolean;
}

/**
 * 재사용 가능한 데이터 목록 컴포넌트
 */
export function DataList<T>({
  data,
  renderItem,
  keyExtractor,
  emptyMessage = '데이터가 없습니다.',
  className = '',
  isLoading = false,
}: DataListProps<T>) {
  if (isLoading) {
    return <div className={`py-xl text-center text-gray-500 ${className}`}>로딩 중...</div>;
  }

  if (data.length === 0) {
    return (
      <div
        className={`flex h-[300px] items-center justify-center text-center text-gray-500 ${className}`}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {data.map((item, index) => (
        <div key={keyExtractor(item)}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}
