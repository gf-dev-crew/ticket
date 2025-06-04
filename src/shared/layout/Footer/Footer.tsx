import Link from 'next/link';

import Logo from '@/shared/assets/brand_logo/aptimizer_logo_white.svg';

export default function Footer() {
  return (
    <footer className='pt-6xl pb-4xl flex h-[280px] w-full items-center justify-center bg-[#1f1d1e] text-gray-400'>
      <div className='max-w-contents px-xl mx-auto flex h-full w-full flex-row justify-between'>
        {/* Logo & Copyright */}
        <div className='flex h-full w-full flex-col'>
          <Logo
            className='h-[60px] w-[240px] translate-x-[-16px] object-contain'
            alt='Aptimizer Brand Logo'
          />
          <p className='mt-2xs'>Copyright ⓒ 2025 Aptimizer. All rights reserved.</p>
        </div>
        {/* Address */}
        <div className='px-xl mx-auto flex h-full w-full font-medium'>
          <span>
            <p className='mb-sm flex flex-col text-xl font-semibold'>
              <span className='text-gray-200'>Excellence for All</span>
              {/* <span className='text-md'>맞춤형 진로설계, 앱티마이저가 함께합니다.</span> */}
            </p>
            <p>
              <span className='font-semibold'>주소 | </span>
              <span>서울특별시 관악구 신림로 117, 403호</span>
            </p>
            <p>
              <span className='font-semibold'>전화 | </span>
              <span>070-8887-8884</span>
            </p>{' '}
            <p>
              <span className='font-semibold'>이메일 | </span>
              <span>aptimizer.co@gmail.com</span>
            </p>{' '}
            <p>
              <span className='font-semibold'>통신판매업 신고 | </span>
              <span>제 2024-서울관악-1885호</span>
            </p>
          </span>
        </div>
        {/* Developers */}
        <div className='px-xl mx-auto flex h-full w-full'>
          <p className='flex w-full flex-col'>
            <span className='mb-sm flex justify-start text-lg font-semibold text-gray-200'>
              Family Site
            </span>
            <Link href='https://www.aptimizer.co.kr' className='text-sm'>
              앱티마이저 공식 사이트
            </Link>{' '}
            <Link href='https://www.aptifit.co.kr' className='text-sm'>
              앱티핏 바로가기
            </Link>{' '}
            <Link href='https://dashboard.aptifit.co.kr' className='text-sm'>
              앱티핏 대시보드 바로가기
            </Link>{' '}
            <Link href='https://edu-premium.aptimizer.co.kr' className='text-sm'>
              에듀프리미엄 공식 사이트
            </Link>{' '}
            <Link
              href='https://pf.kakao.com/_xaxksxoG/chat?api_ver=1.1&kakao_agent=sdk%2F2.7.2%20os%2Fjavascript%20sdk_type%2Fjavascript%20lang%2Fko-KR%20device%2FMacIntel%20origin%2Fhttps%253A%252F%252Fwww.aptimizer.co.kr&app_key=9e0126a574308cc089ed2a020a5fefa3&referer=https%3A%2F%2Fwww.aptimizer.co.kr%2F'
              className='text-sm'
            >
              앱티마이저 카카오톡 고객센터
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
