/**
 * SVG 파일을 React 컴포넌트로 임포트할 수 있게 하는 타입 정의
 *
 * SVG를 임포트하여 컴포넌트처럼 사용:
 * import Icon from './icon.svg'
 * <Icon width={24} height={24} fill="currentColor" />
 *
 * 이 파일은 next.config.ts의 @svgr/webpack 설정과 함께 작동합니다.
 * URL로 가져오려면 import iconUrl from './icon.svg?url' 구문을 사용
 */

declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
