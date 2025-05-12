import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

/**
 * 다양한 스타일 옵션을 제공하는 범용 버튼 컴포넌트입니다.
 *
 * @component
 * @example
 * // 기본 사용법
 * <Button>기본 버튼</Button>
 *
 * // 변형 사용법
 * <Button variant="outline" color="primary" size="lg" fullWidth>전체 너비 테두리 버튼</Button>
 *
 * @property {string} variant - 버튼 스타일 변형 ('solid', 'outline', 'text', 'ghost')
 * @property {string} color - 버튼 색상 ('black', 'white', 'primary', 'secondary')
 * @property {string} size - 버튼 크기 ('sm', 'md', 'lg')
 * @property {boolean} fullWidth - 부모 요소의 전체 너비를 차지하는지 여부
 * @property {string|number} width - 버튼의 너비 (px 또는 CSS 값)
 * @property {string|number} height - 버튼의 높이 (px 또는 CSS 값)
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'black' | 'white' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'text' | 'ghost';
  fullWidth?: boolean;
  width?: string | number;
  height?: string | number;
}

export default function Button({
  children,
  className,
  color = 'black',
  size = 'md',
  variant = 'solid',
  fullWidth = false,
  width,
  height,
  ...props
}: ButtonProps) {
  const variantStyles = {
    solid: {
      black: 'bg-black border-black text-white hover:opacity-85 active:opacity-100',
      white: 'bg-white border-black text-black hover:bg-gray-50 active:bg-gray-100',
      primary: 'bg-primary border-primary text-black hover:opacity-85 active:opacity-100',
      secondary: 'bg-secondary border-secondary text-white hover:opacity-85 active:opacity-100',
    },
    outline: {
      black: 'bg-transparent border border-black text-black hover:bg-black/5 active:bg-black/10',
      white: 'bg-transparent border border-white text-white hover:bg-white/10 active:text-white/20',
      primary:
        'bg-transparent border border-primary text-primary hover:bg-primary/10 active:bg-primary/20',
      secondary:
        'bg-transparent border border-secondary text-secondary hover:bg-secondary/10 active:bg-secondary/20',
    },
    text: {
      black:
        'bg-transparent text-black hover:text-black/80 active:text-black/60 border-transparent',
      white:
        'bg-transparent text-white hover:text-white/80 active:text-white/60 border-transparent',
      primary:
        'bg-transparent text-primary hover:text-primary/80 active:text-primary/60 border-transparent',
      secondary:
        'bg-transparent text-secondary hover:text-secondary/80 active:text-secondary/60 border-transparent',
    },
    ghost: {
      black: 'bg-black/10 text-black hover:bg-black/20 border-transparent active:bg-black/30',
      white: 'bg-white/10 text-black hover:bg-white/20 border-transparent active:bg-white/30',
      primary:
        'bg-primary/10 text-primary hover:bg-primary/20 border-transparent active:bg-primary/30',
      secondary:
        'bg-secondary/10 text-secondary hover:bg-secondary/20 border-transparent active:bg-secondary/30',
    },
  };

  const sizeVariants = {
    sm: 'py-xs px-md text-sm rounded-md h-3xl',
    md: 'py-sm px-lg text-md rounded-lg h-4xl',
    lg: 'py-md px-xl text-lg rounded-lg h-5xl',
  };

  return (
    <button
      className={cn(
        'flex cursor-pointer items-center justify-center border text-center font-medium disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant][color],
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
