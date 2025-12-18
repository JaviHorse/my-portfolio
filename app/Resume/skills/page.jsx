"use client";

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
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

// SKILLS DATA (UNCHANGED)
const skillCategories = [
  {
    category: 'Programming Languages',
    description: 'Languages I used in school and picked up through personal projects.',
    skills: ['Python', 'JavaScript/ TypeScript', 'SQL', 'Java']
  },
  {
    category: 'Frameworks & Libraries',
    description: 'Tools I learned in my internships and school',
    skills: ['React / Next.js', 'Node.js / Express', 'Tailwind CSS', 'Spring Framework']
  },
  {
    category: 'Academics',
    description: 'Tools I am familiar with',
    skills: ['Microsoft Excel', 'Microsoft Word', 'Canva', 'Tableau']
  },
  {
    category: 'Skills',
    description: 'Skills I learned on the job',
    skills: ['Teamwork', 'Adaptability', 'Critical Thinking', 'Problem Solving', 'Flexibility']
  },
  {
    category: 'Coding Tools & Version Control',
    description: 'Essential software for development workflow and collaboration.',
    skills: ['Git / GitHub', 'VS Code']
  },
  {
    category: 'Languages',
    description: 'Languages I can speak and understand',
    skills: ['English (Proficient)', 'Filipino (Native)', 'Korean (Elementary)']
  },
];

export default function SkillsPage() {
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
      <div className="bento-section mx-auto pt-24 pb-24 text-white relative z-10"> 
      
      {/* HEADER */}
      <header className="pb-6 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          Technical <span className="text-purple-500">Skills</span>
        </h1>
        <p className="text-xl text-gray-400">
          A detailed list of my core proficiencies, technologies, and tooling.
        </p>
      </header>

      {/* MAIN GRID */}
      <div className="px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: IMAGES */}
        <div className="flex flex-col gap-6 space-y-4 lg:col-span-1">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Image
              src="/work.jpg"
              alt="My professional work setup"
              fill
              style={{ objectFit: 'cover' }}
              className="hover:scale-[1.02] transition duration-500 opacity-80"
            />
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Image
              src="/me.jpg"
              alt="A picture of me, the developer"
              fill
              style={{ objectFit: 'cover' }}
              className="hover:scale-[1.02] transition duration-500 opacity-80"
            />
          </div>

          <div className="hidden lg:block p-4 text-sm text-gray-500 italic">
            Visual reference points for my work and personal life.
          </div>
        </div>

        {/* RIGHT: SKILLS GRID */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {skillCategories.map((cat, index) => (
              <InteractiveCard
                key={index}
                className="magic-bento-card !p-6 flex flex-col h-full transition hover:border-purple-600/50"
              >
                <h2 className="text-xl font-bold text-purple-400 mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {cat.category}
                </h2>
                <p className="text-sm text-gray-400 mb-4">{cat.description}</p>

                <ul className="list-none space-y-2 flex-grow">
                  {cat.skills.map((skill, i) => (
                    <li key={i} className="text-gray-200 text-base flex items-center">
                      <span className="text-purple-600 font-bold mr-3 text-xl leading-none">»</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
