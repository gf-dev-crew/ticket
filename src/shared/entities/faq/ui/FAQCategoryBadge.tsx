import { FAQCategory } from '../types/FAQ';

interface FAQCategoryBadgeProps {
  category: FAQCategory;
  className?: string;
}

export function FAQCategoryBadge({ category, className = '' }: FAQCategoryBadgeProps) {
  const getCategoryConfig = (category: FAQCategory) => {
    switch (category) {
      case '계정관리':
        return {
          label: '계정관리',
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case '결제문의':
        return {
          label: '결제문의',
          className: 'bg-purple-100 text-purple-800 border-purple-200',
        };
      case '기술지원':
        return {
          label: '기술지원',
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      case '서비스이용':
        return {
          label: '서비스이용',
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case '기타':
        return {
          label: '기타',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
      default:
        return {
          label: '알 수 없음',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const config = getCategoryConfig(category);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}
