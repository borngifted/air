import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BookOpenCheck, ClipboardList, FileText, Presentation, ShieldCheck, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { QueryError } from "@/components/QueryError";

const icons = { facilitator_guide: ClipboardList, framework: BookOpenCheck, exercise: FileText, delivery_note: ShieldCheck, source: FileText, video_guide: Video };
export default function TrainerKnowledge() {
  const { data: resources = [], isLoading, error, refetch } = trpc.trainer.list.useQuery();
  return <PublicShell><AuthGate message="Sign in to use the separate AiR trainer knowledge base and facilitator materials."><section className="trainer-hero"><div className="container grid gap-8 py-16 sm:py-24 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow">Separate trainer knowledge base</p><h1 className="display mt-4 max-w-5xl text-7xl leading-[.88] sm:text-9xl">Teach the move.<br /><em>Not the tool.</em></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-mist">Facilitator guides, age-adaptive delivery notes, exercises, video plans, teaching frameworks, and source references—kept distinct from the learner journey.</p></div><Link href="/present"><Button className="air-button big"><Presentation /> Open presentation mode <ArrowRight /></Button></Link></div></section><section className="trainer-library py-16"><div className="container">{error ? <QueryError message={error.message} retry={() => refetch()} /> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{isLoading ? Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-64 animate-pulse rounded-3xl bg-black/5" />) : resources.map(resource => { const Icon = icons[resource.type]; return <Link key={resource.id} href={`/trainers/${resource.slug}`} className="trainer-card group"><Icon className="size-6 text-[var(--go)]" /><p className="eyebrow mt-10">{resource.type.replace("_", " ")}</p><h2 className="display mt-3 text-4xl">{resource.title}</h2><p className="mt-4 text-sm leading-7 text-mist">{resource.summary}</p><ArrowRight className="mt-8 size-5 transition-transform group-hover:translate-x-1" /></Link>; })}</div>}</div></section></AuthGate></PublicShell>;
}
