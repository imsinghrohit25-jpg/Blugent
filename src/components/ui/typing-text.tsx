"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TypingText({
  words,
  className,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1800,
}: {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      const nextText = isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      timeout = setTimeout(() => setText(nextText), isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {text}
      <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-electric-soft align-middle" />
    </span>
  );
}
