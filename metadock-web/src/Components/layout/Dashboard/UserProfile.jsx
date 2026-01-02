import React, { use, useEffect, useState } from "react";

function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/profile`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        console.log(response);
        if (!response.ok) {
          window.location.href = "/login";
          throw new Error("Failed to fetch user info");
          

        }
        const data = await response.json();
        console.log(data);
        setUserInfo(data.user);
        // return await response.json();
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    };
    getUserInfo();
  }, []);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  return (
    <div
      className="
      flex items-center justify-between gap-6
      rounded-2xl
      border border-slate-200/60 dark:border-slate-800/60
      bg-white/70 dark:bg-white/5
      backdrop-blur-xl
      p-6
    "
    >
      {/* LEFT: AVATAR + INFO */}
      <div className="flex items-center gap-4">
        <div
          className="
          h-12 w-12 rounded-full
          bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400
          flex items-center justify-center
          text-white font-semibold
        "
        >
          {userInfo
            ? userInfo.name
                .split(" ").map((n) => n[0])
                .join("")
                .toUpperCase()
            : "U"}
        </div>

        <div>
          <h2
            className="
            text-lg font-semibold
            text-slate-900 dark:text-slate-50
          "
          >
            {userInfo ? userInfo.name : "User Name"}
          </h2>
          <p
            className="
            text-sm
            text-slate-500 dark:text-slate-400
          "
          >
            {userInfo ? userInfo.email : ""}
          </p>
        </div>
      </div>

      {/* RIGHT: SETTINGS */}
      <button
        onClick={logout}
        className="
          rounded-md px-4 py-2 text-sm font-medium
          text-slate-700 dark:text-slate-200
          bg-white/60 dark:bg-white/5
          border border-slate-300/60 dark:border-slate-700/60
          transition-all duration-300
          hover:bg-white/80 dark:hover:bg-white/10
        "
      >
        LogOut
      </button>
    </div>
  );
}

export default UserProfile;
