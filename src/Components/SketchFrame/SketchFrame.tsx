"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

type SketchFrameProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "rectangle" | "circle";
};

export default function SketchFrame({
  children,
  className,
  variant = "rectangle",
}: SketchFrameProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const svg = svgRef.current;
    if (!frame || !svg) {
      return;
    }

    const draw = () => {
      const rect = frame.getBoundingClientRect();
      const width = Math.max(Math.floor(rect.width), 1);
      const height = Math.max(Math.floor(rect.height), 1);

      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));
      svg.innerHTML = "";

      const rc = rough.svg(svg);
      const outer =
        variant === "circle"
          ? rc.ellipse(width / 2, height / 2, width - 4, height - 4, {
              stroke: "#525252",
              strokeWidth: 2,
              roughness: 2.2,
              bowing: 1.8,
              fill: "transparent",
              seed: 11,
            })
          : rc.rectangle(2, 2, width - 4, height - 4, {
              stroke: "#525252",
              strokeWidth: 2,
              roughness: 2.2,
              bowing: 1.8,
              fill: "transparent",
              seed: 11,
            });

      const inner =
        variant === "circle"
          ? rc.ellipse(width / 2, height / 2, width - 12, height - 12, {
              stroke: "#8a8a8a",
              strokeWidth: 1,
              roughness: 1.7,
              bowing: 1.3,
              fill: "transparent",
              seed: 29,
            })
          : rc.rectangle(8, 8, width - 16, height - 16, {
              stroke: "#8a8a8a",
              strokeWidth: 1,
              roughness: 1.7,
              bowing: 1.3,
              fill: "transparent",
              seed: 29,
            });
      svg.appendChild(outer);
      svg.appendChild(inner);
    };

    draw();

    const observer = new ResizeObserver(() => {
      draw();
    });
    observer.observe(frame);

    return () => {
      observer.disconnect();
    };
  }, []);

  const contentPadding = variant === "circle" ? "p-1" : "p-2";
  const svgLayerClass =
    variant === "circle"
      ? "pointer-events-none absolute inset-0 z-[2] h-full w-full"
      : "pointer-events-none absolute inset-0 h-full w-full";
  const contentLayerClass = `relative z-[1] ${contentPadding}`;

  return (
    <div ref={frameRef} className={`relative ${className ?? ""}`}>
      <svg
        ref={svgRef}
        className={svgLayerClass}
        aria-hidden="true"
        focusable="false"
      />
      <div className={contentLayerClass}>{children}</div>
    </div>
  );
}
