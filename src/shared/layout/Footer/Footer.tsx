import Link from 'next/link';

import Logo from '@/shared/assets/logo_white.svg';

export default function Footer() {
  return (
    <footer className='pt-6xl pb-4xl flex h-[300px] w-full items-center justify-center bg-[#1f1d1e] text-white'>
      <div className='max-w-contents flex h-full w-full flex-row justify-between border border-pink-500'>
        <div className='flex h-full w-full items-center justify-between border border-white'>
          <Logo className='h-[45px] w-[160px] object-contain' alt='Nook Brand Logo' />
        </div>
        <div className='px-xl mx-auto flex h-full w-full items-center justify-between border border-white'>
          <Logo className='h-[45px] w-[160px] object-contain' alt='Nook Brand Logo' />
        </div>
        <div className='px-xl mx-auto flex h-full w-full items-center justify-between border border-white'>
          <Logo className='h-[45px] w-[160px] object-contain' alt='Nook Brand Logo' />
        </div>
      </div>
    </footer>
  );
}
