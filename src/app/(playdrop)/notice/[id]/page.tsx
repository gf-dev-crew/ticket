import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

/**
 * 공지사항 상세 페이지
 */
export default async function NoticeDetailPage({ params }: Props) {
  const paramsData = await params;
  const id = parseInt(paramsData.id, 10);

  return <section className='mx-auto mt-[80px] w-full'>noticeDetail</section>;
}

/**
 * 정적 메타데이터
 */
export const metadata: Metadata = {
  title: '공지사항 상세 | 앱티피트 서포트',
  description: '앱티마이저의 공지사항 상세 내용을 확인하세요.',
};
