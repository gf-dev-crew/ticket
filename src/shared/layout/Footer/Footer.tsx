import Link from 'next/link';

import Logo from '@/shared/assets/brand_logo/playdrop.svg';

export default function Footer() {
  return (
    <footer className='pt-6xl pb-4xl flex h-[280px] w-full items-center justify-center bg-[#1f1d1e] text-gray-400'>
      <div className='px-4xl flex h-full w-full flex-row justify-between'>
        {/* Logo & Copyright */}
        <div className='flex h-full w-full flex-col border border-white'>
          <Logo className='fill-white object-contain' alt='Playdrop Brand Logo' />
          <p className='mt-2xs'>Copyright ⓒ 2025 PlayDrop. All rights reserved.</p>
        </div>
        {/* Section 1 */}
        <div className='flex h-full w-full border border-white font-medium'>
          <span>
            <p className='mb-sm flex flex-col text-xl font-semibold'>
              <span className='text-gray-200'>PlayDrop</span>
              <span className='text-md'>Team Slogun is PlayDrop</span>
            </p>
            <p>
              <span className='font-semibold'>Address | </span>
              <span>Sample Address is NewYork</span>
            </p>
            <p>
              <span className='font-semibold'>Phone | </span>
              <span>010-1234-5678</span>
            </p>{' '}
            <p>
              <span className='font-semibold'>Email | </span>
              <span>sample@gmail.com</span>
            </p>{' '}
            <p>
              <span className='font-semibold'>Business Registration | </span>
              <span>Sample Business Registration</span>
            </p>
          </span>
        </div>
        {/* Developers */}
        <div className='flex h-full w-full border border-white'>
          <p className='flex w-full flex-col'>
            <span className='mb-sm flex justify-start text-lg font-semibold text-gray-200'>
              Developers
            </span>
            <Link href='/' className='text-sm'>
              fridaynight@kakao.com
            </Link>{' '}
            <Link href='/' className='text-sm'>
              fridaynight@kakao.com
            </Link>{' '}
            <Link href='/' className='text-sm'>
              fridaynight@kakao.com
            </Link>{' '}
            <Link href='/' className='text-sm'>
              fridaynight@kakao.com
            </Link>{' '}
            <Link href='/' className='text-sm'>
              fridaynight@kakao.com
            </Link>{' '}
          </p>
        </div>
      </div>
    </footer>
  );
}
