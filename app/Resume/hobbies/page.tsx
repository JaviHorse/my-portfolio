"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Gamepad,
  Dumbbell,
  Zap,
  Utensils,
  Users,
  BookOpen,
} from "lucide-react";
import DotGrid from "../../components/DotGrid";
import "../../components/MagicBento.css";

// ======================================================
// Reusable Interactive Card (Hover + Click / Tap Glow)
// ======================================================
const InteractiveCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isActive, setIsActive] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<any>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsActive(true);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: -200, y: -200 });
    setIsActive(false);
  }, []);

  // 🔥 Trigger glow on click / tap (for mobile)
  const triggerFlash = useCallback((clientX?: number, clientY?: number) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x =
      typeof clientX === "number" ? clientX - rect.left : rect.width / 2;
    const y =
      typeof clientY === "number" ? clientY - rect.top : rect.height / 2;

    setMousePosition({ x, y });
    setIsActive(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsActive(false);
      setMousePosition({ x: -200, y: -200 });
    }, 2000);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      triggerFlash(e.clientX, e.clientY);
    },
    [triggerFlash]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const t = e.touches?.[0];
      triggerFlash(t?.clientX, t?.clientY);
    },
    [triggerFlash]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className={`${className} magic-bento-card--border-glow particle-container`}
      style={
        {
          "--glow-x": `${mousePosition.x}px`,
          "--glow-y": `${mousePosition.y}px`,
          "--glow-intensity": isActive ? "1" : "0",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

// ======================================================
// Hobby Card
// ======================================================
const HobbyCard = ({ name, description, Icon, image }: { name: string; description: string; Icon: React.ComponentType<{ className?: string }>; image: string }) => {
  const [lit, setLit] = useState(false);
  const litTimerRef = useRef<any>(null);

  const triggerLit = useCallback(() => {
    setLit(true);
    if (litTimerRef.current) clearTimeout(litTimerRef.current);
    litTimerRef.current = setTimeout(() => setLit(false), 2000);
  }, []);

  return (
    <InteractiveCard className="magic-bento-card !p-0 flex flex-col transition hover:border-purple-600/50 relative overflow-hidden min-h-[300px] group">
      {/* Tap Overlay (mobile trigger) */}
      <div
        className="absolute inset-0 z-10"
        onClick={triggerLit}
        onTouchStart={triggerLit}
      />

      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        style={{ objectFit: "cover" }}
        className={`
          opacity-20 transition-all duration-500
          group-hover:opacity-70 group-hover:scale-110
          ${lit ? "opacity-70 scale-110" : ""}
        `}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent z-20">
        <div className="flex items-center mb-2">
          <Icon className="w-6 h-6 mr-3 text-purple-400" />
          <h2 className="text-xl font-bold text-white">{name}</h2>
        </div>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </InteractiveCard>
  );
};

// ======================================================
// Hobbies Data
// ======================================================
const hobbiesData = [
  {
    name: "Taekwondo",
    Icon: Zap,
    description:
      "Trained in competitive taekwondo, fighting in national level tournaments.",
    image: "/TKD.jpg",
  },
  {
    name: "Gym / Fitness",
    Icon: Dumbbell,
    description: "Part of my strength and conditioning training for my sport.",
    image: "/GYM.jpg",
  },
  {
    name: "Hanging Out",
    Icon: Users,
    description: "Enjoying the company of others relaxes me outside of coding.",
    image: "/GALA.jpg",
  },
  {
    name: "Golf",
    Icon: Gamepad,
    description: "Playing golf as a recreational sport and networking.",
    image: "/golf.jpg",
  },
  {
    name: "Food Trips",
    Icon: Utensils,
    description: "Foodie here hehehe.",
    image: "/FOOD.jpg",
  },
  {
    name: "Group Studying",
    Icon: BookOpen,
    description: "Studying with friends increases my learning capacity.",
    image: "/STUDY.jpg",
  },
];

// ======================================================
// Page
// ======================================================
export default function HobbiesPage() {
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
      <div className="bento-section mx-auto pt-12 pb-24 text-white px-4 max-w-6xl relative z-10">
        {/* Header */}
        <header className="pb-8">
          <div className="mb-6">
            <Link
              href="/projects"
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
            My personal interests that define my personality outside of work and
            coding.
          </p>
        </header>

        {/* Grid */}
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
    </main>
  );
}
