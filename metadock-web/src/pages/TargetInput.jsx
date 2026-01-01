import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeTarget } from "../services/api";

export default function TargetInput() {
  const [gene, setGene] = useState("ERBB2");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    const res = await analyzeTarget({ gene });
    navigate(`/status/${res.job_id}`);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        Analyze Cancer Target
      </h2>

      <input
        className="w-full border p-2 rounded mb-4"
        value={gene}
        onChange={e => setGene(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={submitHandler}
        className="bg-black text-white px-6 py-3 rounded w-full"
      >
        {loading ? "Starting..." : "Run Pipeline"}
      </button>
    </div>
  );
}
