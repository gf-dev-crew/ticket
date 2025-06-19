import { useEffect, useState } from 'react';

/**
 * @description 스크롤이 최상단인지 여부를 반환하는 커스텀 훅
 * @returns isScrolled: boolean (최상단이면 false, 스크롤 내리면 true)
 */
const useHeaderLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
};

export default useHeaderLayout;
