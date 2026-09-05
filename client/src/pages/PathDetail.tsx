import { PublicShell } from "@/components/PublicShell";
import { Button } from "@/components/ui/button";
import { startLogin } from "@/const";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";
import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function PathDetail({ slug }: { slug: string }) {
  const { isAuthenticated } = useAuth();
  const { data: catalog = [] } = usePublicCatalog();
  const path = catalog.find(item => item.slug === slug);
  if (!path) return <PublicShell><div className="container py-28"><p className="eyebrow">Path not found</p><h1 className="display mt-4 text-6xl">Take another route.</h1></div></PublicShell>;
  const allLessons = path.modules.flatMap(module => module.lessons);
  return (
    <PublicShell>
      <section className="path-detail-hero" style={{ "--path-accent": path.accent } as React.CSSProperties}>
        <div className="container grid gap-12 py-20 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
          <div><span className="path-number large">{path.number}</span><p className="eyebrow mt-8">{path.kicker}</p></div>
          <div><h1 className="display text-8xl leading-[.86] sm:text-9xl">{path.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-mist">{path.description}</p><div className="mt-8 flex flex-wrap items-center gap-4">{isAuthenticated ? <Link href={`/learn/${allLessons[0]?.slug}`}><Button className="air-button big">Start this path <ArrowRight /></Button></Link> : <Button className="air-button big" onClick={() => startLogin()}>Join to start <ArrowRight /></Button>}<span className="text-xs font-bold uppercase tracking-[.14em] text-mist">{allLessons.length} lessons · always free</span></div></div>
        </div>
      </section>
      <section className="bg-[var(--paper)] py-20 text-[var(--deep)]">
        <div className="container"><p className="eyebrow dark">The moves</p><div className="mt-8 border-t border-[var(--deep)]/15">{allLessons.map((lesson, index) => <Link key={lesson.id} href={`/learn/${lesson.slug}`} className="lesson-row group"><span className="lesson-index">{lesson.number}</span><div><h2 className="display text-4xl sm:text-5xl">{lesson.title}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[var(--deep-soft)]">{lesson.summary}</p></div><div className="ml-auto hidden items-center gap-2 text-xs font-bold uppercase tracking-[.12em] sm:flex"><Clock3 className="size-4" />{lesson.durationMinutes} min <ArrowRight className="ml-3 size-5 transition-transform group-hover:translate-x-1" /></div></Link>)}</div></div>
      </section>
    </PublicShell>
  );
}
