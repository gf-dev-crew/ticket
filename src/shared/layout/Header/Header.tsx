import Link from 'next/link';

import Logo from '@/shared/assets/logo.svg';

export default function Header() {
  return (
    <header className='h-6xl text-md text-dark fixed top-0 right-0 left-0 z-99 w-full border-b bg-white/10 font-medium backdrop-blur-sm'>
      <div className='max-w-contents px-xl mx-auto flex h-full w-full items-center justify-between'>
        {/* 로고와 메인 네비게이션 영역 */}
        <div className='space-x-5xl flex items-center'>
          <Link href='/' className='flex items-center justify-center'>
            <Logo className='h-[45px] w-[160px] object-contain' alt='Nook Brand Logo' />
          </Link>

          {/* 메인 네비게이션 */}
          <nav>
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
          </nav>
        </div>

        {/* 사용자 영역 */}
        <div className='space-x-2xl flex items-center'>
          <p className='text-gray-200'>🏡 힐스테이트 에코 마곡나루</p>
          <Link href='/login' className='transition-colors hover:text-gray-600'>
            <p className='font-medium'>로그인 / 회원가입</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
