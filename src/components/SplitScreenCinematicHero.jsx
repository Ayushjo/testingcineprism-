"use client";

/*
  SplitScreenCinematicHero.jsx
  - Plain React + JSX (no TypeScript)
  - Uses dummy data FROM YOUR HOMEPAGE ONLY (remote poster URLs present in featuredCarouselData)
  - Responsive split-screen layout with elegant cross-fade carousel
*/

import { useEffect, useMemo, useState } from "react";

export default function SplitScreenCinematicHero({
  images,
  intervalMs = 5000,
  ctaOnClick,
}) {
  // These three URLs come directly from your homepage-7hNy5.tsx featuredCarouselData.
  const defaultImages = useMemo(
    () => [
      "https://image.tmdb.org/t/p/w342/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", // Everything Everywhere All at Once
      "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", // Parasite
      "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // Interstellar
    ],
    []
  );

  const slideshow = images && images.length ? images : defaultImages;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slideshow.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slideshow.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slideshow, intervalMs]);

  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Left: Brand Panel */}
      <div className="relative flex flex-col justify-center p-12 lg:p-16">
        {/* Subtle background grid for premium depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>

        <div className="relative max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]">
            Beyond the Screen.
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-300 font-light tracking-wider leading-relaxed">
            Good films make your life better.
          </p>

          <div className="mt-10">
            <button
              type="button"
              onClick={ctaOnClick}
              className="inline-flex items-center rounded-full bg-emerald-500/90 hover:bg-emerald-500 text-slate-950 px-6 md:px-7 py-3 text-sm md:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Explore Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Right: Content Carousel */}
      <div className="relative h-[56vh] md:h-auto min-h-[44vh] md:min-h-screen overflow-hidden">
        {/* Cross-fade images layered absolutely */}
        <div className="absolute inset-0">
          {slideshow.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src || "/placeholder.svg"}
              alt="Featured cinema still"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: i === index ? 1 : 0,
                transition: "opacity 1200ms ease-in-out",
              }}
            />
          ))}
        </div>

        {/* Subtle vignette for elegance and readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
        />

        {/* Edge fade for split seam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950/60 to-transparent"
        />
      </div>
    </section>
  );
}
