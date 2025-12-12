"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DotGrid from "../components/DotGrid";
import MagicBento from "../components/MagicBento";

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
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href="/"
                className="text-cyan-400 hover:text-cyan-300 transition duration-300 flex items-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl md:text-5xl font-extrabold">
              Key Focus <span className="text-cyan-400">Areas</span>
            </h1>
            <p className="mb-12 text-lg text-slate-300">
              Explore my key competencies and career focus areas.
            </p>

            {/* Magic Bento Grid */}
            <div className="flex justify-center">
              <MagicBento
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
