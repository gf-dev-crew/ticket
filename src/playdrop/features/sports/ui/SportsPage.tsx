'use client';

import { useState } from 'react';

import { PageHeader, SideFilter, ToggleSwitch } from '@/playdrop/shared/ui';

type ViewMode = 'list' | 'calendar';

const VIEW_OPTIONS = [
  { value: 'list', label: '리스트' },
  { value: 'calendar', label: '캘린더' },
];

export default function SportsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleViewModeChange = (value: string) => {
    setViewMode(value as ViewMode);
  };

  return (
    <>
      <PageHeader title='Sports' />
      <main className='gap-4xl flex min-h-0 flex-1'>
        <SideFilter />
        <section className='flex-1'>
          <div className='mb-4xl gap-2xl flex flex-col'>
            <div className='flex items-center justify-between'>
              <ToggleSwitch
                options={VIEW_OPTIONS}
                defaultValue='list'
                onChange={handleViewModeChange}
              />
            </div>

            {/* 컨텐츠 영역 */}
            <div className='rounded-lg border border-gray-200 p-6'>
              {viewMode === 'list' ? (
                <div className='text-center text-gray-500'>
                  <p className='mb-2 text-lg font-medium'>List View</p>
                  <p>스포츠 이벤트 목록이 여기에 표시됩니다.</p>
                </div>
              ) : (
                <div className='text-center text-gray-500'>
                  <p className='mb-2 text-lg font-medium'>Calendar View</p>
                  <p>스포츠 이벤트 캘린더가 여기에 표시됩니다.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
