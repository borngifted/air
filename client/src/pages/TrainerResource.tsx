import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Streamdown } from "streamdown";
import { Link } from "wouter";
import { QueryError } from "@/components/QueryError";

export default function TrainerResource({ slug }: { slug: string }) {
  const { data: resource, isLoading, error, refetch } = trpc.trainer.detail.useQuery({ slug });
  return <PublicShell><AuthGate message="Sign in to open facilitator guides and trainer resources."><section className="bg-[var(--paper)] py-14 text-[var(--deep)] sm:py-20"><div className="container max-w-4xl"><Link href="/trainers" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em]"><ArrowLeft className="size-4" /> Knowledge base</Link>{error ? <div className="mt-8"><QueryError message={error.message} retry={() => refetch()} /></div> : isLoading ? <div className="mt-8 h-96 animate-pulse rounded-3xl bg-[var(--deep)]/5" /> : resource ? <article className="trainer-document"><p className="eyebrow dark">{resource.type.replace("_", " ")}</p><h1 className="display mt-4 text-6xl leading-[.92] sm:text-8xl">{resource.title}</h1><p className="mt-6 text-lg leading-8 text-[var(--deep-soft)]">{resource.summary}</p>{resource.sourceUrl && <a className="mt-6 inline-flex items-center gap-2 text-sm font-bold" href={resource.sourceUrl} target="_blank" rel="noreferrer">Open source <ExternalLink className="size-4" /></a>}<div className="prose prose-lg mt-12 max-w-none prose-headings:font-['Barlow_Condensed'] prose-headings:uppercase prose-p:text-[var(--deep-soft)]"><Streamdown>{resource.body}</Streamdown></div></article> : <h1 className="display mt-8 text-6xl">Resource not found.</h1>}</div></section></AuthGate></PublicShell>;
}
