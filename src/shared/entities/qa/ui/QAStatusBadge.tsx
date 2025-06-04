import { QAStatus } from '../types/QA';

interface QAStatusBadgeProps {
  status: QAStatus;
  className?: string;
}

export function QAStatusBadge({ status, className = '' }: QAStatusBadgeProps) {
  const getStatusConfig = (status: QAStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: '답변대기',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      case 'answered':
        return {
          label: '답변완료',
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      default:
        return {
          label: '알 수 없음',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
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
