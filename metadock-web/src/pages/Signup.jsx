import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerifyOTP from "./VerifyOTP";

export default function Signup() {
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // entrance animation trigger
    setMounted(true);
  }, []);
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        console.log("OTP sent successfully");
        const data = await response.json();
        console.log(data);
        localStorage.setItem("email", email);

        router("/verify", { state: { email } });
      } else {
        console.error("Failed:", data.message);
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      relative min-h-screen flex items-center justify-center overflow-hidden
      bg-[#f7f8fb] dark:bg-[#06070b]
      transition-colors
    "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
        pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px]
        -translate-x-1/2 rounded-full
        bg-gradient-to-r from-indigo-500/30 via-sky-500/30 to-cyan-400/30
        blur-3xl
      "
      />

      {/* SOFT NOISE / DEPTH */}
      <div
        className="
        pointer-events-none absolute inset-0
        bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_60%)]
        dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_60%)]
      "
      />

      {/* CARD */}
      <div
        className={`
          relative z-10 w-full max-w-md
          rounded-2xl
          border border-slate-200/60 dark:border-slate-800/60
          bg-white/70 dark:bg-white/5
          backdrop-blur-xl
          p-8 shadow-xl
          transition-all duration-700
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2
            className="
            text-3xl font-semibold tracking-tight
            text-slate-900 dark:text-slate-50
          "
          >
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Join{" "}
            <span className="font-medium text-indigo-500">MetaDock-ML</span> and
            start exploring molecular intelligence
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Doe"
              className="
                mt-1 w-full rounded-md px-4 py-2
                bg-white/80 dark:bg-white/5
                border border-slate-300/60 dark:border-slate-700/60
                text-slate-900 dark:text-slate-100
                placeholder-slate-400
                focus:outline-none focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="
                mt-1 w-full rounded-md px-4 py-2
                bg-white/80 dark:bg-white/5
                border border-slate-300/60 dark:border-slate-700/60
                text-slate-900 dark:text-slate-100
                placeholder-slate-400
                focus:outline-none focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="
                mt-1 w-full rounded-md px-4 py-2
                bg-white/80 dark:bg-white/5
                border border-slate-300/60 dark:border-slate-700/60
                text-slate-900 dark:text-slate-100
                placeholder-slate-400
                focus:outline-none focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="
                mt-1 w-full rounded-md px-4 py-2
                bg-white/80 dark:bg-white/5
                border border-slate-300/60 dark:border-slate-700/60
                text-slate-900 dark:text-slate-100
                placeholder-slate-400
                focus:outline-none focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-md py-3 font-medium text-white
              bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
              shadow-lg shadow-cyan-500/20
              transition-all duration-300
              hover:scale-[1.02]
              active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
            "
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-500 hover:text-indigo-400"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
