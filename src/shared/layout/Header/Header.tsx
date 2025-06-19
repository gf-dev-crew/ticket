'use client';

import Link from 'next/link';

import Logo from '@/shared/assets/brand_logo/playdrop.svg';

import useHeaderLayout from './hooks/useHeaderLayout';

const NAV_ITEMS = [
  { label: 'Sports', href: '/sports' },
  { label: 'Festival', href: '/festival' },
  { label: 'Concert', href: '/concert' },
  { label: 'Exhibition', href: '/exhibition' },
  { label: 'ETC.', href: '/etc' },
];

export default function Header() {
  /* 스크롤 여부 상태 관리 */
  const isScrolled = useHeaderLayout();

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-gray-100 bg-white ${isScrolled ? 'h-[80px]' : 'h-[148px]'}`}
    >
      <div
        className={`px-4xl flex h-full w-full items-center justify-center ${isScrolled ? 'flex-row justify-start' : 'flex-col'}`}
      >
        {/* Logo */}
        <div className={`flex items-center ${isScrolled ? 'w-[160px]' : 'py-sm w-full'}`}>
          <Link href='/' className='flex items-center justify-center'>
            <Logo className='fill-[#FF0082] object-contain' alt='Playdrop Brand Logo' />
          </Link>
        </div>
        {/* Navigation */}
        <nav className={` ${isScrolled ? 'ml-2xl' : 'pt-md pb-sm w-full'}`}>
          <ul
            className={`flex font-extrabold ${isScrolled ? 'space-x-xl text-3xl' : 'space-x-3xl text-4xl'}`}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className='hover:underline'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
