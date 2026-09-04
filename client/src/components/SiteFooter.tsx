import { AirMark } from "./AirMark";
import { Link } from "wouter";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/10 bg-black py-12 text-white">
      <div className="container grid gap-10 md:grid-cols-[1.4fr_.6fr_.6fr]">
        <div>
          <AirMark className="site-footer-logo h-12 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-7 text-mist">A free, mindset-first AI learning community. Clear the noise. Make something useful. Keep the human in the work.</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Move</p>
          <div className="grid gap-2 text-sm text-mist">
            <Link href="/curriculum">Learning paths</Link>
            <Link href="/community">Community</Link>
            <Link href="/trainers">Trainer knowledge base</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">Principle</p>
          <p className="text-sm leading-7 text-mist">No hype. No magic prompts. No tool chasing. Just purpose, direction, judgment, and action.</p>
        </div>
      </div>
      <div className="container mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[.16em] text-mist">
        <span>AiR · AI Readiness</span><span>Free community learning · Digi2U.org</span>
      </div>
    </footer>
  );
}
