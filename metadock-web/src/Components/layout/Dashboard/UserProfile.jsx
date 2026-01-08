import { useEffect, useState } from "react";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/profile`,
          { credentials: "include" }
        );

        if (!res.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await res.json();
        setUserInfo(data.user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserInfo();
  }, []);

  const logout = async () => {
    setLoadingLogout(true);
    try {
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,
        { method: "POST", credentials: "include" }
      );
    } finally {
      setLoadingLogout(false);
      window.location.href = "/login";
    }
  };

  const initials =
    userInfo?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="
          h-12 w-12 rounded-full
          bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400
          flex items-center justify-center
          text-white font-semibold
        ">
          {initials}
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
            {userInfo?.name || "User Name"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {userInfo?.email || ""}
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        disabled={loadingLogout}
        className="
          self-start sm:self-auto
          rounded-md px-4 py-2 text-sm font-medium
          border border-slate-300/60 dark:border-slate-700/60
          bg-white/60 dark:bg-white/5
          text-slate-700 dark:text-slate-200
          transition hover:bg-white/80 dark:hover:bg-white/10
          disabled:opacity-70
        "
      >
        {loadingLogout ? "Logging out..." : "Log out"}
      </button>
    </div>
  );
}
