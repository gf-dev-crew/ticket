import Logo from '@/shared/assets/logo_white.svg';

export default function Footer() {
  return (
    <footer className='pt-6xl pb-4xl flex h-[300px] w-full items-center justify-center bg-[#1f1d1e] text-gray-400'>
      <div className='max-w-contents px-xl mx-auto flex h-full w-full flex-row justify-between'>
        <div className='flex h-full w-full flex-col'>
          <Logo className='h-[45px] w-[160px] object-contain' alt='Nook Brand Logo' />
          <p className='mt-2xs'>Copyright ⓒ 2025 Kzz-Dev-Crew. All rights reserved.</p>
        </div>
        <div className='px-xl mx-auto flex h-full w-full'>
          <p className='flex w-full flex-col'>
            <span className='mb-sm flex justify-start text-lg font-semibold text-white'>
              Developers
            </span>
            <span className='text-sm font-semibold text-gray-300'>Kim Dohyeon</span>
            <span className='text-sm'>Email. fridaynight@kakao.com</span>
            <span className='text-sm'>GitHub. https://github.com/kimzeze</span>
            <span className='mt-sm text-sm font-semibold text-gray-300'>Hyeon Jisoo</span>
            <span className='text-sm'>Email. hyunzsu@kakao.com</span>
            <span className='text-sm'>GitHub. https://github.com/hyunzsu</span>
          </p>
        </div>
        <div className='px-xl mx-auto flex h-full w-full items-center justify-between'>
          <span>
            <p>
              <span>Address. </span>
              <span>161-11 Magokjungang-ro, Gangseo-gu, Seoul Magok</span>
            </p>
          </span>
        </div>
      </div>
    </footer>
  );
}
