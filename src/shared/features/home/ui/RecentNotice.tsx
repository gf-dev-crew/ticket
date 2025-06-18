'use client';

import { useEffect, useRef, useState } from 'react';

import { useRecentNotices } from '@/shared/hooks/queries';
import { Button } from '@/shared/ui';
import { formatDate } from '@/shared/utils';

export default function RecentNotice() {
  // 문서 권장: prefetch된 데이터가 있으므로 useQuery 사용 (useSuspenseQuery 아님)
  // "Because this data has already been prefetched, there is no need to ever suspend"
  const { data: notices = [], error } = useRecentNotices({ limit: 5 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (error) {
    return (
      <section className='py-5xl px-xl'>
        <div className='max-w-contents mx-auto'>
          <div className='mb-4xl text-left'>
            <h2 className='font-jamsil-bold text-dark mb-lg text-4xl'>최근 공지사항</h2>
          </div>
          <div className='p-xl rounded-lg border border-red-200 bg-red-50 text-center text-red-600'>
            {error instanceof Error ? error.message : '공지사항을 불러오는데 실패했습니다.'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`py-5xl px-xl mt-5xl transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className='max-w-contents mx-auto'>
        {/* 섹션 헤더 */}
        <div
          className={`mb-4xl text-left transition-all delay-200 duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className='font-jamsil-bold text-dark mb-lg text-4xl'>업데이트 & 점검 안내</h2>
        </div>

        {/* 공지사항 테이블 */}
        <div
          className={`overflow-hidden bg-white text-xl transition-all delay-400 duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {notices.length === 0 ? (
            <div className='flex h-[300px] items-center justify-center text-center text-gray-500'>
              등록된 공지사항이 없습니다.
            </div>
          ) : (
            <table className='w-full border-t-2 border-b-2'>
              <tbody>
                {notices.map((notice, index) => (
                  <tr
                    key={notice.id}
                    className={`border-b border-gray-200 font-normal transition-all duration-700 ease-out ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${600 + index * 100}ms`,
                    }}
                  >
                    <td className='py-xl px-sm text-medium w-[120px] text-center font-medium text-gray-700'>
                      {notice.notice_type}
                    </td>
                    <td className='py-xl px-lg'>
                      <div className='gap-2xs flex items-center text-xl'>
                        <span className='hover:text-secondary cursor-pointer font-medium text-gray-700 transition-colors'>
                          {notice.title}
                        </span>
                        {notice.has_attachment && (
                          <svg
                            className='h-lg w-lg text-gray-500'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className='py-xl px-sm w-[150px] text-center text-xl font-medium'>
                      {notice.category}
                    </td>
                    <td className='py-xl px-sm w-[180px] text-center'>
                      {formatDate(notice.created_at)}
                    </td>
                    <td className='py-xl px-sm w-[120px] text-center text-gray-300'>
                      조회수 {notice.views.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 더보기 링크 */}
          {notices.length > 0 && (
            <div
              className={`mt-2xl py-md flex justify-center transition-all delay-1000 duration-1000 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <Button type='button' className='rounded-full' variant='solid' size='lg'>
                공지사항 전체보기
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
