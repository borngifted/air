import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QueryError({ title = "That move did not load.", message, retry }: { title?: string; message?: string; retry?: () => void }) {
  return <div role="alert" className="query-error"><AlertTriangle className="size-6 text-[var(--spark)]" /><div><h2 className="display text-4xl">{title}</h2><p className="mt-2 max-w-lg text-sm leading-7 text-mist">{message || "Check your connection and try once more. Your saved work has not been changed."}</p>{retry && <Button onClick={retry} className="air-button mt-5">Try again</Button>}</div></div>;
}
