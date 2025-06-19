'use client';

import { useState } from 'react';

import { ImageUpload } from '@/shared/ui/ImageUpload/ImageUpload';

export function QAForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    title: '',
    content: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: API 호출 구현
      console.log('Q&A 작성:', { ...formData, images });
      alert('문의가 성공적으로 등록되었습니다.');

      // 폼 초기화
      setFormData({
        name: '',
        phone: '',
        password: '',
        title: '',
        content: '',
      });
      setImages([]);
    } catch (error) {
      console.error('Q&A 작성 실패:', error);
      alert('문의 등록에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* 이름 */}
        <div>
          <label htmlFor='name' className='mb-2 block text-sm font-medium text-gray-700'>
            이름 <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
            className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
            placeholder='이름을 입력해 주세요'
          />
        </div>

        {/* 휴대전화번호 */}
        <div>
          <label htmlFor='phone' className='mb-2 block text-sm font-medium text-gray-700'>
            휴대전화번호 <span className='text-red-500'>*</span>
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            required
            pattern='[0-9]{11}'
            className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
            placeholder='01012345678 (숫자만 입력)'
          />
          <p className='mt-1 text-sm text-gray-500'>
            문의 확인 시 사용됩니다. 숫자만 입력해 주세요.
          </p>
        </div>
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-700'>
          비밀번호 <span className='text-red-500'>*</span>
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          required
          minLength={4}
          className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
          placeholder='문의 확인용 비밀번호 (4자리 이상)'
        />
        <p className='mt-1 text-sm text-gray-500'>
          문의 확인 시 사용됩니다. 4자리 이상 입력해 주세요.
        </p>
      </div>

      {/* 제목 */}
      <div>
        <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-700'>
          제목 <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleInputChange}
          required
          className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
          placeholder='문의 제목을 입력해 주세요'
        />
      </div>

      {/* 내용 */}
      <div>
        <label htmlFor='content' className='mb-2 block text-sm font-medium text-gray-700'>
          내용 <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='content'
          name='content'
          value={formData.content}
          onChange={handleInputChange}
          required
          rows={6}
          className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
          placeholder='문의 내용을 자세히 입력해 주세요'
        />
      </div>

      {/* 이미지 업로드 */}
      <div>
        <label className='mb-2 block text-sm font-medium text-gray-700'>
          첨부 이미지 (선택사항)
        </label>
        <ImageUpload images={images} onImagesChange={setImages} maxImages={5} maxSizeInMB={10} />
      </div>

      {/* 제출 버튼 */}
      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isSubmitting ? '등록 중...' : '문의 등록'}
        </button>
      </div>
    </form>
  );
}
