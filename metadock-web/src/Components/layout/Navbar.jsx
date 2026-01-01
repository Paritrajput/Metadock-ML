import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const links = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/analyze" },
    { name: "Contact", path: "/contact-us" },
  ];

  /* ================= SCROLL HIDE ================= */
  useEffect(() => {
    const onScroll = () => {
      if (open) return;

      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  /* ================= LOCK SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`
          fixed top-5 left-1/2 z-50
          w-[calc(100%-2rem)] md:w-[calc(100%-5rem)]
          -translate-x-1/2
          rounded-full
          border border-slate-200/60 dark:border-slate-800/60
          bg-white/70 dark:bg-[#06070b]/70
          backdrop-blur-xl
          transition-all duration-500
          ${hidden ? "-translate-y-32" : "translate-y-0"}
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          {/* LOGO */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50"
          >
            MetaDock
            <span className="ml-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              ML
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = location.pathname === l.path;
              return (
                <li key={l.path} className="relative group">
                  <Link
                    to={l.path}
                    className={`
                      text-sm font-medium transition-colors
                      ${active
                        ? "text-indigo-500"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}
                    `}
                  >
                    {l.name}
                    <span
                      className={`
                        absolute -bottom-1 left-0 h-[2px] w-full
                        bg-gradient-to-r from-indigo-500 to-cyan-400
                        transition-transform duration-300
                        origin-left
                        ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                      `}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-slate-300/60 dark:border-slate-700/60
                bg-white/60 dark:bg-white/5
                text-slate-700 dark:text-slate-200
                transition-all duration-300
                hover:scale-105
              "
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* CTA (DESKTOP) */}
            <Link
              to="/login"
              className="
                hidden md:inline-block
                rounded-md px-5 py-2 text-sm font-medium text-white
                bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
                shadow-lg shadow-cyan-500/20
                transition-all duration-300
                hover:scale-[1.04]
              "
            >
              Get In
            </Link>

            {/* HAMBURGER (MOBILE) */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="md:hidden flex flex-col gap-1.5"
            >
              <span
                className={`h-[2px] w-6 bg-slate-900 dark:bg-white transition ${
                  open ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-slate-900 dark:bg-white transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-slate-900 dark:bg-white transition ${
                  open ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ================= FULLSCREEN WATER MENU ================= */}
      <div
        className={`
          fixed inset-0 z-[100]
          bg-white/85 dark:bg-[#06070b]/90
          backdrop-blur-xl

          transition-[clip-path,opacity] duration-700
          ease-[cubic-bezier(.4,0,.2,1)]

          ${open
            ? "clip-open opacity-100 pointer-events-auto"
            : "clip-closed opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex h-full flex-col items-center justify-center gap-10 text-center">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`
                text-3xl font-semibold transition-colors
                ${
                  location.pathname === l.path
                    ? "text-indigo-500"
                    : "text-slate-900 dark:text-white hover:text-indigo-400"
                }
              `}
            >
              {l.name}
            </Link>
          ))}

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="
              mt-6 rounded-md px-8 py-3
              text-white font-medium
              bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
            "
          >
            Get In
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="mt-8 text-sm text-slate-500"
          >
            Close ✕
          </button>
        </div>
      </div>
    </>
  );
}
