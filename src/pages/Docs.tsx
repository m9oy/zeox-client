import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { BookOpen, Code2, ChevronRight, Terminal, Zap, Shield } from "lucide-react";
import logoPath from "../../logo.png";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    content: [
      {
        heading: "Installation",
        body: `Open your Roblox executor and paste the Zeox Client loader script into the script box. Execute it and the menu will appear on-screen.`,
        code: `-- Zeox Client Loader\nloadstring(game:HttpGet("https://zeoxclient.io/load"))()`,
      },
      {
        heading: "Requirements",
        body: "You need a level 7 executor (Synapse X, KRNL, Fluxus, or equivalent) to run Zeox Client scripts.",
        code: null,
      },
    ],
  },
  {
    id: "scripts",
    title: "Script Reference",
    icon: Code2,
    content: [
      {
        heading: "Infinite Jump",
        body: "Allows the player to jump infinitely without any cooldown. Compatible with most games.",
        code: `local Players = game:GetService("Players")\nlocal lp = Players.LocalPlayer\nlp.Character.Humanoid:SetStateEnabled(Enum.HumanoidStateType.Landed, false)`,
      },
      {
        heading: "Speed Modifier",
        body: "Sets the WalkSpeed of the local player character to the specified value.",
        code: `game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = 100`,
      },
      {
        heading: "Noclip",
        body: "Disables collision on all character parts, allowing movement through walls.",
        code: `local noclip = false\ngame:GetService("RunService").Stepped:Connect(function()\n  if noclip then\n    for _, v in pairs(game.Players.LocalPlayer.Character:GetDescendants()) do\n      if v:IsA("BasePart") then v.CanCollide = false end\n    end\n  end\nend)`,
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Anti-Cheat",
    icon: Shield,
    content: [
      {
        heading: "Detection Risk",
        body: "All Zeox Client scripts are tested against popular anti-cheat systems. Premium scripts include additional obfuscation layers.",
        code: null,
      },
      {
        heading: "Best Practices",
        body: "Avoid running multiple scripts simultaneously. Use private servers when testing new scripts. Keep your executor updated.",
        code: null,
      },
    ],
  },
];

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-red-500 text-xs font-mono tracking-widest uppercase mb-3">★ Documentation</div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
            Docs
          </h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-16">
            Everything you need to run and customize Zeox Client scripts on any Roblox game.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <nav className="lg:w-52 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-[#111] transition-all"
                  data-testid={`docs-nav-${s.id}`}
                >
                  <s.icon size={13} className="text-red-500" />
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-16">
            {sections.map((section, si) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.1, duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#151515]">
                  <section.icon size={18} className="text-red-500" />
                  <h2 className="text-white font-black text-2xl">{section.title}</h2>
                </div>

                <div className="flex flex-col gap-8">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                        <ChevronRight size={14} className="text-red-500" />
                        {item.heading}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.body}</p>
                      {item.code && (
                        <div className="relative rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] overflow-hidden">
                          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a1a1a]">
                            <Terminal size={12} className="text-red-500" />
                            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Lua</span>
                          </div>
                          <pre className="text-green-400 text-xs font-mono p-4 overflow-x-auto leading-relaxed">
                            {item.code}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
