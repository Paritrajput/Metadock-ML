import HistoryPanel from "../Components/layout/Dashboard/HistoryPanel";
import UploadPanel from "../Components/layout/Dashboard/UploadPanel";
import ResultSummary from "../Components/layout/Dashboard/ResultSummary";
import StatsGrid from "../Components/layout/Dashboard/StatsGrid";
import UserProfile from "../Components/layout/Dashboard/UserProfile";

export default function Dashboard() {
  return (
    <div className="
      relative mx-auto max-w-7xl px-6 py-10 space-y-10
      bg-transparent
    ">

      {/* BACKGROUND GLOW */}
      <div className="
        pointer-events-none absolute -top-32 left-1/2 -z-10
        h-[420px] w-[420px]
        -translate-x-1/2
        rounded-full
        bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-cyan-400/20
        blur-3xl
      " />

      {/* HEADER */}
      <div className="
        flex flex-col gap-4 sm:flex-row
        sm:items-center sm:justify-between
      ">
        <div>
          <h1 className="
            text-3xl font-semibold tracking-tight
            text-slate-900 dark:text-slate-50
          ">
            Welcome back, Researcher 👋
          </h1>
          <p className="
            mt-1 text-sm
            text-slate-600 dark:text-slate-400
          ">
            Here’s an overview of your molecular analysis activity
          </p>
        </div>

        <button className="
          inline-flex items-center justify-center
          rounded-md px-6 py-2.5
          font-medium text-white
          bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
          shadow-lg shadow-cyan-500/20
          transition-all duration-300
          hover:scale-[1.03]
          active:scale-[0.97]
        ">
          + New Analysis
        </button>
      </div>

      {/* USER PROFILE */}
      <div className="
        rounded-2xl
        border border-slate-200/60 dark:border-slate-800/60
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        p-6
      ">
        <UserProfile />
      </div>

      {/* STATS */}
      <div className="
        rounded-2xl
        border border-slate-200/60 dark:border-slate-800/60
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        p-6
      ">
        <StatsGrid />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-8">

        {/* HISTORY */}
        <div className="
          col-span-12 lg:col-span-7
          rounded-2xl
          border border-slate-200/60 dark:border-slate-800/60
          bg-white/70 dark:bg-white/5
          backdrop-blur-xl
          p-6
        ">
          <HistoryPanel />
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-12 lg:col-span-5 space-y-8">

          <div className="
            rounded-2xl
            border border-slate-200/60 dark:border-slate-800/60
            bg-white/70 dark:bg-white/5
            backdrop-blur-xl
            p-6
          ">
            <UploadPanel />
          </div>

          <div className="
            rounded-2xl
            border border-slate-200/60 dark:border-slate-800/60
            bg-white/70 dark:bg-white/5
            backdrop-blur-xl
            p-6
          ">
            <ResultSummary />
          </div>

        </div>
      </div>
    </div>
  );
}
