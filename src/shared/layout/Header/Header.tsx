'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import Logo from '@/shared/assets/brand_logo/aptimizer_logo_color.svg';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* 스크롤에 따라 헤더 제어  */
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 스크롤 다운 && 100px 이상 스크롤 시 헤더 숨기기
        setIsVisible(false);
      } else {
        // 스크롤 업 시 헤더 보이기
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`text-md text-dark fixed top-0 z-50 h-[80px] w-full bg-white/80 font-medium backdrop-blur-md transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} `}
    >
      <div className='max-w-contents px-xl mx-auto flex h-full w-full items-center justify-between'>
        {/* 로고와 메인 네비게이션 영역 */}
        <div className='flex items-center'>
          <Link href='/' className='flex items-center justify-center'>
            <Logo className='mr-sm h-[48px] w-[200px] object-contain' alt='Aptimizer Brand Logo' />
            <span className='pb-2xs text-xl font-normal text-[#000]'>고객센터</span>
          </Link>
        </div>
        {/* 네비게이션 */}
        <nav>
          <ul className='space-x-4xl flex text-lg'>
            <li>
              <Link href='/notice' className='transition-colors hover:text-gray-600'>
                공지사항
              </Link>
            </li>
            <li>
              <Link href='/notice' className='transition-colors hover:text-gray-600'>
                FAQ
              </Link>
            </li>
            <li>
              <Link href='/notice' className='transition-colors hover:text-gray-600'>
                문의하기
              </Link>
            </li>
            <li>
              <Link
                href='https://www.aptifit.co.kr'
                className='transition-colors hover:text-gray-600'
              >
                <p className='font-medium'>앱티핏</p>
              </Link>
            </li>
            <li>
              <Link
                href='https://dashboard.aptifit.co.kr'
                className='transition-colors hover:text-gray-600'
              >
                <p className='font-medium'>앱티핏 대시보드</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
