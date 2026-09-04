import { useAuth } from "@/_core/hooks/useAuth";
import { AirMark } from "@/components/AirMark";
import { Button } from "@/components/ui/button";
import { startLogin } from "@/const";
import { ArrowRight, LockKeyhole, Moon, ShieldCheck, Sun } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

export default function AdminLogin() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return <main className="admin-login-shell"><Link href="/" className="admin-login-brand"><span className="brand-emblem"><AirMark className="brand-logo" /></span><span>Back to AiR</span></Link><button onClick={toggleTheme} className="admin-theme-toggle" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun /> : <Moon />}</button><section className="admin-login-card"><div className="admin-login-mark"><AirMark className="h-auto w-full" /></div><p className="eyebrow">Admin sign in</p><h1 className="display text-7xl leading-[.9]">Lead<br /><em>AiR.</em></h1><p className="mt-6 max-w-lg text-base leading-8 text-mist">Add lesson videos. Keep the community safe. Open teaching guides. Start presentation mode.</p>{loading ? <div className="mt-8 h-12 animate-pulse rounded-full bg-white/10" /> : !user ? <Button className="air-button big mt-8" onClick={() => startLogin()}><LockKeyhole /> Admin sign in <ArrowRight /></Button> : user.role === "admin" ? <Link href="/admin"><Button className="air-button big mt-8"><ShieldCheck /> Open admin tools <ArrowRight /></Button></Link> : <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5"><b>This account is not an admin.</b><p className="mt-2 text-sm leading-7 text-mist">Go back to your learning page or ask the AiR owner for help.</p><Link href="/dashboard"><Button variant="outline" className="air-button secondary mt-5">Return to My AiR</Button></Link></div>}</section></main>;
}
