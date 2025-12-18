"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Briefcase } from 'lucide-react';
import DotGrid from '../../components/DotGrid';
import '../../components/ChromaGrid.css'; 

// --- Reusable Interactive Card Component ---
const InteractiveCard = ({ children, className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const contentRef = useRef(null);

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

  // If the card is marked with `stretch-height`, ensure its minHeight always
  // fits the inner content to avoid clipping on tablet/iPad sizes.
  useEffect(() => {
    if (!className || !className.includes('stretch-height')) return;
    if (!cardRef.current || !contentRef.current) return;

    const updateMinHeight = () => {
      if (!cardRef.current || !contentRef.current) return;
      const computed = window.getComputedStyle(cardRef.current);
      const baseMin = parseFloat(computed.minHeight) || 0;
      const contentH = contentRef.current.scrollHeight || 0;
      const paddingBuffer = 24; // extra spacing to avoid tight fit
      const newMin = Math.max(baseMin, contentH + paddingBuffer);
      cardRef.current.style.minHeight = `${newMin}px`;
    };

    updateMinHeight();
    const ro = new ResizeObserver(updateMinHeight);
    ro.observe(contentRef.current);
    window.addEventListener('resize', updateMinHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMinHeight);
    };
  }, [className]);

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // ✅ CHANGED: allow scrolling behavior to work inside cleanly
      className={`${className} chroma-card`}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}
    >
      {/* make THIS the scroll area */}
      <div
        ref={contentRef}
        className="interactive-card-inner"
        style={{
          maxHeight: "100%",        
          overflowY: "auto",         
          overscrollBehavior: "contain", //prevents weird parent scroll bounce
          paddingRight: "6px",       //gives space so scrollbar doesn't cover text
        }}
      >
        {children}
      </div>
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
      'I was the acting Captain of the Ateneo Taekwondo Varsity Team since my Freshman year, wherein I inspired my teammates to achieve excellence.',
      "I was a Philippine National Team prospect but couldn\'t pursue due to academic priorities.",
      'Won many medals for the Ateneo Taekwondo team and I was immediately a UAAP medalist during my rookie year.',
      'Established standardized protocols for athlete performance tracking and attendance, enhancing overall team discipline and accountability.',
      'Actively participated in all team events which strengthened team cohesion and morale.',
    ],
  },
  {
    role: 'Student Government & Finance',
    organization: 'Sanggunian ng mga Mag-aaral (Ateneo Student Government)',
    icon: Briefcase,
    highlights: [
      'I was the Student Academic Subsidy Deputy head for the School of Social Sciences Sanggunian.',
      'Managed a PHP 385,000 budget for research and thesis use of students in need of funding.',
      'Actively participated in Budget Screenings, hearings, and student interviews.',
      'Promoted academic subsidy initiatives in the School of Social Sciences Sanggunian.',
      'Evaluated subsidy applicants with a stringent process to ensure efficient subsidy targeting.',
    ],
  },
];

export default function LeadershipPage() {
  // Keep two-column layout until viewport becomes too short to display content comfortably.
  const [isTwoCol, setIsTwoCol] = useState(true);

  useEffect(() => {
    const checkLayout = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Thresholds: allow two columns on wide screens, or on tablets when there's enough height
      const twoCol = w >= 1024 || (w >= 768 && h >= 720);
      setIsTwoCol(twoCol);
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  // Choose a minimum column width so card width never becomes too small for text
  const gridStyle = isTwoCol
    ? { gridTemplateColumns: 'repeat(2, minmax(340px, 1fr))' }
    : { gridTemplateColumns: '1fr' };

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
      <div className="bento-section mx-auto pt-24 pb-24 text-white px-4 max-w-7xl relative z-10"> 
      
      {/* Header Section */}
      <header className="pb-8">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          Leadership <span className="text-purple-500">Experiences</span>
        </h1>
        <p className="text-xl text-gray-400">
          Roles focused on mentoring, project management, and driving team success.
        </p>
      </header>

      {/* CORE LAYOUT: stacked */}
      <div className="flex flex-col gap-8 min-h-0">
        
        {/* TOP ROW: 3 Horizontal Images (responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Taekwondo1 */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Image 
              src="/Taekwondo1.jpg" 
              alt="Taekwondo action shot 1" 
              fill 
              style={{ objectFit: 'cover' }}
              className="hover:scale-[1.02] transition duration-500 opacity-80"
            />
          </div>
          {/* Taekwondo2 */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Image 
              src="/Taekwondo2.jpg" 
              alt="Taekwondo action shot 2" 
              fill 
              style={{ objectFit: 'cover' }}
              className="hover:scale-[1.02] transition duration-500 opacity-80"
            />
          </div>
          {/* Taekwondo3 */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
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
        <div className="grid gap-4 min-h-0" style={gridStyle}> 
          {leadershipSections.map((role, index) => (
            <InteractiveCard 
              key={index}
              // ✅ CHANGED: give the card a max height so scroll actually triggers on shorter screens
              className="stretch-height magic-bento-card !p-6 flex flex-col flex-1 min-h-0 transition hover:border-purple-600/50"
              style={{}}
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
