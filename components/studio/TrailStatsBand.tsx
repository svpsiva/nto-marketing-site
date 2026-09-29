"use client";

export interface TrailStatsBandProps {
  stat1Number?: string;
  stat1Label?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
}

export function TrailStatsBand({
  stat1Number,
  stat1Label,
  stat2Number,
  stat2Label,
  stat3Number,
  stat3Label,
}: TrailStatsBandProps) {
  const stats = [
    { number: stat1Number, label: stat1Label },
    { number: stat2Number, label: stat2Label },
    { number: stat3Number, label: stat3Label },
  ].filter((stat) => stat.number || stat.label);

  if (stats.length === 0) return null;

  return (
    <section className="bg-charcoal-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-4xl font-semibold tracking-tight text-sky-400">{stat.number}</p>
            <p className="mt-2 text-sm uppercase tracking-wide text-charcoal-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
