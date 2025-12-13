// app/components/TypingEffect.js
"use client";

import React, { useEffect, useRef, useState } from "react";

// ✅ Put as many paragraphs as you want here
const paragraphs = [
  "I'm a Computer Science Student, a Full Stack Developer, and an aspiring Data Scientist who can adapt to any role in a team.",
  "I  have hands-on experience building web applications using modern frameworks like React, Next.js, and the Spring Framework.",
  "I'm adaptable and a quick learner, always eager to take on new challenges and expand my skill set.",
];

const typingSpeed = 50;
const delayAfterTyping = 2000; // wait 3s after finishing before switching

export default function TypingEffect() {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  // Refs to safely clear timers (prevents StrictMode/double-effect issues)
  const typingIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const restartTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Cursor blink (runs forever)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Typing + rotation logic
  useEffect(() => {
    const currentText = paragraphs[textIndex] ?? "";

    // ✅ Clear any previous timers FIRST (important in Next.js dev mode)
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);

    // ✅ If somehow empty, just advance after delay
    if (currentText.length === 0) {
      setDisplayedText("");
      restartTimeoutRef.current = setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % paragraphs.length);
      }, delayAfterTyping);
      return;
    }

    // ✅ Show the first character immediately so it never gets "skipped"
    setDisplayedText(currentText.charAt(0));
    let i = 1;

    typingIntervalRef.current = setInterval(() => {
      if (i >= currentText.length) {
        clearInterval(typingIntervalRef.current);

        restartTimeoutRef.current = setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % paragraphs.length);
        }, delayAfterTyping);

        return;
      }

      setDisplayedText((prev) => prev + currentText.charAt(i));
      i++;
    }, typingSpeed);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    };
  }, [textIndex]);

  return (
    <p className="mt-4 max-w-xl text-slate-400 leading-relaxed min-h-[4.5rem]">
      {displayedText}
      {cursorVisible && (
        <span className="inline-block ml-0.5 text-slate-300">|</span>
      )}
    </p>
  );
}
