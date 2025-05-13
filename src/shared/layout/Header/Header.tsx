import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='fixed top-0 right-0 left-0 z-99 w-full bg-white/10 text-black backdrop-blur-sm'>
      <div className='mx-auto flex h-[64px] items-center justify-between px-[24px]'>
        <Link href='/' className='flex items-center justify-center'>
          <Image src='/assets/logo.svg' alt='Nook Brand Logo' width={160} height={45} priority />
        </Link>
        <nav>
          <ul className='text-md flex space-x-8'>
            <li>
              <Link
                href='/'
                className='hover:cursor-pointer hover:text-gray-600'
                target='_blank'
                rel='noopener noreferrer'
              >
                고객센터
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
