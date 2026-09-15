import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AirMark } from "./AirMark";
import { PalettePicker } from "./PalettePicker";
import { Link, useLocation } from "wouter";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

// Public doors. Member tools (lessons, camera studio, trainer guides, admin)
// live behind sign-in and in the footer, so a first visit is a situation, not a menu.
const links = [
  { href: "/situations", label: "Situations" },
  { href: "/why", label: "Why" },
  { href: "/for", label: "For you" },
  { href: "/community", label: "Community" },
  { href: "/partner", label: "Partner" },
];

const memberLinks = [
  { href: "/dashboard", label: "My AiR" },
  { href: "/curriculum", label: "Lessons" },
  { href: "/studio", label: "Camera studio" },
  { href: "/trainers", label: "For trainers" },
];

export function SiteHeader() {
  const { user, isAuthenticated, logout } = useAuth();
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
          <PalettePicker />
          <span className="free-pill">Always free</span>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard"><Button variant="outline" className="member-button">My AiR</Button></Link>
              {user?.role === "admin" && <Link href="/admin" className="admin-entry"><ShieldCheck className="size-4" /> Admin</Link>}
              <button className="signout-link" onClick={() => logout()}>Sign out</button>
            </>
          ) : (
            <GoogleSignInButton label="Join free" />
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <PalettePicker />
          <button className="menu-toggle" onClick={() => setOpen(value => !value)} aria-label="Toggle menu" aria-expanded={open}>
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
                {memberLinks.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="mobile-nav-link">{link.label}</Link>)}
                {user?.role === "admin" && <Link href="/admin" onClick={() => setOpen(false)} className="mobile-nav-link">Admin workspace</Link>}
                <button className="mobile-nav-link text-left" onClick={() => logout()}>Sign out</button>
              </>
            ) : <GoogleSignInButton label="Join AiR free" className="mt-3 w-full" />}
          </nav>
        </div>
      )}
    </header>
  );
}
