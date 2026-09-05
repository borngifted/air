import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { LockKeyhole, ShieldX } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";

export function AdminGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container py-24"><div className="h-72 animate-pulse rounded-[2rem] bg-white/5" /></div>;
  if (!user) return <div className="admin-gate"><LockKeyhole className="size-10 text-[var(--spark)]" /><p className="eyebrow">Administrator entry</p><h1 className="display text-6xl">Sign in to lead AiR.</h1><p>Continue with the Google account connected to your AiR administrator role. AiR checks your role after sign-in.</p><GoogleSignInButton /></div>;
  if (user.role !== "admin") return <div className="admin-gate"><ShieldX className="size-10 text-[var(--destructive)]" /><p className="eyebrow">Access protected</p><h1 className="display text-6xl">Administrator role required.</h1><p>Your member account is safe, but it does not have administrator permissions.</p><Link href="/dashboard"><Button className="air-button">Return to My AiR</Button></Link></div>;
  return <>{children}</>;
}
