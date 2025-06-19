export default function HeroSection() {
  return (
    <section className='flex flex-col items-center justify-center'>
      {/* Hero Section 타이틀 */}
      <div className='mb-3xl flex h-full w-full flex-row items-end justify-between'>
        <div className='flex-shrink-0'>
          <h1 className='font-jamsil-extra-bold text-left text-6xl whitespace-nowrap text-black'>
            Hero Section Main Title
          </h1>
        </div>
        <div className='pb-2xs ml-8 flex flex-1 translate-y-[-9px] items-end justify-end border-b border-black'>
          <p className='font-jamsil-regular text-2xl text-black'>
            Sub, <span className='font-jamsil-light'>Sub Title</span>
          </p>
        </div>
      </div>
      {/* Hero Section 비디오 */}
      <div className='relative aspect-[3/1] w-full overflow-hidden rounded-[35px]'>
        <video
          className='absolute inset-0 h-full w-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          src='/videos/hero-2k.mp4'
        />
        {/* Hero Section 비디오 배경 */}
        <div className='absolute inset-0 bg-black/40' />
        {/* Hero Section 비디오 컨텐츠 */}
        <div className='absolute inset-0 my-auto flex items-center justify-center px-[80px]'>
          <div className='flex w-full flex-col'>
            <div className='mb-5xl text-[42px] text-white'>
              <h2 className='font-jamsil-regular text-left leading-[1.2]'>
                <p>Hero Section Sub Title, </p>
                <p>
                  <span className='text-primary'>Hero Section Sub Title</span>가 함께합니다.
                </p>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
