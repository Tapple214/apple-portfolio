import { useEffect, useState } from "react";

export default function useScrollDir() {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDir = () => {
      const currentScrollY = window.pageYOffset;
      if (Math.abs(currentScrollY - lastScrollY) < 5) return; // avoid small scroll jitter

      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return scrollDir;
}
