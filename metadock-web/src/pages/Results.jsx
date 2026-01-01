import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getResults } from "../services/api";

import MoleculeViewer from "../Components/viewer/MoleculeViewer";
import ScoreChart from "../Components/ui/ScoreChart";
import SelectivityInsight from "../Components/ui/SelectivityInsight";
import InsightBox from "../Components/ui/InsightBox";
import Skeleton from "../Components/ui/Skeleton";

export default function Results() {
  const { targetId } = useParams();

  const [data, setData] = useState(null);
  const [conf, setConf] = useState(null);
  const [rep, setRep] = useState("cartoon");
  const [ligand, setLigand] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    getResults(targetId).then((res) => {
      setData(res);
      setConf(res.conformations[0]);
      setLigand(res.ligands[0]);
    });
  }, [targetId]);

  /* ===================== LOADING ===================== */
  if (!data || !conf) {
    return (
      <div className="min-h-screen bg-[#f7f8fb] dark:bg-[#06070b] p-10 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[520px] w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] dark:bg-[#06070b] transition-colors">

      {/* ===================== FULLSCREEN VIEWER ===================== */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setFullscreen(false)}
            className="
              absolute top-6 right-6 z-50
              rounded-md px-4 py-2 text-sm font-medium
              bg-white text-black
              shadow-lg
            "
          >
            Exit Fullscreen ✕
          </button>

          <MoleculeViewer
            pdbUrl={conf.pdbUrl}
            ligand={ligand}
            representation={rep}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* ===================== HEADER ===================== */}
        <header>
          <h1 className="
            text-3xl font-semibold tracking-tight
            text-slate-900 dark:text-slate-50
          ">
            Binding & Selectivity Analysis
          </h1>
          <p className="
            mt-1 text-sm
            text-slate-600 dark:text-slate-400
          ">
            Ensemble-based protein–ligand interaction workspace
          </p>
        </header>

        {/* ===================== WHY THIS MATTERS ===================== */}
        <InsightBox title="Why this matters">
          Selective binding to specific conformations improves efficacy
          while minimizing off-target interactions and side effects.
        </InsightBox>

        {/* ===================== MAIN GRID ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ===================== VIEWER ===================== */}
          <section className="lg:col-span-8 space-y-4">
            <div
              className="
                rounded-2xl overflow-hidden
                border border-slate-200/60 dark:border-slate-800/60
                bg-white/70 dark:bg-white/5
                backdrop-blur-xl
              "
            >
              <div
                className="
                  flex items-center justify-between
                  px-5 py-4
                  border-b border-slate-200/60 dark:border-slate-800/60
                "
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    3D Molecular Viewer
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Protein–ligand interaction visualization
                  </p>
                </div>

                <button
                  onClick={() => setFullscreen(true)}
                  className="
                    rounded-md px-3 py-1.5 text-xs font-medium
                    border border-slate-300/60 dark:border-slate-700/60
                    bg-white/60 dark:bg-white/5
                    transition hover:bg-white/80 dark:hover:bg-white/10
                  "
                >
                  Fullscreen
                </button>
              </div>

              <div className="h-[520px]">
                <MoleculeViewer
                  pdbUrl={conf.pdbUrl}
                  ligand={ligand}
                  representation={rep}
                />
              </div>
            </div>
          </section>

          {/* ===================== RIGHT PANEL ===================== */}
          <section className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 self-start">

            {/* === CONTROLS === */}
            <div className="
              rounded-2xl p-5 space-y-4
              border border-slate-200/60 dark:border-slate-800/60
              bg-white/70 dark:bg-white/5
              backdrop-blur-xl
            ">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Visualization Controls
              </p>

              <div>
                <label className="text-xs text-slate-500">Conformation</label>
                <select
                  className="
                    mt-1 w-full rounded-md p-2
                    bg-white/80 dark:bg-white/5
                    border border-slate-300/60 dark:border-slate-700/60
                  "
                  value={conf.id}
                  onChange={(e) =>
                    setConf(data.conformations.find(c => c.id === e.target.value))
                  }
                >
                  {data.conformations.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500">Representation</label>
                <select
                  className="
                    mt-1 w-full rounded-md p-2
                    bg-white/80 dark:bg-white/5
                    border border-slate-300/60 dark:border-slate-700/60
                  "
                  value={rep}
                  onChange={(e) => setRep(e.target.value)}
                >
                  <option value="cartoon">Cartoon</option>
                  <option value="surface">Surface</option>
                  <option value="sticks">Sticks</option>
                </select>
              </div>
            </div>

            {/* === LIGANDS === */}
            <div className="
              rounded-2xl p-5 space-y-3
              border border-slate-200/60 dark:border-slate-800/60
              bg-white/70 dark:bg-white/5
              backdrop-blur-xl
            ">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Docked Ligands
              </p>

              {data.ligands.map(l => (
                <button
                  key={l.id}
                  onClick={() => setLigand(l)}
                  className={`
                    w-full text-left rounded-xl p-3 border
                    transition-all duration-200
                    ${
                      ligand?.id === l.id
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-transparent"
                        : "bg-white/60 dark:bg-white/5 border-slate-200/60 dark:border-slate-800/60 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{l.id}</span>
                    <span className="text-xs">{l.selectivity}</span>
                  </div>
                  <p className="text-xs opacity-70">
                    Score: {l.score}
                  </p>
                </button>
              ))}
            </div>

            {/* === ANALYSIS === */}
            {ligand && (
              <div className="
                rounded-2xl p-5 space-y-4
                border border-slate-200/60 dark:border-slate-800/60
                bg-white/70 dark:bg-white/5
                backdrop-blur-xl
              ">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Selectivity Analysis
                </p>

                <ScoreChart
                  ligand={ligand}
                  conformations={data.conformations}
                />

                <SelectivityInsight ligand={ligand} />
              </div>
            )}

          </section>
        </div>
      </div>
    </div>
  );
}
