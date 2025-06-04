'use client';

interface BoardFilterProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
}

/**
 * 재사용 가능한 게시판 필터 컴포넌트
 */
export function BoardFilter({
  categories,
  activeCategory,
  onChange,
  className = '',
}: BoardFilterProps) {
  return (
    <ul className={`mb-xl gap-md flex flex-row text-xl font-normal text-gray-400 ${className}`}>
      {categories.map((category) => (
        <li
          key={category}
          className={`cursor-pointer ${activeCategory === category ? 'font-medium text-black' : ''}`}
          onClick={() => onChange(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
}
