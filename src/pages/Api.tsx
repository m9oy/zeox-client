import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Terminal, Lock, Globe } from "lucide-react";

const endpoints = [
  {
    method: "GET",
    path: "/scripts",
    description: "Returns all available scripts with metadata.",
    auth: false,
    response: `{\n  "data": [\n    {\n      "id": 1,\n      "name": "Zeox Client",\n      "version": "2.4.1",\n      "updated_at": "2026-06-15"\n    }\n  ]\n}`,
  },
  {
    method: "GET",
    path: "/scripts/:id",
    description: "Returns a single script entry including version and changelog.",
    auth: false,
    response: `{\n  "id": 1,\n  "name": "Zeox Client",\n  "version": "2.4.1",\n  "premium": false,\n  "raw_url": "https://Script.zeox.xyz/raw"\n}`,
  },
  {
    method: "POST",
    path: "/auth/login",
    description: "Authenticate with email and password. Returns a signed JWT.",
    auth: false,
    response: `{\n  "token": "eyJhbGci...",\n  "expires_in": 3600\n}`,
  },
  {
    method: "GET",
    path: "/user/me",
    description: "Returns the currently authenticated user profile and plan.",
    auth: true,
    response: `{\n  "id": "usr_abc123",\n  "email": "user@zeox.xyz",\n  "plan": "premium",\n  "joined": "2026-01-01"\n}`,
  },
  {
    method: "GET",
    path: "/status",
    description: "Returns current API status and script CDN uptime.",
    auth: false,
    response: `{\n  "status": "operational",\n  "cdn": "online",\n  "uptime": "99.9%"\n}`,
  },
];

const methodColor: Record<string, string> = {
  GET: "text-green-400 bg-green-400/10 border-green-400/20",
  POST: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  DELETE: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function Api() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-red-500 text-xs font-mono tracking-widest uppercase mb-3">★ Developer</div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">API</h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">
            Integrate Zeox Client data into your own apps and projects.
          </p>

          {/* Domains */}
          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            {[
              { label: "Main", url: "zeox.xyz" },
              { label: "API Base", url: "Api.zeox.xyz" },
              { label: "Script Raw", url: "Script.zeox.xyz/raw" },
            ].map((d) => (
              <div
                key={d.label}
                className="inline-flex items-center gap-3 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl px-5 py-3"
                data-testid={`domain-${d.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <Globe size={13} className="text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">{d.label}</div>
                  <div className="text-white text-xs font-mono">{d.url}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Endpoints */}
        <div className="flex flex-col gap-4">
          {endpoints.map((ep, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group border border-[#161616] bg-[#0b0b0b] rounded-2xl overflow-hidden hover:border-red-500/20 transition-all duration-300"
              data-testid={`endpoint-${i}`}
            >
              <div className="flex items-center gap-4 px-5 py-4 border-b border-[#111]">
                <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded border ${methodColor[ep.method]}`}>
                  {ep.method}
                </span>
                <code className="text-white font-mono text-sm flex-1">
                  <span className="text-gray-600">Api.zeox.xyz</span>{ep.path}
                </code>
                {ep.auth && (
                  <span className="flex items-center gap-1 text-[10px] text-yellow-500 border border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    <Lock size={9} /> Auth required
                  </span>
                )}
              </div>

              <div className="px-5 py-4 flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm leading-relaxed">{ep.description}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal size={11} className="text-red-500" />
                    <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Response</span>
                  </div>
                  <pre className="text-green-400/80 text-[11px] font-mono bg-[#070707] border border-[#141414] rounded-xl p-3 overflow-x-auto leading-relaxed">
                    {ep.response}
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Auth note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 border border-red-500/20 bg-red-500/5 rounded-2xl p-5 flex gap-3"
        >
          <Lock size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-bold text-sm mb-1">Authentication</div>
            <p className="text-gray-500 text-sm">
              Pass your JWT in the Authorization header:{" "}
              <code className="text-red-400 font-mono">Authorization: Bearer &lt;token&gt;</code>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
