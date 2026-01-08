import { Link } from "react-router-dom";

export default function History() {
  // later this will come from API
  const history = [
    {
      id: "job_001",
      target: "ERBB2",
      date: "12 Apr 2025",
      status: "Completed",
      selectivity: "High",
    },
    {
      id: "job_002",
      target: "EGFR",
      date: "08 Apr 2025",
      status: "Completed",
      selectivity: "Medium",
    },
    {
      id: "job_003",
      target: "ALK",
      date: "01 Apr 2025",
      status: "Running",
      selectivity: null,
    },
  ];

  return (
    <div className="
      min-h-screen
      bg-[#f7f8fb] dark:bg-[#06070b]
      transition-colors
    ">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="
            text-3xl font-semibold tracking-tight
            text-slate-900 dark:text-slate-50
          ">
            Analysis History
          </h1>
          <p className="
            text-sm text-slate-600 dark:text-slate-400
          ">
            A complete record of your past molecular analyses
          </p>
        </header>

        {/* FILTER BAR (UI READY) */}
        <div className="
          flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between
          rounded-2xl p-5
          border border-slate-200/60 dark:border-slate-800/60
          bg-white/70 dark:bg-white/5
          backdrop-blur-xl
        ">
          <input
            placeholder="Search by target gene (e.g. ERBB2)"
            className="
              w-full sm:max-w-md rounded-md px-4 py-2
              bg-white/80 dark:bg-white/5
              border border-slate-300/60 dark:border-slate-700/60
              text-slate-900 dark:text-slate-100
              placeholder-slate-400
              focus:outline-none focus:ring-2
              focus:ring-indigo-500
            "
          />

          <select
            className="
              rounded-md px-4 py-2
              bg-white/80 dark:bg-white/5
              border border-slate-300/60 dark:border-slate-700/60
              text-sm
            "
          >
            <option className="bg-white/80 dark:bg-black/80">All statuses</option>
            <option className="bg-white/80 dark:bg-black/80">Completed</option>
            <option className="bg-white/80 dark:bg-black/80">Running</option>
          </select>
        </div>

        {/* HISTORY LIST */}
        <div className="space-y-4">
          {history.map((h) => (
            <div
              key={h.id}
              className="
                group flex flex-col sm:flex-row
                sm:items-center sm:justify-between gap-4
                rounded-2xl p-6
                border border-slate-200/60 dark:border-slate-800/60
                bg-white/70 dark:bg-white/5
                backdrop-blur-xl
                transition-all duration-300
                hover:shadow-lg hover:shadow-cyan-500/10
              "
            >
              {/* LEFT */}
              <div className="space-y-1">
                <h3 className="
                  text-lg font-semibold
                  text-slate-900 dark:text-slate-50
                ">
                  {h.target}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {h.date} • Job ID: {h.id}
                </p>
              </div>

              {/* CENTER */}
              <div className="flex gap-3 items-center">
                <span
                  className={`
                    rounded-full px-3 py-1 text-xs font-medium
                    ${
                      h.status === "Completed"
                        ? "bg-emerald-500/15 text-emerald-600"
                        : "bg-amber-500/15 text-amber-600"
                    }
                  `}
                >
                  {h.status}
                </span>

                {h.selectivity && (
                  <span
                    className={`
                      rounded-full px-3 py-1 text-xs font-medium
                      ${
                        h.selectivity === "High"
                          ? "bg-indigo-500/15 text-indigo-600"
                          : "bg-sky-500/15 text-sky-600"
                      }
                    `}
                  >
                    {h.selectivity} Selectivity
                  </span>
                )}
              </div>

              {/* RIGHT */}
              <Link
                to={`/results/${h.id}`}
                className="
                  inline-flex items-center gap-1
                  text-sm font-medium
                  text-indigo-500
                  transition
                  hover:text-indigo-400
                "
              >
                View Results →
              </Link>
            </div>
          ))}
        </div>

        {/* EMPTY STATE (FUTURE READY) */}
        {history.length === 0 && (
          <div className="
            rounded-2xl p-12 text-center
            border border-slate-200/60 dark:border-slate-800/60
            bg-white/70 dark:bg-white/5
            backdrop-blur-xl
          ">
            <p className="text-slate-600 dark:text-slate-400">
              You haven’t run any analyses yet.
            </p>
            <Link
              to="/analyze"
              className="
                mt-4 inline-block rounded-md px-6 py-2
                text-white font-medium
                bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
              "
            >
              Start your first analysis
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
