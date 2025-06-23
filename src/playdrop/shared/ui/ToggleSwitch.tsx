'use client';

import { useState } from 'react';

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleSwitchProps {
  options: ToggleOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Apple-style 토글 스위치 컴포넌트
 * @param options - 토글 옵션 배열
 * @param defaultValue - 기본 선택값
 * @param onChange - 값 변경 시 호출될 콜백 함수
 * @param className - 추가 CSS 클래스
 */
export default function ToggleSwitch({
  options,
  defaultValue,
  onChange,
  className = '',
}: ToggleSwitchProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || options[0]?.value || '',
  );

  const handleToggle = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  const selectedIndex = options.findIndex((option) => option.value === selectedValue);

  return (
    <div className={`p-2xs relative inline-flex rounded-full ${className}`}>
      {/* 선택된 옵션의 배경 슬라이더 */}
      <div
        className='top-2xs bottom-2xs bg-dark absolute rounded-full shadow-sm transition-all duration-300 ease-in-out'
        style={{
          width: `calc((100% - 0.8rem) / ${options.length})`,
          left: `calc(0.4rem + ${selectedIndex} * (100% - 0.8rem) / ${options.length})`,
        }}
      />

      {/* 토글 버튼들 */}
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          onClick={() => handleToggle(option.value)}
          className={`px-md py-xs relative z-10 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedValue === option.value ? 'text-white' : 'text-dark hover:text-gray-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
