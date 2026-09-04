import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";

export function AuthGate({ children, message = "Join AiR to keep your work, progress, and community conversations together." }: { children: ReactNode; message?: string }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="container py-28"><div className="h-40 animate-pulse rounded-[2rem] bg-white/5" /></div>;
  if (isAuthenticated) return <>{children}</>;
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[.04] p-8 text-center sm:p-12">
        <LockKeyhole className="mx-auto size-8 text-[var(--go)]" />
        <p className="eyebrow mt-6">Free member access</p>
        <h1 className="display mt-3 text-5xl">Keep your next move.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-mist">{message}</p>
        <Button className="air-button mt-8" onClick={() => startLogin()}>Join free</Button>
      </div>
    </div>
  );
}
