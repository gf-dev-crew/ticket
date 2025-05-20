'use client';

import { ChangeEvent, useState } from 'react';

import BaseModal from '@/shared/ui/BaseModal/BaseModal';
import Input from '@/shared/ui/Input/Input';

export default function Home() {
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // Modal states
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isButtonModalOpen, setIsButtonModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isCloseOptionsModalOpen, setIsCloseOptionsModalOpen] = useState(false);

  // Input handlers
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setTextValue(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordValue(e.target.value);

  // Modal handlers
  const openBasicModal = () => setIsBasicModalOpen(true);
  const closeBasicModal = () => setIsBasicModalOpen(false);

  const openTitleModal = () => setIsTitleModalOpen(true);
  const closeTitleModal = () => setIsTitleModalOpen(false);

  const openButtonModal = () => setIsButtonModalOpen(true);
  const closeButtonModal = () => setIsButtonModalOpen(false);

  const openCustomModal = () => setIsCustomModalOpen(true);
  const closeCustomModal = () => setIsCustomModalOpen(false);

  const openCloseOptionsModal = () => setIsCloseOptionsModalOpen(true);
  const closeCloseOptionsModal = () => setIsCloseOptionsModalOpen(false);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8'>
      <h1 className='mb-4 text-3xl font-bold'>입력 컴포넌트 샘플</h1>
      <p className='mb-8 text-center'>다양한 입력 필드 스타일을 확인하세요.</p>

      <div className='mb-8 w-full max-w-[500px]'>
        <h2 className='mb-4 text-xl font-semibold'>기본 입력 필드</h2>
        <div className='space-y-4'>
          <Input placeholder='기본 입력 필드' value={textValue} onChange={handleTextChange} />
          <Input placeholder='비활성화된 입력 필드' disabled />
          <Input
            placeholder='읽기 전용 입력 필드'
            readOnly
            value='읽기 전용 텍스트'
            showClearButton={false}
          />
        </div>
      </div>

      <div className='mb-8 w-full max-w-[500px]'>
        <h2 className='mb-4 text-xl font-semibold'>레이블이 있는 입력 필드</h2>
        <div className='space-y-4'>
          <Input
            label='이메일'
            type='email'
            placeholder='example@email.com'
            value={emailValue}
            onChange={handleEmailChange}
          />
          <Input label='필수 입력 필드' placeholder='필수 정보를 입력해주세요' required />
          <Input
            label='비밀번호'
            type='password'
            placeholder='비밀번호를 입력하세요'
            value={passwordValue}
            onChange={handlePasswordChange}
          />
        </div>
      </div>

      <div className='mb-8 w-full max-w-[500px]'>
        <h2 className='mb-4 text-xl font-semibold'>오류 메시지</h2>
        <div className='space-y-4'>
          <Input label='이름' placeholder='이름을 입력하세요' error='이름은 필수 항목입니다.' />
          <Input
            label='이메일'
            type='email'
            placeholder='example@email.com'
            error='올바른 이메일 형식이 아닙니다.'
          />
        </div>
      </div>

      <div className='mb-8 w-full max-w-[500px]'>
        <h2 className='mb-4 text-xl font-semibold'>레이아웃 방향</h2>
        <div className='space-y-4'>
          <Input label='세로 방향 (기본값)' placeholder='세로 방향 입력 필드' direction='column' />
          <Input label='가로 방향' placeholder='가로 방향 입력 필드' direction='row' />
          <Input
            label='가로 방향 (라벨 너비 설정)'
            placeholder='라벨 너비가 설정된 입력 필드'
            direction='row'
            labelMaxWidth='150px'
          />
        </div>
      </div>

      <div className='mb-8 w-full max-w-[500px]'>
        <h2 className='mb-4 text-xl font-semibold'>폰트 크기</h2>
        <div className='space-y-4'>
          <Input label='작은 폰트 크기' placeholder='작은 폰트 크기 (sm)' fontSize='sm' />
          <Input label='기본 폰트 크기' placeholder='기본 폰트 크기 (md)' fontSize='md' />
          <Input label='큰 폰트 크기' placeholder='큰 폰트 크기 (lg)' fontSize='lg' />
        </div>
      </div>

      <div className='mb-8 w-full max-w-[500px]'>
        <h2 className='mb-4 text-xl font-semibold'>클리어 버튼</h2>
        <div className='space-y-4'>
          <Input
            label='클리어 버튼 활성화 (기본값)'
            placeholder='텍스트를 입력하면 클리어 버튼이 나타납니다'
            showClearButton={true}
          />
          <Input
            label='클리어 버튼 비활성화'
            placeholder='클리어 버튼이 없는 입력 필드'
            showClearButton={false}
            defaultValue='클리어 버튼 없음'
          />
        </div>
      </div>

      <div className='mb-8 w-full max-w-[500px]'>
        <h2 className='mb-4 text-xl font-semibold'>기타 속성</h2>
        <div className='space-y-4'>
          <Input label='최대 길이 제한' placeholder='최대 20자까지 입력 가능' maxLength={20} />
          <Input label='숫자만 입력 가능' type='number' placeholder='숫자만 입력 가능합니다' />
          <Input
            label='자동 완성 비활성화'
            placeholder='자동 완성이 비활성화됨'
            autoComplete='off'
          />
        </div>
      </div>

      {/* 모달 컴포넌트 예제 */}
      <div className='mt-16 mb-8 w-full max-w-[500px]'>
        <h1 className='mb-4 text-3xl font-bold'>모달 컴포넌트 샘플</h1>
        <p className='mb-8 text-center'>다양한 모달 스타일을 확인하세요.</p>

        <div className='grid grid-cols-2 gap-4'>
          <button
            className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 active:bg-blue-700'
            onClick={openBasicModal}
          >
            기본 모달
          </button>

          <button
            className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 active:bg-blue-700'
            onClick={openTitleModal}
          >
            제목 있는 모달
          </button>

          <button
            className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 active:bg-blue-700'
            onClick={openButtonModal}
          >
            버튼 있는 모달
          </button>

          <button
            className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 active:bg-blue-700'
            onClick={openCustomModal}
          >
            커스텀 스타일 모달
          </button>

          <button
            className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 active:bg-blue-700'
            onClick={openCloseOptionsModal}
          >
            닫기 옵션 모달
          </button>
        </div>

        {/* 기본 모달 */}
        <BaseModal isOpen={isBasicModalOpen} onClose={closeBasicModal}>
          <div className='text-center'>
            <p>기본 모달입니다.</p>
            <p className='mt-2'>모달 내용을 자유롭게 구성할 수 있습니다.</p>
          </div>
        </BaseModal>

        {/* 제목 있는 모달 */}
        <BaseModal isOpen={isTitleModalOpen} onClose={closeTitleModal} title='모달 제목' size='sm'>
          <div className='text-center'>
            <p>제목이 있는 모달입니다.</p>
            <p className='mt-2'>제목이 상단에 표시됩니다.</p>
          </div>
        </BaseModal>

        {/* 버튼 있는 모달 */}
        <BaseModal
          isOpen={isButtonModalOpen}
          onClose={closeButtonModal}
          title='Are you absolutely sure?'
          size='md'
          positiveButton={{
            text: 'Continue',
            onClick: closeButtonModal,
          }}
          negativeButton={{
            text: 'Cancel',
            onClick: closeButtonModal,
          }}
        >
          <div className='text-left'>
            <p>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </p>
          </div>
        </BaseModal>
      </div>
    </main>
  );
}
