"use client";

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { ArrowLeft, GraduationCap, Sparkles, BookOpen } from 'lucide-react'; 
import '../../components/MagicBento.css'; 

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
      className={`${className} magic-bento-card--border-glow particle-container`}
      style={{
        '--glow-x': `${mousePosition.x}px`,
        '--glow-y': `${mousePosition.y}px`,
        // ✅ No ref access in render – just use mousePosition
        '--glow-intensity': mousePosition.x >= 0 ? '1' : '0',
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
    // Outer container for the whole page content
    <div className="bento-section mx-auto pt-12 pb-24 text-white px-4 max-w-4xl"> 
      
      {/* 1. Header Section */}
      <header className="pb-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/#projects" 
            className="text-purple-400 hover:text-purple-300 transition duration-300 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </div>
        
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
            <div className="relative w-full h-full min-h-[400px] rounded-[inherit] overflow-hidden">
              <Image 
                src={item.image} 
                alt="University Campus or School building" 
                fill 
                style={{ objectFit: 'cover' }}
                className="opacity-40 transition duration-500 hover:opacity-50"
              />
                
              {/* Content Overlay */}
              <div className="relative z-10 p-8 bg-black/40 h-full flex flex-col justify-start">
                    
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
  );
}
