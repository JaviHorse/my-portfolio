"use client";

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { ArrowLeft, Briefcase, CheckCircle } from 'lucide-react'; 
import '../../components/MagicBento.css'; 

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
      className={`${className} magic-bento-card--border-glow particle-container`}
      style={{
        '--glow-x': `${mousePosition.x}px`,
        '--glow-y': `${mousePosition.y}px`,
        // ✅ no ref access during render
        '--glow-intensity': mousePosition.x >= 0 ? '1' : '0',
      }}
    >
      {children}
    </div>
  );
};
// ------------------------------------------

// NEW HOVER IMAGE COMPONENT
const HoverImage = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const objectFitStyle = { 
    objectFit: isHovered ? 'contain' : 'cover',
  };

  return (
    <div 
      className="relative w-full aspect-video rounded-lg overflow-hidden border border-purple-600 shadow-xl transition-all duration-300"
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
    // Outer container for the whole page content
    <div className="bento-section mx-auto pt-12 pb-24 text-white px-4 max-w-6xl"> 
      
      {/* 1. Header Section */}
      <header className="pb-8">
        <div className="mb-6">
          <Link 
            href="/#projects"  // ✅ Back now targets the projects section
            className="text-purple-400 hover:text-purple-300 transition duration-300 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          Professional <span className="text-purple-500">Experience</span>
        </h1>
        <p className="text-xl text-gray-400">
          Internships, key projects, and relevant work history.
        </p>
      </header>

      {/* 2. MAIN LAYOUT GRID: Splits the content 50/50 on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT COLUMN: INTERACTIVE CARD */}
        <div className="flex flex-col space-y-8">
          {experienceDetails.map((item, index) => (
            <InteractiveCard 
              key={index}
              className="magic-bento-card !p-8 flex flex-col h-full transition hover:border-purple-600/50"
            >
              {/* Top Row: Role, Company, Dates */}
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
              
              {/* Details: Summary and Contributions */}
              <div className="pt-2">
                {/* Summary */}
                <p className="text-gray-300 mb-6 italic border-l-4 border-purple-500/50 pl-3">
                  {item.summary}
                </p>

                {/* Key Contributions */}
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

        {/* RIGHT COLUMN: STACKED PICTURES */}
        <div className="flex flex-col space-y-4 pt-4 lg:pt-0">
          <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-2">
            Hover over the pics 😁
          </h2>
          
          <HoverImage 
            src={experienceDetails[0].image1} 
            alt="Experience photo 1" 
          />
          
          <HoverImage 
            src={experienceDetails[0].image2} 
            alt="Experience photo 2" 
          />
        </div>

      </div>
    </div>
  );
}
