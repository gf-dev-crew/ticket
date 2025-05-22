export default function NoticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col justify-center'>
      <h1 className='mb-sm border text-5xl font-extrabold'>공지사항</h1>
      <div className='h-4xl border'>고객센터 &gt; 공지사항</div>
      {children}
    </div>
  );
}
