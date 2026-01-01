export default function SelectivityInsight({ ligand }) {
  const scores = Object.values(ligand.scores);
  const max = Math.min(...scores);
  const min = Math.max(...scores);
  const delta = Math.abs(max - min);

  let verdict = "Low";
  if (delta > 2.5) verdict = "High";
  else if (delta > 1.5) verdict = "Medium";

  return (
    <div className="border rounded p-3 bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <p className="text-sm font-medium mb-1">
        Selectivity Assessment
      </p>
      <p className="text-sm">
        Score spread: <b>{delta.toFixed(2)}</b>
      </p>
      <p className="text-sm mt-1">
        Verdict:{" "}
        <span className="font-semibold">{verdict}</span>
      </p>
    </div>
  );
}
