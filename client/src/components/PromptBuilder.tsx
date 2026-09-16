import { RELAY } from "@/content/siteCopy";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

// The Designer's structure as a fill-in. Builds the first prompt from the
// team's observations. Nothing typed here leaves the browser.
export function PromptBuilder() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const prompt = RELAY.structure.build(values);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable. The prompt is still on screen.
    }
  }

  return (
    <div className="prompt-builder">
      <p className="eyebrow">{RELAY.structure.label}</p>
      <div className="prompt-fields">
        {RELAY.structure.fields.map(field => (
          <label key={field.key}>
            <span>{field.label}</span>
            <input type="text" value={values[field.key] ?? ""} placeholder={field.placeholder} onChange={event => setValues(current => ({ ...current, [field.key]: event.target.value }))} />
          </label>
        ))}
      </div>
      <div className="prompt-output" aria-live="polite">
        <p>{prompt}</p>
        <button type="button" onClick={copy} className="text-link">{copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />} {copied ? RELAY.structure.copied : RELAY.structure.copy}</button>
      </div>
      <p className="prompt-note">{RELAY.structure.note}</p>
    </div>
  );
}
