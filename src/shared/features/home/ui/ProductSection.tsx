import Link from 'next/link';

export default function ProductSection() {
  const projects = [
    {
      id: 1,
      link: 'https://www.aptifit.co.kr',
      title: '앱티핏',
      subtitle: 'AI 진로 적성 진단 플랫폼',
      image: '/images/aptifit.jpg',
    },
    {
      id: 2,
      link: 'https://dashboard.aptifit.co.kr',
      title: '앱티핏 대시보드',
      subtitle: '기관 및 단체를 위한 앱티핏 관리 시스템',
      image: '/images/dashboard.jpg',
    },
    {
      id: 3,
      link: 'https://saenggiview.com',
      title: '생기뷰',
      subtitle: '생활기록부 분석',
      image: '/images/saenggiview.jpg',
    },
  ];

  return (
    <section className='py-5xl px-xl'>
      <div className='max-w-contents mx-auto'>
        {/* 섹션 헤더 */}
        <div className='mb-4xl text-left'>
          <h2 className='font-jamsil-bold text-dark mb-lg text-4xl'>주요 서비스</h2>
        </div>

        {/* 프로젝트 리스트 */}
        <ul className='space-y-4xl'>
          {projects.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <li key={project.id} className='group'>
                <Link
                  href={project.link}
                  className={`flex h-[140px] overflow-hidden rounded-[35px] bg-white ${
                    isEven ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* 이미지 영역 */}
                  <div className='relative h-full w-[70%] flex-shrink-0 overflow-hidden'>
                    {/* 실제 이미지 */}
                    {/* <img 
                      src={project.image} 
                      alt={project.title}
                      className='w-full h-full object-cover'
                    /> */}

                    {/* 임시 배경 이미지 */}
                    <div className='bg-primary h-full w-full rounded-[35px]'></div>
                  </div>

                  {/* 텍스트 영역 */}
                  <div
                    className={`pb-2xs flex flex-1 flex-col justify-end ${
                      isEven ? 'pr-3xl text-right' : 'pl-3xl text-left'
                    }`}
                  >
                    <div>
                      <p className='font-jamsil-light text-md tracking-wide text-gray-300 uppercase'>
                        {project.subtitle}
                      </p>
                      <h3 className='font-jamsil-bold text-dark text-[32px] leading-[1.5]'>
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
