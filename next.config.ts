/**
 * Next.js 설정 파일
 *
 * SVG 파일 처리를 위한 설정:
 * 1. SVG를 React 컴포넌트로 변환 (import Icon from './icon.svg')
 * 2. SVG를 URL로 사용 (import IconUrl from './icon.svg?url')
 *
 * 이 설정은 svgr.d.ts 타입 정의 파일과 함께 작동합니다.
 */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // TurboPack 설정 - SVG 파일을 JS 컴포넌트로 변환
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // webpack 설정 - SVG 파일을 컴포넌트 또는 URL로 가져올 수 있게 함
  webpack: (config) => {
    // @ts-expect-error Next.js webpack 설정의 타입이 완벽하게 정의되어 있지 않아 발생하는 오류 무시
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // 규칙 1: SVG를 URL로 가져오기 위한 규칙 (?url 쿼리 사용)
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // 규칙 2: SVG를 React 컴포넌트로 가져오기 위한 규칙
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true, // TypeScript 지원
              ext: 'tsx', // TSX 확장자로 생성
            },
          },
        ],
      },
    );
    // 기존 file-loader가 SVG를 처리하지 않도록 제외
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default nextConfig;
