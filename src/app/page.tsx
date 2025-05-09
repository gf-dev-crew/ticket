import { Button } from '@/shared/ui';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8'>
      <h1 className='mb-4 text-3xl font-bold'>안녕하세요</h1>
      <p className='text-center'>이곳에 내용을 추가하세요.</p>
      <Button>버튼</Button>
    </main>
  );
}
