const stats = [
  { label: "Total Analyses", value: 12 },
  { label: "High Selectivity Hits", value: 4 },
  { label: "Targets Studied", value: 3 },
  { label: "Last Run", value: "2h ago" },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="
            group rounded-2xl
            border border-slate-200/60 dark:border-slate-800/60
            bg-white/70 dark:bg-white/5
            backdrop-blur-xl
            p-6
            transition-all duration-300
            hover:shadow-lg hover:shadow-indigo-500/10
            hover:-translate-y-[2px]
          "
        >
          <p className="
            text-sm
            text-slate-500 dark:text-slate-400
          ">
            {s.label}
          </p>

          <p className="
            mt-2 text-3xl font-semibold
            text-slate-900 dark:text-slate-50
          ">
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
