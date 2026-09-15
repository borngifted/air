import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/PublicShell";
import { SITUATIONS, EVIDENCE } from "@/content/siteCopy";
import { ArrowRight, Eye, RefreshCw, Zap } from "lucide-react";
import { Link } from "wouter";

// The situations library. Each card is a set of conditions a facilitator can
// put in a room today. Nothing here explains AI.
export default function Situations() {
  return (
    <PublicShell>
      <section className="page-hero">
        <div className="container py-20 sm:py-28">
          <p className="eyebrow">{SITUATIONS.eyebrow} · free to run · any room</p>
          <h1 className="display mt-5 max-w-5xl text-7xl leading-[.88] sm:text-8xl lg:text-[9rem]">{SITUATIONS.title[0]}<br /><em>{SITUATIONS.title[1]}</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">{SITUATIONS.intro}</p>
          <nav aria-label="Situations" className="mt-10 flex flex-wrap gap-2">
            {SITUATIONS.items.map(item => <a key={item.slug} href={`#${item.slug}`} className="free-pill border-white/25 text-white hover:bg-white/10">{item.name}</a>)}
          </nav>
        </div>
      </section>

      {SITUATIONS.items.map((item, index) => (
        <section key={item.slug} id={item.slug} className={`scroll-mt-24 py-16 lg:py-24 ${index % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--surface-soft)]"}`}>
          <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")} · {item.kicker}</p>
              <h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">{item.name}</h2>
              <p className="mt-6 max-w-md text-base leading-8 text-mist">{item.setup}</p>
            </div>
            <div className="situation-detail">
              <div className="situation-say"><p className="eyebrow">Say</p><p className="display text-2xl sm:text-3xl">{item.say}</p></div>
              <div className="situation-cols">
                <div><p className="situation-label"><Eye className="size-4" aria-hidden="true" /> Watch</p><ul>{item.watch.map(line => <li key={line}>{line}</li>)}</ul></div>
                <div><p className="situation-label"><Zap className="size-4" aria-hidden="true" /> Disrupt</p><p>{item.twist}</p></div>
                <div><p className="situation-label"><RefreshCw className="size-4" aria-hidden="true" /> Run it again</p><p>{item.again}</p></div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[var(--deep)] py-20 text-white lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow">{EVIDENCE.eyebrow}</p><h2 className="display mt-4 text-5xl sm:text-6xl">{EVIDENCE.title[0]} {EVIDENCE.title[1]}</h2><p className="mt-6 max-w-md text-base leading-8 text-mist">{EVIDENCE.intro}</p></div>
          <div className="evidence-table">
            <div className="evidence-head"><span>Evidence</span><span>What it reveals</span></div>
            {EVIDENCE.rows.map(row => <div key={row.evidence} className="evidence-row"><b>{row.evidence}</b><span>{row.reveals}</span></div>)}
          </div>
        </div>
      </section>

      <section className="community-band">
        <div className="container grid gap-8 py-20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="eyebrow dark">{SITUATIONS.test.label}</p><h2 className="display mt-4 text-5xl text-[var(--deep)] sm:text-7xl">{SITUATIONS.test.question}</h2><p className="mt-4 text-lg font-bold text-[var(--deep)]">{SITUATIONS.test.rule}</p></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/partner"><Button className="big bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Bring AiR to your room <ArrowRight /></Button></Link>
            <Link href="/#room"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">Try the walls</Button></Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
