import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Link2, Zap, Copy, CheckCircle, AlertCircle, ShieldCheck, Info } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Bypass() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [key, setKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleBypass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setStatus("loading");
    setKey("");
    setErrorMsg("");

    try {
      // Attempt to call the bypass API
      const res = await fetch(`https://api.zeox.xyz/bypass?url=${encodeURIComponent(url)}`, {
        method: "GET",
        headers: { "Accept": "application/json" },
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const resultKey = data.key || data.result || data.bypass || JSON.stringify(data);
      setKey(resultKey);
      setStatus("success");
    } catch (err: any) {
      // If API not live yet, show a clear message
      setErrorMsg(
        err?.name === "AbortError"
          ? "Request timed out. The bypass server may be offline."
          : "Could not connect to bypass server. Make sure https://api.zeox.xyz is running."
      );
      setStatus("error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setStatus("idle");
    setKey("");
    setUrl("");
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <div className="max-w-[800px] mx-auto px-6 md:px-10 pt-28 pb-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="text-red-500 text-xs font-mono tracking-widest uppercase mb-3">★ Tool</div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-4">
            Bypass<br />
            <span className="text-red-500">Delta.</span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-12 max-w-lg">
            Paste the Delta key verification URL below. Zeox Client will bypass it and return your key instantly.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          {[
            { icon: Link2, step: "1", text: "Copy the key URL from Delta executor" },
            { icon: Zap, step: "2", text: "Paste it below and hit Bypass" },
            { icon: ShieldCheck, step: "3", text: "Get your key instantly" },
          ].map((s) => (
            <div
              key={s.step}
              className="flex-1 flex items-center gap-3 border border-[#1a1a1a] bg-[#0d0d0d] rounded-xl px-4 py-3"
            >
              <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-red-400 text-xs font-black">{s.step}</span>
              </div>
              <span className="text-gray-400 text-xs leading-tight">{s.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="border border-[#1a1a1a] bg-[#0b0b0b] rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(220,38,38,0.06)" }}
        >
          {/* Top bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#141414]">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-gray-600 text-xs font-mono">bypass.delta — zeox client</span>
          </div>

          <div className="p-6">
            {status === "idle" || status === "loading" ? (
              <form onSubmit={handleBypass} className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-500 text-xs font-medium mb-2">Delta Key URL</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                      <Link2 size={15} />
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://gateway.platoboost.com/a/8?..."
                      required
                      disabled={status === "loading"}
                      className="w-full bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition-all font-mono disabled:opacity-50"
                      data-testid="input-bypass-url"
                    />
                  </div>
                  <p className="text-gray-700 text-xs mt-2 flex items-start gap-1.5">
                    <Info size={11} className="mt-0.5 flex-shrink-0" />
                    Open Delta → Get Key → Copy the verification URL and paste it here.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || !url.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-200 disabled:opacity-40 relative overflow-hidden group"
                  style={{ boxShadow: status !== "loading" ? "0 0 28px rgba(220,38,38,0.35)" : "none" }}
                  data-testid="button-bypass"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Bypassing...
                    </>
                  ) : (
                    <>
                      <Zap size={15} />
                      Bypass Delta
                    </>
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)" }} />
                </button>
              </form>
            ) : status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={18} />
                  <span className="font-bold text-sm">Bypass successful!</span>
                </div>

                <div>
                  <label className="block text-gray-500 text-xs font-medium mb-2">Your Key</label>
                  <div className="relative bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-4 font-mono text-green-400 text-sm break-all">
                    {key}
                    <button
                      onClick={handleCopy}
                      className="absolute top-3 right-3 flex items-center gap-1 text-xs text-gray-500 hover:text-white border border-[#222] bg-[#111] px-2 py-1 rounded-lg transition-all"
                      data-testid="button-copy-key"
                    >
                      {copied ? <CheckCircle size={11} className="text-green-400" /> : <Copy size={11} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4"
                  data-testid="button-bypass-again"
                >
                  Bypass another URL
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-start gap-3 text-red-400 bg-red-500/8 border border-red-500/20 rounded-xl p-4">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm mb-0.5">Bypass failed</div>
                    <div className="text-xs text-red-400/70">{errorMsg}</div>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl border border-[#222] bg-[#111] text-gray-300 hover:text-white font-semibold text-sm transition-all"
                  data-testid="button-try-again"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700 text-xs text-center mt-6 leading-relaxed"
        >
          Bypass Delta only works when the Zeox API server is running at api.zeox.xyz
        </motion.p>
      </div>
    </div>
  );
}
