import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { AirMark } from "@/components/AirMark";
import { Stations } from "@/components/Stations";
import { RoomWalls } from "@/components/RoomWalls";
import { AIR_ASSETS } from "@/lib/assets";
import { ArrowDown, ArrowRight, X } from "lucide-react";
import { Link } from "wouter";
import { PublicShell } from "@/components/PublicShell";
import { ACTIONS, AUDIENCES, EVIDENCE, FAQ, FINAL_CTA, HERO, PROTOCOL, ROOM, RULE, SITUATIONS } from "@/content/siteCopy";

// The home page does not explain AiR. It runs it.
//   a situation (three stations) → the rule → six actions → the room as interface (a second situation)
//   → situations library → what we watch → the protocol → who it is for → questions → start.

function SectionHead({ eyebrow, title, dark = false, children }: { eyebrow: string; title: string[]; dark?: boolean; children?: React.ReactNode }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
      <div><p className={`eyebrow ${dark ? "dark" : ""}`}>{eyebrow}</p><h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">{title[0]}<br />{title[1]}</h2></div>
      {children ? <div className="max-w-xl text-base leading-8 lg:justify-self-end">{children}</div> : null}
    </div>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const primaryAction = isAuthenticated
    ? <Link href="/dashboard"><Button className="air-button big">Continue <ArrowRight /></Button></Link>
    : <GoogleSignInButton label={HERO.join} className="big" />;

  return (
    <PublicShell>
      {/* 1. The first situation. No headline explains anything. */}
      <section className="hero-section">
        <video className="hero-film" autoPlay muted loop playsInline poster={AIR_ASSETS.coursePoster} aria-hidden="true"><source src={AIR_ASSETS.courseVideo} type="video/mp4" /></video>
        <div className="hero-grid" aria-hidden="true" />
        <div className="container relative z-10 grid min-h-[calc(100vh-84px)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3"><span className="free-pill bright">{HERO.pill}</span><span className="eyebrow">{HERO.eyebrow}</span></div>
            <p className="hero-rule">{HERO.rule}</p>
            <Stations />
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryAction}
              <a href="#rule"><Button variant="outline" className="air-button secondary big">{HERO.see} <ArrowDown /></Button></a>
            </div>
          </div>
          <div className="hero-mark-wrap">
            <AirMark className="hero-mark" />
            <div className="hero-dot" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 2. The rule. The one loud band on the page. */}
      <section className="idea-section py-24 lg:py-32" id="rule">
        <div className="container">
          <SectionHead eyebrow={RULE.eyebrow} title={RULE.title} dark />
          <div className="rule-grid">
            <ul className="rule-nots">{RULE.nots.map(item => <li key={item}><X className="size-4" aria-hidden="true" />{item}</li>)}</ul>
            <div className="rule-instead">
              <p className="eyebrow dark">Instead</p>
              <ol>{RULE.instead.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol>
            </div>
          </div>
          <p className="mt-10 max-w-3xl text-lg font-bold leading-8">{RULE.close}</p>
        </div>
      </section>

      {/* 3. Six actions. */}
      <section className="steps-section py-24 lg:py-32" id="actions">
        <div className="container">
          <SectionHead eyebrow={ACTIONS.eyebrow} title={ACTIONS.title}><p className="text-mist">{ACTIONS.intro}</p></SectionHead>
          <ol className="actions-grid">
            {ACTIONS.steps.map((step, index) => (
              <li key={step.name} className="action-card">
                <span>{index + 1}</span>
                <h3 className="display">{step.name}</h3>
                <p className="action-line">{step.line}</p>
                <p className="action-detail">{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="display mt-10 text-3xl text-[var(--spark)] sm:text-4xl">{ACTIONS.close}</p>
        </div>
      </section>

      {/* 4. The room is the interface. A second situation. */}
      <section className="room-section py-24 lg:py-32" id="room">
        <div className="container">
          <SectionHead eyebrow={ROOM.eyebrow} title={ROOM.title}><p className="text-mist">{ROOM.intro}</p></SectionHead>
          <div className="mt-12"><RoomWalls /></div>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-mist">{ROOM.photo}</p>
        </div>
      </section>

      {/* 5. Situations. */}
      <section className="bg-[var(--surface-soft)] py-24 lg:py-32" id="situations">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">{SITUATIONS.eyebrow}</p><h2 className="display mt-4 text-5xl sm:text-7xl">{SITUATIONS.title[0]}<br />{SITUATIONS.title[1]}</h2></div><Link href="/situations" className="text-link">Open every situation <ArrowRight className="size-4" /></Link></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SITUATIONS.items.map(item => (
              <Link key={item.slug} href={`/situations#${item.slug}`} className="situation-card">
                <small>{item.kicker}</small>
                <b>{item.name}</b>
                <p>{item.say}</p>
              </Link>
            ))}
          </div>
          <div className="test-band">
            <p className="eyebrow">{SITUATIONS.test.label}</p>
            <p className="display text-3xl sm:text-5xl">{SITUATIONS.test.question}</p>
            <p className="mt-2 text-lg font-bold">{SITUATIONS.test.rule}</p>
          </div>
        </div>
      </section>

      {/* 6. What we watch. */}
      <section className="bg-[var(--deep)] py-24 text-white lg:py-32" id="evidence">
        <div className="container">
          <SectionHead eyebrow={EVIDENCE.eyebrow} title={EVIDENCE.title}><p className="text-mist">{EVIDENCE.intro}</p></SectionHead>
          <div className="evidence-table">
            <div className="evidence-head"><span>Evidence</span><span>What it reveals</span></div>
            {EVIDENCE.rows.map(row => <div key={row.evidence} className="evidence-row"><b>{row.evidence}</b><span>{row.reveals}</span></div>)}
          </div>
          <p className="mt-8 max-w-3xl text-base leading-8 text-mist">{EVIDENCE.close}</p>
        </div>
      </section>

      {/* 7. The protocol against school. */}
      <section className="bg-[var(--ink)] py-24 text-white lg:py-32" id="protocol">
        <div className="container">
          <SectionHead eyebrow={PROTOCOL.eyebrow} title={PROTOCOL.title} />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {[PROTOCOL.school, PROTOCOL.air].map((side, index) => (
              <div key={side.label} className={`protocol-card ${index === 1 ? "air" : ""}`}>
                <p className="eyebrow">{side.label}</p>
                <ol className="chain">{side.chain.map(step => <li key={step}>{step}</li>)}</ol>
                <p className="roles">{side.roles[0]} <ArrowRight className="inline size-4" aria-hidden="true" /> {side.roles[1]}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-3xl">{PROTOCOL.body.map(paragraph => <p key={paragraph} className="text-base leading-8 text-mist [&+p]:mt-5">{paragraph}</p>)}</div>
        </div>
      </section>

      {/* 8. Who it is for. */}
      <section className="bg-[var(--surface-soft)] py-20 lg:py-28" id="for">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">Who AiR is for</p><h2 className="display mt-4 text-5xl sm:text-7xl">Made for<br />people like you.</h2></div><Link href="/for" className="text-link">Read every section <ArrowRight className="size-4" /></Link></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map(audience => (
              <Link key={audience.slug} href={`/for#${audience.slug}`} className="audience-card">
                <small>{audience.label}</small>
                <b>{audience.headline[0]} <em className="text-[var(--signal-text)]">{audience.headline[1]}</em></b>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm leading-7 text-mist">Want the longer story, the one we tell in the gym? <Link href="/why" className="font-bold underline underline-offset-4">You were born in winter.</Link></p>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="bg-[var(--background)] py-24 lg:py-32" id="faq">
        <div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow">Questions</p><h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">Frequently<br />asked.</h2></div>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger className="text-left text-base font-bold">{item.q}</AccordionTrigger><AccordionContent className="text-sm leading-7 text-mist">{item.a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      {/* 10. Start. */}
      <section className="community-band" id="start">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="eyebrow dark">{FINAL_CTA.eyebrow}</p>
              <h2 className="display mt-4 text-6xl leading-[.9] text-[var(--deep)] sm:text-8xl">{FINAL_CTA.title[0]}<br />{FINAL_CTA.title[1]}</h2>
            </div>
            <div className="text-[var(--deep)]">
              <ol className="grid gap-2 text-2xl font-extrabold leading-8 sm:text-3xl">{FINAL_CTA.steps.map(step => <li key={step}>{step}</li>)}</ol>
              <p className="mt-5 text-lg font-semibold">{FINAL_CTA.way}</p>
              <p className="display mt-2 text-2xl sm:text-3xl">{FINAL_CTA.moves}</p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {isAuthenticated ? <Link href="/dashboard"><Button className="big bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Continue <ArrowRight /></Button></Link> : <GoogleSignInButton label={HERO.join} className="big" />}
            <Link href="/situations"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">Open the situations</Button></Link>
            <Link href="/partner"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">{FINAL_CTA.bring} <ArrowRight /></Button></Link>
          </div>
          <p className="display mt-10 text-2xl text-[var(--deep)] sm:text-3xl">{FINAL_CTA.tagline}</p>
        </div>
      </section>
    </PublicShell>
  );
}
