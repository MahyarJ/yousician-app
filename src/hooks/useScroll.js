import { useEffect } from 'react';
import listenToScroll from '../helpers/listenToScroll';

const useScroll = (setIsLoading) => {
  useEffect(() => {
    window.addEventListener('scroll', () => listenToScroll(setIsLoading));
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, [setIsLoading]);
};

export default useScroll;
