// src/services/api.js

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

export async function analyzeTarget(payload) {
  await sleep(800);

  return {
    job_id: "job_123",
    target_id: "target_001",
    status: "queued"
  };
}

export async function getJobStatus(jobId) {
  await sleep(500);

  const stages = [
    "target_validation",
    "structure_prediction",
    "ensemble_docking",
    "analysis",
    "completed"
  ];

  const start = Number(sessionStorage.getItem(jobId) || 0);
  const next = Math.min(start + 1, stages.length - 1);
  sessionStorage.setItem(jobId, next);

  return {
    job_id: jobId,
    stage: stages[next],
    progress: (next / (stages.length - 1)) * 100
  };
}


export async function getResults(targetId) {
  return {
    target_id: targetId,

    conformations: [
      {
        id: "conf_1",
        label: "Inactive",
        pdbUrl: "https://files.rcsb.org/download/3PP0.pdb",
      },
      {
        id: "conf_2",
        label: "Active-like",
        pdbUrl: "https://files.rcsb.org/download/3PP1.pdb",
      },
    ],

    ligands: [
      {
        id: "L1",
        selectivity: "High",
        scores: {
          conf_1: -6.2,
          conf_2: -9.4,
        },
        ligandUrl:
          "https://files.rcsb.org/ligands/view/ATP_ideal.sdf",
        pocketResidues: "45,46,47,48,81,82,83",
      },
      {
        id: "L2",
        selectivity: "Medium",
        scores: {
          conf_1: -7.1,
          conf_2: -8.0,
        },
        ligandUrl:
          "https://files.rcsb.org/ligands/view/ADP_ideal.sdf",
        pocketResidues: "50,51,52,85,86",
      },
    ],
  };
}
