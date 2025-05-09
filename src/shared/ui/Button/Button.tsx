/**
 * Button 컴포넌트
 *
 * 다양한 색상과 크기 옵션을 제공하는 기본 버튼 컴포넌트입니다.
 *
 * @example
 * // 기본 사용법
 * <Button>기본 버튼</Button>
 *
 * // 프라이머리 버튼
 * <Button color="primary">프라이머리 버튼</Button>
 *
 * // 세컨더리 버튼
 * <Button color="secondary">세컨더리 버튼</Button>
 *
 * // 다크 버튼
 * <Button color="dark">다크 버튼</Button>
 *
 * // 전체 너비 버튼
 * <Button fullWidth>전체 너비 버튼</Button>
 *
 * // 커스텀 크기 버튼
 * <Button width={200} height={50}>커스텀 크기 버튼</Button>
 *
 * // 비활성화 버튼
 * <Button disabled>비활성화 버튼</Button>
 */
import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 색상 - "default", "primary", "secondary", "dark" */
  color?: 'default' | 'primary' | 'secondary' | 'dark';
  /** 버튼 크기 - "sm", "md", "lg" */
  size?: 'sm' | 'md' | 'lg';
  /** 버튼을 부모 요소의 전체 너비로 확장 */
  fullWidth?: boolean;
  /** 버튼의 너비 (픽셀 또는 CSS 값) */
  width?: string | number;
  /** 버튼의 높이 (픽셀 또는 CSS 값) */
  height?: string | number;
  /** 버튼 요소에 대한 참조 */
  ref?: React.Ref<HTMLButtonElement>;
}

export default function Button({
  children,
  className,
  color = 'default',
  size = 'md',
  fullWidth = false,
  width,
  height,
  ref,
  ...props
}: ButtonProps) {
  const colorVariants = {
    default: 'bg-white border-gray-100 text-gray-900 hover:bg-gray-50 active:bg-gray-100',
    primary: 'bg-primary border-primary text-gray-900 hover:opacity-90 active:opacity-100',
    secondary: 'bg-secondary border-secondary text-white hover:opacity-90 active:opacity-100',
    dark: 'bg-[#222222] border-[#222222] text-white hover:opacity-90 active:opacity-100',
  };

  const sizeVariants = {
    sm: 'py-[0.4rem] px-[1.2rem] text-xs',
    md: 'py-[0.8rem] px-[1.6rem] text-sm',
    lg: 'py-[1.2rem] px-[2rem] text-base',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'flex items-center justify-center border text-center disabled:cursor-not-allowed disabled:opacity-50',
        'rounded-md',
        colorVariants[color],
        sizeVariants[size],
        fullWidth ? 'w-full' : '',
        className,
      )}
      style={{
        ...(width && !fullWidth ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
        ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
        ...props.style,
      }}
      type={props.type || 'button'}
      {...props}
    >
      {children}
    </button>
  );
}

Button.displayName = 'Button';
