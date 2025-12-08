"use client";

import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Mail, Phone, Linkedin } from "lucide-react";

import GradientText from "./components/GradientText";
import DotGrid from "./components/DotGrid";
import MagicBento from "./components/MagicBento";

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin);
    }
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetElement,
          // ✅ use offsetY instead of offset
          offsetY: -80,
        },
        ease: "power3.inOut",
      });
    }
  };

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
        {/* ============= HERO ============= */}
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

              {/* BUTTONS */}
              <div className="mt-8 flex gap-4">
                <a
                  href="#projects"
                  onClick={(e) => handleSmoothScroll(e, "projects")}
                  className="rounded-full border border-cyan-500 px-6 py-2 text-sm font-semibold hover:bg-cyan-500 hover:text-black transition"
                >
                  About Me
                </a>

                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "contact")}
                  className="rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold hover:border-cyan-400 hover:text-cyan-400 transition"
                >
                  Contact
                </a>
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

        {/* ============= PROJECTS / MAGIC BENTO ============= */}
        <section id="projects" className="flex justify-center px-6 pb-32 pt-16">
          <div className="max-w-5xl w-full">
            <h2 className="mb-8 text-2xl md:text-3xl font-semibold text-white text-center md:text-left">
              Key Focus Areas
            </h2>

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

        {/* ============= CONTACT ============= */}
        <section id="contact" className="max-w-5xl mx-auto px-6 pb-32 pt-10">
          <div className="border-t border-white/10 pt-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              {/* Left: heading */}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Get in Touch
                </h2>
                <p className="mt-2 text-slate-400 max-w-sm text-sm md:text-base">
                  Open to internships, collaborations, and interesting
                  projects—feel free to reach out through any of the channels
                  below.
                </p>
              </div>

              {/* Right: contact list */}
              <div className="flex flex-col gap-3 text-slate-300 text-sm md:text-base">
                {/* Email */}
                <a
                  href="mailto:javiermacasaet@gmail.com"
                  className="group flex items-center gap-3 hover:text-cyan-400 transition w-fit"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-300/60 transition">
                    <Mail className="w-4 h-4 text-cyan-300" />
                  </span>
                  <span>javiermacasaet@gmail.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+639228118406"
                  className="group flex items-center gap-3 hover:text-cyan-400 transition w-fit"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-300/60 transition">
                    <Phone className="w-4 h-4 text-cyan-300" />
                  </span>
                  <span>0922 811 8406</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/javiermacasaet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 hover:text-cyan-400 transition w-fit"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-300/60 transition">
                    <Linkedin className="w-4 h-4 text-cyan-300" />
                  </span>
                  <span>linkedin.com/in/javiermacasaet</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
