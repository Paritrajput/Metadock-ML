import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/UserContext";
import { useEffect, useRef, useState } from "react";

import {
  FiHome,
  FiGrid,
  FiMail,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const links = [
    { name: "Home", path: "/", icon: <FiHome /> },
    { name: "Dashboard", path: user? `/dashboard/${user._id}`:"/login", icon: <FiGrid /> },
    { name: "Contact", path: "/contact-us", icon: <FiMail /> },
  ];

  /* ================= SCROLL HIDE (DESKTOP) ================= */
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


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* DESKTOP / TOP NAV */}
      <header
        className={`
          fixed top-4 left-1/2 z-[90]
          w-[calc(100%-2rem)] md:w-[calc(100%-15rem)] lg:w-[calc(100%-30rem)]
          -translate-x-1/2
          rounded-full
          border border-slate-200/60 dark:border-slate-800/60
          bg-white/70 dark:bg-[#06070b]/70
          backdrop-blur-xl
          transition-all duration-500 md:p-2
          ${hidden ? "-translate-y-32" : "translate-y-0"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-3">

          {/* LOGO */}
          <Link to="/" className="text-xl font-semibold text-slate-900 dark:text-white">
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
                    className={`text-sm font-medium transition-colors ${
                      active
                        ? "text-indigo-500"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {l.name}
                    <span
                      className={`
                        absolute -bottom-1 left-0 h-[2px] w-full
                        bg-gradient-to-r from-indigo-500 to-cyan-400
                        transition-transform origin-left
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
   <button
  onClick={toggleTheme}
  aria-label="Toggle theme"
  className="
    group relative h-9 w-9
    rounded-full
    border border-slate-300/60 dark:border-slate-700/60
    bg-white/70 dark:bg-white/5
    backdrop-blur-md
    transition-all duration-500
    hover:scale-110
    active:scale-95
  "
>
  {/* GLOW */}
  <span
    className="
      absolute inset-0 rounded-full
      bg-gradient-to-br from-indigo-500/40 via-sky-500/40 to-cyan-400/40
      opacity-0 blur-md
      transition-opacity duration-500
      group-hover:opacity-100
    "
  />

  {/* ICON */}
  <span
    className={`
      relative z-10 flex items-center justify-center
      text-lg
      transition-transform duration-700
      ${theme === "light" ? "rotate-0" : "rotate-180"}
    `}
  >
    {theme === "light" ? "🌙" : "☀️"}
  </span>
</button>


            {user ? (
              <Link
                to={`/dashboard/${user._id}`}
                className="hidden md:flex h-10 w-10 rounded-full
                bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400
                items-center justify-center text-white font-semibold"
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-block px-5 py-2 text-sm text-white rounded-md
                bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500"
              >
                Get In
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-2xl text-slate-800 dark:text-white"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* ================= FULLSCREEN SLIDE MOBILE MENU ================= */}
      <div
        className={`
          fixed inset-0 z-[100]
          bg-white dark:bg-[#06070b]
          transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b dark:border-slate-800">
          <span className="text-xl font-semibold text-slate-900 dark:text-white">
            MetaDock<span className="text-indigo-500">ML</span>
          </span>
          <button onClick={() => setOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col px-6 py-8 gap-6">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`
                flex items-center gap-4 text-lg font-medium
                ${
                  location.pathname === l.path
                    ? "text-indigo-500"
                    : "text-slate-800 dark:text-slate-200"
                }
              `}
            >
              <span className="text-xl">{l.icon}</span>
              {l.name}
            </Link>
          ))}
        </div>

        {/* USER SECTION */}
        <div className="mt-auto px-6 py-8 border-t dark:border-slate-800">
          {user ? (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full
                  bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400
                  flex items-center justify-center text-white font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>

              <Link
                to="/logout"
                className="flex items-center gap-3 text-red-500"
              >
                <FiLogOut />
                Log out
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-indigo-500 font-medium"
            >
              <FiLogIn />
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
