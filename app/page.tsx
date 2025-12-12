"use client";

import Image from "next/image";
import Link from "next/link";
import GradientText from "./components/GradientText";
import DotGrid from "./components/DotGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Global dot background */}
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

      <div className="relative z-10 text-white min-h-screen">
        {/* ============= INTRODUCTION HERO ============= */}
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-14">
            {/* LEFT */}
            <div>
              <p className="text-xs tracking-[0.4em] text-cyan-400">
                PORTFOLIO
              </p>

              <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
                <GradientText
                  className="!inline-flex !items-baseline !justify-start !m-0 !px-0 !py-0 !rounded-none !backdrop-blur-0"
                  colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={10}
                  showBorder={false}
                >
                  Hi! Im Javier Macasaet.
                </GradientText>
              </h1>

              <p className="mt-3 text-lg md:text-xl text-slate-300">
                Undergrad from Ateneo De Manila University.
              </p>

              <p className="mt-4 max-w-xl text-slate-400 leading-relaxed">
                Im a Computer Science Student, a Full Stack Developer, and an
                aspiring Data Scientist who can adapt to any role in a team.
              </p>

              {/* NAVIGATION BUTTONS */}
              <div className="mt-8 flex gap-4">
                <Link
                  href="/projects"
                  className="rounded-full border border-cyan-500 px-6 py-2 text-sm font-semibold hover:bg-cyan-500 hover:text-black transition"
                >
                  About me
                </Link>

                <Link
                  href="/contacts"
                  className="rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold hover:border-cyan-400 hover:text-cyan-400 transition"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex justify-center group">
              <div className="relative w-[260px] h-[340px] md:w-[300px] md:h-[400px] transition duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_0_80px_rgba(64,255,170,0.3)]">
                <Image
                  src="/me.jpg"
                  alt="Javier Macasaet"
                  fill
                  className="object-cover rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(64,255,170,0.15)] transition duration-500 ease-out group-hover:translate-y-[-5px] group-hover:rotate-1"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
