"use client";

import { useState, useRef, useCallback } from "react";
import type { ReactNode, CSSProperties, MouseEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Target, Code, Check } from "lucide-react";
import DotGrid from "../../components/DotGrid";
import "../../components/MagicBento.css";

// --- Reusable Interactive Card Component (FIXED) ---
interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const InteractiveCard = ({ children, className, style }: InteractiveCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
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
        ...style,
        // CSS variables for your glow effect
        "--glow-x": `${mousePosition.x}px`,
        "--glow-y": `${mousePosition.y}px`,
        "--glow-intensity": mousePosition.x >= 0 ? "1" : "0",
      } as CSSProperties}
    >
      {children}
    </div>
  );
};
// ------------------------------------------

// PROFILE DATA (UNMODIFIED)
const profileData = {
  title: "Aspiring Data Scientist",
  focus:
    "I'm an Aspiring Data Scientist with a background in software engineering and Java Game Development. I honestly aim to become an adaptable and flexible worker who can take on any role that is needed by a company. I strive to be a worker who can create innovative solutions and build systems that will not only benefit the company, but myself as well because I value my growth over anything else.",

  keyAreas: [
    "Front-end Development",
    "Back-end Development",
    "Data Analysis",
    "API Development",
    "Real-Time Systems",
    "Object-oriented Programming",
  ],
  profileImage: "/pose.jpg",
};

export default function AboutPage() {
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
      <div
        className="bento-section mx-auto pt-12 pb-24 text-white px-4 max-w-4xl relative z-10"
        style={{ viewTransitionName: "page-content-about" }}
      >
        {/* 1. Header Section */}
      <header className="pb-8">
        <div className="mb-6">
          <Link
            href="/#projects"
            className="text-purple-400 hover:text-purple-300 transition duration-300 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          About <span className="text-purple-500">Me</span>
        </h1>
        <p className="text-xl text-gray-400">
          A concise professional profile highlighting career focus and core competencies.
        </p>
      </header>

      {/* 2. Profile Card with Background Image */}
      <div className="flex justify-center">
        <InteractiveCard
          className="magic-bento-card !p-0 flex flex-col transition hover:border-purple-600/50 w-full relative min-h-[400px] overflow-hidden"
          style={{
            backgroundImage: `url(${profileData.profileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Inner Div for Readability Overlay */}
          <div className="p-8 w-full h-full bg-black/70 rounded-xl flex flex-col justify-between backdrop-blur-[1px]">
            <div className="flex items-center mb-4 border-b border-purple-700/50 pb-4">
              <Target className="w-8 h-8 mr-4 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">{profileData.title}</h2>
            </div>

            {/* Main Focus / Summary */}
            <p className="text-xl text-gray-300 mb-6 italic border-l-4 border-purple-500/50 pl-3 pt-2">
              {profileData.focus}
            </p>

            {/* Key Areas / Core Competencies */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Code className="w-5 h-5 mr-2 text-green-400" />
                Core Competencies
              </h3>
              <ul className="list-none space-y-3 text-gray-400 pl-0">
                {profileData.keyAreas.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 mr-3 text-purple-600 shrink-0" />
                    <p>{area}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </InteractiveCard>
      </div>
      </div>
    </main>
  );
}
