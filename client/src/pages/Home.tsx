import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { AirMark } from "@/components/AirMark";
import { PromptBuilder } from "@/components/PromptBuilder";
import { AIR_ASSETS } from "@/lib/assets";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { Link } from "wouter";
import { PublicShell } from "@/components/PublicShell";
import { AUDIENCES, CLASS, CLOSE, FAQ, FINAL_CTA, HERO, METHOD, MISSION, PROGRAM_FILES, REAL_LIFE, RELAY, SAFETY, SCORING } from "@/content/siteCopy";

// The home page tells the Flow With AI story in the order the class runs:
//   theme → the mission (why AI doesn't give you what you want) → four moves → the one-hour class
//   → the Prompt Relay (with the Designer's structure to try) → scoring → real life → safety
//   → the close (call-and-response) → who it is for → questions → start.

const MEDIA = `${import.meta.env.BASE_URL}media`;

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
      {/* 1. The theme. */}
      <section className="hero-section">
        <video className="hero-film" autoPlay muted loop playsInline poster={AIR_ASSETS.coursePoster} aria-hidden="true"><source src={AIR_ASSETS.courseVideo} type="video/mp4" /></video>
        <div className="hero-grid" aria-hidden="true" />
        <div className="container relative z-10 grid min-h-[calc(100vh-84px)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3"><span className="free-pill bright">{HERO.pill}</span><span className="eyebrow">{HERO.eyebrow}</span></div>
            <h1 className="display mt-6 text-6xl leading-[.88] sm:text-8xl lg:text-[7.5rem]">{HERO.title[0]}<br /><em>{HERO.title[1]}</em></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-mist">{HERO.intro}</p>
            <p className="hero-rule">{HERO.rule}</p>
            <dl className="hero-facts">{HERO.facts.map(fact => <div key={fact.label}><dt className="display">{fact.value}</dt><dd>{fact.label}</dd></div>)}</dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryAction}
              <a href="#class"><Button variant="outline" className="air-button secondary big">{HERO.see} <ArrowDown /></Button></a>
            </div>
          </div>
          <div className="hero-mark-wrap">
            <AirMark className="hero-mark" />
            <div className="hero-dot" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 2. The mission. The one loud band on the page. */}
      <section className="idea-section py-24 lg:py-32" id="mission">
        <div className="container">
          <p className="eyebrow dark">{MISSION.eyebrow}</p>
          <h2 className="display mt-4 max-w-5xl text-5xl leading-[.92] sm:text-7xl">{MISSION.ask}</h2>
          <p className="mt-8 max-w-3xl text-2xl font-extrabold leading-9 sm:text-3xl">{MISSION.answer}</p>
          <p className="mt-4 max-w-3xl text-lg leading-8">{MISSION.body}</p>
          <div className="rule-grid">
            <div className="prompt-compare weak"><p className="eyebrow dark">{MISSION.weak.label}</p><p className="display text-3xl sm:text-4xl">“{MISSION.weak.text}”</p></div>
            <div className="prompt-compare clear"><p className="eyebrow dark">{MISSION.clear.label}</p><p className="text-xl font-bold leading-8 sm:text-2xl">“{MISSION.clear.text}”</p></div>
          </div>
          <p className="mt-10 max-w-3xl text-lg font-bold leading-8">{MISSION.askAgain}</p>
        </div>
      </section>

      {/* 3. Four moves. */}
      <section className="steps-section py-24 lg:py-32" id="moves">
        <div className="container">
          <SectionHead eyebrow={METHOD.eyebrow} title={METHOD.title}><p className="text-mist">{METHOD.intro}</p></SectionHead>
          <ol className="actions-grid four">
            {METHOD.moves.map(move => (
              <li key={move.slug} className="action-card">
                <span>{move.number}</span>
                <h3 className="display">{move.title}</h3>
                <p className="action-line">{move.tagline}</p>
                <p className="action-detail">{move.intro}</p>
                <Link href={`/paths/${move.slug}`} className="text-link mt-4">The {move.title} lessons <ArrowRight className="size-4" /></Link>
              </li>
            ))}
          </ol>
          <p className="display mt-10 text-3xl text-[var(--spark)] sm:text-4xl">{METHOD.close}</p>
        </div>
      </section>

      {/* 4. The one-hour class. */}
      <section className="bg-[var(--surface-soft)] py-24 lg:py-32" id="class">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">{CLASS.eyebrow}</p><h2 className="display mt-4 text-5xl sm:text-7xl">{CLASS.title[0]}<br />{CLASS.title[1]}</h2></div><Link href="/class" className="text-link">{CLASS.cta} <ArrowRight className="size-4" /></Link></div>
          <p className="mt-6 max-w-2xl text-base leading-8 text-mist">{CLASS.intro}</p>
          <ol className="timeline">
            {CLASS.blocks.map(block => (
              <li key={block.slug}>
                <Link href={`/class#${block.slug}`} className="timeline-card">
                  <small>{block.time} min</small>
                  <b>{block.title}</b>
                  <p>{block.summary}</p>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`${MEDIA}/${PROGRAM_FILES.classPlan.file}`} download className="text-link"><Download className="size-4" /> {PROGRAM_FILES.classPlan.label}</a>
            <a href={`${MEDIA}/${PROGRAM_FILES.talkingPoints.file}`} download className="text-link"><Download className="size-4" /> {PROGRAM_FILES.talkingPoints.label}</a>
          </div>
        </div>
      </section>

      {/* 5. The Prompt Relay. */}
      <section className="room-section py-24 lg:py-32" id="relay">
        <div className="container">
          <SectionHead eyebrow={RELAY.eyebrow} title={RELAY.title}><p className="text-mist">{RELAY.intro}</p></SectionHead>
          <ol className="roles-grid">
            {RELAY.roles.map(role => (
              <li key={role.number} className="role-card">
                <span>{role.number}</span>
                <small>{role.move}</small>
                <b className="display">{role.role}</b>
                <p>{role.job}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Try the Designer’s move</p>
              <h3 className="display mt-3 text-4xl sm:text-5xl">Turn what you see into the first prompt.</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-mist">Fill in the six parts. Read the prompt out loud. If a teammate could not picture it from the words alone, it is not clear yet.</p>
              <ul className="mt-6 grid gap-2 text-sm leading-6 text-mist">{RELAY.rules.map(rule => <li key={rule} className="flex gap-3"><span className="text-[var(--spark)]">·</span>{rule}</li>)}</ul>
            </div>
            <PromptBuilder />
          </div>
        </div>
      </section>

      {/* 6. Scoring. */}
      <section className="bg-[var(--deep)] py-24 text-white lg:py-32" id="score">
        <div className="container">
          <SectionHead eyebrow={SCORING.eyebrow} title={SCORING.title}><p className="text-mist">{SCORING.intro}</p></SectionHead>
          <div className="evidence-table">
            <div className="evidence-head"><span>Category</span><span>Points</span></div>
            {SCORING.rows.map(row => <div key={row.category} className="evidence-row"><b>{row.category}</b><span>{row.points}</span></div>)}
            <div className="evidence-row total"><b>Total</b><span>{SCORING.total}</span></div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">{SCORING.recognitions.map(item => <div key={item.name} className="recognition"><b className="display">{item.name}</b><p>{item.line}</p></div>)}</div>
        </div>
      </section>

      {/* 7. Real life. */}
      <section className="bg-[var(--background)] py-24 lg:py-32" id="real-life">
        <div className="container">
          <SectionHead eyebrow={REAL_LIFE.eyebrow} title={REAL_LIFE.title}><p className="text-mist">{REAL_LIFE.intro}</p></SectionHead>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {REAL_LIFE.columns.map(column => <div key={column.title} className="life-column"><h3 className="display text-3xl">{column.title}</h3><ul>{column.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}
          </div>
        </div>
      </section>

      {/* 8. Safety. */}
      <section className="bg-[var(--ink)] py-20 text-white lg:py-28" id="safety">
        <div className="container">
          <SectionHead eyebrow={SAFETY.eyebrow} title={SAFETY.title}><p className="text-mist">{SAFETY.intro}</p></SectionHead>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{SAFETY.rules.map(rule => <div key={rule.title} className="safety-card"><b>{rule.title}</b><p>{rule.body}</p></div>)}</div>
        </div>
      </section>

      {/* 9. The close. */}
      <section className="community-band" id="close">
        <div className="container py-20 lg:py-28">
          <p className="eyebrow dark">{CLOSE.eyebrow}</p>
          <h2 className="display mt-4 max-w-5xl text-5xl leading-[.9] text-[var(--deep)] sm:text-7xl">{CLOSE.sentence[0]} <span className="fill-blank">__________</span>{CLOSE.sentence[1]}</h2>
          <p className="mt-6 max-w-2xl text-lg font-semibold text-[var(--deep)]">{CLOSE.closing}</p>
          <div className="call-response">
            {CLOSE.callResponse.map(line => <div key={line.call}><small>Instructor</small><p>{line.call}</p><small>Students</small><b className="display">{line.response}</b></div>)}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={CLOSE.pinHref}><Button className="big bg-[var(--deep)] text-white hover:bg-[var(--ink)]">{CLOSE.pinLabel} <ArrowRight /></Button></Link>
            <Link href="/partner"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">{FINAL_CTA.bring} <ArrowRight /></Button></Link>
          </div>
        </div>
      </section>

      {/* 10. Who it is for. */}
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

      {/* 11. Questions. */}
      <section className="bg-[var(--background)] py-24 lg:py-32" id="faq">
        <div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow">Questions</p><h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">Frequently<br />asked.</h2></div>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger className="text-left text-base font-bold">{item.q}</AccordionTrigger><AccordionContent className="text-sm leading-7 text-mist">{item.a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      {/* 12. Start. */}
      <section className="steps-section" id="start">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="eyebrow">{FINAL_CTA.eyebrow}</p>
              <h2 className="display mt-4 text-6xl leading-[.9] sm:text-8xl">{FINAL_CTA.title[0]}<br /><em>{FINAL_CTA.title[1]}</em></h2>
            </div>
            <div>
              <ol className="grid gap-2 text-2xl font-extrabold leading-8 sm:text-3xl">{FINAL_CTA.steps.map(step => <li key={step}>{step}</li>)}</ol>
              <p className="mt-5 text-lg font-semibold text-mist">{FINAL_CTA.way}</p>
              <p className="display mt-2 text-2xl text-[var(--spark)] sm:text-3xl">{FINAL_CTA.moves}</p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {isAuthenticated ? <Link href="/dashboard"><Button className="air-button big">Continue <ArrowRight /></Button></Link> : <GoogleSignInButton label={HERO.join} className="big" />}
            <Link href="/class"><Button variant="outline" className="air-button secondary big">{CLASS.cta}</Button></Link>
            <Link href="/partner"><Button variant="outline" className="air-button secondary big">{FINAL_CTA.bring} <ArrowRight /></Button></Link>
          </div>
          <p className="display mt-10 text-2xl text-mist sm:text-3xl">{FINAL_CTA.tagline}</p>
        </div>
      </section>
    </PublicShell>
  );
}
