import { Link, useLocation } from "wouter";
import { useState } from "react";
import { X, AlignRight, Zap } from "lucide-react";
import ShineLine from "@/components/ShineLine";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/firebase";
import logoPath from "../../logo-new.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/api", label: "Api" },
  { href: "/bypass", label: "Bypass Delta", icon: Zap },
  { href: "/about", label: "About us & Links" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex flex-col"
        style={{ background: "rgba(8,8,8,0.88)", backdropFilter: "blur(16px)" }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-[62px]">
          {/* Logo */}
          <Link href="/" className="flex items-center" data-testid="nav-logo">
            <img src={logoPath} alt="Zeox Client" className="h-9 w-auto" />
          </Link>

          {/* Center pill nav */}
          <div className="hidden md:flex items-center gap-0.5 bg-[#111] border border-[#252525] rounded-full px-1.5 py-1.5">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              const isBypass = link.href === "/bypass";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-red-600 text-white shadow-[0_0_18px_rgba(220,38,38,0.55)]"
                      : isBypass
                      ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      : "text-gray-400 hover:text-white"
                  }`}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.icon && <link.icon size={11} />}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-gray-500 text-xs font-mono truncate max-w-[140px]">{user.displayName || user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="text-xs text-gray-500 hover:text-red-400 transition-colors border border-[#252525] rounded-full px-3 py-1.5"
                  data-testid="button-signout"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/login"
                className="hidden md:flex items-center gap-2 border border-[#252525] rounded-full px-4 py-1.5 text-sm text-gray-400 hover:text-white hover:border-red-500/40 transition-all duration-200"
                data-testid="nav-login">
                Sign in
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 bg-[#111] border border-[#252525] rounded-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:border-red-500/40 transition-all duration-200"
              data-testid="button-menu"
            >
              {menuOpen ? <X size={14} /> : <AlignRight size={14} />}
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>

        {/* Animated shine line */}
        <ShineLine />
      </nav>

      {/* Fullscreen menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(6,6,6,0.97)", backdropFilter: "blur(20px)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 text-4xl font-black tracking-tight transition-colors ${
                link.href === "/bypass" ? "text-red-500 hover:text-red-400" : "text-white hover:text-red-400"
              }`}
              data-testid={`menu-link-${link.label.toLowerCase()}`}
            >
              {link.icon && <link.icon size={28} />}
              {link.label}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { signOut(); setMenuOpen(false); }}
              className="text-gray-500 text-lg font-medium hover:text-red-400 transition-colors">
              Sign Out
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}
              className="text-gray-500 text-lg font-medium hover:text-white transition-colors">
              Sign In
            </Link>
          )}
        </div>
      )}
    </>
  );
}
