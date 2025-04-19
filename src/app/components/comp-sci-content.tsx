"use client";

import { useState } from "react";
import PageTitle from "./page-title";
import Image from "next/image";

const projects = [
  {
    id: 1,
    name: "Worthy",
    description:
      "A full-stack web application built with Next.js that enforces sustainability by encouraging decluttering through bartering serving hosting 2000+ users. Features include authentication, real-time chat, and a responsive design.",
    image: "/images/worthy.png",
    url: "https://worthy.mono.sg/",
  },
  {
    id: 2,
    name: "Portfolio",
    description:
      "A web application built with TypeScript, serving as my personal portfolio to showcase my technical skills, projects, and experience in modern web development.",
    image: "/images/portfolio.png",
    url: "https://tapple214.github.io/apple-portfolio/",
  },
];

export default function CompSciContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = projects.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <PageTitle title="Tech Projects" />

      <div className="carousel-container w-full relative overflow-hidden">
        <div
          className="carousel flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="carousel-item w-full flex-shrink-0 flex justify-center px-4"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <div className="project-card bg-[#1a1a1a] rounded-lg shadow-md flex w-full max-w-5xl hover:bg-[#242424] transition-colors duration-300">
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-3/4 h-[300px] md:h-[450px] flex items-center justify-center bg-[#2a2a2a] rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={250}
                        height={300}
                        className="object-cover w-full h-full"
                        priority
                      />
                    </div>

                    {/* Description box */}
                    <div className="w-full md:w-1/4 p-4 border-t md:border-l md:border-t-0 border-[#2a2a2a] rounded-b-lg md:rounded-r-lg">
                      <h3 className="text-xl mb-2">{project.name}</h3>
                      <p className="text-sm text-[#c1b7e190] font-thin">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Nav Buttons BELOW carousel */}
        <div className="carousel-nav mt-4 flex justify-center">
          <button
            onClick={handlePrev}
            className="btn mr-2 bg-[#2a2a2a] text-white px-4 py-2 rounded hover:bg-[#3a3a3a]"
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

        <div className="text-center mt-8">
          <p className="text-sm text-[#c1b7e190] mb-4">
            Click the items to view the projects.
          </p>
        </div>
      </div>
    </>
  );
}
