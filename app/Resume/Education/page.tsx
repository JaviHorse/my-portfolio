"use client";

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { GraduationCap, Sparkles, BookOpen } from 'lucide-react';
import DotGrid from '../../components/DotGrid';
import '../../components/ChromaGrid.css'; 

// --- Reusable Interactive Card Component (FIXED) ---
const InteractiveCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
// ------------------------------------------


const educationDetails = [
  {
    institution: 'Ateneo de Manila University',
    degree: 'B.S. Computer Science with Specialization in Data Science and Analytics',
    dates: '2023 - 2028',
    Icon: GraduationCap, 
    funFacts: [
      '100% Scholarship Grant (AY 2023-2028)',
      'Shiftee from AB Economics',
      '0 coding experience when I shifted',
      'Got addicted to coding',
      'Curriculum leaning toward Game Development',
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Database Systems',
      'Probability & Statistics',
      'Discreet Math',
      'Physics',
      'Decentralized Applications and Blockchain',
    ],
    image: '/school.jpg' 
  },
];


export default function EducationPage() {
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
      <div className="bento-section mx-auto pt-24 pb-24 text-white px-4 max-w-4xl relative z-10"> 
      
      {/* 1. Header Section */}
      <header className="pb-8">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          Academic <span className="text-purple-500">Foundation</span>
        </h1>
        <p className="text-xl text-gray-400">
          My formal education, specialized coursework, and FunFacts!
        </p>
      </header>

      {/* 2. Education Cards (Single Column) */}
      <div className="flex flex-col space-y-8">
        
        {educationDetails.map((item, index) => (
          <InteractiveCard 
            key={index}
            className="magic-bento-card p-0 flex flex-col h-full transition hover:border-purple-600/50"
          >
            {/* Full Background Image Container */}
            <div className="relative w-full h-auto md:h-full md:min-h-[400px] rounded-[inherit] overflow-hidden">
              <Image 
                src={item.image} 
                alt="University Campus or School building" 
                fill 
                style={{ objectFit: 'cover' }}
                className="opacity-40 transition duration-500 hover:opacity-50"
              />
                
              {/* Content Overlay */}
              <div className="relative z-10 p-8 bg-black/40 flex flex-col justify-start">
                    
                {/* Top Row: Institution, Degree, Dates */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-500/50 pb-4">
                  <div className="mb-2 md:mb-0">
                    <h2 className="text-3xl font-bold text-purple-300 flex items-center">
                      <item.Icon className="w-6 h-6 mr-3 text-purple-400" />
                      {item.institution}
                    </h2>
                    <p className="text-xl text-gray-200 italic">{item.degree}</p>
                  </div>
                  <p className="text-md font-semibold text-gray-400 shrink-0">{item.dates}</p>
                </div>
                    
                {/* Details: Fun Facts and Coursework */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        
                  {/* Left Column: Fun Facts */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                      Fun Facts
                    </h3>
                    <ul className="list-none space-y-2 text-gray-300 pl-0">
                      {item.funFacts.map((fact, hIndex) => (
                        <li key={hIndex} className="flex items-start">
                          <span className="text-purple-400 font-bold mr-2 text-lg leading-none">»</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Key Coursework */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                      Key Coursework
                    </h3>
                    <ul className="list-none space-y-2 text-gray-300 pl-0">
                      {item.coursework.map((course, cIndex) => (
                        <li key={cIndex} className="flex items-start">
                          <span className="text-gray-400 font-bold mr-2 text-lg leading-none">▪</span>
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </InteractiveCard>
        ))}
        
      </div>
      </div>
    </main>
  );
}
