import { useEffect, useState } from 'react';

const useScroll = () => {
  const [state, setState] = useState();
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll >= 5 && !state) {
        setState(true);
      } else if (currentScroll <= 4 && state) {
        setState(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [state]);

  return state;
};

export default useScroll;
