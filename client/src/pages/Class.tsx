import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/PublicShell";
import { PromptBuilder } from "@/components/PromptBuilder";
import { CLASS, CLOSE, PROGRAM_FILES, REAL_LIFE, RELAY, SAFETY, SCORING } from "@/content/siteCopy";
import { ArrowRight, Download, MessageSquareQuote, Megaphone } from "lucide-react";
import { Link } from "wouter";

// The full one-hour class, block by block, with the instructor's say/ask lines.
// Both program PDFs download from here.
const MEDIA = `${import.meta.env.BASE_URL}media`;

export default function ClassPage() {
  return (
    <PublicShell>
      <section className="page-hero">
        <div className="container py-20 sm:py-28">
          <p className="eyebrow">{CLASS.eyebrow} · AiR: Flow With AI</p>
          <h1 className="display mt-5 max-w-5xl text-7xl leading-[.88] sm:text-8xl lg:text-[9rem]">{CLASS.title[0]}<br /><em>{CLASS.title[1]}</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">{CLASS.intro}</p>
          <dl className="mt-10 grid gap-4 sm:grid-cols-4">{CLASS.setup.map(item => <div key={item.label} className="rounded-2xl border border-white/15 bg-white/5 p-4"><dt className="text-[10px] font-extrabold uppercase tracking-[.18em] text-mist">{item.label}</dt><dd className="mt-1 font-bold">{item.value}</dd></div>)}</dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`${MEDIA}/${PROGRAM_FILES.classPlan.file}`} download><Button className="air-button big"><Download /> {PROGRAM_FILES.classPlan.label}</Button></a>
            <a href={`${MEDIA}/${PROGRAM_FILES.talkingPoints.file}`} download><Button variant="outline" className="air-button secondary big"><Download /> {PROGRAM_FILES.talkingPoints.label}</Button></a>
          </div>
          <nav aria-label="Class blocks" className="mt-10 flex flex-wrap gap-2">
            {CLASS.blocks.map(block => <a key={block.slug} href={`#${block.slug}`} className="free-pill border-white/25 text-white hover:bg-white/10">{block.time} · {block.title}</a>)}
          </nav>
        </div>
      </section>

      {CLASS.blocks.map((block, index) => (
        <section key={block.slug} id={block.slug} className={`scroll-mt-24 py-16 lg:py-24 ${index % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--surface-soft)]"}`}>
          <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">{block.time} minutes</p>
              <h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">{block.title}</h2>
              <p className="mt-6 max-w-md text-base leading-8 text-mist">{block.summary}</p>
            </div>
            <div className="situation-detail">
              {block.ask ? <div className="situation-say"><p className="eyebrow"><MessageSquareQuote className="mr-2 inline size-4" aria-hidden="true" />Ask</p><p className="display text-2xl sm:text-3xl">“{block.ask}”</p></div> : null}
              {block.say ? <div className="situation-say"><p className="eyebrow"><Megaphone className="mr-2 inline size-4" aria-hidden="true" />Say</p><p className="display text-2xl sm:text-3xl">“{block.say}”</p></div> : null}
              <ol className="class-steps">{block.do.map((step, stepIndex) => <li key={step}><span>{String(stepIndex + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
              {block.note ? <p className="mt-5 text-sm font-bold leading-7">{block.note}</p> : null}
              {block.slug === "relay" ? (
                <div className="mt-8">
                  <ol className="roles-grid compact">{RELAY.roles.map(role => <li key={role.number} className="role-card"><span>{role.number}</span><small>{role.move}</small><b className="display">{role.role}</b><p>{role.job}</p></li>)}</ol>
                  <div className="mt-6 rounded-2xl border border-[var(--hairline)] p-5"><p className="eyebrow">{RELAY.captain.title}</p><ul className="mt-3 grid gap-1 text-sm leading-6">{RELAY.captain.jobs.map(job => <li key={job}>{job}</li>)}</ul><p className="mt-3 text-sm text-mist">{RELAY.rotate}</p></div>
                  <div className="mt-6"><PromptBuilder /></div>
                </div>
              ) : null}
              {block.slug === "score" ? (
                <div className="mt-8">
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">{SCORING.recognitions.map(item => <div key={item.name} className="recognition dark"><b className="display">{item.name}</b><p>{item.line}</p></div>)}</div>
                  <p className="mt-5 text-sm leading-7 text-mist">{SCORING.prizes}</p>
                </div>
              ) : null}
              {block.slug === "real-life" ? (
                <div className="mt-8">
                  <div className="grid gap-4 sm:grid-cols-3">{REAL_LIFE.columns.map(column => <div key={column.title} className="life-column"><h3 className="display text-2xl">{column.title}</h3><ul>{column.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
                  <div className="mt-6 rounded-2xl bg-[var(--deep)] p-5 text-white"><p className="eyebrow">{SAFETY.eyebrow}</p><p className="mt-2 font-bold leading-7">{SAFETY.title[0]} {SAFETY.title[1]} {SAFETY.intro}</p></div>
                  <div className="call-response mt-6">{CLOSE.callResponse.map(line => <div key={line.call}><small>Instructor</small><p>{line.call}</p><small>Students</small><b className="display">{line.response}</b></div>)}</div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      <section className="community-band">
        <div className="container grid gap-8 py-20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="eyebrow dark">Want a warm-up first?</p><h2 className="display mt-4 text-5xl text-[var(--deep)] sm:text-7xl">Clear the AiR.<br />Then make something.</h2><p className="mt-4 max-w-xl text-lg font-semibold text-[var(--deep)]">Five-minute situations from an earlier version of AiR are kept as optional openers. Then run the class.</p></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/partner"><Button className="big bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Bring the class to your school <ArrowRight /></Button></Link>
            <Link href="/situations"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">Optional warm-ups</Button></Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
