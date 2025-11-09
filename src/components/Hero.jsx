import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/fRn7FqMm62bDS630/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle vignette and gradient overlays to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Flame Simulator
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
          Tweak energy, turbulence, and temperature to sculpt living fire. Watch a glowing, particle-driven ember respond in real time.
        </p>
        <div className="mt-8 inline-flex items-center gap-3">
          <a
            href="#play"
            className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-medium transition"
          >
            Start Simulating
          </a>
          <span className="text-white/60 text-sm">Interactive and mesmerizing</span>
        </div>
      </div>
    </section>
  );
}
