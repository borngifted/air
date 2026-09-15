import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/PublicShell";
import { YetToggle } from "@/components/YetToggle";
import { IDEA, WHY_AIR } from "@/content/siteCopy";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

// The story we tell in the gym: you were born in winter. AI is a lever, not a hand.
export default function Why() {
  return (
    <PublicShell>
      <section className="page-hero">
        <div className="container py-20 sm:py-28">
          <p className="eyebrow">{WHY_AIR.eyebrow}</p>
          <h1 className="display mt-5 max-w-5xl text-7xl leading-[.88] sm:text-8xl lg:text-[9rem]">{WHY_AIR.title[0]}<br /><em>{WHY_AIR.title[1]}</em></h1>
          <p className="mt-8 max-w-2xl text-lg font-semibold leading-8 text-mist">{WHY_AIR.intro}</p>
        </div>
      </section>

      <section className="winter-section py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="winter-card">
              <ol className="seasons">{WHY_AIR.seasons.map(season => <li key={season.name}><b>{season.name}</b><span>{season.line}</span></li>)}</ol>
              <p className="mt-5 text-sm leading-7 text-mist">{WHY_AIR.thisWinter}</p>
            </div>
            <div className="winter-card">
              <p className="text-sm font-bold leading-6">{WHY_AIR.lastSpring.label}</p>
              <ul className="spring-list">{WHY_AIR.lastSpring.items.map(item => <li key={item}>{item}</li>)}</ul>
              <p className="display mt-5 text-3xl text-[var(--spark)]">{WHY_AIR.lastSpring.close}</p>
              <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[.18em] text-mist">{WHY_AIR.builders.label}</p>
              <ul className="builders">{WHY_AIR.builders.people.map(person => <li key={person.name}><b>{person.name}</b><span>{person.note}</span></li>)}</ul>
              <p className="mt-4 text-sm leading-7 text-mist">{WHY_AIR.builders.close}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <p className="display text-5xl sm:text-6xl"><em>{WHY_AIR.shift}</em></p>
            <div className="max-w-2xl">{WHY_AIR.body.map(paragraph => <p key={paragraph} className="text-base leading-8 text-mist [&+p]:mt-5">{paragraph}</p>)}</div>
          </div>

          <div className="mt-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-mist">{WHY_AIR.choice.label}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[WHY_AIR.choice.wait, WHY_AIR.choice.plant].map((option, index) => (
                <div key={option.title} className={`choice-panel ${index === 1 ? "plant" : "wait"}`}>
                  <h3 className="display text-4xl">{option.title}</h3>
                  <dl><dt>The vibe</dt><dd>{option.vibe}</dd><dt>The behavior</dt><dd>{option.behavior}</dd><dt>The outcome</dt><dd><b>{option.outcome}</b></dd></dl>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 lever-panel">
            <p className="display text-4xl sm:text-6xl">{IDEA.lever[0]} <em>{IDEA.lever[1]}</em></p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-mist">{IDEA.intro}</p>
          </div>

          <div className="mt-12"><YetToggle /></div>
          <p className="display mt-12 max-w-3xl text-3xl sm:text-4xl">{WHY_AIR.close}</p>
        </div>
      </section>

      <section className="community-band">
        <div className="container grid gap-8 py-20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="eyebrow dark">Now</p><h2 className="display mt-4 text-5xl text-[var(--deep)] sm:text-7xl">Stop reading.<br />Go choose.</h2></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/"><Button className="big bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Ten seconds. Choose. <ArrowRight /></Button></Link>
            <a href="/ideas"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">Drop a pin</Button></a>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
