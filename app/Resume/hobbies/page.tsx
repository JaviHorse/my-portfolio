"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode, type CSSProperties } from "react";
import Image from "next/image";
import { Gamepad, Dumbbell, Zap, Utensils, Users, BookOpen, type LucideIcon } from "lucide-react";
import DotGrid from "../../components/DotGrid";
import "../../components/ChromaGrid.css";

/**
 * InteractiveCard
 * - Keeps your spotlight mouse variables: --mouse-x / --mouse-y
 * - Keeps your 2-second "flash" on click/touch
 * - Uses the .chroma-card class so ChromaGrid.css styles it
 */
const InteractiveCard = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isActive, setIsActive] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: -200, y: -200 });
    setIsActive(false);
  }, []);

  const triggerFlash = useCallback((clientX?: number, clientY?: number) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = typeof clientX === "number" ? clientX - rect.left : rect.width / 2;
    const y = typeof clientY === "number" ? clientY - rect.top : rect.height / 2;

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
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className={`chroma-card ${className || ""}`}
      style={
        {
          ...style,
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
          // optional: make the spotlight appear even without hover while “active”
          // your CSS uses :hover; this nudges it by keeping mouse coords valid.
          // (If you want it to also force opacity, we can add a class & tweak CSS.)
        } as CSSProperties
      }
    >
      {children}
    </article>
  );
};

const HobbyCard = ({
  name,
  description,
  Icon,
  image,
  handle,
  borderColor,
  gradient,
}: {
  name: string;
  description: string;
  Icon: LucideIcon;
  image: string;
  handle?: string;
  borderColor: string;
  gradient: string;
}) => {
  const [lit, setLit] = useState(false);
  const litTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerLit = useCallback(() => {
    setLit(true);
    if (litTimerRef.current) clearTimeout(litTimerRef.current);
    litTimerRef.current = setTimeout(() => setLit(false), 2000);
  }, []);

  return (
    <InteractiveCard
      className=""
      style={
        {
          // These variables are used in your ChromaGrid.css
          "--card-border": borderColor,
          "--card-gradient": gradient,
        } as CSSProperties
      }
    >
      {/* Image area */}
      <div className="chroma-img-wrapper">
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[10px]">
          <Image
            src={image}
            alt={name}
            fill
            priority={false}
            className={`object-cover transition-all duration-500 ${
              lit ? "opacity-90 scale-110" : "opacity-75"
            }`}
            onClick={triggerLit}
            onTouchStart={triggerLit}
          />

          {/* Optional subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-black/35" />
        </div>
      </div>

      {/* Info area (structure matches .chroma-info CSS) */}
      <footer className="chroma-info">
        <h3 className="name font-bold">{name}</h3>
        {handle ? <span className="handle text-xs">{handle}</span> : <span />}
        <p className="role text-sm">{description}</p>
        <span className="flex justify-end">
          <Icon className="w-5 h-5 text-purple-300" aria-hidden="true" />
        </span>
      </footer>
    </InteractiveCard>
  );
};

const hobbiesData = [
  {
    name: "Taekwondo",
    Icon: Zap,
    description: "Trained in competitive taekwondo, fighting in national level tournaments.",
    image: "/TKD.jpg",
    handle: "@Discipline",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(165deg, #8B5CF6, #000)",
  },
  {
    name: "Gym / Fitness",
    Icon: Dumbbell,
    description: "Part of my strength and conditioning training for my sport.",
    image: "/GYM.jpg",
    handle: "@Training",
    borderColor: "#10B981",
    gradient: "linear-gradient(210deg, #10B981, #000)",
  },
  {
    name: "Hanging Out",
    Icon: Users,
    description: "Enjoying the company of others relaxes me outside of coding.",
    image: "/GALA.jpg",
    handle: "@Social",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(145deg, #06B6D4, #000)",
  },
  {
    name: "Golf",
    Icon: Gamepad,
    description: "Playing golf as a recreational sport and networking.",
    image: "/golf.jpg",
    handle: "@Focus",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
  },
  {
    name: "Food Trips",
    Icon: Utensils,
    description: "Foodie here hehehe.",
    image: "/FOOD.jpg",
    handle: "@Explore",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg, #EF4444, #000)",
  },
  {
    name: "Group Studying",
    Icon: BookOpen,
    description: "Studying with friends increases my learning capacity.",
    image: "/STUDY.jpg",
    handle: "@Growth",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg, #4F46E5, #000)",
  },
];

export default function HobbiesPage() {
  // OPTIONAL: make the grid overlays (mask spotlight) follow pointer like your ChromaGrid component
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      <DotGrid
        className="z-0 opacity-45"
        style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
        dotSize={12}
        gap={36}
        baseColor="#003344"
        activeColor="#40ffaa"
        proximity={180}
        shockRadius={200}
        shockStrength={8}
        speedTrigger={120}
      />

      <div className="bento-section mx-auto pt-24 pb-24 text-white px-4 max-w-6xl relative z-10">
        <header className="pb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
            Personal <span className="text-purple-500">Hobbies</span>
          </h1>
          <p className="text-xl text-gray-400">
            My personal interests that define my personality outside of work and coding.
          </p>
        </header>

        {/* ✅ STRUCTURE NOW MATCHES ChromaGrid.css */}
        <div
          ref={gridRef}
          className="chroma-grid"
          style={
            {
              // These power the grid sizing in your CSS
              "--cols": 3,
              "--rows": 2,
              "--r": "260px",
            } as CSSProperties
          }
        >
          {hobbiesData.map((hobby) => (
            <HobbyCard
              key={hobby.name}
              name={hobby.name}
              description={hobby.description}
              Icon={hobby.Icon}
              image={hobby.image}
              handle={hobby.handle}
              borderColor={hobby.borderColor}
              gradient={hobby.gradient}
            />
          ))}

          {/* Optional overlays to match your ChromaGrid component */}
          <div className="chroma-overlay" />
          <div className="chroma-fade" />
        </div>
      </div>
    </main>
  );
}
