export default function Features() {
  const features = [
    {
      title: "Selectivity-First Drug Design",
      desc: "Move beyond potency. MetaDock-ML prioritizes conformational selectivity to reduce off-target toxicity early.",
    },
    {
      title: "Dynamic Protein Intelligence",
      desc: "Proteins are modeled as flexible systems, capturing real biological behavior instead of static snapshots.",
    },
    {
      title: "AI-Driven Molecular Optimization",
      desc: "Machine learning guides ligand scoring, refinement, and prioritization across multiple objectives.",
    },
    {
      title: "Multi-Target Screening",
      desc: "Evaluate candidate molecules against disease and healthy targets simultaneously.",
    },
    {
      title: "End-to-End Virtual Pipeline",
      desc: "From structure analysis to selectivity insights — all in one integrated workflow.",
    },
    {
      title: "Faster, Safer Discovery",
      desc: "Reduce time, cost, and late-stage failure in early drug discovery.",
    },
  ];

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#f7f8fb] dark:bg-[#06070b]
        transition-colors rounded-4xl border border-slate-200/60 dark:border-slate-800/60
        bg-white/70 dark:bg-white/5  z-30 relative transition-all duration-300
                
                hover:shadow-xl hover:shadow-cyan-500/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2
            className="
              text-4xl font-semibold tracking-tight
              text-slate-900 dark:text-slate-50
            "
          >
            Rethinking Drug Discovery with AI
          </h2>
          <p
            className="
              text-lg
              text-slate-600 dark:text-slate-400
            "
          >
            MetaDock-ML is an AI-powered platform designed to discover
            selective, safer cancer therapeutics.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="
                group rounded-2xl p-6
                border border-slate-200/60 dark:border-slate-800/60
                bg-white/70 dark:bg-white/5
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl hover:shadow-cyan-500/10
              "
            >
              <h3
                className="
                  text-lg font-semibold
                  text-slate-900 dark:text-slate-50
                "
              >
                {f.title}
              </h3>

              <p
                className="
                  mt-2 text-sm leading-relaxed
                  text-slate-600 dark:text-slate-400
                "
              >
                {f.desc}
              </p>

              {/* subtle accent */}
              <div
                className="
                  mt-4 h-[2px] w-12
                  bg-gradient-to-r
                  from-indigo-500 via-sky-500 to-cyan-400
                  opacity-70
                "
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
