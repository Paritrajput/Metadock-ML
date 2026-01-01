import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="
      relative overflow-hidden
      border-t border-slate-200/60 dark:border-slate-800/60
      bg-white/80 dark:bg-[#06070b]/80
      backdrop-blur-xl background-none z-30
    ">

      {/* GRADIENT GLOW */}
      <div className="
        pointer-events-none absolute inset-x-0 -top-32 h-64
        bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-cyan-400/20
        blur-3xl
      " />

      <div className="relative mx-auto max-w-7xl px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-4">
            <h3 className="
              text-xl font-semibold tracking-tight
              text-slate-900 dark:text-slate-50
            ">
              MetaDock
              <span className="
                ml-1 bg-gradient-to-r
                from-indigo-500 via-sky-500 to-cyan-400
                bg-clip-text text-transparent
              ">
                ML
              </span>
            </h3>

            <p className="
              max-w-xs text-sm leading-relaxed
              text-slate-600 dark:text-slate-400
            ">
              AI-driven molecular intelligence platform for discovering
              hidden protein interactions and accelerating drug discovery.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide
              text-slate-900 dark:text-slate-200">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="footer-link" to="/analyze">Analysis</Link>
              </li>
              <li>
                <Link className="footer-link" to="/results/demo">Demo Results</Link>
              </li>
              <li>
                <Link className="footer-link" to="/status">Job Status</Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide
              text-slate-900 dark:text-slate-200">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="footer-link" to="/about">About</Link>
              </li>
              <li>
                <Link className="footer-link" to="/research">Research</Link>
              </li>
              <li>
                <Link className="footer-link" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide
              text-slate-900 dark:text-slate-200">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="footer-link" to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link className="footer-link" to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link className="footer-link" to="/security">Security</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="
          my-12 h-px w-full
          bg-gradient-to-r from-transparent via-slate-300/50 to-transparent
          dark:via-slate-700/50
        " />

        {/* BOTTOM BAR */}
        <div className="
          flex flex-col items-center justify-between gap-4
          text-sm text-slate-600 dark:text-slate-400
          md:flex-row
        ">
          <span>
            © {new Date().getFullYear()} MetaDock-ML. All rights reserved.
          </span>

          <span className="
            bg-gradient-to-r from-indigo-500 to-cyan-400
            bg-clip-text text-transparent
            font-medium
          ">
            Built with AI • Molecular • Precision
          </span>
        </div>
      </div>

      {/* FOOTER LINK STYLES */}
      <style>
        {`
          .footer-link {
            color: rgb(71 85 105);
            transition: color 0.2s ease;
          }
          .dark .footer-link {
            color: rgb(148 163 184);
          }
          .footer-link:hover {
            color: rgb(99 102 241);
          }
        `}
      </style>
    </footer>
  );
}
