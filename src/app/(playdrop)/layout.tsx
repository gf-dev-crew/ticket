// PlayDrop 전용 레이아웃

export default function PlayDropLayout({ children }: { children: React.ReactNode }) {
  /* T자 구조 레이아웃 (위: 제목, 아래: 왼쪽 필터 + 오른쪽 콘텐츠) */
  return (
    <div className='flex min-h-screen flex-col'>
      {/* 제목 섹션 - 전체 너비 */}
      <section className='mb-4xl w-full border border-gray-200'>
        <h1 className='text-6xl font-bold'>Sports / BaseBall</h1>
      </section>

      {/* 컨텐츠 섹션 - 필터(Left) + 콘텐츠(Right) */}
      <main className='gap-4xl flex min-h-0 flex-1'>
        {/* 필터 섹션 - Left */}
        <aside className='p-xl mt-[100px] w-[300px] bg-black text-white'>
          <h2 className='text-lg font-semibold'>Filter Section</h2>
          {/* 필터 내용 */}
          <div className='gap-2xl flex flex-col'>contents</div>
        </aside>

        {/* 콘텐츠 섹션 - Right */}
        <section className='flex-1'>
          {/* 필터 헤더 */}
          <div className='mb-4xl gap-2xl flex flex-col'>
            <p className='p-sm border border-gray-200 text-lg font-semibold'>
              Calendar or List Toggle Section
            </p>
          </div>
          {/* 콘텐츠 내용 */}
          {children}
        </section>
      </main>
    </div>
  );
}
