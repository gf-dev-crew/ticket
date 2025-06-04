'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * 재사용 가능한 페이지네이션 컴포넌트
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`my-xl flex justify-center ${className}`}>
      <nav className='space-x-sm flex items-center'>
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`h-2xl flex w-2xl cursor-pointer items-center justify-center rounded-full ${
            currentPage === 1
              ? 'cursor-not-allowed text-gray-100'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label='이전 페이지'
        >
          <span className='sr-only'>이전</span>
          <svg className='h-xl w-xl' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`h-2xl flex w-2xl cursor-pointer items-center justify-center rounded-full text-xl ${
              currentPage === index + 1 ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label={`${index + 1}페이지`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`h-2xl flex w-2xl cursor-pointer items-center justify-center rounded-full ${
            currentPage === totalPages
              ? 'cursor-not-allowed text-gray-100'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label='다음 페이지'
        >
          <span className='sr-only'>다음</span>
          <svg className='h-xl w-xl' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
          </svg>
        </button>
      </nav>
    </div>
  );
}
