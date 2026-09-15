import { PathCard } from "@/components/PathCard";
import { PublicShell } from "@/components/PublicShell";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";
import { QueryError } from "@/components/QueryError";
import { LEVELS, WHAT_YOU_LEARN } from "@/content/siteCopy";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Curriculum() {
  const { data: catalog = [], isLoading, error, refetch } = usePublicCatalog();
  const total = catalog.reduce((sum, path) => sum + path.modules.reduce((inner, module) => inner + module.lessons.length, 0), 0);
  return (
    <PublicShell>
      <section className="page-hero">
        <div className="container py-20 sm:py-28">
          <p className="eyebrow">Lessons · members · twelve situations</p>
          <h1 className="display mt-5 max-w-5xl text-7xl leading-[.88] sm:text-8xl lg:text-[9rem]">Four moves.<br /><em>{total || "Twelve"} situations.</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">Each move has three situations. Each one walks you into a room, gives you ten seconds to choose, takes something away, and runs the choice again. Do each one alone, with one real person, or run it for a room.</p>
          <div className="mt-8 max-w-2xl rounded-2xl border border-white/15 bg-white/5 p-5 text-sm leading-7 text-mist">These twelve lessons have been rewritten as situations under the AiR Learning Protocol. The video is the walk-in. Nobody explains AI. The room is the lesson. <Link href="/situations" className="font-bold text-white underline underline-offset-4">Open the situations</Link></div>
        </div>
      </section>
      <section className="paths-section py-20">
        <div className="container">
          {error ? <QueryError message={error.message} retry={() => refetch()} /> : isLoading ? <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-[420px] animate-pulse rounded-[1.5rem] bg-white/5" />)}</div> : <div className="grid gap-4 md:grid-cols-2">{catalog.map(path => <PathCard key={path.id} path={path} />)}</div>}

          <div id="levels" className="mt-16 scroll-mt-28 rounded-[2rem] bg-[var(--paper)] p-7 text-[var(--deep)] sm:p-10">
            <p className="eyebrow dark">{LEVELS.eyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{LEVELS.title[0]} {LEVELS.title[1]}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--deep-soft)]">{LEVELS.intro}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {LEVELS.levels.map(level => <div key={level.slug} id={level.slug} className="scroll-mt-28 border-l-2 border-[var(--go)] pl-5"><h3 className="display text-3xl">{level.title}</h3><p className="mt-1 text-sm font-bold">{level.tagline}</p><p className="mt-2 text-sm leading-6 text-[var(--deep-soft)]">{level.intro}</p></div>)}
            </div>
            <p className="mt-8 text-sm font-bold">{LEVELS.note}</p>
          </div>

          <div className="mt-16">
            <p className="eyebrow">{WHAT_YOU_LEARN.eyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{WHAT_YOU_LEARN.title[0]} {WHAT_YOU_LEARN.title[1]}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-mist">{WHAT_YOU_LEARN.intro}</p>
            <ol className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {WHAT_YOU_LEARN.skills.map((skill, index) => <li key={skill} className="flex gap-4 border-b border-[var(--hairline)] py-3 text-sm font-semibold leading-6"><span className="display w-8 shrink-0 text-xl leading-6 opacity-45">{String(index + 1).padStart(2, "0")}</span>{skill}</li>)}
            </ol>
            <p className="mt-8 max-w-3xl text-lg font-bold leading-8">{WHAT_YOU_LEARN.close}</p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
