"use client";

import Image from "next/image";
import Nav from "./components/nav";
import AboutContent from "./components/about-content";
import CompSciContent from "./components/comp-sci-content";
import PhotographyContent from "./components/photography-content";
import ArtContent from "./components/art-content";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useScrollDir from "./components/useScrollDir";

export default function Home() {
  const { ref, inView } = useInView({ threshold: 0.6 }); // Consider the element as in view when 60% of it is visible
  const scrollDir = useScrollDir();

  const animation = () => {
    if (inView && scrollDir === "down") {
      return { rotate: 0 };
    } else if (!inView && scrollDir === "up") {
      return { rotate: 90 };
    } else if (!inView && scrollDir === "down") {
      return { rotate: 90 };
    } else {
      return { rotate: 0 };
    }
  };

  return (
    <main className="min-h-screen bg-black text-[#FAF8F5] font-montserrat font-bold">
      <div className="wrapper">
        {/* Welcome Section */}
        <div className="parallax__group">
          {/* Parallax Layers */}
          <div className="parallax__layer l1 absolute inset-0 bg-[url('/images/l1.png')] bg-center bg-cover transform translate-z-[-600px] z-[1]"></div>
          <div className="parallax__layer l2 absolute inset-0 bg-[url('/images/l2.png')] bg-center bg-cover transform translate-z-[-525px] z-[2]"></div>
          <div className="parallax__layer l3 absolute inset-0 bg-[url('/images/l3.png')] bg-center bg-cover transform translate-z-[-400px] z-[3]"></div>
          <div className="parallax__layer l4 absolute inset-0 bg-[url('/images/l4.png')] bg-center bg-cover transform translate-z-[-250px] z-[4]"></div>
          <div className="parallax__layer l5 absolute inset-0 bg-[url('/images/l5.png')] bg-center bg-cover transform translate-z-[-125px] z-[5]"></div>
          <div className="parallax__layer l6 absolute inset-0 bg-[url('/images/l6.png')] bg-center bg-cover transform translate-z-0 z-[6]"></div>

          {/* Hero Text */}
          <div className="hero-text absolute inset-0">
            {/* Nav bar */}
            <Nav />

            <div className="intro-container">
              <Image
                src="/images/hi-im-apple.png"
                alt="Hi, I'm Apple!"
                width={600}
                height={400}
                className="rounded-lg mb-4 mx-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <section id="get-to-know-me" className="content-section bg-[#0d0713]">
          <AboutContent />
        </section>

        {/* Computer Science Section */}
        <section id="comp-sci" className="content-section bg-[#0d0713]">
          <CompSciContent />
        </section>

        {/* Art & Design Section */}
        <section
          id="art"
          className="content-section bg-[#0d0713] relative overflow-hidden"
        >
          <ArtContent />
        </section>

        {/* Photography Section */}
        <div ref={ref} className="relative">
          <motion.div
            animate={animation()}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              transformOrigin: "bottom right",
            }}
            className="absolute top-[400px] right-0 z-10 w-[250px] hidden md:block"
          >
            <Image
              src="/images/camera.png"
              alt="Camera"
              width={250}
              height={700}
              className="w-full h-auto"
              priority
            />
          </motion.div>

          <section id="photography" className="content-section bg-[#0d0713]">
            <PhotographyContent />
          </section>
        </div>
      </div>
    </main>
  );
}
