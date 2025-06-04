import Link from 'next/link';

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col justify-center'>
      <Link href='/notice' className='text-5xl font-extrabold'>
        공지사항
      </Link>
      {children}
    </div>
  );
}
