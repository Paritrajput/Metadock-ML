import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useJobStatus from "../hooks/useJobStatus";

const stageLabels = {
  target_validation: "Target Validation",
  structure_prediction: "Structure Prediction",
  ensemble_docking: "Ensemble Docking",
  analysis: "Analysis",
  completed: "Completed",
};

export default function JobStatus() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const status = useJobStatus(jobId);

  useEffect(() => {
    if (status?.stage === "completed") {
      navigate("/results/target_001");
    }
  }, [status, navigate]);

  if (!status) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">
        Pipeline Progress
      </h2>

      <p className="mb-2">
        Current Stage: <b>{stageLabels[status.stage]}</b>
      </p>

      <div className="w-full bg-gray-200 rounded h-3">
        <div
          className="bg-green-500 h-3 rounded transition-all"
          style={{ width: `${status.progress}%` }}
        />
      </div>
    </div>
  );
}
