import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeTarget } from "../../../services/api";

export default function UploadPanel() {
  const [gene, setGene] = useState("ERBB2");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    const res = await analyzeTarget({ gene });
    navigate(`/status/${res.job_id}`);
  };

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
        New Analysis
      </h2>

      <div className="space-y-4">

        {/* GENE INPUT */}
        <div>
          <label className="
            mb-1 block text-sm font-medium
            text-slate-700 dark:text-slate-300
          ">
            Target Gene
          </label>
          <input
            value={gene}
            onChange={(e) => setGene(e.target.value)}
            placeholder="e.g. ERBB2"
            className="
              w-full rounded-md px-4 py-2
              bg-white/80 dark:bg-white/5
              border border-slate-300/60 dark:border-slate-700/60
              text-slate-900 dark:text-slate-100
              placeholder-slate-400
              focus:outline-none focus:ring-2
              focus:ring-indigo-500
            "
          />
        </div>

        {/* FILE INPUT */}
        <div>
          <label className="
            mb-1 block text-sm font-medium
            text-slate-700 dark:text-slate-300
          ">
            Upload Structure (optional)
          </label>

          <input
            type="file"
            className="
              w-full text-sm
              file:mr-4 file:rounded-md file:border-0
              file:bg-indigo-500 file:px-4 file:py-2
              file:text-sm file:font-medium file:text-white
              hover:file:bg-indigo-600
              cursor-pointer
            "
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          onClick={submitHandler}
          className={`
            mt-2 w-full rounded-md py-3 font-medium
            text-white
            bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
            shadow-lg shadow-cyan-500/20
            transition-all duration-300
            ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"}
          `}
        >
          {loading ? "Starting analysis…" : "Start Analysis"}
        </button>
      </div>
    </div>
  );
}
