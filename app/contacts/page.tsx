"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, Linkedin } from "lucide-react";
import DotGrid from "../components/DotGrid";

export default function ContactsPage() {
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
        <section className="max-w-5xl mx-auto px-6 py-20">
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
            Get in <span className="text-cyan-400">Touch</span>
          </h1>
          <p className="mb-12 text-lg text-slate-300">
            Open to internships, collaborations, and interesting projects—feel free to reach out through any of the channels below.
          </p>

          {/* Contact List */}
          <div className="max-w-2xl">
            <div className="space-y-6">
              {/* Email */}
              <a
                href="mailto:javiermacasaet@gmail.com"
                className="group flex items-center gap-4 p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-500/5 hover:bg-cyan-500/10 transition"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/20 group-hover:bg-cyan-500/30 transition">
                  <Mail className="w-6 h-6 text-cyan-300" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-lg font-semibold text-white group-hover:text-cyan-300 transition">
                    javiermacasaet@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+639228118406"
                className="group flex items-center gap-4 p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-500/5 hover:bg-cyan-500/10 transition"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/20 group-hover:bg-cyan-500/30 transition">
                  <Phone className="w-6 h-6 text-cyan-300" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-lg font-semibold text-white group-hover:text-cyan-300 transition">
                    0922 811 8406
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/javiermacasaet/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-500/5 hover:bg-cyan-500/10 transition"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/20 group-hover:bg-cyan-500/30 transition">
                  <Linkedin className="w-6 h-6 text-cyan-300" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-slate-400">LinkedIn</p>
                  <p className="text-lg font-semibold text-white group-hover:text-cyan-300 transition">
                    linkedin.com/in/javiermacasaet
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
