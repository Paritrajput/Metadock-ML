import { useEffect, useRef, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const inputsRef = useRef([]);
  const email = localStorage.getItem("email") || "";
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  // countdown timer
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: otp.join("") }),
        }
      );

      if (response.ok) {
        console.log("OTP verified successfully");
        const data = await response.json();
        console.log(data);
        alert("OTP verified successfully. You can now log in.");
        window.location.href = "/login";
      } else {
        console.error("Failed:", data.error);
        alert(data.error || "OTP verification failed");
      }
    } catch (err) {
      console.error("Error submitting OTP:", err);
      alert("Error submitting OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setLoadingResend(true);
    setTimeLeft(60);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("OTP resent successfully");
        alert("OTP resent successfully. Please check your email.");
      } else {
        console.error("Failed to resend OTP:", data.error);
        alert(data.error || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      alert("Error resending OTP. Please try again.");
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div
      className="
      relative min-h-screen flex items-center justify-center overflow-hidden
      bg-[#f7f8fb] dark:bg-[#06070b]
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

      {/* CARD */}
      <div
        className="
        relative z-10 w-full max-w-md
        rounded-2xl
        border border-slate-200/60 dark:border-slate-800/60
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        p-8 shadow-xl
      "
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            We sent a 6-digit verification code to your email address.
          </p>
        </div>

        {/* OTP INPUTS */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="
                  h-12 w-12 text-center text-lg font-semibold
                  rounded-md
                  bg-white/80 dark:bg-white/5
                  border border-slate-300/60 dark:border-slate-700/60
                  text-slate-900 dark:text-slate-100
                  focus:outline-none focus:ring-2
                  focus:ring-indigo-500
                "
              />
            ))}
          </div>

          {/* VERIFY BUTTON */}
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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* RESEND */}
        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {timeLeft > 0 ? (
            <span>Resend code in {timeLeft}s</span>
          ) : (
            <button
              onClick={resendOTP}
              disabled={loadingResend}
              className="font-medium text-indigo-500 hover:text-indigo-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loadingResend ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Wrong email?{" "}
          <Link to="/signup" className="font-medium text-indigo-500">
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
}
