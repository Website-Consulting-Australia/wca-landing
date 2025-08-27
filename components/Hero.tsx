"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // slow down a touch
    v.playbackRate = 0.6;

    const handleTimeupdate = () => {
      // when close to the end, start fading (tweak threshold as needed)
      if (v.duration && v.currentTime > v.duration - 0.4) setFade(true);

      // after loop restart, remove fade
      if (v.currentTime < 0.2 && fade) setFade(false);
    };

    v.addEventListener("timeupdate", handleTimeupdate);
    return () => v.removeEventListener("timeupdate", handleTimeupdate);
  }, [fade]);

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 filter blur-[2px]"
        poster="/banner-poster.jpg"
      >
        <source src="/banner-background.mp4" type="video/mp4" />
      </video>

      {/* Overlay: base tint + soft gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-250" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 transition-opacity duration-250" />
        {/* Loop fade: briefly darken to mask the jump */}
        <div
          className={`absolute inset-0 bg-black/25 transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-20 text-center px-4 sm:px-8">
        <h1 className="font-sans text-3xl tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
          Website Consulting Australia
        </h1>
        <p className="text-xl text-gray-100 mb-12 font-light max-w-2xl mx-auto">
          Helping Australian businesses build <span className="font-semibold">faster</span>,
          <span className="font-semibold"> higher-converting websites</span> through expert consulting in
          <span className="font-semibold"> performance</span>,
          <span className="font-semibold"> SEO</span>, and
          <span className="font-semibold"> user experience</span>.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="#book"
            scroll={true}
            className="bg-brand-blue text-white px-5 py-2 rounded-md text-base font-semibold hover:bg-blue-700 transition duration-300"
          >
            Book a Consultation
          </Link>
          <Link
            href="/services"
            className="bg-gray-100 text-black/90 dark:bg-gray-800 dark:text-white px-5 py-2 rounded-md text-base font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}