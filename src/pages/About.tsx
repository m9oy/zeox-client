import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ExternalLink, MessageCircle, Youtube, Twitter, Github, Users, Star, Globe } from "lucide-react";
import logoPath from "../../logo.png";

const links = [
  {
    label: "Discord Server",
    description: "Join our community for support, updates, and exclusive drops.",
    icon: MessageCircle,
    href: "#",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10 border-indigo-400/20",
  },
  {
    label: "YouTube",
    description: "Tutorials, script showcases, and update videos.",
    icon: Youtube,
    href: "#",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20",
  },
  {
    label: "Twitter / X",
    description: "Follow for real-time announcements and patch notes.",
    icon: Twitter,
    href: "#",
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/20",
  },
  {
    label: "GitHub",
    description: "Open-source tools and community contributions.",
    icon: Github,
    href: "#",
    color: "text-gray-300",
    bg: "bg-white/5 border-white/10",
  },
];

const team = [
  { name: "ZeoxDev", role: "Founder & Lead Developer", avatar: "ZD" },
  { name: "NullByte", role: "Script Engineer", avatar: "NB" },
  { name: "RedX", role: "Anti-Cheat Specialist", avatar: "RX" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-32">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-red-500 text-xs font-mono tracking-widest uppercase mb-3">★ About us & Links</div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-8">
            Who We<br />
            <span className="text-red-500">Are.</span>
          </h1>
        </motion.div>

        {/* About text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              Zeox Client is a premium Roblox scripting hub built by a team of experienced developers who play the game — and know what players actually need.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Founded in 2024, we've grown from a small group of scripters to a community of over 48,000 active users. Every script is hand-tested, optimized, and updated with every major Roblox patch.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: Users, label: "48K+ Active Users", sub: "and growing daily" },
              { icon: Star, label: "200+ Scripts", sub: "free and premium" },
              { icon: Globe, label: "Worldwide", sub: "available in every region" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 border border-[#1a1a1a] bg-[#0d0d0d] rounded-xl px-5 py-4">
                <item.icon size={16} className="text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm">{item.label}</div>
                  <div className="text-gray-600 text-xs">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-white font-black text-3xl mb-8 tracking-tight">The Team</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="border border-[#1a1a1a] bg-[#0d0d0d] rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
                data-testid={`team-member-${i}`}
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-sm mb-4">
                  {member.avatar}
                </div>
                <div className="text-white font-bold text-base">{member.name}</div>
                <div className="text-gray-600 text-xs mt-0.5">{member.role}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h2 className="text-white font-black text-3xl mb-8 tracking-tight">Links</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 border rounded-xl px-5 py-4 hover:scale-[1.01] transition-all duration-200 ${link.bg}`}
                data-testid={`link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className={`flex-shrink-0 ${link.color}`}>
                  <link.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm">{link.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5 leading-tight">{link.description}</div>
                </div>
                <ExternalLink size={13} className="text-gray-700 group-hover:text-gray-400 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
