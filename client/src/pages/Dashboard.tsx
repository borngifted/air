import { useAuth } from "@/_core/hooks/useAuth";
import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Camera, CircleCheck, Compass, MessageSquareText } from "lucide-react";
import { Link } from "wouter";
import { calculateCompletion, nextLessonId } from "@shared/learning";
import { QueryError } from "@/components/QueryError";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = trpc.learning.dashboard.useQuery(undefined, { enabled: Boolean(user) });
  if (error) return <PublicShell><AuthGate><div className="container py-24"><QueryError message={error.message} retry={() => refetch()} /></div></AuthGate></PublicShell>;
  if (isLoading || !data) return <PublicShell><div className="container py-24"><div className="h-72 animate-pulse rounded-[2rem] bg-white/5" /></div></PublicShell>;
  const lessons = data.catalog.flatMap(path => path.modules.flatMap(module => module.lessons));
  const completed = data.progress.filter(item => item.status === "completed").length;
  const resumeLessonId = nextLessonId(lessons.map(lesson => lesson.id), data.progress);
  const currentLesson = lessons.find(lesson => lesson.id === resumeLessonId) ?? lessons[0];
  const completion = calculateCompletion(completed, lessons.length);

  return <PublicShell><AuthGate>
    <section className="dashboard-hero"><div className="container py-16 sm:py-20"><p className="eyebrow">Your AiR</p><div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><h1 className="display text-7xl sm:text-8xl">Keep moving,<br /><em>{user?.displayName || user?.name?.split(" ")[0] || "maker"}.</em></h1><p className="mt-5 text-mist">One clear move is enough for today.</p></div>{!user?.onboardingComplete && <Link href="/onboarding"><Button className="air-button">Finish your setup <ArrowRight /></Button></Link>}</div></div></section>
    <section className="dashboard-body py-12 sm:py-16"><div className="container grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
      <div className="dashboard-card feature"><p className="eyebrow">Continue your move</p>{currentLesson ? <><h2 className="display mt-4 text-5xl sm:text-6xl">{currentLesson.title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-mist">{currentLesson.summary}</p><div className="mt-8 flex flex-wrap items-center gap-3"><Link href={`/learn/${currentLesson.slug}`}><Button className="air-button big">Open lesson <ArrowRight /></Button></Link><Link href="/studio"><Button variant="outline" className="member-button big"><Camera /> Show your work</Button></Link><span className="text-xs font-bold uppercase tracking-[.12em] text-mist">{currentLesson.durationMinutes} min</span></div></> : <p className="mt-4 text-mist">Choose a path to begin.</p>}</div>
      <div className="dashboard-card"><div className="flex items-center justify-between"><p className="eyebrow">Progress</p><CircleCheck className="size-5 text-[var(--go)]" /></div><div className="mt-8 flex items-end gap-2"><span className="display text-7xl">{completed}</span><span className="mb-3 text-xs uppercase tracking-[.12em] text-mist">of {lessons.length} moves</span></div><Progress value={completion} className="mt-4 h-2" /><p className="mt-3 text-xs text-mist">Progress is private. It is here to help you resume—not compare.</p></div>
      <div className="dashboard-card lg:col-span-2"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="eyebrow">Your paths</p><h2 className="display mt-3 text-4xl">Move by move.</h2></div><Link href="/curriculum" className="text-link">Explore every path <ArrowRight className="size-4" /></Link></div><div className="mt-8 grid gap-3 md:grid-cols-2">{data.catalog.map(path => { const pathLessons = path.modules.flatMap(module => module.lessons); const done = pathLessons.filter(lesson => data.progress.some(item => item.lessonId === lesson.id && item.status === "completed")).length; return <Link key={path.id} href={`/paths/${path.slug}`} className="dashboard-path"><span className="path-number" style={{ color: path.accent }}>{path.number}</span><div><b>{path.title}</b><small>{done}/{pathLessons.length} moves complete</small></div><ArrowRight className="ml-auto size-5" /></Link>; })}</div></div>
      <Link href="/community" className="dashboard-card action-card"><MessageSquareText className="size-7 text-[var(--go)]" /><h3 className="display mt-8 text-4xl">Share the practice.</h3><p className="mt-3 text-sm leading-6 text-mist">Ask a question, show a revision, or say what surprised you.</p></Link>
      <Link href={`/members/${user?.id}`} className="dashboard-card action-card"><Compass className="size-7 text-[var(--spark)]" /><h3 className="display mt-8 text-4xl">See your journey.</h3><p className="mt-3 text-sm leading-6 text-mist">Your public profile keeps contributions visible without exposing private lesson work.</p></Link>
    </div></section>
  </AuthGate></PublicShell>;
}
