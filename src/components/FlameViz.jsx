import React, { useEffect, useRef } from 'react';

// Lightweight particle visualization to echo the Spline hero with live parameter response
export default function FlameViz({ params }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.clientWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.clientHeight * window.devicePixelRatio);

    const resize = () => {
      width = canvas.width = canvas.clientWidth * window.devicePixelRatio;
      height = canvas.height = canvas.clientHeight * window.devicePixelRatio;
    };
    window.addEventListener('resize', resize);

    // Initialize particle pool
    const poolSize = 400;
    particlesRef.current = Array.from({ length: poolSize }, () => spawnParticle(width, height));

    const loop = () => {
      timeRef.current += 0.016;
      draw(ctx, width, height, params);
      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Re-render when params change by just updating and letting draw consume them
  useEffect(() => {
    // no-op: params picked up in draw
  }, [params]);

  function spawnParticle(width, height) {
    const x = (Math.random() - 0.5) * 0.3 * width + width / 2; // start near center
    const y = height * (0.9 + Math.random() * 0.05);
    const life = 0.5 + Math.random() * 1.5;
    const size = 1 + Math.random() * 2;
    return { x, y, vx: 0, vy: -0.5 - Math.random() * 0.8, age: 0, life, size };
  }

  function draw(ctx, width, height, p) {
    // Background fade for trails
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, width, height);

    // Add glow
    const grd = ctx.createRadialGradient(width / 2, height * 0.9, 5, width / 2, height * 0.9, Math.min(width, height) * 0.6);
    grd.addColorStop(0, `rgba(255,160,0,${0.12 + p.intensity * 0.2})`);
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // Update and render particles
    const arr = particlesRef.current;
    const wind = (Math.sin(timeRef.current * 0.7) + Math.cos(timeRef.current * 1.3)) * 0.1 * p.turbulence;
    const spawnRate = 2 + Math.floor(p.intensity * 8);

    for (let i = 0; i < spawnRate; i++) {
      // replace oldest particles by respawning
      const idx = Math.floor(Math.random() * arr.length);
      if (arr[idx].age > arr[idx].life) arr[idx] = spawnParticle(width, height);
    }

    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < arr.length; i++) {
      const it = arr[i];
      it.age += 0.016;
      const t = Math.min(1, it.age / it.life);

      // Temperature influences hue shift from deep orange to yellow-white
      const heat = Math.min(1, p.temperature * 1.2);
      const hue = 20 + heat * 25; // 20 -> 45
      const brightness = 50 + heat * 40; // 50 -> 90

      // Turbulence-based jitter
      const jitterX = (Math.sin((it.y + timeRef.current * 60) * 0.02) + Math.cos(it.x * 0.02)) * p.turbulence * 0.8;
      it.vx += (wind + jitterX) * 0.02;
      it.vy += (-0.02 - p.intensity * 0.02); // rise faster with intensity

      it.x += it.vx;
      it.y += it.vy;

      // Sparks: occasionally burst smaller bright particles
      if (Math.random() < p.sparks * 0.01) {
        ctx.fillStyle = `hsla(${hue + 10},100%,${brightness}%,${0.7})`;
        ctx.beginPath();
        ctx.arc(it.x + (Math.random() - 0.5) * 10, it.y + (Math.random() - 0.5) * 10, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fade-out near end of life and respawn
      const alpha = (1 - t) * (0.4 + p.intensity * 0.5);
      const radius = it.size * (1 + p.intensity * 2) * (1 - t);
      ctx.fillStyle = `hsla(${hue}, 100%, ${brightness}%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(it.x, it.y, radius, 0, Math.PI * 2);
      ctx.fill();

      if (it.age > it.life || it.y < height * 0.3 || it.x < 0 || it.x > width) {
        arr[i] = spawnParticle(width, height);
      }
    }
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <canvas
        ref={canvasRef}
        className="w-full h-[420px] md:h-[520px] block"
      />
    </div>
  );
}
