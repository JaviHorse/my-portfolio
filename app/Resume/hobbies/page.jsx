"use client";

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Gamepad, Dumbbell, Zap, Utensils, Users, BookOpen } from 'lucide-react'; 
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

// Hobby Card Component
const HobbyCard = ({ name, description, Icon, image }) => {
  return (
    <InteractiveCard className="magic-bento-card !p-0 flex flex-col transition hover:border-purple-600/50 relative overflow-hidden min-h-[300px]">
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        style={{ objectFit: 'cover' }}
        className="opacity-20 hover:opacity-40 transition duration-500"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center mb-2">
          <Icon className="w-6 h-6 mr-3 text-purple-400" />
          <h2 className="text-xl font-bold text-white z-10">{name}</h2>
        </div>
        <p className="text-gray-300 text-sm z-10">
          {description}
        </p>
      </div>
    </InteractiveCard>
  );
};
// ------------------------------------------

// Hobbies Data
const hobbiesData = [
  {
    name: 'Taekwondo',
    Icon: Zap,
    description: 'Trained in competitive taekwondo, fighting in national level tournaments.',
    image: '/TKD.jpg',
  },
  {
    name: 'Gym / Fitness',
    Icon: Dumbbell,
    description: 'Part of my strength and conditioning training for my sport.',
    image: '/GYM.jpg',
  },
  {
    name: 'Hanging Out',
    Icon: Users,
    description: 'Enjoying the company of others relaxes me outside of coding.',
    image: '/GALA.jpg',
  },
  {
    name: 'Golf',
    Icon: Gamepad,
    description: 'Playing golf as a recreational sport and networking.',
    image: '/golf.jpg',
  },
  {
    name: 'Food Trips',
    Icon: Utensils,
    description: 'Foodie here hehehe.',
    image: '/FOOD.jpg',
  },
  {
    name: 'Group Studying',
    Icon: BookOpen,
    description: 'Studying with friends increases my learning capacity.',
    image: '/STUDY.jpg',
  },
];

export default function HobbiesPage() {
  return (
    <div className="bento-section mx-auto pt-12 pb-24 text-white px-4 max-w-6xl"> 
      
      {/* Header */}
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
          Personal <span className="text-purple-500">Hobbies</span>
        </h1>
        <p className="text-xl text-gray-400">
          My personal interests that define my personality outside of work and coding.
        </p>
      </header>

      {/* Hobbies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hobbiesData.map((hobby, index) => (
          <HobbyCard
            key={index}
            name={hobby.name}
            description={hobby.description}
            Icon={hobby.Icon}
            image={hobby.image}
          />
        ))}
      </div>
    </div>
  );
}
