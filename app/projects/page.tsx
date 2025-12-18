"use client";

import Link from "next/link";
import DotGrid from "../components/DotGrid";
import ChromaGrid from "../components/ChromaGrid";

const portfolioItems = [
  {
    image: '/school.jpg',
    title: 'Education',
    subtitle: 'Degree, University, and key academic achievements.',
    handle: '@Academic',
    borderColor: '#4F46E5',
    gradient: 'linear-gradient(145deg, #4F46E5, #000)',
    url: '/Resume/Education'
  },
  {
    image: '/work.jpg',
    title: 'Technical Skills',
    subtitle: 'Languages, frameworks, tools, and databases.',
    handle: '@Proficiencies',
    borderColor: '#10B981',
    gradient: 'linear-gradient(210deg, #10B981, #000)',
    url: '/Resume/skills'
  },
  {
    image: '/hobbies.jpg',
    title: 'Leadership Experiences',
    subtitle: 'Roles, teams led, and organizational impact.',
    handle: '@Impact',
    borderColor: '#F59E0B',
    gradient: 'linear-gradient(165deg, #F59E0B, #000)',
    url: '/Resume/leadership'
  },
  {
    image: '/internship.jpg',
    title: 'Experiences',
    subtitle: 'Internships, projects, and relevant work history.',
    handle: '@History',
    borderColor: '#EF4444',
    gradient: 'linear-gradient(195deg, #EF4444, #000)',
    url: '/Resume/experience'
  },
  {
    image: '/me.jpg',
    title: 'Career Objectives',
    subtitle: 'My goals for the next 1-5 years in the industry.',
    handle: '@Future',
    borderColor: '#8B5CF6',
    gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
    url: '/Resume/about'
  },
  {
    image: '/golf.jpg',
    title: 'Hobbies',
    subtitle: 'Interests outside of work that define me.',
    handle: '@Personal',
    borderColor: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4, #000)',
    url: '/Resume/hobbies'
  }
];

export default function ProjectsPage() {
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
      <div className="relative z-10 text-white min-h-screen">
        <section className="flex justify-center px-6 py-20">
          <div className="max-w-5xl w-full">
            {/* Title */}
            <h1 className="mb-4 text-4xl md:text-5xl font-extrabold">
              Key Focus <span className="text-cyan-400">Areas</span>
            </h1>
            <p className="mb-12 text-lg text-slate-300">
              Explore my key competencies and career focus areas.
            </p>

            {/* ChromaGrid */}
            <div className="flex justify-center">
              <ChromaGrid
                items={portfolioItems}
                className="max-w-6xl"
                radius={300}
                columns={3}
                rows={2}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
                enableTilt
                enableStars
                enableMagnetism
                glowColor="64, 255, 170"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
