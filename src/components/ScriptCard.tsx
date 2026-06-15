import { LucideIcon, Copy, Download, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export interface ScriptItem {
  id: number;
  name: string;
  description: string;
  category: "Tools" | "Scripts" | "Free" | "Premium";
  icon: LucideIcon;
  premium?: boolean;
  downloads: number;
}

export default function ScriptCard({ item }: { item: ScriptItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`-- ${item.name}\n-- Roblox Script Hub\nprint("${item.name} loaded")`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative group overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#111111] p-5 flex flex-col gap-4 cursor-default"
      style={{
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.5)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(220,38,38,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
      data-testid={`card-script-${item.id}`}
    >
      {/* Shine sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(220,38,38,0.07) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shine 1.2s ease forwards",
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-red-500">
            <item.icon size={18} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm leading-tight" data-testid={`text-script-name-${item.id}`}>{item.name}</h3>
            <p className="text-gray-500 text-xs mt-0.5" data-testid={`text-script-downloads-${item.id}`}>{item.downloads.toLocaleString()} downloads</p>
          </div>
        </div>
        {item.premium && (
          <span className="flex items-center gap-1 text-xs text-yellow-500 border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 rounded-full font-medium">
            <Lock size={10} /> Premium
          </span>
        )}
      </div>

      <p className="text-gray-400 text-xs leading-relaxed" data-testid={`text-script-desc-${item.id}`}>{item.description}</p>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-[#333] bg-[#1a1a1a] text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200 font-medium"
          data-testid={`button-copy-${item.id}`}
        >
          {copied ? <CheckCircle size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-[#333] bg-[#1a1a1a] text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200 font-medium"
          data-testid={`button-download-${item.id}`}
        >
          <Download size={12} /> Download
        </button>
      </div>
    </motion.div>
  );
}
