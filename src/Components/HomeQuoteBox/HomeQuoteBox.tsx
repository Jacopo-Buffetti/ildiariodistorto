"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

export default function HomeQuoteBox() {
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
      const outer = rc.rectangle(2, 2, width - 4, height - 4, {
        stroke: "#535353",
        strokeWidth: 2,
        roughness: 2.3,
        bowing: 2.1,
        fill: "transparent",
        seed: 18,
      });
      const inner = rc.rectangle(8, 8, width - 16, height - 16, {
        stroke: "#8a8a8a",
        strokeWidth: 1.2,
        roughness: 1.8,
        bowing: 1.4,
        fill: "transparent",
        seed: 33,
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

  return (
    <section className="flex justify-center px-4 py-10">
      <div ref={frameRef} className="home-quote-sketch-wrapper">
        <svg
          ref={svgRef}
          className="home-quote-sketch"
          aria-hidden="true"
          focusable="false"
        />
        <blockquote className="blockquote home-quote-box">
          <span className="home-quote-mark home-quote-mark-left">“</span>
          <p className="home-quote-text">
            Scrivere è dare forma a ciò che altrimenti resterebbe silenzio.
          </p>
          <span className="home-quote-mark home-quote-mark-right">”</span>
        </blockquote>
      </div>
    </section>
  );
}
