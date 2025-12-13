"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slideshowImages = ["/me.jpg", "/me2.jpg", "/me3.jpg", "/me4.jpg"];

const SLIDE_DURATION = 4500;

export default function ImageSlideshow({ mainImageAlt = "Portrait" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center group">
      <div className="relative w-[260px] h-[340px] md:w-[300px] md:h-[400px] overflow-hidden rounded-2xl border border-white/10 z-10 transition duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_0_80px_rgba(64,255,170,0.3)]">
        {slideshowImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <Image
              src={src}
              alt={index === currentIndex ? mainImageAlt : `Slideshow image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 260px, 300px"
              className="object-cover shadow-[0_0_60px_rgba(64,255,170,0.15)] group-hover:translate-y-[-5px] group-hover:rotate-1 transition duration-500 ease-out"
              priority={src === slideshowImages[0]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
