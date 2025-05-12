import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='flex min-h-[300px] w-full items-center border-t border-gray-200 xl:h-[250px]'>
      <div className='px-xl mx-auto flex w-full max-w-[1600px] flex-col'>
        {/* 메인 콘텐츠 */}
        <div className='flex flex-col gap-6 py-8 xl:flex-row xl:justify-between'>
          {/* 좌측: 로고와 슬로건 */}
          <div className='flex flex-col items-start justify-between xl:h-[150px]'>
            <Image
              src='/assets/logo.svg'
              alt='로고'
              width={200}
              height={60}
              className='mb-4 -translate-x-5 xl:mb-0 xl:-translate-x-2'
            />
            <div className='xl:pl-sm flex flex-col items-start text-xl xl:text-2xl'>
              <p className='font-medium text-gray-400'>임시 슬로건</p>
              <p>
                <span className='font-medium'>임시 문구입니다. </span>수정이 필요합니다.
              </p>
            </div>
          </div>

          {/* 우측: 회사 정보 */}
          <div className='flex w-full flex-col gap-2 text-sm text-gray-700 xl:h-[150px] xl:w-[700px]'>
            <div className='xl:mb-xl xl:gap-2xl mb-6 flex flex-col gap-3 xl:flex-row'>
              <Link href='#' className='text-gray-700 hover:text-gray-900'>
                임시 링크 1
              </Link>
              <Link href='#' className='text-gray-700 hover:text-gray-900'>
                임시 링크 2
              </Link>
              <Link href='#' className='text-gray-700 hover:text-gray-900'>
                임시 링크 3
              </Link>
              <Link href='#' className='text-gray-700 hover:text-gray-900'>
                임시 링크 4
              </Link>
            </div>

            <div className='flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-8'>
              <div className='xl:gap-xs flex flex-col xl:flex-row xl:items-center'>
                <span className='font-medium text-gray-800'>주소</span>
                <span>임시 주소</span>
              </div>
              <div className='xl:gap-xs flex flex-col xl:flex-row xl:items-center'>
                <span className='font-medium text-gray-800'>전화</span>
                <span>000-0000-0000</span>
              </div>
              <div className='xl:gap-xs flex flex-col xl:flex-row xl:items-center'>
                <span className='font-medium text-gray-800'>이메일</span>
                <span>temp@example.com</span>
              </div>
            </div>
            <div className='xl:mb-xl mb-6 flex flex-col xl:flex-row xl:items-center xl:gap-8'>
              <div className='xl:gap-xs flex flex-col xl:flex-row xl:items-center'>
                <span className='font-medium text-gray-800'>사업자등록번호</span>
                <span>000-00-00000</span>
              </div>
            </div>
            <div className='text-gray-300 xl:mt-2'>
              Copyright © 2024 Company Name. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
