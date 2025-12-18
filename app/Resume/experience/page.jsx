"use client";

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, CheckCircle } from 'lucide-react';
import DotGrid from '../../components/DotGrid';
import '../../components/ChromaGrid.css'; 

// --- Reusable Interactive Card Component (FIXED) ---
const InteractiveCard = ({ children, className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: -200, y: -200 }); 
  }, []);

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} chroma-card`}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}
    >
      {children}
    </div>
  );
};
// ------------------------------------------

// NEW HOVER IMAGE COMPONENT
const HoverImage = ({ src, alt, className = '', plain = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const objectFitStyle = { 
    objectFit: isHovered ? 'contain' : 'cover',
  };

  return (
    <div 
      className={`${
        plain
          ? 'relative w-full transition-all duration-300'
          : 'relative w-full rounded-lg overflow-hidden border border-purple-600 shadow-xl transition-all duration-300'
      } ${className}`}
      style={{ aspectRatio: '3 / 4' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src} 
        alt={alt} 
        fill 
        style={objectFitStyle}
        className="transition-all duration-300" 
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center text-white/90 text-sm font-semibold transition-opacity duration-300">
        <span className="p-2 border border-white/50 rounded-md">
          View Full Image
        </span>
      </div>
    </div>
  );
};
// ------------------------------------------

// EXPERIENCE DATA
const experienceDetails = [
  {
    role: 'Software Engineering Intern – Full-Stack',
    company: 'Synpulse Philippines',
    dates: 'Nov 2025 – Jan 2026',
    Icon: Briefcase, 
    summary: 'Developed the core notification flow for an internal safety platform enabling automated alerts, real-time response tracking, and employee status updates.',
    contributions: [
      'Built full-stack features using Next.js, React, Prisma, PostgreSQL, integrated with Spring Boot backend services.',
      'Worked with backend engineers to improve APIs, schemas, and fix SSR and routing issues.',
      'Strengthened team workflows by resolving Git PR and merge issues during fast-paced development.',
    ],
    image1: '/Experience1.jpg', 
    image2: '/Experience2.jpg', 
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* DotGrid Background */}
      <DotGrid
        className="z-0 opacity-45"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
        dotSize={12}
        gap={36}
        baseColor="#003344"
        activeColor="#40ffaa"
        proximity={180}
        shockRadius={200}
        shockStrength={8}
        speedTrigger={120}
      />
      
      {/* Content */}
      <div className="bento-section mx-auto pt-24 pb-24 text-white px-4 max-w-6xl relative z-10"> 
      
      {/* 1. Header Section */}
      <header className="pb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          Professional <span className="text-purple-500">Experience</span>
        </h1>
        <p className="text-xl text-gray-400">
          Internships, key projects, and relevant work history.
        </p>
      </header>

      {/* 2. MAIN LAYOUT GRID: Five-column layout on large screens (images sandwich the bento) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* LEFT: Image 1 */}
        <div className="flex flex-col space-y-4 pt-4 lg:pt-0 lg:col-span-1">
          <HoverImage 
            src={experienceDetails[0].image1} 
            alt="Experience photo 1"
            className="h-80"
            plain={true}
          />

        </div>

        {/* MIDDLE: Bento card */}
        <div className="flex flex-col lg:col-span-3 min-h-0">
          {experienceDetails.map((item, index) => (
            <InteractiveCard 
              key={index}
              className="magic-bento-card !p-8 flex flex-col flex-1 min-h-0 transition hover:border-purple-600/50 overflow-auto"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-gray-700 pb-4">
                <div className="mb-2 md:mb-0">
                  <h2 className="text-3xl font-bold text-purple-400 flex items-center">
                    <item.Icon className="w-6 h-6 mr-3 text-purple-600" />
                    {item.role}
                  </h2>
                  <p className="text-xl text-gray-300 italic">{item.company}</p>
                </div>
                <p className="text-md font-semibold text-gray-500 shrink-0">{item.dates}</p>
              </div>

              <div className="pt-2">
                <p className="text-gray-300 mb-6 italic border-l-4 border-purple-500/50 pl-3">
                  {item.summary}
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Key Deliverables & Stack
                  </h3>
                  <ul className="list-none space-y-2 text-gray-400 pl-0">
                    {item.contributions.map((contribution, cIndex) => (
                      <li key={cIndex} className="flex items-start">
                        <span className="text-gray-500 font-bold mr-2 text-lg leading-none">▪</span>
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* RIGHT: Image 2 */}
        <div className="flex flex-col lg:col-span-1">
          <HoverImage 
            src={experienceDetails[0].image2} 
            alt="Experience photo 2"
            className="h-80"
            plain={true}
          />
        </div>
      </div>
      </div>
    </main>
  );
}
