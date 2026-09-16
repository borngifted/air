import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { AirMark } from "@/components/AirMark";
import { AIR_ASSETS } from "@/lib/assets";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PublicShell } from "@/components/PublicShell";
import { HERO } from "@/content/siteCopy";

// The home page is deliberately minimal: the theme, one line, one action.
// It does not lay out the method. The concept lives at /program and /class.
export default function Home() {
  const { isAuthenticated } = useAuth();
  const primaryAction = isAuthenticated
    ? <Link href="/dashboard"><Button className="air-button big">Continue <ArrowRight /></Button></Link>
    : <GoogleSignInButton label={HERO.join} className="big" />;

  return (
    <PublicShell>
      <section className="hero-section">
        <video className="hero-film" autoPlay muted loop playsInline poster={AIR_ASSETS.coursePoster} aria-hidden="true"><source src={AIR_ASSETS.courseVideo} type="video/mp4" /></video>
        <div className="hero-grid" aria-hidden="true" />
        <div className="container relative z-10 grid min-h-[calc(100vh-84px)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-3xl">
            <p className="eyebrow">{HERO.eyebrow}</p>
            <h1 className="display mt-6 text-6xl leading-[.88] sm:text-8xl lg:text-[7.5rem]">{HERO.title[0]}<br /><em>{HERO.title[1]}</em></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-mist">{HERO.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {primaryAction}
              <Link href="/partner" className="text-link">{HERO.schools} <ArrowRight className="size-4" /></Link>
            </div>
          </div>
          <div className="hero-mark-wrap">
            <AirMark className="hero-mark" />
            <div className="hero-dot" aria-hidden="true" />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
