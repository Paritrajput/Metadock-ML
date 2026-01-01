export default function ScoreChart({ ligand, conformations }) {
  return (
    <div className="space-y-3">
      {conformations.map(conf => {
        const score = ligand.scores[conf.id];

        // Normalize score for width (rough visual scaling)
        const width = Math.min(Math.abs(score) * 8, 100);

        return (
          <div key={conf.id}>
            <div className="flex justify-between text-sm mb-1">
              <span>{conf.label}</span>
              <span>{score}</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="h-3 rounded bg-green-600"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
