import { useCallback, useState } from 'react';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  maxSizeInMB?: number;
  className?: string;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  maxSizeInMB = 10,
  className = '',
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const validFiles: File[] = [];
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      Array.from(files).forEach((file) => {
        // 이미지 파일 형식 검증
        if (!file.type.startsWith('image/')) {
          alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
          return;
        }

        // 파일 크기 검증
        if (file.size > maxSizeInBytes) {
          alert(`${file.name}의 크기가 ${maxSizeInMB}MB를 초과합니다.`);
          return;
        }

        validFiles.push(file);
      });

      const newImages = [...images, ...validFiles].slice(0, maxImages);
      onImagesChange(newImages);
    },
    [images, maxImages, maxSizeInMB, onImagesChange],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 업로드 영역 */}
      <div
        className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={(e) => handleFiles(e.target.files)}
          className='hidden'
          id='image-upload'
        />
        <label htmlFor='image-upload' className='cursor-pointer'>
          <div className='space-y-2'>
            <div className='text-gray-400'>
              <svg
                className='mx-auto h-12 w-12'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 48 48'
              >
                <path
                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div>
              <span className='font-medium text-blue-600'>클릭하여 업로드</span>
              <span className='text-gray-500'> 또는 드래그앤드롭</span>
            </div>
            <p className='text-sm text-gray-500'>
              최대 {maxImages}개, {maxSizeInMB}MB 이하의 이미지 파일
            </p>
          </div>
        </label>
      </div>

      {/* 업로드된 이미지 미리보기 */}
      {images.length > 0 && (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
          {images.map((image, index) => (
            <div key={index} className='group relative'>
              <img
                src={URL.createObjectURL(image)}
                alt={`업로드 이미지 ${index + 1}`}
                className='h-24 w-full rounded-lg border object-cover'
              />
              <button
                type='button'
                onClick={() => removeImage(index)}
                className='absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white transition-colors hover:bg-red-600'
              >
                ×
              </button>
              <div className='bg-opacity-50 absolute right-0 bottom-0 left-0 truncate rounded-b-lg bg-black p-1 text-xs text-white'>
                {image.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 업로드 상태 */}
      <div className='text-sm text-gray-500'>
        {images.length}/{maxImages}개 이미지 선택됨
      </div>
    </div>
  );
}
