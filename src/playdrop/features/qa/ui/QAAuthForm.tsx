'use client';

import { useState } from 'react';

import { QAList } from './QAList';

export function QAAuthForm() {
  const [authData, setAuthData] = useState({
    phone: '',
    password: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    try {
      // TODO: API 호출 구현
      console.log('Q&A 인증:', authData);

      // 임시로 인증 성공 처리
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Q&A 인증 실패:', error);
      alert('휴대전화번호 또는 비밀번호가 일치하지 않습니다.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleBack = () => {
    setIsAuthenticated(false);
    setAuthData({ phone: '', password: '' });
  };

  if (isAuthenticated) {
    return (
      <div>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-lg font-medium text-gray-900'>내 문의 목록</h3>
          <button
            type='button'
            onClick={handleBack}
            className='text-sm text-gray-500 hover:text-gray-700'
          >
            ← 돌아가기
          </button>
        </div>
        <QAList phone={authData.phone} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-md space-y-6'>
      {/* 휴대전화번호 */}
      <div>
        <label htmlFor='auth-phone' className='mb-2 block text-sm font-medium text-gray-700'>
          휴대전화번호 <span className='text-red-500'>*</span>
        </label>
        <input
          type='tel'
          id='auth-phone'
          name='phone'
          value={authData.phone}
          onChange={handleInputChange}
          required
          pattern='[0-9]{11}'
          className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
          placeholder='01012345678 (숫자만 입력)'
        />
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor='auth-password' className='mb-2 block text-sm font-medium text-gray-700'>
          비밀번호 <span className='text-red-500'>*</span>
        </label>
        <input
          type='password'
          id='auth-password'
          name='password'
          value={authData.password}
          onChange={handleInputChange}
          required
          className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
          placeholder='문의 작성 시 설정한 비밀번호'
        />
      </div>

      {/* 제출 버튼 */}
      <div>
        <button
          type='submit'
          disabled={isAuthenticating}
          className='w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isAuthenticating ? '확인 중...' : '내 문의 확인'}
        </button>
      </div>

      <div className='text-sm text-gray-500'>
        <p>• 문의 작성 시 입력한 휴대전화번호와 비밀번호를 정확히 입력해 주세요.</p>
        <p>• 비밀번호를 잊으신 경우 고객센터로 문의해 주세요.</p>
      </div>
    </form>
  );
}
