"use client";

import Draggable from "react-draggable";
import Link from "next/link";
import PageTitle from "./page-title";
import { useState, useEffect } from "react";
import Image from "next/image";
import { withBasePath } from "../utils/basePath";
import { useScreenSize } from "../hooks/useScreenSize";

interface ArtItem {
  id: number;
  title: string;
  alt: string;
  description: string;
  src: string;
  rotation: number;
  zIndex: number;
  w: number;
  h: number;
  initialPosition: {
    x: number;
    y: number;
  };
}

export default function ArtContent() {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useScreenSize();

  useEffect(() => {
    const updateSize = () => {
      const container = document.querySelector(".max-w-6xl");
      if (container) {
        setContainerSize({
          width: container.clientWidth,
          height: 600,
        });
        setIsLoaded(true);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(updateSize);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // State for managing art items
  const [artItems, setArtItems] = useState<ArtItem[]>([
    {
      id: 1,
      title: "Descarga Poster",
      alt: "Descarga Poster",
      description: "Created with Canva. Used to promote a school event.",
      src: withBasePath("/images/a1.png"),
      rotation: -5,
      zIndex: 1,
      w: 200,
      h: 300,
      initialPosition: { x: 0.05, y: 0.05 },
    },
    {
      id: 2,
      title: "Short Animation",
      alt: "Short Animation",
      description: "GIF created with Procreate.",
      src: withBasePath("/images/a3.png"),
      rotation: -2,
      zIndex: 1,
      w: 150,
      h: 150,
      initialPosition: { x: 0.35, y: 0.1 },
    },
    {
      id: 3,
      title: "Vector-style Art",
      alt: "Vector-style Art",
      description: "Created with Photoshop (Used for this website).",
      src: withBasePath("/images/a2.jpg"),
      rotation: 3,
      zIndex: 1,
      w: 250,
      h: 150,
      initialPosition: { x: 0.5, y: 0.2 },
    },
    {
      id: 4,
      title: "Head study",
      alt: "Head study",
      description:
        "A study done to better understand human heads and color layering.",
      src: withBasePath("/images/a4.png"),
      rotation: 4,
      zIndex: 1,
      w: 150,
      h: 150,
      initialPosition: { x: 0.65, y: 0.6 },
    },
    {
      id: 5,
      title: "Jellyfish",
      alt: "Jellyfish",
      description: "Digital drawing",
      src: withBasePath("/images/a5.png"),
      rotation: -3,
      zIndex: 1,
      w: 200,
      h: 200,
      initialPosition: { x: 0.2, y: 0.3 },
    },
    {
      id: 6,
      title: "Mixed Media Campaign",
      alt: "Mixed Media Campaign",
      description: "Used to promote a campaign for a good cause.",
      src: withBasePath("/images/a6.png"),
      rotation: 3,
      zIndex: 1,
      w: 200,
      h: 250,
      initialPosition: { x: 0.35, y: 0.4 },
    },
    {
      id: 7,
      title: "Hands",
      alt: "Hands",
      description: "Mixed media art using ink and guoache.",
      src: withBasePath("/images/a7.png"),
      rotation: -3,
      zIndex: 1,
      w: 150,
      h: 180,
      initialPosition: { x: 0, y: 0.5 },
    },
    {
      id: 8,
      title: "Blood, sweat and tears",
      alt: "Blood, sweat and tears",
      description: "Ink drawing of a drago; won an art competition.",
      src: withBasePath("/images/a8.jpg"),
      rotation: -4,
      zIndex: 1,
      w: 200,
      h: 200,
      initialPosition: { x: 0.75, y: 0.05 },
    },
    {
      id: 9,
      title: "Avatar",
      alt: "Avatar",
      description: "Charicature study of characters from Avatar.",
      src: withBasePath("/images/a9.png"),
      rotation: -3,
      zIndex: 1,
      w: 150,
      h: 150,
      initialPosition: { x: 0.6, y: 0.35 },
    },
    {
      id: 10,
      title: "Ghibli",
      alt: "Ghibli",
      description: "Guoache painting of a customized Ghibli scene.",
      src: withBasePath("/images/a10.png"),
      rotation: -3,
      zIndex: 1,
      w: 150,
      h: 150,
      initialPosition: { x: 0.25, y: 0.7 },
    },
  ]);

  // Function to bring clicked item to front
  const bringToFront = (id: number) => {
    setArtItems((prevItems) => {
      const maxZ = Math.max(...prevItems.map((item) => item.zIndex));
      return prevItems.map((item) =>
        item.id === id ? { ...item, zIndex: maxZ + 1 } : item
      );
    });
  };

  // Calculate actual position based on container size
  const getActualPosition = (item: ArtItem) => {
    return {
      x: containerSize.width * item.initialPosition.x,
      y: containerSize.height * item.initialPosition.y,
    };
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === artItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <PageTitle title="Art Portfolio" />

      <div className="max-w-6xl mx-7">
        {/* Mobile Carousel View */}
        <div className={`${isMobile ? "block" : "hidden"} relative mb-12`}>
          <div className="carousel-container w-full relative overflow-hidden">
            <div
              className="carousel flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {artItems.map((item) => (
                <div
                  key={item.id}
                  className="carousel-item w-full flex-shrink-0 flex justify-center items-center px-4"
                >
                  <div className="bg-[#1a1a1a] rounded-lg shadow-md w-full max-w-sm">
                    <div className="relative aspect-square">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover rounded-t-lg"
                        priority
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-sm text-[#c1b7e190] font-thin">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Now outside the carousel container */}
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

        {/* Desktop Draggable View */}
        <div
          className={`${
            !isMobile ? "block" : "hidden"
          } relative h-[600px] mb-12`}
        >
          {isLoaded &&
            artItems.map((item) => (
              <Draggable
                key={item.id}
                defaultPosition={getActualPosition(item)}
                onStart={() => bringToFront(item.id)}
                bounds="parent"
              >
                <div
                  className="absolute cursor-move select-none"
                  style={{
                    transform: `rotate(${item.rotation}deg)`,
                    zIndex: item.zIndex,
                  }}
                >
                  <div
                    className="group relative"
                    style={{
                      transform: `rotate(${item.rotation}deg)`,
                    }}
                  >
                    {/* Art Frame */}
                    <div
                      className="bg-[#1a1a1a] shadow-lg transition-transform duration-200 hover:shadow-xl"
                      style={{ width: `${item.w}px`, height: `${item.h}px` }}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.w}
                        height={item.h}
                        className="object-cover w-full h-full"
                        priority
                      />
                    </div>

                    {/* Hover Info */}
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-[#e0dde9]">{item.title}</p>
                        <p className="text-[#c1b7e190] text-sm font-thin">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Draggable>
            ))}

          {/* Centered View More Art Button - Only show on desktop */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <Link
                href="https://www.instagram.com/tarts_.4/"
                target="_blank"
                className="btn bg-[#0d0713]/90 hover:bg-[#c1b7e1]"
              >
                View More Art
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-[#c1b7e190] mb-4">
            {isMobile ? (
              <Link
                href="https://www.instagram.com/tarts_.4/"
                target="_blank"
                className="hover:text-[#c1b7e1] transition-colors"
              >
                Click here to view more art.
              </Link>
            ) : (
              "Drag the artworks around to explore. Click to bring them to the front."
            )}
          </p>
        </div>
      </div>
    </>
  );
}
