import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

const history = [
  {
    id: 1,
    target: "ERBB2",
    date: "Today, 10:24 AM",
    status: "Completed",
    selectivity: "High",
  },
  {
    id: 2,
    target: "ERBB2",
    date: "Yesterday",
    status: "Completed",
    selectivity: "Medium",
  },
  {
    id: 3,
    target: "FLT3",
    date: "3 days ago",
    status: "Failed",
    selectivity: "-",
  },
];

export default function HistoryPanel() {
  return (
    <div className="
      rounded-2xl
      border border-slate-200/60 dark:border-slate-800/60
      bg-white/70 dark:bg-white/5
      backdrop-blur-xl
      p-4 sm:p-6
    ">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="
          text-base sm:text-lg
          font-semibold
          text-slate-900 dark:text-slate-50
        ">
          Analysis History
        </h2>

        <Link
          to="/history"
          className="
            text-slate-500 hover:text-indigo-500
            transition-colors
          "
        >
          <FiExternalLink size={18} />
        </Link>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {history.map((h) => (
          <div
            key={h.id}
            className="
              flex items-center justify-between
              rounded-xl p-3 sm:p-4
              bg-white/60 dark:bg-white/5
              border border-slate-200/40 dark:border-slate-800/40
              transition-all duration-300
              hover:shadow-md hover:shadow-cyan-500/10
            "
          >
            <div>
              <p className="
                text-sm sm:text-base
                font-medium
                text-slate-900 dark:text-slate-100
              ">
                {h.target}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {h.date}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {h.status}
              </p>
              <p
                className={`text-xs font-semibold ${
                  h.selectivity === "High"
                    ? "text-emerald-500"
                    : h.selectivity === "Medium"
                    ? "text-amber-500"
                    : "text-slate-400"
                }`}
              >
                {h.selectivity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
