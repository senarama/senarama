import { useEffect } from 'react';

const initialTitle = 'SENARAMA';

const useTitle = (title = initialTitle) => {
  useEffect(() => {
    document.title = title;
    return () => { document.title = initialTitle; };
  }, [title]);
};

export default useTitle;
