'use client';

import { InputHTMLAttributes, ReactNode, useEffect, useId, useState } from 'react';

import { cn } from '@/shared/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 라벨 */
  label?: string;
  /** 필수 입력 필드 여부 */
  required?: boolean;
  /** 오류 메시지 */
  error?: string;
  /** 클리어 버튼 표시 여부 */
  showClearButton?: boolean;
  /** 클리어 버튼 클릭 시 호출될 콜백 */
  onClear?: () => void;
  /** 레이아웃 방향 */
  direction?: 'row' | 'column';
  /** 입력 필드 내부에 표시될 데코레이터 (아이콘 등) */
  inputDecorator?: ReactNode;
  /** 폰트 크기 */
  fontSize?: 'sm' | 'md' | 'lg';
  /** 라벨 최대 너비 (direction이 row일 때만 적용) */
  labelMaxWidth?: string;
}

/**
 * 범용 입력 컴포넌트
 *
 * react-hook-form의 register 함수와 호환되도록 설계되었습니다.
 * - 라벨 표시
 * - 오류 메시지 표시
 * - 클리어 버튼 지원
 * - 접근성 지원
 * - row/column 레이아웃 방향 지원
 *
 * @example
 * // react-hook-form과 함께 사용
 * <Input {...register("email")} error={errors.email?.message} />
 */
const Input = function Input({
  label,
  id: propId,
  className,
  required = false,
  error,
  showClearButton = true,
  onClear,
  direction = 'column',
  'aria-describedby': ariaDescribedby,
  inputDecorator,
  value,
  onChange,
  defaultValue,
  fontSize = 'md',
  labelMaxWidth,
  ...props
}: InputProps) {
  // 로컬 상태로 입력값 트래킹
  const [hasInputValue, setHasInputValue] = useState(Boolean(value || defaultValue));

  // 입력 변경 감지
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInputValue(!!e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  // value prop이 변경될 때마다 hasInputValue 업데이트
  useEffect(() => {
    setHasInputValue(Boolean(value));
  }, [value]);

  // React의 useId를 사용하여 안정적인 ID 생성
  const reactId = useId();
  const uniqueId = propId || `input-${reactId}`;
  const errorId = `${uniqueId}-error`;

  // 클리어 버튼 표시 여부
  const showClear = showClearButton && hasInputValue && !props.disabled;

  // 초기화 핸들러
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      // 합성 이벤트 생성 및 발생
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }

    // 로컬 상태 업데이트
    setHasInputValue(false);
  };

  // ARIA describedby 설정
  const getAriaDescribedby = () => {
    const ids: string[] = [];
    if (error) ids.push(errorId);
    if (ariaDescribedby) ids.push(ariaDescribedby);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  // 폰트 크기 클래스 결정
  const fontSizeClass = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
  }[fontSize];

  // 폰트 크기에 따른 패딩 조정
  const paddingSizeClass = {
    sm: 'py-xs pl-sm pr-2xl',
    md: 'py-sm pl-md pr-2xl',
    lg: 'py-sm pl-md pr-3xl',
  }[fontSize];

  // 라벨 너비 스타일 결정
  const labelWidthStyle = direction === 'row' ? { minWidth: labelMaxWidth || '100px' } : undefined;

  return (
    <div className='w-full'>
      <div
        className={cn('flex', direction === 'row' ? 'gap-sm flex-row items-center' : 'flex-col')}
      >
        {/* 라벨 */}
        {label && (
          <div
            className={cn('flex flex-row items-center', direction === 'column' ? 'mb-xs' : '')}
            style={labelWidthStyle}
          >
            <label
              htmlFor={uniqueId}
              className={cn(
                fontSizeClass,
                'font-medium text-gray-800',
                props.disabled && 'text-gray-400',
              )}
            >
              {label}
              {required && (
                <span className='ml-2xs text-error' aria-hidden='true'>
                  *
                </span>
              )}
            </label>
          </div>
        )}

        {/* 인풋 */}
        <div className={cn('relative', direction === 'row' ? 'flex-1' : 'w-full')}>
          {/* 데코레이터 (아이콘 등) */}
          {inputDecorator}

          <input
            id={uniqueId}
            className={cn(
              `${paddingSizeClass} w-full rounded-md border ${fontSizeClass} transition-colors`,
              error ? 'border-error' : 'border-gray-100',
              props.disabled
                ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                : 'bg-white',
              'focus:outline-none',
              error ? 'focus:border-error' : 'focus:border-gray-800',
              '[&:-webkit-autofill]:!border-gray-100 [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill_focus]:!border-gray-800',
              fontSize === 'lg'
                ? '[&:-webkit-autofill]:text-lg'
                : fontSize === 'sm'
                  ? '[&:-webkit-autofill]:text-sm'
                  : '[&:-webkit-autofill]:text-md',
              className,
            )}
            value={value}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            aria-invalid={!!error}
            aria-describedby={getAriaDescribedby()}
            aria-required={required}
            {...props}
          />

          {/* 클리어 버튼 */}
          {showClear && (
            <button
              type='button'
              className={cn(
                'p-2xs absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full text-gray-100 transition-colors hover:text-gray-200',
                fontSize === 'sm' ? 'right-xs' : 'right-sm',
              )}
              onClick={handleClear}
              tabIndex={-1}
              aria-label='입력 내용 지우기'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
              >
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 에러 메시지 영역 - 항상 동일한 높이를 유지하기 위한 컨테이너 */}
      <div
        className='h-[28px] overflow-hidden'
        style={
          direction === 'row' && label
            ? {
                marginLeft: labelMaxWidth ? `calc(${labelMaxWidth} + 10px)` : '120px',
              }
            : undefined
        }
      >
        {/* 에러 메시지 - 실제 메시지가 있을 때만 표시 */}
        {error && (
          <p
            id={errorId}
            role='alert'
            aria-live='assertive'
            className={cn(
              'mt-2xs pl-xs text-error text-sm transition-opacity duration-300 ease-in',
            )}
            style={{ animation: 'fadeInDown 0.3s ease-out' }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
