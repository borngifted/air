import { ROOM } from "@/content/siteCopy";
import { useState } from "react";

// The room is the interface: put each statement on a wall. Saved on this
// device only, so a return visit can place them again and see what moved.
type WallId = (typeof ROOM.walls)[number]["id"];
type Placement = Partial<Record<string, WallId>>;
type Snapshot = { placement: Placement; at: string };
const KEY = "air-walls-v1";

function readSnapshots(): Snapshot[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Snapshot[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSnapshots(snapshots: Snapshot[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(snapshots.slice(-10)));
  } catch {
    // Storage unavailable; the wall still works for this visit.
  }
}

export function RoomWalls() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => readSnapshots());
  const last = snapshots[snapshots.length - 1];
  const [placement, setPlacement] = useState<Placement>({});
  const [saved, setSaved] = useState(false);
  const [index, setIndex] = useState(0);
  const statement = ROOM.statements[index];
  const done = index >= ROOM.statements.length;

  function place(wall: WallId) {
    const next = { ...placement, [statement]: wall };
    setPlacement(next);
    const nextIndex = index + 1;
    setIndex(nextIndex);
    if (nextIndex >= ROOM.statements.length) {
      const snapshot = { placement: next, at: new Date().toISOString() };
      const all = [...snapshots, snapshot];
      setSnapshots(all);
      writeSnapshots(all);
      setSaved(true);
    }
  }

  function replay() {
    setPlacement({});
    setIndex(0);
    setSaved(false);
  }

  const previous = saved ? snapshots[snapshots.length - 2] : last;
  const moved = saved && previous ? ROOM.statements.filter(item => previous.placement[item] && previous.placement[item] !== placement[item]).length : 0;

  return (
    <div className="room" aria-live="polite">
      <div className="room-walls">
        {ROOM.walls.map(wall => {
          const here = ROOM.statements.filter(item => placement[item] === wall.id);
          return (
            <div key={wall.id} className="room-wall">
              <button type="button" className="room-wall-label display" onClick={() => (done ? undefined : place(wall.id))} disabled={done} aria-label={done ? wall.label : `Put “${statement}” on the wall: ${wall.label}`}>{wall.label}</button>
              <ul className="room-cards">
                {here.map(item => <li key={item} className={previous && previous.placement[item] && previous.placement[item] !== wall.id ? "moved" : ""}>{item}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="room-deck">
        {!done ? (
          <>
            <p className="eyebrow">Statement {index + 1} of {ROOM.statements.length}</p>
            <p className="room-statement display">“{statement}”</p>
            <p className="text-sm text-mist">{ROOM.instruction}</p>
          </>
        ) : (
          <>
            <p className="eyebrow">{previous ? ROOM.compare : "Photographed"}</p>
            <p className="room-statement display">{previous ? ROOM.movedCount(moved) : "The room is your dataset."}</p>
            <p className="text-sm text-mist">{ROOM.saved}</p>
            <button type="button" className="text-link mt-3" onClick={replay}>{ROOM.replay} →</button>
          </>
        )}
      </div>
    </div>
  );
}
