import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../../../public/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const jamsilExtraBold = localFont({
  src: '../../../public/fonts/Jamsil/The-Jamsil-ExtraBold.ttf',
  display: 'swap',
  variable: '--font-jamsil-extra-bold',
});

export const jamsilBold = localFont({
  src: '../../../public/fonts/Jamsil/The-Jamsil-Bold.ttf',
  display: 'swap',
  variable: '--font-jamsil-bold',
});

export const jamsilThin = localFont({
  src: '../../../public/fonts/Jamsil/The-Jamsil-Thin.ttf',
  display: 'swap',
  variable: '--font-jamsil-thin',
});

export const jamsilRegular = localFont({
  src: '../../../public/fonts/Jamsil/The-Jamsil-Medium.ttf',
  display: 'swap',
  variable: '--font-jamsil-regular',
});

export const jamsilLight = localFont({
  src: '../../../public/fonts/Jamsil/The-Jamsil-Light.ttf',
  display: 'swap',
  variable: '--font-jamsil-light',
});

export const jamsilMedium = localFont({
  src: '../../../public/fonts/Jamsil/The-Jamsil-Medium.ttf',
  display: 'swap',
  variable: '--font-jamsil-medium',
});

/**
 * 모든 폰트 변수를 하나의 문자열로 결합하는 유틸리티 함수
 * @returns 모든 폰트 CSS 변수가 포함된 클래스명 문자열
 */
export const getAllFontVariables = (): string => {
  return [
    pretendard.variable,
    jamsilThin.variable,
    jamsilBold.variable,
    jamsilExtraBold.variable,
    jamsilMedium.variable,
    jamsilLight.variable,
    jamsilRegular.variable,
  ].join(' ');
};
