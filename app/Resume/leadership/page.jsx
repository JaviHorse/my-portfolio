"use client";

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Briefcase, ArrowLeft } from 'lucide-react';
import DotGrid from '../../components/DotGrid';
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

// Leadership Data
const leadershipSections = [
  {
    role: 'Team Captain - Taekwondo Varsity',
    organization: 'Ateneo Taekwondo Varsity Team',
    icon: Zap,
    highlights: [
      'I was the **acting Captain** of the Ateneo Taekwondo Varsity Team since my Freshman year, wherein I inspired my teammates to achieve excellence.',
      "I was a **Philippine National Team prospect** but couldn\'t pursue due to academic priorities.",
      'Won many medals for the Ateneo Taekwondo team and I was immediately a **UAAP medalist** during my rookie year.',
      'Established **standardized protocols** for athlete performance tracking and attendance, enhancing overall team discipline and accountability.',
      'Actively participated in all team events which strengthened **team cohesion and morale**.',
    ],
  },
  {
    role: 'Student Government & Finance',
    organization: 'Sanggunian ng mga Mag-aaral (Ateneo Student Government)',
    icon: Briefcase,
    highlights: [
      'I was the Student Academic Subsidy Deputy head for the School of Social Sciences Sanggunian.',
      'Managed a **PHP 385,000 budget** for research and thesis use of students in need of funding.',
      'Actively participated in **Budget Screenings, hearings, and student interviews**.',
      'Promoted academic subsidy initiatives in the School of Social Sciences Sanggunian.',
      'Evaluated subsidy applicants with a **stringent process** to ensure efficient subsidy targeting.',
    ],
  },
];

export default function LeadershipPage() {
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
      <div className="bento-section mx-auto pt-12 pb-24 text-white px-4 max-w-7xl relative z-10"> 
      
      {/* Header Section */}
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
          Leadership <span className="text-purple-500">Experiences</span>
        </h1>
        <p className="text-xl text-gray-400">
          Roles focused on mentoring, project management, and driving team success.
        </p>
      </header>

      {/* CORE LAYOUT: stacked */}
      <div className="flex flex-col gap-8">
        
        {/* TOP ROW: 3 Horizontal Images */}
        <div className="flex space-x-4">
          {/* Taekwondo1 */}
          <div className="relative w-1/3 aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Image 
              src="/Taekwondo1.jpg" 
              alt="Taekwondo action shot 1" 
              fill 
              style={{ objectFit: 'cover' }}
              className="hover:scale-[1.02] transition duration-500 opacity-80"
            />
          </div>
          {/* Taekwondo2 */}
          <div className="relative w-1/3 aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Image 
              src="/Taekwondo2.jpg" 
              alt="Taekwondo action shot 2" 
              fill 
              style={{ objectFit: 'cover' }}
              className="hover:scale-[1.02] transition duration-500 opacity-80"
            />
          </div>
          {/* Taekwondo3 */}
          <div className="relative w-1/3 aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Image 
              src="/Taekwondo3.jpg" 
              alt="Taekwondo team huddle or action shot 3" 
              fill 
              style={{ objectFit: 'cover' }}
              className="hover:scale-[1.02] transition duration-500 opacity-80"
            />
          </div>
        </div>

        {/* Descriptive Text */}
        <div className="p-2 text-md text-gray-500 italic border-t border-b border-gray-800 py-4">
          Visual highlights representing my commitment to <strong>Taekwondo team management</strong> and <strong>Student Government finance leadership</strong>.
        </div>
        
        {/* BOTTOM ROW: 2 Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
          {leadershipSections.map((role, index) => (
            <InteractiveCard 
              key={index}
              className="magic-bento-card !p-6 flex flex-col h-full transition hover:border-purple-600/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-purple-400 flex items-center">
                    <role.icon className="w-5 h-5 mr-3 text-purple-600" />
                    {role.role}
                  </h2>
                  <p className="text-md text-gray-300 italic">{role.organization}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mt-4 mb-3 border-b border-gray-700 pb-1">
                Key Accomplishments
              </h3>
              <ul className="list-none space-y-3 text-gray-400 pl-0 flex-grow">
                {role.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3 text-lg mt-0.5">»</span>
                    <p className="flex-grow">{highlight}</p>
                  </li>
                ))}
              </ul>
            </InteractiveCard>
          ))}
        </div>
      </div>
      </div>
    </main>
  );
}
