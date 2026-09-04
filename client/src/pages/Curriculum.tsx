import { PathCard } from "@/components/PathCard";
import { PublicShell } from "@/components/PublicShell";
import { trpc } from "@/lib/trpc";
import { QueryError } from "@/components/QueryError";

export default function Curriculum() {
  const { data: catalog = [], isLoading, error, refetch } = trpc.catalog.list.useQuery();
  return (
    <PublicShell>
      <section className="page-hero">
        <div className="container py-20 sm:py-28">
          <p className="eyebrow">Free AiR curriculum · ages 8 to adult</p>
          <h1 className="display mt-5 max-w-5xl text-7xl leading-[.88] sm:text-8xl lg:text-[9rem]">Complex work.<br /><em>Simple moves.</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">Twelve video-led lessons. Four paths. Three ways into every challenge. Start with a story, make one move, check your thinking, then put the work in the world.</p>
        </div>
      </section>
      <section className="paths-section py-20">
        <div className="container">
          {error ? <QueryError message={error.message} retry={() => refetch()} /> : isLoading ? <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-[420px] animate-pulse rounded-[1.5rem] bg-white/5" />)}</div> : <div className="grid gap-4 md:grid-cols-2">{catalog.map(path => <PathCard key={path.id} path={path} />)}</div>}
          <div className="mt-16 grid gap-5 rounded-[2rem] bg-[var(--paper)] p-7 text-[var(--deep)] sm:grid-cols-3 sm:p-10">
            {[['Explore','More guidance. Stories, drawing, speaking, and playful practice.'],['Create','A real project, real choices, and feedback from a real person.'],['Build','Systems, workflows, automation, and deeper production decisions.']].map(([title, body]) => <div key={title} className="border-l-2 border-[var(--go)] pl-5"><h3 className="display text-3xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--deep-soft)]">{body}</p></div>)}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
