export default function InsightBox({ title, children }) {
  return (
    <div className="border-l-4 border-green-600 bg-green-50 p-3 text-sm dark:bg-green-900 dark:border-green-400 dark:text-white">
      <p className="font-medium mb-1">{title}</p>
      {children}
    </div>
  );
}
