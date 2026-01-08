export default function ResultSummary({ result }) {
  if (!result) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No recent results yet
      </p>
    );
  }

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
        Latest Result
      </h2>

      <div className="space-y-3 text-sm">
        <Row label="Target" value={result.target} />
        <Row label="Best Ligand" value={result.ligand} />
        <Row
          label="Selectivity"
          value={result.selectivity}
          highlight
        />
      </div>
    </>
  );
}

function Row({ label, value, highlight }) {
  return (
    <p className="flex justify-between">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className={`font-medium ${highlight ? "text-emerald-500" : ""}`}>
        {value || "—"}
      </span>
    </p>
  );
}
