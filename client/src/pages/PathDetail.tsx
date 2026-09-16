import { PublicShell } from "@/components/PublicShell";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";
import { METHOD } from "@/content/siteCopy";
import { SeamsInspector } from "@/components/SeamsInspector";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

// One move (Clear, Direct, Judge, or Make): what the move is, then its three lessons.
export default function PathDetail({ slug }: { slug: string }) {
  const { isAuthenticated } = useAuth();
  const { data: catalog = [] } = usePublicCatalog();
  const path = catalog.find(item => item.slug === slug);
  const move = METHOD.moves.find(item => item.slug === slug);
  if (!path) return <PublicShell><div className="container py-28"><p className="eyebrow">Move not found</p><h1 className="display mt-4 text-6xl">Take another route.</h1><Link href="/curriculum" className="text-link mt-8">All lessons <ArrowRight className="size-4" /></Link></div></PublicShell>;
  const allLessons = path.modules.flatMap(module => module.lessons);
  const index = catalog.findIndex(item => item.slug === slug);
  const nextPath = catalog[index + 1];
  return (
    <PublicShell>
      <section className="path-detail-hero" style={{ "--path-accent": path.accent } as React.CSSProperties}>
        <div className="container grid gap-12 py-20 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
          <div>
            <Link href="/curriculum" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-mist"><ArrowLeft className="size-4" /> All lessons</Link>
            <span className="path-number large mt-8 block">{path.number}</span>
            <p className="eyebrow mt-6">Move {path.number} of {catalog.length} · {path.kicker}</p>
          </div>
          <div>
            <h1 className="display text-8xl leading-[.86] sm:text-9xl">{path.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-mist">{path.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {isAuthenticated ? <Link href={`/learn/${allLessons[0]?.slug}`}><Button className="air-button big">Start lesson one <ArrowRight /></Button></Link> : <GoogleSignInButton label="Join free to start" className="big" />}
              <span className="text-xs font-bold uppercase tracking-[.14em] text-mist">{allLessons.length} lessons · always free</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-20 text-[var(--deep)]">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          {move ? (
            <aside className="method-panel">
              <p className="eyebrow">The move</p>
              <h2 className="display mt-3 text-4xl">{move.tagline}</h2>
              <p className="mt-3 text-sm leading-7 text-mist">{move.intro}</p>
              <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[.18em] text-mist">{move.promptLabel}</p>
              <ul>{move.prompts.map(prompt => <li key={prompt}>{prompt}</li>)}</ul>
              {move.principle ? <p className="mt-5 text-sm font-bold leading-6">{move.principle}</p> : null}
              <div className="method-move"><span>Your move</span><b>{move.move}</b></div>
              {move.example ? <div className="mt-4 rounded-xl border border-white/15 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-mist">{move.exampleLabel}</p>{move.example.map(line => <p key={line} className="mt-2 text-sm leading-6">{line}</p>)}</div> : null}
              <p className="display mt-6 text-2xl text-[var(--spark)]">{move.close}</p>
            </aside>
          ) : null}
          <div>
            <p className="eyebrow dark">The lessons</p>
            <div className="mt-6 border-t border-[var(--deep)]/15">
              {allLessons.map(lesson => (
                <Link key={lesson.id} href={`/learn/${lesson.slug}`} className="lesson-row group">
                  <span className="lesson-index">{lesson.number}</span>
                  <div><h3 className="display text-4xl sm:text-5xl">{lesson.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-[var(--deep-soft)]">{lesson.summary}</p></div>
                  <div className="ml-auto hidden items-center gap-2 text-xs font-bold uppercase tracking-[.12em] sm:flex"><Clock3 className="size-4" />{lesson.durationMinutes} min <ArrowRight className="ml-3 size-5 transition-transform group-hover:translate-x-1" /></div>
                </Link>
              ))}
            </div>
            {slug === "judge" ? <div className="mt-12"><SeamsInspector /></div> : null}
            <p className="mt-6 text-xs leading-6 text-[var(--deep-soft)]">Every lesson has an Explore, Create, and Build level inside it. Practice the move in the Prompt Relay first, then carry it into school, personal life, and future careers. Lessons open after you join with Google, so your work is saved.</p>
            {nextPath ? <Link href={`/paths/${nextPath.slug}`} className="text-link mt-8">Next move: {nextPath.title} <ArrowRight className="size-4" /></Link> : <Link href="/community" className="text-link mt-8">Then show what changed in the community <ArrowRight className="size-4" /></Link>}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
