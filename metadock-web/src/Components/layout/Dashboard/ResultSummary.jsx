export default function ResultSummary() {
  return (
    <div className="
      rounded-2xl
      border border-slate-200/60 dark:border-slate-800/60
      bg-white/70 dark:bg-white/5
      backdrop-blur-xl
      p-6
    ">
      <h2 className="
        mb-4 text-lg font-semibold
        text-slate-900 dark:text-slate-50
      ">
        Latest Result
      </h2>

      <div className="space-y-3 text-sm">
        <p className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">
            Target
          </span>
          <span className="font-medium text-slate-900 dark:text-slate-100">
            ERBB2
          </span>
        </p>

        <p className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">
            Best Ligand
          </span>
          <span className="font-medium text-slate-900 dark:text-slate-100">
            L1
          </span>
        </p>

        <p className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">
            Selectivity
          </span>
          <span className="font-semibold text-emerald-500">
            High
          </span>
        </p>

        <button
          className="
            mt-5 w-full
            rounded-md py-2.5 text-sm font-medium
            text-white
            bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
            shadow-lg shadow-cyan-500/20
            transition-all duration-300
            hover:scale-[1.02]
            active:scale-[0.98]
          "
        >
          View Full Result →
        </button>
      </div>
    </div>
  );
}
