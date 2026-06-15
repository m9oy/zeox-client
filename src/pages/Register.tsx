import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, AlertCircle, Chrome, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import logoPath from "../../logo-new.png";
import { signInWithGoogle, registerEmail } from "@/lib/firebase";

export default function Register() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await registerEmail(email, password);
      setLocation("/");
    } catch (err: any) {
      const msg = err?.code === "auth/email-already-in-use"
        ? "This email is already registered."
        : err?.message || "Registration failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      setLocation("/");
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setError(err?.message || "Google sign-in failed.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-green-500"];

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] p-8"
            style={{ boxShadow: "0 0 60px rgba(220,38,38,0.07)" }}
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full bg-red-700/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col items-center mb-8">
              <img src={logoPath} alt="Zeox Client" className="h-14 w-auto mb-5" />
              <h1 className="text-white text-xl font-black tracking-tight">Create your account</h1>
              <p className="text-gray-600 text-sm mt-1">Join the Zeox Client community</p>
            </div>

            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-[#252525] bg-[#111] text-white font-semibold text-sm hover:border-[#333] hover:bg-[#161616] transition-all duration-200 mb-4 disabled:opacity-50"
              data-testid="button-google-register"
            >
              <Chrome size={16} className="text-blue-400" />
              {googleLoading ? "Loading..." : "Sign up with Google"}
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#1a1a1a]" />
              <span className="text-gray-700 text-xs">or</span>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4"
                data-testid="text-error"
              >
                <AlertCircle size={14} /> {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-500 text-xs font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@zeox.xyz"
                  required
                  className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-xs font-medium mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    required
                    className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 pr-11 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {password && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : "bg-[#222]"}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-600">{strengthLabel[strength]}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-500 text-xs font-medium mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 pr-11 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                    data-testid="input-confirm"
                  />
                  {confirm && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {confirm === password
                        ? <CheckCircle size={15} className="text-green-500" />
                        : <AlertCircle size={15} className="text-red-500" />}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-200 disabled:opacity-50"
                style={{ boxShadow: "0 0 24px rgba(220,38,38,0.3)" }}
                data-testid="button-submit-register"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-gray-700 text-xs mt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-red-500 hover:text-red-400 transition-colors" data-testid="link-login">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
