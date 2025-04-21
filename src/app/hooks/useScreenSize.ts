import { useState, useEffect } from 'react';

export const useScreenSize = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [breakpoint]);

  return isMobile;
}; 