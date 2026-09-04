import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { AirMark } from "./AirMark";
import { Link, useLocation } from "wouter";
import { Menu, Moon, ShieldCheck, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const links = [
  { href: "/curriculum", label: "Learn" },
  { href: "/community", label: "Community" },
  { href: "/studio", label: "Camera" },
  { href: "/trainers", label: "For trainers" },
];

export function SiteHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container flex h-[84px] items-center justify-between gap-5">
        <Link href="/" className="brand-link" aria-label="AiR home">
          <span className="brand-emblem"><AirMark className="brand-logo" /></span>
          <span className="brand-words"><b>AiR</b><small>AI Readiness</small></span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={`nav-link ${location.startsWith(link.href) ? "active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <span className="free-pill">Always free</span>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard"><Button variant="outline" className="member-button">My AiR</Button></Link>
              {user?.role === "admin" && <Link href="/admin" className="admin-entry"><ShieldCheck className="size-4" /> Admin</Link>}
              <button className="signout-link" onClick={() => logout()}>Sign out</button>
            </>
          ) : (
            <Button onClick={() => startLogin()} className="air-button">Join free</Button>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button className="menu-toggle" onClick={() => setOpen(value => !value)} aria-label="Toggle menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav lg:hidden">
          <nav className="container grid gap-2 py-5" aria-label="Mobile navigation">
            {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="mobile-nav-link">{link.label}</Link>)}
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="mobile-nav-link">My AiR</Link>
                <button className="mobile-nav-link text-left" onClick={() => logout()}>Sign out</button>
              </>
            ) : <Button onClick={() => startLogin()} className="air-button mt-3">Join AiR free</Button>}
            {user?.role === "admin" && <Link href="/admin" onClick={() => setOpen(false)} className="mobile-nav-link">Admin workspace</Link>}
          </nav>
        </div>
      )}
    </header>
  );
}
