'use client';

import { useState } from 'react';

import { QAAuthForm } from './QAAuthForm';
import { QAForm } from './QAForm';

export function QAPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'view'>('create');

  return (
    <div className='mx-auto max-w-4xl p-6'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>Q&A 문의</h1>
        <p className='text-gray-600'>
          궁금한 점이 있으시면 언제든지 문의해 주세요. 빠른 시간 내에 답변드리겠습니다.
        </p>
      </div>

      {/* 탭 메뉴 */}
      <div className='mb-6 border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8'>
          <button
            type='button'
            onClick={() => setActiveTab('create')}
            className={`border-b-2 px-1 py-2 text-sm font-medium ${
              activeTab === 'create'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            문의하기
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('view')}
            className={`border-b-2 px-1 py-2 text-sm font-medium ${
              activeTab === 'view'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            내 문의 확인
          </button>
        </nav>
      </div>

      {/* 탭 컨텐츠 */}
      <div className='rounded-lg border bg-white p-6 shadow-sm'>
        {activeTab === 'create' ? (
          <div>
            <h2 className='mb-4 text-xl font-semibold text-gray-900'>새 문의 작성</h2>
            <QAForm />
          </div>
        ) : (
          <div>
            <h2 className='mb-4 text-xl font-semibold text-gray-900'>내 문의 확인</h2>
            <p className='mb-6 text-gray-600'>
              문의 작성 시 입력한 휴대전화번호와 비밀번호를 입력해 주세요.
            </p>
            <QAAuthForm />
          </div>
        )}
      </div>
    </div>
  );
}
