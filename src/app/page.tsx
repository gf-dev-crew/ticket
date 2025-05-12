import { Button } from '@/shared/ui';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8'>
      <h1 className='mb-4 text-3xl font-bold'>버튼 컴포넌트 샘플</h1>
      <p className='mb-8 text-center'>다양한 버튼 스타일을 확인하세요.</p>

      <div className='mb-8'>
        <h2 className='mb-4 text-xl font-semibold'>Solid Variant</h2>
        <div className='gap-md flex flex-wrap'>
          <Button variant='solid' color='black' size='md'>
            Black
          </Button>
          <Button variant='solid' color='white' size='md'>
            White
          </Button>
          <Button variant='solid' color='primary' size='md'>
            Primary
          </Button>
          <Button variant='solid' color='secondary' size='md'>
            Secondary
          </Button>
          <Button variant='solid' color='primary' size='md' disabled>
            비활성화
          </Button>
        </div>
      </div>

      <div className='mb-8'>
        <h2 className='mb-4 text-xl font-semibold'>Outline Variant</h2>
        <div className='gap-md flex flex-wrap'>
          <Button variant='outline' color='black' size='md'>
            Black
          </Button>
          <Button variant='outline' color='white' size='md'>
            White
          </Button>
          <Button variant='outline' color='primary' size='md'>
            Primary
          </Button>
          <Button variant='outline' color='secondary' size='md'>
            Secondary
          </Button>
          <Button variant='outline' color='primary' size='md' disabled>
            비활성화
          </Button>
        </div>
      </div>

      <div className='mb-8'>
        <h2 className='mb-4 text-xl font-semibold'>Text Variant</h2>
        <div className='gap-md flex flex-wrap'>
          <Button variant='text' color='black' size='md'>
            Black
          </Button>
          <Button variant='text' color='white' size='md'>
            White
          </Button>
          <Button variant='text' color='primary' size='md'>
            Primary
          </Button>
          <Button variant='text' color='secondary' size='md'>
            Secondary
          </Button>
          <Button variant='text' color='primary' size='md' disabled>
            비활성화
          </Button>
        </div>
      </div>

      <div className='mb-8'>
        <h2 className='mb-4 text-xl font-semibold'>Ghost Variant</h2>
        <div className='gap-md flex flex-wrap'>
          <Button variant='ghost' color='black' size='md'>
            Black
          </Button>
          <Button variant='ghost' color='white' size='md'>
            White
          </Button>
          <Button variant='ghost' color='primary' size='md'>
            Primary
          </Button>
          <Button variant='ghost' color='secondary' size='md'>
            Secondary
          </Button>
          <Button variant='ghost' color='primary' size='md' disabled>
            비활성화
          </Button>
        </div>
      </div>

      <div className='mb-8'>
        <h2 className='mb-4 text-xl font-semibold'>크기 비교</h2>
        <div className='gap-md flex items-center'>
          <Button variant='solid' color='primary' size='sm'>
            Small
          </Button>
          <Button variant='solid' color='primary' size='md'>
            Medium
          </Button>
          <Button variant='solid' color='primary' size='lg'>
            Large
          </Button>
        </div>
      </div>

      <div className='mb-8'>
        <h2 className='mb-4 text-xl font-semibold'>너비 옵션</h2>
        <div className='gap-md flex w-full max-w-md flex-col'>
          <Button variant='solid' color='primary' size='md'>
            기본 버튼
          </Button>
          <Button variant='solid' color='primary' size='md' fullWidth>
            전체 너비 버튼
          </Button>
          <Button variant='solid' color='primary' size='md' width={200}>
            너비 200px
          </Button>
        </div>
      </div>
    </main>
  );
}
