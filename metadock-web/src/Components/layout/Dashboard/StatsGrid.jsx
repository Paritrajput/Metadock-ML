export default function StatsGrid({ stats = [] }) {
  const fallback = [
    { label: "Total Analyses", value: "—" },
    { label: "High Selectivity Hits", value: "—" },
    { label: "Targets Studied", value: "—" },
    { label: "Last Run", value: "—" },
  ];

  const data = stats.length ? stats : fallback;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {data.map((s, i) => (
        <div
          key={i}
          className="
            rounded-2xl p-5
            bg-white/60 dark:bg-white/5
              border border-slate-200/40 dark:border-slate-800/40
              transition-all duration-300
              hover:shadow-md hover:shadow-cyan-500/10 
          "
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {s.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
