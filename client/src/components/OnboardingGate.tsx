import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";

export function OnboardingGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (loading || !user || user.role === "admin" || user.onboardingComplete) return;
    if (location === "/onboarding") return;
    navigate("/onboarding", { replace: true });
  }, [loading, location, navigate, user]);

  return <>{children}</>;
}
