import { SEAMS } from "@/content/siteCopy";
import { useState } from "react";

type TellKey = keyof typeof SEAMS.tells;

// Judge in practice: an AI draft with three "tells". Tap one to see what an
// investigator would notice and what to do about it.
export function SeamsInspector() {
  const [active, setActive] = useState<TellKey | null>(null);
  const [seen, setSeen] = useState<TellKey[]>([]);
  const tell = active ? SEAMS.tells[active] : null;

  function pick(key: TellKey) {
    setActive(key);
    setSeen(current => (current.includes(key) ? current : [...current, key]));
  }

  return (
    <section className="seams-module" aria-label="Read the tells in an AI draft">
      <p className="eyebrow dark">{SEAMS.eyebrow}</p>
      <h2 className="display mt-3 text-4xl sm:text-5xl">{SEAMS.title[0]}<br />{SEAMS.title[1]}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--deep-soft)]">{SEAMS.intro}</p>
      <ul className="seams-signals">
        {SEAMS.signals.map(signal => <li key={signal.name}><b>{signal.name}</b><span>{signal.question}</span></li>)}
      </ul>
      <div className="seams-card">
        <p className="seams-draft">
          <span className="seams-quote">“</span>
          {SEAMS.draft.map((part, index) => part.tell ? (
            <button key={index} type="button" className={`seams-tell ${active === part.tell ? "active" : ""} ${seen.includes(part.tell as TellKey) ? "seen" : ""}`} aria-pressed={active === part.tell} onClick={() => pick(part.tell as TellKey)}>{part.text}</button>
          ) : <span key={index}>{part.text}</span>)}
          <span className="seams-quote">”</span>
        </p>
        <div className="seams-feedback" aria-live="polite">
          {tell ? (
            <>
              <p className="seams-feedback-title">{tell.title}</p>
              <p>{tell.body}</p>
              <p className="seams-action">{tell.action}</p>
            </>
          ) : <p>{SEAMS.prompt}</p>}
        </div>
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[.14em] text-[var(--deep-soft)]">{seen.length} of {Object.keys(SEAMS.tells).length} tells found</p>
    </section>
  );
}
