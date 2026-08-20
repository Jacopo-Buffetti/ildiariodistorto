"use client";

import React from "react";

interface SpinnerProps {
  className?: string;
  size?: number; // px
}

export default function Spinner({ className = "", size = 48 }: SpinnerProps) {
  const borderSize = Math.max(2, Math.floor(size / 12));
  return (
    <div
      role="status"
      className={`flex items-center justify-center ${className}`}
    >
      <div
        aria-hidden="true"
        style={{ height: size, width: size, borderWidth: borderSize }}
        className={`rounded-full animate-spin bg-transparent border-zinc-200 border-t-indigo-600`}
      />
      <span className="sr-only">Caricamento in corso</span>
    </div>
  );
}
