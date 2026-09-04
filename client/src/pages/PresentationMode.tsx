import { AuthGate } from "@/components/AuthGate";
import { CameraStudio, type HandPosition } from "@/components/CameraStudio";
import { QueryError } from "@/components/QueryError";
import { AirMark } from "@/components/AirMark";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowRight, Camera, Expand, Eye, EyeOff, Home, Pause, Play, RotateCcw, Timer, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { clampPresentationIndex, formatPresentationTime, sceneFromHandX } from "@shared/presentation";

type Scene = { number: string; kicker: string; title: string; line: string; notes: string; prompt: string; accent: string };

export default function PresentationMode() {
  const { data: catalog = [], isLoading, error, refetch } = trpc.catalog.list.useQuery();
  const scenes = useMemo<Scene[]>(() => [{ number: "00", kicker: "AiR · AI Readiness", title: "Clear the air. Make one move.", line: "Use the buttons, arrow keys, or your hand to show each teaching step.", notes: "Welcome the group. Explain that AiR helps people think and make with AI. Ask each person to name one useful change they want to make for someone.", prompt: "What do you want to make better for one person?", accent: "#d8ff45" }, ...catalog.flatMap(path => path.modules.flatMap(module => module.lessons.map(lesson => ({ number: lesson.number, kicker: `${path.title} · ${lesson.kicker}`, title: lesson.bigIdea, line: lesson.summary, notes: lesson.story, prompt: lesson.discussionPrompt, accent: path.accent }))))], [catalog]);
  const [current, setCurrent] = useState(0);
  const [notesOpen, setNotesOpen] = useState(() => window.innerWidth > 720);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const lastHandScene = useRef(-1);
  const total = scenes.length;
  const scene = scenes[current] ?? scenes[0];

  const go = useCallback((index: number) => setCurrent(clampPresentationIndex(index, total)), [total]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.matches("input,textarea,[contenteditable=true]")) return;
      if (event.key === "ArrowRight" || event.key === " ") { go(current + 1); event.preventDefault(); }
      else if (event.key === "ArrowLeft") { go(current - 1); event.preventDefault(); }
      else if (event.key === "Home" || event.key === "0") go(0);
      else if (event.key.toLowerCase() === "n") setNotesOpen(value => !value);
      else if (event.key.toLowerCase() === "c") setCameraOpen(value => !value);
      else if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
      else if (event.key === "Escape" && document.fullscreenElement) document.exitFullscreen?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => setSeconds(value => {
      if (value <= 1) { setTimerRunning(false); return 0; }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const handMove = useCallback((position: HandPosition) => {
    if (!position.visible || total < 2) return;
    const target = sceneFromHandX(position.x, total);
    if (target !== lastHandScene.current) { lastHandScene.current = target; go(target); }
  }, [go, total]);

  if (error) return <div className="presentation-loading"><QueryError message={error.message} retry={() => refetch()} /></div>;
  if (isLoading || !scene) return <div className="presentation-loading"><span className="presentation-pulse" /> Loading the live room…</div>;

  return <AuthGate message="Sign in to open AiR presentation mode."><main className="presentation-shell" style={{ "--scene-accent": scene.accent } as React.CSSProperties}>
    <header className="presentation-topbar"><Link href="/trainers" className="presentation-exit"><X className="size-4" /> Exit presentation</Link><div className="presentation-actions"><button onClick={() => setNotesOpen(value => !value)}>{notesOpen ? <EyeOff /> : <Eye />} <span>{notesOpen ? "Hide" : "Show"} notes</span></button><button onClick={() => setCameraOpen(value => !value)} className={cameraOpen ? "active" : ""}><Camera /> <span>Hand camera</span></button><button onClick={() => document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()}><Expand /> <span>Fullscreen</span></button></div></header>
    <section className="presentation-stage" onDoubleClick={() => go(current + 1)}>
      <div className="presentation-mark-crop" aria-hidden="true"><AirMark /></div>
      <div className="presentation-scene"><div className="presentation-index">{scene.number}</div><div><p className="presentation-kicker">{scene.kicker}</p><h1 className="display">{scene.title}</h1><p className="presentation-line">{scene.line}</p><div className="presentation-prompt"><span>Ask the room</span><p>{scene.prompt}</p></div></div></div>
      <button className="stage-zone previous" onClick={() => go(current - 1)} aria-label="Previous scene"><ArrowLeft /></button><button className="stage-zone next" onClick={() => go(current + 1)} aria-label="Next scene"><ArrowRight /></button>
    </section>
    <footer className="presentation-controls"><button onClick={() => go(0)} aria-label="Return to opening"><Home /></button><button onClick={() => go(current - 1)} disabled={current === 0}><ArrowLeft /></button><div className="presentation-track"><div className="presentation-stops">{scenes.map((item, index) => <button key={`${item.number}-${index}`} className={index <= current ? "past" : ""} onClick={() => go(index)} aria-label={`Go to ${item.kicker}`} />)}</div><input aria-label="Presentation scene" type="range" min="0" max={total - 1} value={current} onChange={event => go(Number(event.target.value))} /></div><span className="presentation-count">{String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><button onClick={() => go(current + 1)} disabled={current === total - 1}><ArrowRight /></button></footer>
    {notesOpen && <aside className="speaker-console"><div className="speaker-console-head"><div><p className="eyebrow">Speaker notes</p><h2 className="display">Lead the move.</h2></div><button onClick={() => setNotesOpen(false)} aria-label="Close notes"><X /></button></div><p className="speaker-notes">{scene.notes}</p><div className="activity-timer"><Timer className="size-5" /><div><small>Activity timer</small><b>{formatPresentationTime(seconds)}</b></div><button onClick={() => setTimerRunning(value => !value)} aria-label={timerRunning ? "Pause timer" : "Start timer"}>{timerRunning ? <Pause /> : <Play />}</button><button onClick={() => { setSeconds(300); setTimerRunning(false); }} aria-label="Reset timer"><RotateCcw /></button></div><p className="speaker-shortcuts">← / → move · Space next · N notes · C camera · F fullscreen</p></aside>}
    {cameraOpen && <aside className="presentation-camera"><div className="presentation-camera-head"><div><p className="eyebrow">Hands on</p><b>Move through the lesson with your hand</b></div><button onClick={() => setCameraOpen(false)}><X /></button></div><CameraStudio conductor onHandMove={handMove} /></aside>}
  </main></AuthGate>;
}
