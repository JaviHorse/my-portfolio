// components/ImageSlideshow.js
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const slideshowImages = ["/me.jpg", "/me2.jpg", "/me3.jpg", "/me4.jpg"];

const SLIDE_DURATION = 4500;

// Total animation time
const TOTAL_MS = 900;
// Split into 2 phases: fly-out (top) then slide-in (behind)
const PHASE1_MS = 520; // on-top portion
const PHASE2_MS = TOTAL_MS - PHASE1_MS;

export default function ImageSlideshow({ mainImageAlt = "Portrait" }) {
  const [deck, setDeck] = useState(
    slideshowImages.map((src, i) => ({ id: `${src}-${i}`, src }))
  );

  // outgoing card snapshot + phase
  const [outgoing, setOutgoing] = useState(null); // { id, src }
  const [phase, setPhase] = useState(0); // 0=none, 1=start, 2=fly-out, 3=behind-slide

  const timeoutsRef = useRef([]);

  const visible = useMemo(() => deck.slice(0, 3), [deck]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (deck.length <= 1) return;

    const interval = setInterval(() => {
      // clear any existing timeouts (safety)
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      // 1) snapshot current top
      const top = deck[0];

      // 2) rotate deck immediately so the stack underneath is already correct
      setDeck((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });

      // 3) show outgoing overlay at top pose
      setOutgoing(top);
      setPhase(1);

      // next frame -> start fly-out transition
      const t1 = setTimeout(() => setPhase(2), 16);

      // midpoint -> drop behind and slide into back position
      const t2 = setTimeout(() => setPhase(3), PHASE1_MS);

      // end -> remove outgoing overlay
      const t3 = setTimeout(() => {
        setOutgoing(null);
        setPhase(0);
      }, TOTAL_MS);

      timeoutsRef.current.push(t1, t2, t3);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [deck, deck.length]);

  // stack poses (same as before)
  const stackWrap =
    "absolute inset-0 rounded-2xl overflow-hidden border border-white/10 will-change-transform";

  const poseTop = { x: 0, y: 0, s: 1, o: 1, r: 0 };
  const poseMid = { x: 10, y: 10, s: 0.97, o: 0.95, r: 0 };
  const poseBack = { x: 20, y: 20, s: 0.94, o: 0.9, r: 0 };

  const stackClassForPos = (pos) => {
    const shift = "transition-transform transition-opacity duration-500 ease-out";
    if (pos === 0) return `${stackWrap} z-30 ${shift}`;
    if (pos === 1) return `${stackWrap} z-20 ${shift}`;
    return `${stackWrap} z-10 ${shift}`;
  };

  const stackStyleForPos = (pos) => {
    const p = pos === 0 ? poseTop : pos === 1 ? poseMid : poseBack;
    return {
      transform: `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.s})`,
      opacity: p.o,
    };
  };

  // outgoing motion:
  // phase 1: place at top pose (no transition)
  // phase 2: fly out left (transition)
  // phase 3: BEHIND stack, slide into back pose (transition)
  const outgoingStyle = () => {
    if (!outgoing) return {};

    // base top pose
    let t = `translate3d(0px, 0px, 0) scale(1) rotate(0deg)`;
    let opacity = 1;

    if (phase === 2) {
      t = `translate3d(-70%, -4%, 0) scale(0.98) rotate(-6deg)`;
      opacity = 1;
    }

    if (phase === 3) {
      t = `translate3d(${poseBack.x}px, ${poseBack.y}px, 0) scale(${poseBack.s}) rotate(0deg)`;
      opacity = poseBack.o;
    }

    return { transform: t, opacity };
  };

  const outgoingClass = () => {
    if (!outgoing) return "";

    // transitions only after phase 1
    const transition =
      phase === 1
        ? ""
        : `transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)]`;

    // duration depends on which half we're in
    const duration =
      phase === 2 ? `duration-[${PHASE1_MS}ms]` : phase === 3 ? `duration-[${PHASE2_MS}ms]` : "";

    // KEY: at phase 3, we put it BEHIND the visible stack
    const z = phase === 3 ? "z-0" : "z-40";

    return `${stackWrap} ${z} ${transition} ${duration} pointer-events-none`;
  };

  return (
    <div className="relative flex justify-center group">
      <div className="relative w-[260px] h-[340px] md:w-[300px] md:h-[400px] overflow-hidden rounded-2xl border border-white/10 z-10 transition duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_0_80px_rgba(64,255,170,0.3)]">
        {/* STACK */}
        {visible.map((card, pos) => {
          const isTop = pos === 0;
          return (
            <div
              key={card.id}
              className={stackClassForPos(pos)}
              style={stackStyleForPos(pos)}
            >
              <Image
                src={card.src}
                alt={isTop ? mainImageAlt : `Slideshow image ${pos + 1}`}
                fill
                sizes="(max-width: 768px) 260px, 300px"
                className={[
                  "object-cover",
                  "shadow-[0_0_60px_rgba(64,255,170,0.15)]",
                  isTop
                    ? "group-hover:translate-y-[-5px] group-hover:rotate-1 transition duration-500 ease-out"
                    : "",
                ].join(" ")}
                priority={card.src === slideshowImages[0]}
              />
            </div>
          );
        })}

        {/* OUTGOING (2-phase: top -> behind) */}
        {outgoing && (
          <div className={outgoingClass()} style={outgoingStyle()}>
            <Image
              src={outgoing.src}
              alt={mainImageAlt}
              fill
              sizes="(max-width: 768px) 260px, 300px"
              className="object-cover shadow-[0_0_60px_rgba(64,255,170,0.15)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
