import { useEffect } from "react";
import { useState } from "react";
import PageTitle from "./page-title";
import Link from "next/link";

export default function Nav() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };    

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <nav className="absolute w-full top-4">
      <ul className="flex justify-between items-start px-4 text-base w-full">
        {/* Left side - Portfolio title */}
        <li className="pt-1 ps-4">
          <PageTitle title="Portfolio" />
        </li>

        {/* Right side - Navigation links */}
        <div className="flex space-x-6 items-center me-5">
          <li>
            <Link
              href="#comp-sci"
              className="hover:text-[#e0dde9] transition-colors text-[#c1b7e1] font-thin"
            >
             {isMobile ? 'Tech' : 'Tech Projects'} 
            </Link>
          </li>
          <li>
            <Link
              href="#art"
              className="hover:text-[#e0dde9] transition-colors text-[#c1b7e1] font-thin"
            >
              {isMobile ? 'Art' : 'Art Portfolio'}
            </Link>
          </li>
          <li>
            <Link
              href="#photography"
              className="hover:text-[#e0dde9] transition-colors text-[#c1b7e1] font-thin"
            >
              {isMobile ? 'Photography' : 'Photography Gallery'}
            </Link>
          </li>
          <li>
            <Link href="#get-to-know-me" className="btn">
            {isMobile ? 'Me' : 'About Me'}
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
