import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { startLogin } from "@/const";
import { AIR_ASSETS } from "@/lib/assets";
import { trpc } from "@/lib/trpc";
import { ArrowDown, ArrowRight, Check, Eye, Flag, Sparkles, Users } from "lucide-react";
import { Link } from "wouter";
import { PathCard } from "@/components/PathCard";
import { PublicShell } from "@/components/PublicShell";

const moves = [
  { icon: Flag, title: "Choose the mission", body: "Start with one person and one change—not an app." },
  { icon: Sparkles, title: "Direct the machine", body: "Tell it who you are helping, what to do, and what done looks like." },
  { icon: Eye, title: "Challenge the result", body: "Check facts, fit, fairness, privacy, and risk." },
  { icon: Check, title: "Put it in the world", body: "Release one useful thing and learn from a real person." },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { data: catalog = [] } = trpc.catalog.list.useQuery();

  return (
    <PublicShell>
      <section className="hero-section">
        <video className="hero-film" autoPlay muted loop playsInline poster={AIR_ASSETS.poster} aria-hidden="true"><source src={AIR_ASSETS.heroVideo} type="video/mp4" /></video>
        <div className="hero-grid" aria-hidden="true" />
        <div className="container relative z-10 grid min-h-[calc(100vh-76px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3"><span className="free-pill bright">Free for everyone</span><span className="eyebrow">Ages 8 to adult · learn by making</span></div>
            <h1 className="display hero-title mt-8">Stop learning AI.<br /><em>Learn to move with it.</em></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-mist sm:text-xl">AiR turns complex AI work into simple human moves. Choose what matters. Give clear direction. Check what comes back. Make something real.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              {isAuthenticated ? <Link href="/dashboard"><Button className="air-button big">Continue your move <ArrowRight /></Button></Link> : <Button className="air-button big" onClick={() => startLogin()}>Join AiR free <ArrowRight /></Button>}
              <Link href="/curriculum"><Button variant="outline" className="air-button secondary big">See the paths <ArrowDown /></Button></Link>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[.14em] text-mist">No cost · no grades · no tool chasing</p>
          </div>
          <div className="hero-mark-wrap">
            <img src={AIR_ASSETS.logo} alt="AiR" className="hero-mark" />
            <div className="orbit-card orbit-one"><span>01</span><b>Clear</b><small>Purpose before tools</small></div>
            <div className="orbit-card orbit-two"><span>03</span><b>Judge</b><small>Check before you trust</small></div>
            <div className="hero-dot" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="statement-section">
        <div className="container grid gap-10 py-24 lg:grid-cols-[.7fr_1.3fr] lg:py-32">
          <div><p className="eyebrow dark">The mindset</p><span className="big-index">01—04</span></div>
          <div>
            <h2 className="display text-5xl leading-[.94] text-[var(--deep)] sm:text-7xl">AI is fast.<br />Your judgment is the work.</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--deep-soft)]">An eight-year-old and a creative director can learn the same durable loop. The examples change. The human responsibility does not.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--deep)] py-24 text-white lg:py-32">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div><p className="eyebrow">The AiR loop</p><h2 className="display mt-4 text-6xl sm:text-7xl">Four moves.<br />Every task.</h2></div>
            <p className="max-w-xl text-base leading-8 text-mist lg:justify-self-end">The tools will change. These moves stay useful. Each lesson gives you one story, one decision, one practice action, and one next step.</p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            {moves.map((move, index) => <article key={move.title} className="move-card"><div className="flex items-center justify-between"><move.icon className="size-6 text-[var(--go)]" /><span>0{index + 1}</span></div><h3 className="mt-12 text-xl font-bold">{move.title}</h3><p className="mt-3 text-sm leading-7 text-mist">{move.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="campaign-gallery py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div><p className="eyebrow">Learn by doing</p><h2 className="display mt-4 text-6xl sm:text-7xl">Think it.<br /><em>Try it.</em></h2></div>
            <p className="max-w-xl text-base leading-8 text-mist lg:justify-self-end">Do not just watch. Learn with other people. Check your work. Leave each lesson with something you tried.</p>
          </div>
          <div className="campaign-grid mt-12">
            <article className="campaign-card campaign-wide">
              <img src={AIR_ASSETS.campaignMove} alt="A young learner and educator actively building an idea together beneath the AiR mark" />
              <div className="campaign-copy"><span>01 · Clear + Direct</span><h3 className="display">Move with it.</h3><p>Complex AI work. Simple human moves.</p><Link href="/curriculum" className="campaign-link">Start the path <ArrowRight className="size-4" /></Link></div>
            </article>
            <article className="campaign-card campaign-tall">
              <img src={AIR_ASSETS.campaignJudge} alt="A creator checking AI work beneath the AiR mark" />
              <div className="campaign-copy"><span>03 · Check</span><h3 className="display">Check before you trust.</h3><Link href="/paths/judge" className="campaign-link">Learn how to check <ArrowRight className="size-4" /></Link></div>
            </article>
            <article className="campaign-card campaign-square">
              <img src={AIR_ASSETS.campaignCommunity} alt="Children and adults making something together around the AiR mark" />
              <div className="campaign-copy"><span>Community · Learn together</span><h3 className="display">Make it together.</h3><Link href="/community" className="campaign-link">Join the group <ArrowRight className="size-4" /></Link></div>
            </article>
          </div>
        </div>
      </section>

      <section className="paths-section py-24 lg:py-32">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">The curriculum</p><h2 className="display mt-4 text-6xl sm:text-7xl">Pick your move.</h2></div><Link href="/curriculum" className="text-link">See all lessons <ArrowRight className="size-4" /></Link></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">{catalog.map(path => <PathCard key={path.id} path={path} />)}</div>
        </div>
      </section>

      <section className="community-band">
        <div className="container grid gap-10 py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-28">
          <div><Users className="size-8" /><p className="eyebrow dark mt-6">Practice in public</p><h2 className="display mt-4 text-6xl text-[var(--deep)] sm:text-7xl">The community is the lab.</h2></div>
          <div><p className="max-w-xl text-lg leading-8 text-[var(--deep-soft)]">Share what you tried, what surprised you, what you changed, and what happens next. No popularity contest. No expert posturing. Just people making their judgment visible.</p><Link href="/community"><Button className="mt-8 bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Enter the community <ArrowRight /></Button></Link></div>
        </div>
      </section>
    </PublicShell>
  );
}
