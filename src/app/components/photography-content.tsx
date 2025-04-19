"use client";

import PageTitle from "./page-title";
import Image from "next/image";
import { useState, useEffect } from "react";
import { withBasePath } from "../utils/basePath";

const photos = [
  {
    id: 1,
    src: withBasePath("/images/p1.jpg"),
    alt: "Camping Photoshoot",
    className: "col-span-1 md:col-span-2 h-[400px] md:h-auto md:row-span-3",
    showInMobile: true,
  },
  {
    id: 2,
    src: withBasePath("/images/p2.png"),
    alt: "Cinematic Back Shot",
    className: "col-span-1 md:col-span-2 h-[300px] md:h-auto md:row-span-1",
    showInMobile: true,
  },
  {
    id: 3,
    src: withBasePath("/images/p3.jpg"),
    alt: "Birthday Photoshoot",
    className: "col-span-1 md:col-span-2 h-[300px] md:h-auto md:row-span-1",
    showInMobile: true,
  },
  {
    id: 4,
    src: withBasePath("/images/p4.png"),
    alt: "Lilies",
    className: "col-span-1 md:col-span-4 h-[400px] md:h-auto md:row-span-2",
    showInMobile: false,
  },
  {
    id: 5,
    src: withBasePath("/images/p5.jpg"),
    alt: "Sky",
    className: "col-span-1 md:col-span-3 h-[300px] md:h-auto md:row-span-2",
    showInMobile: true,
  },
  {
    id: 6,
    src: withBasePath("/images/p6.png"),
    alt: "Editorial Photoshoot",
    className: "col-span-1 md:col-span-2 h-[400px] md:h-auto md:row-span-2",
    showInMobile: true,
  },
  {
    id: 7,
    src: withBasePath("/images/p7.jpg"),
    alt: "Balcony Shot",
    className: "col-span-1 h-[300px] md:h-auto md:row-span-1",
    showInMobile: true,
  },
  {
    id: 8,
    src: withBasePath("/images/p8.png"),
    alt: "Graduation Photoshoot",
    className: "col-span-1 h-[300px] md:h-auto md:row-span-1",
    showInMobile: true,
  },
];

export default function PhotographyContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <PageTitle title="Photography Gallery" />
      <div className="max-w-7xl mx-4 md:mx-7 mb-10 pb-5">
        {/* Mobile Carousel View */}
        <div className={`${isMobile ? "block" : "hidden"} relative mb-12`}>
          <div className="carousel-container w-full relative overflow-hidden">
            <div
              className="carousel flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {photos
                .filter((photo) => photo.showInMobile)
                .map((photo) => (
                  <div
                    key={photo.id}
                    className="carousel-item w-full flex-shrink-0 flex justify-center items-center px-4"
                  >
                    <div className="bg-[#1a1a1a] rounded-lg shadow-md w-full aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover rounded-lg"
                        priority
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="btn bg-[#2a2a2a] text-white px-4 py-2 rounded hover:bg-[#3a3a3a]"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="btn bg-[#2a2a2a] text-white px-4 py-2 rounded hover:bg-[#3a3a3a]"
            >
              →
            </button>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div
          className={`${
            !isMobile ? "grid" : "hidden"
          } grid-cols-6 gap-4 auto-rows-[200px]`}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`${photo.className} group relative overflow-hidden rounded-lg bg-[#1a1a1a] cursor-pointer hover:opacity-90 transition-opacity`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
