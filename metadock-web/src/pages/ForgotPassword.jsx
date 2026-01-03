import { useEffect, useRef, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const inputsRef = useRef([]);

  /* ⏱ OTP TIMER */
  useEffect(() => {
    if (!otpSent || timeLeft === 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, otpSent]);

  /* 🔢 OTP INPUT HANDLING */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* 📧 SEND OTP */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoadingSend(true);

    if (!email) {
      alert("Please enter email");
      setLoadingSend(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      setTimeLeft(60);
    } catch {
      alert("Something went wrong");
    } finally {
      setLoadingSend(false);
    }
  };

  /* ✅ VERIFY OTP */
  const handleVerifyOtp = async () => {
    setLoadingVerify(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp: otp.join(""),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Invalid OTP");
        return;
      }

      setOtpVerified(true);
    } catch {
      alert("OTP verification failed");
    } finally {
      setLoadingVerify(false);
    }
  };

  /* 🔁 RESEND OTP */
  const resendOTP = async () => {
    setLoadingResend(true);
    setTimeLeft(60);
    try {
      await handleSendOtp(new Event("submit"));
    } finally {
      setLoadingResend(false);
    }
  };

  /* 🔐 UPDATE PASSWORD */
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoadingUpdate(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword: password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to update password");
        return;
      }

      alert("Password updated successfully");
      navigate("/login");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoadingUpdate(false);
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
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Enter your email to receive a verification code
          </p>
        </div>

        {/* EMAIL */}
        <form onSubmit={handleSendOtp} className="space-y-4">
          <input
            type="email"
            value={email}
            disabled={otpSent}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="
              w-full rounded-md px-4 py-2
              bg-white/80 dark:bg-white/5
              border border-slate-300/60 dark:border-slate-700/60
              text-slate-900 dark:text-slate-100
              focus:outline-none focus:ring-2
              focus:ring-indigo-500
            "
          />

          {!otpSent && (
            <button
              type="submit"
              disabled={loadingSend}
              className="
                w-full rounded-md py-3 font-medium text-white
                bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
                shadow-lg shadow-cyan-500/20
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {loadingSend ? "Sending OTP..." : "Send OTP"}
            </button>
          )}
        </form>

        {/* OTP */}
        {otpSent && !otpVerified && (
          <>
            <div className="mt-6 flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="
                    h-12 w-12 text-center text-lg font-semibold
                    rounded-md
                    bg-white/80 dark:bg-white/5
                    border border-slate-300/60 dark:border-slate-700/60
                  "
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loadingVerify}
              className="
                w-full mt-4 rounded-md py-3 font-medium text-white
                bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {loadingVerify ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="mt-4 text-center text-sm text-slate-600">
              {timeLeft > 0 ? (
                <span>Resend in {timeLeft}s</span>
              ) : (
                <button
                  onClick={resendOTP}
                  disabled={loadingResend}
                  className="text-indigo-500 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingResend ? "Resending..." : "Resend OTP"}
                </button>
              )}
            </div>
          </>
        )}

        {/* PASSWORD RESET */}
        {otpVerified && (
          <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full rounded-md px-4 py-2
                bg-white/80 dark:bg-white/5
                border border-slate-300/60 dark:border-slate-700/60
              "
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="
                w-full rounded-md px-4 py-2
                bg-white/80 dark:bg-white/5
                border border-slate-300/60 dark:border-slate-700/60
              "
            />

            <button
              type="submit"
              disabled={loadingUpdate}
              className="
                w-full rounded-md py-3 font-medium text-white
                bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {loadingUpdate ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Remember password?{" "}
          <Link to="/login" className="text-indigo-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
