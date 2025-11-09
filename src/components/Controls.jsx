import React, { useEffect, useState } from 'react';

export default function Controls({ params, onChange }) {
  const [local, setLocal] = useState(params);

  useEffect(() => {
    setLocal(params);
  }, [params]);

  const handle = (key) => (eOrVal) => {
    const v = typeof eOrVal === 'number' ? eOrVal : parseFloat(eOrVal.target.value);
    const next = { ...local, [key]: v };
    setLocal(next);
    onChange(next);
  };

  return (
    <section id="play" className="w-full bg-zinc-950/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40 text-white border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Simulation Controls</h2>
          <p className="text-white/60 text-sm">Dial in the personality of the flame.</p>
        </div>
        <button
          onClick={() => onChange({ intensity: 0.7, turbulence: 0.5, temperature: 0.65, sparks: 0.4 })}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        <ControlRow
          label="Intensity"
          value={local.intensity}
          min={0}
          max={1}
          step={0.01}
          onChange={handle('intensity')}
        />
        <ControlRow
          label="Turbulence"
          value={local.turbulence}
          min={0}
          max={1}
          step={0.01}
          onChange={handle('turbulence')}
        />
        <ControlRow
          label="Temperature"
          value={local.temperature}
          min={0}
          max={1}
          step={0.01}
          onChange={handle('temperature')}
        />
        <ControlRow
          label="Sparks"
          value={local.sparks}
          min={0}
          max={1}
          step={0.01}
          onChange={handle('sparks')}
        />
      </div>
    </section>
  );
}

function ControlRow({ label, value, onChange, min = 0, max = 1, step = 0.01 }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/80">{label}</span>
        <span className="text-xs tabular-nums text-white/60">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
