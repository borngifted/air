import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/PublicShell";
import { AUDIENCES } from "@/content/siteCopy";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";

export default function ForYou() {
  return (
    <PublicShell>
      <section className="page-hero">
        <div className="container py-20 sm:py-28">
          <p className="eyebrow">Who AiR is for · free for everyone</p>
          <h1 className="display mt-5 max-w-5xl text-7xl leading-[.88] sm:text-8xl lg:text-[9rem]">Made for<br /><em>people like you.</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">Students, families, adults, returning citizens, entrepreneurs, educators, and community organizations all use the same four moves. Pick your section.</p>
          <nav aria-label="Audiences" className="mt-10 flex flex-wrap gap-2">
            {AUDIENCES.map(audience => <a key={audience.slug} href={`#${audience.slug}`} className="free-pill border-white/25 text-white hover:bg-white/10">{audience.label}</a>)}
          </nav>
        </div>
      </section>

      {AUDIENCES.map((audience, index) => (
        <section key={audience.slug} id={audience.slug} className={`scroll-mt-24 py-20 lg:py-28 ${index % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--surface-soft)]"}`}>
          <div className="container grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="eyebrow">AiR for {audience.label.toLowerCase()}</p>
              <h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">{audience.headline[0]}<br /><em>{audience.headline[1]}</em></h2>
              {audience.intro.map(paragraph => <p key={paragraph} className="mt-6 max-w-xl text-base leading-8 text-mist">{paragraph}</p>)}
              {audience.cta ? <Link href={audience.cta.href}><Button className="air-button big mt-8">{audience.cta.label} <ArrowRight /></Button></Link> : null}
            </div>
            <div>
              <div className="rounded-[1.5rem] border border-[var(--hairline)] bg-[var(--surface-raised)] p-7 sm:p-9">
                <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-mist">{audience.listLabel}</p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {audience.list.map(item => <li key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-[var(--go)]" aria-hidden="true" />{item}</li>)}
                </ul>
              </div>
              {audience.after?.map(paragraph => <p key={paragraph} className="mt-6 text-base leading-8">{paragraph}</p>)}
              {audience.close ? <p className="display mt-6 text-3xl sm:text-4xl">{audience.close}</p> : null}
              {audience.extra ? (
                <div className="mt-10 rounded-[1.5rem] bg-[var(--deep)] p-7 text-white sm:p-9">
                  <p className="eyebrow">{audience.extra.title}</p>
                  <p className="mt-4 text-base leading-8 text-mist">{audience.extra.intro}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {audience.extra.list.map(item => <li key={item} className="flex gap-3 text-sm leading-6"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--spark)]" aria-hidden="true" />{item}</li>)}
                  </ul>
                  <p className="display mt-6 text-2xl text-[var(--spark)]">{audience.extra.close}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      <section className="community-band">
        <div className="container grid gap-8 py-20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="eyebrow dark">Ready?</p><h2 className="display mt-4 text-5xl text-[var(--deep)] sm:text-7xl">Choose one mission.<br />Make your first move.</h2></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/#paths"><Button className="big bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Choose your path <ArrowRight /></Button></Link>
            <Link href="/partner"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">Bring AiR to your community</Button></Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
