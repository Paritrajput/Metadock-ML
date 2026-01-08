import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SIMPLE VERSION (mailto)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.email == "" || form.name == "" || form.message == "") {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
          body: JSON.stringify({ ...form }),
        }
      );
      if (response.ok) {
        alert("Message sent successfully");
      } else {
        alert("Error occured while sending.. ");
      }
    } catch {
      alert("Error sending message ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        relative min-h-screen overflow-hidden
        bg-[#f7f8fb] dark:bg-[#06070b]
        transition-colors pt-10
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
        pointer-events-none absolute -top-40 left-1/2
        h-[520px] w-[520px]
        -translate-x-1/2
        rounded-full
        bg-gradient-to-r from-indigo-500/25 via-sky-500/25 to-cyan-400/25
        blur-3xl
      "
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h1
            className="
              text-4xl font-semibold tracking-tight
              text-slate-900 dark:text-slate-50
            "
          >
            Get in Touch
          </h1>
          <p
            className="
              text-lg
              text-slate-600 dark:text-slate-400
            "
          >
            Interested in collaborations, research partnerships, or product
            inquiries? We’d love to hear from you.
          </p>
        </div>

        {/* CARD */}
        <div
          className="
            max-w-2xl mx-auto
            rounded-2xl
            border border-slate-200/60 dark:border-slate-800/60
            bg-white/70 dark:bg-white/5
            backdrop-blur-xl
            p-8 shadow-xl
          "
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
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
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
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

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your research, idea, or question…"
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
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
