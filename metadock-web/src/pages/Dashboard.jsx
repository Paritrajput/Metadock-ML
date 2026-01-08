import HistoryPanel from "../Components/layout/Dashboard/HistoryPanel";
import UploadPanel from "../Components/layout/Dashboard/UploadPanel";
import ResultSummary from "../Components/layout/Dashboard/ResultSummary";
import StatsGrid from "../Components/layout/Dashboard/StatsGrid";
import UserProfile from "../Components/layout/Dashboard/UserProfile";

export default function Dashboard() {
  return (
    <div className=" 
      relative mx-auto max-w-7xl
      px-4 sm:px-6
      py-6 sm:py-10
      space-y-8 sm:space-y-10
    ">

      {/* BACKGROUND GLOW */}
      <div className="
        pointer-events-none absolute
        -top-32 left-1/2 -z-10
        h-[320px] w-[320px] sm:h-[420px] sm:w-[420px]
        -translate-x-1/2
        rounded-full
        bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-cyan-400/20
        blur-3xl
      " />

      {/* HEADER */}
      <div className="
        flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between mt-20
      ">
        <div>
          <h1 className="
            text-2xl sm:text-3xl
            font-semibold tracking-tight
            text-slate-900 dark:text-slate-50
          ">
            Welcome back, Researcher 👋
          </h1>
          <p className="
            mt-1 text-sm
            text-slate-600 dark:text-slate-400
          ">
            Overview of your molecular analysis activity
          </p>
        </div>

        {/* PRIMARY ACTION */}
        <button className="
          self-start sm:self-auto
          inline-flex items-center justify-center
          rounded-md px-5 py-2.5
          text-sm font-medium text-white
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
        p-4 sm:p-6
      ">
        <UserProfile />
      </div>

      {/* STATS */}
      <div className="
        rounded-2xl
        border border-slate-200/60 dark:border-slate-800/60
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        p-4 sm:p-6
      ">
        <StatsGrid />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

        {/* HISTORY */}
        <div className="lg:col-span-7">
          <HistoryPanel />
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <UploadPanel />
          <ResultSummary />
        </div>
      </div>
    </div>
  );
}
