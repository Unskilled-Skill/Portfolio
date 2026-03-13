import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useSmoothScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = useCallback(
    (id: string) => {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: id } });
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [location.pathname, navigate],
  );

  const scrollToTop = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, navigate]);

  return { scrollTo, scrollToTop };
}
