import React, { useState } from 'react';
import Hero from './components/Hero';
import Controls from './components/Controls';
import FlameViz from './components/FlameViz';
import Footer from './components/Footer';

export default function App() {
  const [params, setParams] = useState({
    intensity: 0.7,
    turbulence: 0.5,
    temperature: 0.65,
    sparks: 0.4,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <main className="relative mx-auto max-w-6xl px-6 -mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2 order-2 md:order-1">
            <Controls params={params} onChange={setParams} />
          </div>
          <div className="md:col-span-3 order-1 md:order-2">
            <FlameViz params={params} />
          </div>
        </div>
      </main>

      <section className="mx-auto max-w-6xl px-6 mt-14">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard title="Energy" desc="Controls rise speed, glow strength, and overall vigor of the flame." />
          <FeatureCard title="Turbulence" desc="Adds chaotic swirls and lateral movement like gusty air." />
          <FeatureCard title="Temperature" desc="Shifts color from deep amber to hot yellow-white." />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 text-white/90">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}
