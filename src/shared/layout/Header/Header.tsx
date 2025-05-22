import Link from 'next/link';

import Logo from '@/shared/assets/logo_color.svg';

export default function Header() {
  return (
    <header className='text-md text-dark h-[100px] w-full border-b border-gray-100 bg-white font-medium'>
      <div className='max-w-contents px-xl mx-auto flex h-full w-full items-center justify-between'>
        {/* 로고와 메인 네비게이션 영역 */}
        <div className='flex items-center'>
          <Link href='/' className='flex items-center justify-center'>
            <Logo className='mr-xs h-[30px] w-[138px] object-contain' alt='Aptifit Brand Logo' />
            <span className='text-lg font-medium text-[#2C2D2E]'>고객센터</span>
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
                1:1 문의
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
