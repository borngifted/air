import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { AIR_ASSETS } from "@/lib/assets";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";
import { ArrowDown, ArrowRight, Check, ShieldCheck, X } from "lucide-react";
import { Link } from "wouter";
import { PathCard } from "@/components/PathCard";
import { PublicShell } from "@/components/PublicShell";
import {
  AUDIENCES, FAQ, FINAL_CTA, HERO, HOW_IT_WORKS, METHOD, NOT_AIR, PATHS, SAFETY, WHAT_IS_AIR, WHAT_YOU_LEARN, WHY_AIR,
} from "@/content/siteCopy";

function SectionHead({ eyebrow, title, dark = false, children }: { eyebrow: string; title: string[]; dark?: boolean; children?: React.ReactNode }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
      <div><p className={`eyebrow ${dark ? "dark" : ""}`}>{eyebrow}</p><h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">{title[0]}<br />{title[1]}</h2></div>
      {children ? <div className="max-w-xl text-base leading-8 lg:justify-self-end">{children}</div> : null}
    </div>
  );
}

function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-2.5 ${className}`}>
      {items.map(item => <li key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-[var(--go)]" aria-hidden="true" />{item}</li>)}
    </ul>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { data: catalog = [] } = usePublicCatalog();

  return (
    <PublicShell>
      <section className="hero-section">
        <video className="hero-film" autoPlay muted loop playsInline poster={AIR_ASSETS.coursePoster} aria-hidden="true"><source src={AIR_ASSETS.courseVideo} type="video/mp4" /></video>
        <div className="hero-grid" aria-hidden="true" />
        <div className="container relative z-10 grid min-h-[calc(100vh-84px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3"><span className="free-pill bright">{HERO.pill}</span><span className="eyebrow">{HERO.eyebrow}</span></div>
            <h1 className="display hero-title mt-8">{HERO.title[0]}<br /><em>{HERO.title[1]}</em></h1>
            <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-white sm:text-2xl">{HERO.lead}</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-mist sm:text-lg">{HERO.body}</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-mist">{HERO.reassurance} <b className="text-white">{HERO.close}</b></p>
            <div className="mt-9 flex flex-wrap gap-3">
              {isAuthenticated ? <Link href="/dashboard"><Button className="air-button big">Continue your move <ArrowRight /></Button></Link> : <GoogleSignInButton label={HERO.join} className="big" />}
              <a href="#paths"><Button variant="outline" className="air-button secondary big">{HERO.choose} <ArrowDown /></Button></a>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[.14em] text-mist">Free for everyone · ages 8 to adult</p>
          </div>
          <div className="hero-mark-wrap">
            <img src={AIR_ASSETS.logo} alt="AiR" className="hero-mark" />
            <div className="orbit-card orbit-one"><span>01</span><b>Clear</b><small>Purpose before tools</small></div>
            <div className="orbit-card orbit-two"><span>03</span><b>Judge</b><small>Check before you trust</small></div>
            <div className="hero-dot" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="statement-section" id="what-is-air">
        <div className="container grid gap-10 py-24 lg:grid-cols-[.7fr_1.3fr] lg:py-32">
          <div><p className="eyebrow dark">{WHAT_IS_AIR.eyebrow}</p><span className="big-index">01—04</span></div>
          <div className="text-[var(--deep)]">
            <h2 className="display text-5xl leading-[.94] sm:text-7xl">{WHAT_IS_AIR.title[0]}<br />{WHAT_IS_AIR.title[1]}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--deep-soft)]">{WHAT_IS_AIR.intro}</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--deep-soft)]">{WHAT_IS_AIR.breakdown}</p>
            <p className="display mt-4 text-4xl sm:text-5xl">{WHAT_IS_AIR.moves}</p>
            <p className="mt-8 text-xs font-bold uppercase tracking-[.16em]">These four moves help you decide</p>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {WHAT_IS_AIR.helpsYouDecide.map((item, index) => <li key={item} className="flex gap-4 border-l-2 border-[var(--deep)] pl-4 text-base leading-7"><span className="display text-2xl leading-none opacity-50">0{index + 1}</span>{item}</li>)}
            </ol>
            <p className="mt-8 max-w-2xl text-lg font-semibold leading-8">{WHAT_IS_AIR.close}</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--deep)] py-24 text-white lg:py-32" id="why">
        <div className="container">
          <SectionHead eyebrow={WHY_AIR.eyebrow} title={WHY_AIR.title}><p className="text-mist">{WHY_AIR.intro}</p></SectionHead>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_AIR.fears.map(fear => <blockquote key={fear} className="rounded-2xl border border-white/10 bg-white/[.04] p-6 text-lg font-semibold leading-7 text-white/85">“{fear}”</blockquote>)}
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <p className="display text-5xl sm:text-6xl"><em>{WHY_AIR.shift}</em></p>
            <div className="max-w-2xl">
              {WHY_AIR.body.map(paragraph => <p key={paragraph} className="mt-0 text-base leading-8 text-mist [&+p]:mt-5">{paragraph}</p>)}
              <p className="mt-6 text-lg font-bold">{WHY_AIR.close}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink)] py-24 text-white lg:py-32" id="method">
        <div className="container">
          <SectionHead eyebrow={METHOD.eyebrow} title={METHOD.title}><p className="text-mist">The tools will change. These moves stay useful. Each one is a decision only a human can make.</p></SectionHead>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {METHOD.moves.map(move => (
              <article key={move.slug} id={`move-${move.slug}`} className="rounded-[1.75rem] border border-white/10 bg-white/[.03] p-7 sm:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div><span className="display text-6xl leading-none text-white/25 sm:text-7xl">{move.number}</span><h3 className="display mt-2 text-5xl sm:text-6xl">{move.title}</h3></div>
                  <Link href={`/paths/${move.slug}`} className="text-link mt-3 shrink-0 text-white">Lessons <ArrowRight className="size-4" /></Link>
                </div>
                <p className="mt-5 text-xl font-bold leading-7">{move.tagline}</p>
                <p className="mt-3 text-base leading-8 text-mist">{move.intro}</p>
                <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-[var(--go)]">{move.promptLabel}</p>
                <ul className={`mt-3 grid gap-2 ${move.prompts.length > 6 ? "sm:grid-cols-2" : ""}`}>
                  {move.prompts.map(prompt => <li key={prompt} className="flex gap-3 text-sm leading-6 text-white/90"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--spark)]" aria-hidden="true" />{prompt}</li>)}
                </ul>
                {move.principle ? <p className="mt-6 text-base font-semibold leading-7">{move.principle}</p> : null}
                <div className="mt-6 rounded-2xl bg-[var(--go)] p-5 text-[var(--ink)]">
                  <p className="text-[10px] font-extrabold uppercase tracking-[.2em]">AiR move</p>
                  <p className="mt-1 text-lg font-extrabold leading-6">{move.move}</p>
                </div>
                {move.example ? (
                  <div className="mt-5 rounded-2xl border border-white/10 p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-mist">{move.exampleLabel}</p>
                    {move.example.map(line => <p key={line} className="mt-2 text-sm leading-7 text-white/90">{line}</p>)}
                  </div>
                ) : null}
                <p className="display mt-8 text-3xl text-[var(--spark)]">{move.close}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paths-section py-24 lg:py-32" id="paths">
        <div className="container">
          <SectionHead eyebrow={PATHS.eyebrow} title={PATHS.title}><p className="text-mist">{PATHS.intro}</p></SectionHead>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {PATHS.paths.map((path, index) => (
              <article key={path.slug} id={`path-${path.slug}`} className="flex flex-col rounded-[1.5rem] border border-[var(--hairline)] bg-[var(--surface-raised)] p-7">
                <span className="eyebrow">Path 0{index + 1}</span>
                <h3 className="display mt-3 text-5xl sm:text-6xl">{path.title}</h3>
                <p className="mt-3 text-lg font-bold leading-7">{path.tagline}</p>
                <p className="mt-3 text-sm leading-7 text-mist">{path.intro}</p>
                <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[.18em] text-mist">You will learn how to</p>
                <CheckList items={path.learn} className="mt-3" />
                {path.note ? <p className="mt-5 text-sm font-semibold leading-6">{path.note}</p> : null}
                <p className="mt-6 text-sm leading-6"><b>Best for:</b> {path.bestFor}</p>
                <Link href={`/curriculum#${path.slug}`} className="mt-auto pt-7"><Button className="air-button w-full">{path.cta} <ArrowRight /></Button></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-soft)] py-20 lg:py-28" id="for">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">Who AiR is for</p><h2 className="display mt-4 text-5xl sm:text-7xl">Made for<br />people like you.</h2></div><Link href="/for" className="text-link">Read every section <ArrowRight className="size-4" /></Link></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map(audience => (
              <Link key={audience.slug} href={`/for#${audience.slug}`} className="group rounded-[1.25rem] border border-[var(--hairline)] bg-[var(--surface-raised)] p-6 transition-transform duration-200 hover:-translate-y-1">
                <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-mist">{audience.label}</p>
                <h3 className="display mt-3 text-3xl leading-[.95]">{audience.headline[0]} <em>{audience.headline[1]}</em></h3>
                <span className="text-link mt-6">Read more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
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
              <div className="campaign-copy"><span>03 · Judge</span><h3 className="display">Check before you trust.</h3><Link href="/paths/judge" className="campaign-link">Learn how to check <ArrowRight className="size-4" /></Link></div>
            </article>
            <article className="campaign-card campaign-square">
              <img src={AIR_ASSETS.campaignCommunity} alt="Children and adults making something together around the AiR mark" />
              <div className="campaign-copy"><span>Community · Learn together</span><h3 className="display">Make it together.</h3><Link href="/community" className="campaign-link">Join the group <ArrowRight className="size-4" /></Link></div>
            </article>
          </div>
        </div>
      </section>

      <section className="paths-section py-24 lg:py-32" id="curriculum">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">The curriculum</p><h2 className="display mt-4 text-6xl sm:text-7xl">Twelve lessons.<br />Four moves.</h2></div><Link href="/curriculum" className="text-link">See all lessons <ArrowRight className="size-4" /></Link></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">{catalog.map(path => <PathCard key={path.id} path={path} />)}</div>
        </div>
      </section>

      <section className="statement-section py-24 lg:py-32" id="skills">
        <div className="container text-[var(--deep)]">
          <SectionHead eyebrow={WHAT_YOU_LEARN.eyebrow} title={WHAT_YOU_LEARN.title} dark><p className="text-[var(--deep-soft)]">{WHAT_YOU_LEARN.intro}</p></SectionHead>
          <ol className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_YOU_LEARN.skills.map((skill, index) => <li key={skill} className="flex gap-4 border-b border-[rgba(19,42,36,.18)] py-3 text-base font-semibold leading-7"><span className="display w-8 shrink-0 text-2xl leading-7 opacity-45">{String(index + 1).padStart(2, "0")}</span>{skill}</li>)}
          </ol>
          <p className="mt-10 max-w-3xl text-xl font-bold leading-8">{WHAT_YOU_LEARN.close}</p>
        </div>
      </section>

      <section className="bg-[var(--background)] py-24 lg:py-32" id="how">
        <div className="container">
          <SectionHead eyebrow={HOW_IT_WORKS.eyebrow} title={HOW_IT_WORKS.title} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
            {HOW_IT_WORKS.steps.map((step, index) => <article key={step.title} className="bg-[var(--surface-raised)] p-7"><span className="eyebrow">0{index + 1}</span><h3 className="display mt-6 text-3xl">{step.title}</h3><p className="mt-3 text-sm leading-7 text-mist">{step.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[var(--deep)] py-24 text-white lg:py-32" id="safety">
        <div className="container">
          <SectionHead eyebrow={SAFETY.eyebrow} title={SAFETY.title}><p className="text-mist">{SAFETY.intro}</p></SectionHead>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY.rules.map(rule => <article key={rule.title} className="rounded-2xl border border-white/10 bg-white/[.04] p-6"><ShieldCheck className="size-5 text-[var(--go)]" aria-hidden="true" /><h3 className="mt-5 text-lg font-extrabold">{rule.title}</h3><p className="mt-2 text-sm leading-7 text-mist">{rule.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink)] py-24 text-white lg:py-32" id="not">
        <div className="container grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div><p className="eyebrow">{NOT_AIR.eyebrow}</p><h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">{NOT_AIR.title[0]}<br />{NOT_AIR.title[1]}</h2><p className="mt-7 max-w-md text-base leading-8 text-mist">{NOT_AIR.close}</p></div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {NOT_AIR.items.map(item => <li key={item} className="flex gap-3 rounded-2xl border border-white/10 p-4 text-sm font-semibold leading-6"><X className="mt-0.5 size-4 shrink-0 text-[var(--destructive)]" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--background)] py-24 lg:py-32" id="faq">
        <div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow">Questions</p><h2 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">Frequently<br />asked.</h2></div>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger className="text-left text-base font-bold">{item.q}</AccordionTrigger><AccordionContent className="text-sm leading-7 text-mist">{item.a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

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
              <p className="display mt-2 text-3xl">{FINAL_CTA.moves}</p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {isAuthenticated ? <Link href="/dashboard"><Button className="big bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Continue your move <ArrowRight /></Button></Link> : <GoogleSignInButton label={HERO.join} className="big" />}
            <a href="#paths"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">{HERO.choose}</Button></a>
            <Link href="/partner"><Button variant="outline" className="big border-[var(--deep)] bg-transparent text-[var(--deep)] hover:bg-[var(--deep)] hover:text-white">{FINAL_CTA.bring} <ArrowRight /></Button></Link>
          </div>
          <p className="display mt-10 text-2xl text-[var(--deep)] sm:text-3xl">{FINAL_CTA.tagline}</p>
        </div>
      </section>
    </PublicShell>
  );
}
