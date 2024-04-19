import { useState, useEffect } from 'react';

export default function ToTop() {
  const [isVisible, setIsVisible] = useState(false);;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollLimit = 100;
      setIsVisible(scrollTop > scrollLimit);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible &&
    <div id="scrollTop" onClick={scrollToTop} className={`rounded-full h-10 w-10 bg-black cursor-pointer fixed right-10 bottom-10 flex items-center justify-center`}>
        <img src="arrow-up_white.svg" alt=""/>
    </div>
  );
};
