import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle, ArrowRight, Package, Users, Lock, Terminal, ExternalLink, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/firebase";
import logoPath from "../../logo-new.png";

const LOADER_SCRIPT = `loadstring(game:HttpGet("https://script.zeox.xyz/v1.0.lua"))()`;


export default function Home() {
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  const handleCopy = () => {
    navigator.clipboard.writeText(LOADER_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col pt-[64px]">
        {/* BG glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(185,28,28,0.2) 0%, rgba(220,38,38,0.07) 40%, transparent 70%)" }} />
          <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 65%)" }} />
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto w-full px-6 md:px-10 py-20 gap-16 flex-1">

          {/* Left */}
          <div className="flex-1 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 border border-[#222] bg-[#0f0f0f] rounded-full px-3 py-1 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">Roblox Script Client</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[clamp(3.2rem,8vw,7rem)] font-black leading-[0.88] tracking-tight text-white mb-6">
              Zeox<br />
              <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>Client</span><br />
              <span className="text-red-500">Unleashed.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-500 text-lg max-w-md leading-relaxed mb-10">
              One script. Full arsenal. Premium Roblox tools that actually perform — undetected and constantly updated.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-wrap gap-3">
              <a href="#execute"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all duration-200"
                data-testid="link-execute">
                Execute Script <ArrowRight size={14} />
              </a>
              <a href="/bypass"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 hover:bg-red-600/20 font-semibold text-sm transition-all duration-200"
                data-testid="link-bypass">
                <Zap size={14} /> Bypass Delta
              </a>
              {user ? (
                <button onClick={() => signOut()}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#2a2a2a] text-gray-400 hover:text-white font-semibold text-sm transition-all duration-200"
                  data-testid="button-signout">
                  Sign Out
                </button>
              ) : (
                <a href="/login"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#2a2a2a] text-white font-semibold text-sm hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-200"
                  data-testid="link-login">
                  <Lock size={14} /> Sign In
                </a>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-[#111]">
              {[
                { label: "Active users", value: "48K+" },
                { label: "Uptime", value: "99%" },
                { label: "Games supported", value: "300+" },
              ].map((s) => (
                <div key={s.label} data-testid={`stat-${s.label}`}>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-gray-600 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Logo + cards */}
          <div className="relative flex-shrink-0 w-full lg:w-[420px] flex items-center justify-center min-h-[380px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(220,38,38,0.28) 0%, rgba(185,28,28,0.1) 45%, transparent 70%)", filter: "blur(36px)" }} />
            </div>
            <motion.img src={logoPath} alt="Zeox Client"
              className="relative z-10 w-52 h-52 object-contain"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 50px rgba(220,38,38,0.45))" }}
              data-testid="img-hero-logo" />

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-2 right-0 border border-[#1f1f1f] bg-[#0d0d0d] rounded-xl p-4 min-w-[148px]"
              style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}>
              <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-1 font-mono">Total Scripts</div>
              <div className="text-3xl font-black text-white">200+</div>
              <div className="flex items-center gap-1 mt-1">
                <Package size={10} className="text-red-500" />
                <span className="text-[10px] text-gray-600">constantly updated</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55, duration: 0.5 }}
              className="absolute bottom-2 right-0 border border-[#1f1f1f] bg-[#0d0d0d] rounded-xl p-4 min-w-[148px]"
              style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}>
              <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-1 font-mono">Downloads</div>
              <div className="text-3xl font-black text-white">1.2M+</div>
              <div className="flex items-center gap-1 mt-1">
                <Users size={10} className="text-red-500" />
                <span className="text-[10px] text-gray-600">active community</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-16 left-0 border border-[#1f1f1f] bg-[#0d0d0d] rounded-xl p-3">
              <div className="flex items-center gap-1.5">
                <Lock size={12} className="text-red-500" />
                <span className="text-xs text-gray-400 font-medium">Premium</span>
              </div>
              <div className="text-xl font-black text-white mt-0.5">80+</div>
              <div className="text-[10px] text-gray-600">exclusive tools</div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-red-500/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── SCRIPT GALLERY ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="text-red-500 text-xs font-mono tracking-widest uppercase mb-3">★ Scripts</div>
          <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-none mb-10">
            Script Gallery
          </h2>

          <div className="max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative border border-[#1a1a1a] bg-[#0c0c0c] rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300"
              style={{ boxShadow: "0 0 40px rgba(220,38,38,0.06)" }}
              data-testid="gallery-card-1"
            >
              <div className="relative h-52 overflow-hidden bg-[#0f0f0f] border-b border-[#151515]">
                <img
                  src="/script-card.png"
                  alt="Zeox Client v1.0"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 35%, rgba(220,38,38,0.08) 50%, transparent 65%)" }} />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-base">Zeox Client v1.0</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border text-green-400 bg-green-400/10 border-green-400/20">Latest</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">Full hub — Infinite Jump, Speed, ESP, God Mode and more. One script, full arsenal.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── EXECUTE SECTION ── */}
      <section id="execute" className="max-w-[900px] mx-auto px-6 md:px-10 pb-36">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="text-red-500 text-xs font-mono tracking-widest uppercase mb-3">★ Quick Execute</div>
          <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-none mb-4">
            One Script.<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}>Full Arsenal.</span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-xl">
            Paste the loader into any Level 7 executor. Zeox Client injects automatically and unlocks the full hub.
          </p>

          {/* Terminal block */}
          <div className="relative rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(220,38,38,0.07)" }} data-testid="execute-block">

            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#161616]">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28ca41]" />
                </div>
                <span className="text-gray-600 text-xs font-mono ml-2 flex items-center gap-1.5">
                  <Terminal size={11} className="text-red-500" />
                  executor.lua
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://script.zeox.xyz/v1.0.lua" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-gray-600 hover:text-gray-400 transition-colors font-mono"
                  data-testid="link-raw-script">
                  <ExternalLink size={10} />
                  script.zeox.xyz/v1.0.lua
                </a>
                <button onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[#252525] bg-[#111] text-gray-400 hover:text-white hover:border-red-500/40 transition-all duration-200 font-medium"
                  data-testid="button-copy-script">
                  {copied ? <><CheckCircle size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>
            </div>

            <div className="px-6 py-6">
              <pre className="text-red-400 font-mono text-sm md:text-base leading-relaxed overflow-x-auto" data-testid="text-loader-script">
                <span className="text-gray-600">-- Zeox Client | zeox.xyz</span>{"\n"}
                <span className="text-gray-600">-- Supports: Level 7+ Executors</span>{"\n"}
                {"\n"}
                {LOADER_SCRIPT}
              </pre>
            </div>

            <div className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.3) 50%, transparent 100%)" }} />
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {["Synapse X", "KRNL", "Fluxus", "Arceus X", "Delta"].map((ex) => (
              <span key={ex}
                className="text-xs text-gray-600 border border-[#1a1a1a] bg-[#0d0d0d] px-3 py-1.5 rounded-full font-mono"
                data-testid={`badge-executor-${ex.toLowerCase().replace(/\s/g, "-")}`}>
                {ex}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0f0f0f] py-10 px-6 md:px-10 max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logoPath} alt="Zeox Client" className="h-6 w-auto opacity-30" />
          <span className="text-gray-700 text-xs font-mono">Zeox Client © 2026 — zeox.xyz</span>
        </div>
        <div className="flex gap-6">
          {[{ label: "Home", href: "/" }, { label: "Docs", href: "/docs" }, { label: "Api", href: "/api" }, { label: "About", href: "/about" }, { label: "Bypass", href: "/bypass" }].map((l) => (
            <a key={l.label} href={l.href}
              className="text-gray-700 hover:text-gray-400 text-xs transition-colors"
              data-testid={`footer-link-${l.label.toLowerCase()}`}>
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
