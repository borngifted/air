import { AIR_ASSETS } from "@/lib/assets";

export function AirMark({ className = "" }: { className?: string }) {
  return <img className={className} src={AIR_ASSETS.logo} alt="AiR — AI Readiness" />;
}

export function AirDot({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block size-2 rounded-full bg-[var(--spark)] ${className}`} />;
}
