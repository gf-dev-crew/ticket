import Link from 'next/link';

import Logo from '@/shared/assets/logo.svg';

export default function Header() {
  return (
    <header className='h-6xl text-md text-dark w-full border-b border-gray-100 bg-white font-medium'>
      <div className='max-w-contents px-xl mx-auto flex h-full w-full items-center justify-between'>
        {/* 로고와 메인 네비게이션 영역 */}
        <div className='flex items-center'>
          <Link href='/' className='flex items-center justify-center'>
            <Logo className='mr-sm h-[30px] w-[138px] object-contain' alt='Aptifit Brand Logo' />
            <span className='text-md font-medium text-[#2C2D2E]'>고객센터</span>
          </Link>
        </div>
        {/* 메인 네비게이션 */}
        {/* <nav>
          <ul className='space-x-4xl flex'>
            <li>
              <Link href='/notice' className='transition-colors hover:text-gray-600'>
                공지사항
              </Link>
            </li>
            <li>
              <Link href='/calendar' className='transition-colors hover:text-gray-600'>
                캘린더
              </Link>
            </li>
            <li>
              <Link href='/program' className='transition-colors hover:text-gray-600'>
                프로그램
              </Link>
            </li>
            <li>
              <Link href='/lounge' className='transition-colors hover:text-gray-600'>
                라운지
              </Link>
            </li>
          </ul>
        </nav> */}
        {/* 사용자 영역 */}
        <div className='space-x-2xl flex items-center'>
          <Link href='https://www.aptifit.co.kr' className='transition-colors hover:text-gray-600'>
            <p className='font-medium'>앱티핏 바로가기</p>
          </Link>
          <Link
            href='https://dashboard.aptifit.co.kr'
            className='transition-colors hover:text-gray-600'
          >
            <p className='font-medium'>앱티핏 대시보드 바로가기</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
