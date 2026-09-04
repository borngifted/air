import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

type PathCardProps = {
  path: {
    slug: string;
    number: string;
    title: string;
    kicker: string;
    summary: string;
    promise: string;
    accent: string;
    modules: Array<{ lessons: unknown[] }>;
  };
};

export function PathCard({ path }: PathCardProps) {
  const lessonCount = path.modules.reduce((total, module) => total + module.lessons.length, 0);
  return (
    <Link href={`/paths/${path.slug}`} className="path-card group" style={{ "--path-accent": path.accent } as React.CSSProperties}>
      <div className="flex items-start justify-between gap-5">
        <span className="path-number">{path.number}</span>
        <ArrowUpRight className="size-6 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
      <div className="mt-14">
        <p className="eyebrow">{path.kicker}</p>
        <h3 className="display mt-3 text-5xl sm:text-6xl">{path.title}</h3>
        <p className="mt-5 max-w-sm text-sm leading-7 text-mist">{path.summary}</p>
      </div>
      <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-[11px] font-bold uppercase tracking-[.14em]">
        <span>{lessonCount} moves</span><span>Start path</span>
      </div>
    </Link>
  );
}
