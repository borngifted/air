import { useAuth } from "@/_core/hooks/useAuth";
import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AIR_ASSETS } from "@/lib/assets";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowRight, Camera, Check, MessageSquareText, Play, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { QueryError } from "@/components/QueryError";

export default function Lesson({ slug }: { slug: string }) {
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const { data, isLoading, error, refetch } = trpc.catalog.lesson.useQuery({ slug }, { enabled: isAuthenticated });
  const [mode, setMode] = useState<"explore" | "create" | "build">((user?.learningMode as "explore" | "create" | "build") || "explore");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [exerciseResponse, setExerciseResponse] = useState("");
  const [lessonFinished, setLessonFinished] = useState(false);
  const { data: catalog = [] } = trpc.catalog.list.useQuery();
  const saveCheckpoint = trpc.learning.saveCheckpoint.useMutation();
  const saveExercise = trpc.learning.saveExercise.useMutation();
  const complete = trpc.learning.completeLesson.useMutation();
  const playback = trpc.media.playback.useQuery({ id: data?.lesson.videoAssetId ?? 0 }, { enabled: Boolean(data?.lesson.videoAssetId) });

  useEffect(() => {
    if (!data) return;
    setAnswers(Object.fromEntries(data.responses.map(item => [item.checkpointId, item.response])));
    const activeExercise = data.exercises.find(item => item.mode === mode);
    setExerciseResponse(data.submissions.find(item => item.exerciseId === activeExercise?.id)?.response ?? "");
  }, [data, mode]);

  const activeExercise = useMemo(() => data?.exercises.find(item => item.mode === mode), [data, mode]);
  const lessonId = data?.lesson.id;
  if (error) return <PublicShell><AuthGate><div className="container py-24"><QueryError message={error.message} retry={() => refetch()} /></div></AuthGate></PublicShell>;
  if (isLoading || !data) return <PublicShell noFooter><AuthGate><div className="container py-24"><div className="h-[520px] animate-pulse rounded-[2rem] bg-white/5" /></div></AuthGate></PublicShell>;

  async function saveAnswer(checkpointId: number) {
    const response = answers[checkpointId]?.trim();
    if (!response) return toast.error("Add your thought before saving.");
    await saveCheckpoint.mutateAsync({ checkpointId, response, mode });
    toast.success("Move saved.");
    await utils.catalog.lesson.invalidate({ slug });
  }

  async function finishLesson() {
    if (!lessonId) return;
    if (activeExercise && exerciseResponse.trim()) await saveExercise.mutateAsync({ exerciseId: activeExercise.id, response: exerciseResponse, completed: true });
    await complete.mutateAsync({ lessonId, mode });
    setLessonFinished(true);
    toast.success("Lesson complete. Your next move is ready.");
    await utils.catalog.lesson.invalidate({ slug });
  }

  const pathLessons = catalog.find(path => path.id === data.path?.id)?.modules.flatMap(module => module.lessons) ?? [];
  const currentIndex = pathLessons.findIndex(lesson => lesson.id === data.lesson.id);
  const nextLesson = currentIndex >= 0 ? pathLessons[currentIndex + 1] : undefined;

  return <PublicShell noFooter><AuthGate>
    <div className="lesson-shell">
      <aside className="lesson-sidebar"><Link href={`/paths/${data.path?.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-mist"><ArrowLeft className="size-4" /> Back to {data.path?.title}</Link><div className="mt-10"><span className="path-number">{data.lesson.number}</span><p className="eyebrow mt-4">{data.lesson.kicker}</p><h1 className="display mt-3 text-5xl">{data.lesson.title}</h1><p className="mt-4 text-sm leading-7 text-mist">{data.lesson.summary}</p></div><div className="mt-8 grid grid-cols-3 gap-1 rounded-xl bg-black/20 p-1">{(["explore","create","build"] as const).map(item => <button key={item} onClick={() => setMode(item)} className={`mode-tab ${mode === item ? "active" : ""}`}>{item}</button>)}</div><div className="mt-8 rounded-xl border border-white/10 p-4"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-mist">Lesson status</p><p className="mt-2 font-bold capitalize">{data.progress?.status?.replace("_", " ") || "Ready to start"}</p></div></aside>
      <main className="lesson-main">
        <section className="video-stage"><video controls playsInline preload="metadata" poster={data.lesson.videoPosterUrl || AIR_ASSETS.coursePoster}><source src={playback.data?.url || AIR_ASSETS.courseVideo} type={playback.data?.mimeType || "video/mp4"} />Your browser does not support video.</video><div className="video-label"><Play className="size-4 fill-current" /> Video-led lesson · captions and transcript-ready</div></section>
        <section className="lesson-content"><div className="story-block"><p className="eyebrow dark">See it</p><h2 className="display mt-3 text-5xl">A story you already understand.</h2><p>{data.lesson.story}</p></div><div className="idea-block"><p className="eyebrow">Name it</p><blockquote>{data.lesson.bigIdea}</blockquote><p>{data.lesson.learnerPromise}</p></div>
        <div className="checkpoint-stack">{data.checkpoints.map((checkpoint, index) => <article key={checkpoint.id} className="checkpoint-card"><div className="checkpoint-head"><span>0{index + 1}</span><div><p className="eyebrow">{checkpoint.kind}</p><h3>{checkpoint.title}</h3></div>{data.responses.some(item => item.checkpointId === checkpoint.id) && <Check className="ml-auto size-5 text-[var(--go)]" />}</div><p className="mt-5 text-base leading-7">{checkpoint.prompt}</p>{checkpoint.options?.length ? <div className="mt-5 grid gap-2">{checkpoint.options.map(option => <button key={option.value} onClick={() => setAnswers(current => ({ ...current, [checkpoint.id]: option.value }))} className={`answer-option ${answers[checkpoint.id] === option.value ? "selected" : ""}`}><span>{option.label}</span>{answers[checkpoint.id] === option.value && option.feedback && <small>{option.feedback}</small>}</button>)}</div> : <Textarea className="air-textarea mt-5" value={answers[checkpoint.id] || ""} onChange={event => setAnswers(current => ({ ...current, [checkpoint.id]: event.target.value }))} placeholder="Write one clear thought…" />}<div className="mt-4 flex items-center justify-between gap-3"><p className="text-xs text-[var(--deep-soft)]">{checkpoint.helperText}</p><Button onClick={() => saveAnswer(checkpoint.id)} disabled={saveCheckpoint.isPending} size="sm" className="bg-[var(--deep)] text-white hover:bg-[var(--ink)]"><Save className="size-4" /> Save</Button></div></article>)}</div>
        {activeExercise && <section className="exercise-panel"><p className="eyebrow">Your {mode} challenge</p><h2 className="display mt-3 text-5xl">{activeExercise.title}</h2><p className="mt-4 text-lg font-semibold">{activeExercise.prompt}</p><p className="mt-3 max-w-2xl text-sm leading-7 text-mist">{activeExercise.instructions}</p><label className="mt-7 block text-xs font-bold uppercase tracking-[.14em] text-mist">{activeExercise.evidenceLabel}</label><Textarea value={exerciseResponse} onChange={event => setExerciseResponse(event.target.value)} className="mt-3 min-h-40 border-white/15 bg-black/15" placeholder="Capture what you made, noticed, or decided…" /><div className="mt-4 flex flex-wrap gap-3"><Button disabled={!exerciseResponse.trim()} onClick={() => saveExercise.mutate({ exerciseId: activeExercise.id, response: exerciseResponse, completed: false }, { onSuccess: () => toast.success("Draft saved.") })} variant="outline" className="border-white/20 bg-white/5">Save draft</Button><Link href="/studio"><Button variant="outline" className="border-white/20 bg-white/5"><Camera /> Show your work</Button></Link><Button disabled={!exerciseResponse.trim()} onClick={finishLesson} className="air-button">Complete this move <ArrowRight /></Button></div><p className="mt-4 text-xs text-mist">The camera stays on your device. AiR will not save the picture.</p></section>}
        {lessonFinished && <section className="completion-panel"><Check className="size-7" /><div><p className="eyebrow dark">Move complete</p><h2 className="display mt-2 text-4xl">{nextLesson ? "Keep the momentum." : `${data.path?.title} path complete.`}</h2><p className="mt-2 text-sm text-[var(--deep-soft)]">{nextLesson ? `Your next move is ${nextLesson.title}.` : "You finished every move in this path. Choose another path or share what changed."}</p></div>{nextLesson ? <Link href={`/learn/${nextLesson.slug}`}><Button className="bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Next lesson <ArrowRight /></Button></Link> : <Link href="/dashboard"><Button className="bg-[var(--deep)] text-white hover:bg-[var(--ink)]">See my journey <ArrowRight /></Button></Link>}</section>}
        <section className="discussion-cta"><MessageSquareText className="size-7" /><div><p className="eyebrow dark">Take it to the community</p><h2 className="display mt-2 text-4xl">What changed in your thinking?</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--deep-soft)]">{data.lesson.discussionPrompt}</p></div><Link href={`/community?lessonId=${data.lesson.id}`}><Button className="bg-[var(--deep)] text-white hover:bg-[var(--ink)]">Join discussion <ArrowRight /></Button></Link></section>
        </section>
      </main>
    </div>
  </AuthGate></PublicShell>;
}
