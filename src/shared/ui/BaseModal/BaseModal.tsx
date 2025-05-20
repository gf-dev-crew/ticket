'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Button, Portal } from '@/shared/ui';
import { allowScroll, cn, preventScroll } from '@/shared/utils';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  title?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  positiveButton?: {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
  };
  negativeButton?: {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
  };
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  size = 'md',
  title,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
  positiveButton,
  negativeButton,
}: BaseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 모달 닫기 핸들러
  const handleClose = useCallback(() => {
    setIsVisible(false);
    // 애니메이션 완료 후 onClose 호출
    setTimeout(() => {
      onClose();
    }, 200); // 애니메이션 지속시간과 맞춤
  }, [onClose]);

  // ESC 키 핸들러
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        handleClose();
      }
    },
    [closeOnEsc, handleClose],
  );

  // 오버레이 클릭 핸들러
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        handleClose();
      }
    },
    [closeOnOverlayClick, handleClose],
  );

  useEffect(() => {
    if (isOpen) {
      const scrollPosition = preventScroll();
      document.addEventListener('keydown', handleKeyDown);
      // 모달이 열리면 약간의 지연 후 애니메이션 시작
      setTimeout(() => {
        setIsVisible(true);
      }, 10);

      return () => {
        allowScroll(scrollPosition);
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setIsVisible(false);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-[400px]',
    md: 'max-w-[500px]',
    lg: 'max-w-[800px]',
    full: 'max-w-[90vw]',
  };

  return (
    <Portal>
      {/* 모달 오버레이 */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 transition-opacity duration-200 ease-in-out',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleOverlayClick}
        role='presentation'
      >
        {/* 모달 컨테이너 */}
        <div
          ref={modalRef}
          role='dialog'
          aria-modal='true'
          aria-labelledby={title ? 'modal-title' : undefined}
          tabIndex={-1}
          className={cn(
            'relative flex w-full flex-col rounded-lg bg-white shadow-xl transition-all duration-200 ease-in-out',
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            sizeClasses[size],
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모달 헤더 */}
          {title && (
            <div className='p-xl pb-xs'>
              <h2 id='modal-title' className='text-lg font-semibold'>
                {title}
              </h2>
            </div>
          )}

          {/* 모달 본문 */}
          <div
            className={cn(
              'p-xl flex-1 text-sm text-gray-400',
              title && 'pt-xs',
              positiveButton || negativeButton ? 'pb-xs' : 'pb-2xl',
            )}
          >
            {children}
          </div>

          {/* 모달 푸터 */}
          {(positiveButton || negativeButton) && (
            <div className='p-xl pt-xs gap-xs flex justify-end'>
              {negativeButton && (
                <Button
                  onClick={negativeButton.onClick}
                  disabled={negativeButton.disabled}
                  className={cn('border border-gray-100', negativeButton.className)}
                  color='white'
                  size='sm'
                >
                  {negativeButton.text}
                </Button>
              )}
              {positiveButton && (
                <Button
                  onClick={positiveButton.onClick}
                  disabled={positiveButton.disabled}
                  className={positiveButton.className}
                  color='black'
                  size='sm'
                >
                  {positiveButton.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
}
