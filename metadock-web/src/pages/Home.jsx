import { Link } from "react-router-dom";
import Features from "../Components/layout/Home/Features";
import gridBlob from "../assets/grid2.png";

export default function Home() {
  return (
    <div className="bg-[#f7f8fb] dark:bg-[#06070b00] ">
      {/* ================= HERO ================= */}
      <div className="h-full w-full overflow-hidden fixed top-0 left-0 z-10">
      <iframe className="rotate-35 absolute top-0 left-0 opacity-30 scale-150" src="https://my.spline.design/spiraldna-5NzgnrbNTp1VYnnXjg05sji0/" frameborder="0" width="100%" height="100%"></iframe>
      </div>

      <section className="
        relative min-h-screen overflow-hidden
        bg-[#f7f8fb] dark:bg-[#06070b00]
      ">

        {/* IMAGE BACKDROP */}
        <img
          src={gridBlob}
          alt="Molecular field"
          className="
            pointer-events-none absolute
            left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[900px] max-w-none
            opacity-20 dark:opacity-30 z-0 
          "
        />

        {/* RADIAL GLOW */}
        <div className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_60%)]
        " />

        {/* TOP → BOTTOM FADE */}
        <div className="
          pointer-events-none absolute inset-0
          bg-gradient-to-b
          from-white/80 via-white/40 to-white
          dark:from-[#06070b]/80 dark:via-[#06070b]/50 dark:to-[#06070b]
        " />

        {/* CONTENT */}
        <div className="relative w-full dark:bg-black/45 z-20">
        <div className="
          relative z-10 mx-auto flex min-h-screen max-w-6xl
          flex-col items-center justify-center px-6 text-center
        ">

          {/* PILL */}
          <span className="
            mb-8 rounded-full border
            border-slate-300/60 dark:border-slate-700/60
            bg-white/70 dark:bg-white/5
            px-5 py-2 text-xs tracking-wide
            text-slate-700 dark:text-slate-300
            backdrop-blur-xl
          ">
            🧬 AI × Molecular Intelligence
          </span>

          {/* HEADLINE */}
          <h1 className="
            mb-8 max-w-4xl
            text-5xl sm:text-6xl lg:text-7xl
            font-semibold tracking-tight
            text-slate-900 dark:text-white
          ">
            Engineering Insight at the
            <span className="
              block bg-gradient-to-r
              from-indigo-500 via-sky-500 to-cyan-400
              bg-clip-text text-transparent
            ">
              Molecular Scale
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="
            mb-12 max-w-2xl text-lg
            text-slate-600 dark:text-slate-400
          ">
            MetaDock-ML analyzes metastable protein conformations
            and applies AI-driven docking to discover selective,
            safer molecular interactions.
          </p>

          {/* CTA */}
          <Link
            to="/analyze"
            className="
              rounded-md px-10 py-3
              font-medium text-white
              bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
              shadow-xl shadow-cyan-500/20
              transition-all duration-300
              hover:scale-105 active:scale-95
            "
          >
            Start Analysis
          </Link>
        </div>
        </div>

      </section>
                  {/* ================= FEATURES ================= */}
      <div className="w-full relative z-50 dark:bg-black/55 z-30">
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-6 py-24 rounded-4xl z-40" > 
      <Features />
      </div> 
      </div>
      

  
    </div>
  );
}
