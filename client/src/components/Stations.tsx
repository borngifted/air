import { STATIONS as HERO } from "@/content/siteCopy";
import { useEffect, useRef, useState } from "react";

// The first situation on the site: three stations, ten seconds, choose.
// The choice is saved on this device so the next visit can ask again and
// show whether it moved. Nothing is sent anywhere.
type StationId = (typeof HERO.stations)[number]["id"];
type Record = { station: StationId; at: string };
const KEY = "air-stations-v1";

function readHistory(): Record[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Record[]) : [];
    return Array.isArray(parsed) ? parsed.filter(item => HERO.stations.some(station => station.id === item.station)) : [];
  } catch {
    return [];
  }
}

function writeHistory(history: Record[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(history.slice(-20)));
  } catch {
    // Storage can be unavailable. The situation still runs.
  }
}

const SECONDS = 10;

export function Stations() {
  const [history, setHistory] = useState<Record[]>(() => readHistory());
  const [phase, setPhase] = useState<"choose" | "chosen" | "timeup">("choose");
  const [left, setLeft] = useState(SECONDS);
  const timer = useRef<number | null>(null);
  const previous = history[history.length - 1];
  const current = phase === "chosen" ? history[history.length - 1] : undefined;
  const before = phase === "chosen" ? history[history.length - 2] : previous;

  useEffect(() => {
    if (phase !== "choose") return;
    setLeft(SECONDS);
    timer.current = window.setInterval(() => {
      setLeft(value => {
        if (value <= 1) {
          if (timer.current) window.clearInterval(timer.current);
          setPhase("timeup");
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [phase]);

  function choose(station: StationId) {
    const next = [...history, { station, at: new Date().toISOString() }];
    setHistory(next);
    writeHistory(next);
    setPhase("chosen");
  }

  const label = (id: StationId | undefined) => HERO.stations.find(station => station.id === id)?.title ?? "";

  return (
    <div className="stations" aria-live="polite">
      <div className="stations-head">
        <p className="stations-prompt display">{phase === "timeup" ? HERO.timeUp : HERO.prompt}</p>
        {phase === "choose" ? <span className="stations-clock" aria-label={`${left} seconds left`}>{left}</span> : null}
      </div>
      {phase === "choose" && before ? <p className="stations-note">{HERO.returning(label(before.station))}</p> : null}
      <p className="stations-challenge">{HERO.challenge}</p>
      <div className="stations-grid" role="group" aria-label="Three stations">
        {HERO.stations.map((station, index) => {
          const picked = current?.station === station.id;
          const was = phase !== "choose" && before?.station === station.id && !picked;
          return (
            <button key={station.id} type="button" className={`station ${picked ? "picked" : ""} ${was ? "was" : ""}`} onClick={() => (phase === "chosen" ? undefined : choose(station.id))} disabled={phase === "chosen"} aria-pressed={picked}>
              <span>0{index + 1}</span>
              <b>{station.title}</b>
              <small>{station.line}</small>
              {picked ? <i>You</i> : was ? <i>Last time</i> : null}
            </button>
          );
        })}
      </div>
      {phase !== "choose" ? (
        <div className="stations-after">
          {phase === "chosen" ? (
            <>
              <b>{HERO.afterChoice}</b>
              <p>{before ? (before.station === current?.station ? HERO.same : HERO.moved) : HERO.afterChoiceBody}</p>
            </>
          ) : <p>{HERO.afterChoiceBody}</p>}
          <button type="button" className="text-link" onClick={() => setPhase("choose")}>{HERO.again} →</button>
        </div>
      ) : null}
    </div>
  );
}
