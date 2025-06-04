import { FAQStatus } from '../types/FAQ';

interface FAQStatusBadgeProps {
  status: FAQStatus;
  className?: string;
}

export function FAQStatusBadge({ status, className = '' }: FAQStatusBadgeProps) {
  const getStatusConfig = (status: FAQStatus) => {
    switch (status) {
      case 'published':
        return {
          label: '공개',
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'draft':
        return {
          label: '비공개',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
      default:
        return {
          label: '알 수 없음',
          className: 'bg-red-100 text-red-800 border-red-200',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}
