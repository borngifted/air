import { YET } from "@/content/siteCopy";
import { useState } from "react";

// Growth mindset in one tap: a fixed sentence becomes a "not yet" sentence.
// Keyboard reachable (buttons), state announced through aria-pressed and a live region.
export function YetToggle() {
  const [flipped, setFlipped] = useState<boolean[]>(() => YET.statements.map(() => false));
  const [announce, setAnnounce] = useState("");
  const count = flipped.filter(Boolean).length;

  function flip(index: number) {
    setFlipped(current => current.map((value, i) => (i === index ? !value : value)));
    const next = !flipped[index];
    setAnnounce(next ? YET.statements[index].growth : YET.statements[index].fixed);
  }

  return (
    <div className="yet-module">
      <p className="eyebrow">{YET.eyebrow}</p>
      <h3 className="display mt-3 text-4xl">{YET.title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-mist">{YET.intro}</p>
      <div className="yet-grid">
        {YET.statements.map((statement, index) => {
          const on = flipped[index];
          return (
            <button key={statement.fixed} type="button" className={`yet-card ${on ? "growth" : ""}`} aria-pressed={on} onClick={() => flip(index)}>
              <span className="yet-label">{on ? "Growth" : "Fixed"}</span>
              <span className="yet-text">{on ? highlightYet(statement.growth) : statement.fixed}</span>
            </button>
          );
        })}
      </div>
      <p className="yet-note">{count === YET.statements.length ? YET.note : `${count} of ${YET.statements.length} flipped. Tap the rest.`}</p>
      <span className="sr-only" aria-live="polite">{announce}</span>
    </div>
  );
}

function highlightYet(sentence: string) {
  const parts = sentence.split(/(\byet\b)/i);
  return parts.map((part, index) => (/^yet$/i.test(part) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>));
}
