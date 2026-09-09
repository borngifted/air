import { AirMark } from "./AirMark";
import { FOOTER, SITE } from "@/content/siteCopy";
import { Link } from "wouter";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/10 bg-black py-12 text-white">
      <div className="container grid gap-10 md:grid-cols-[1.4fr_.6fr_.6fr]">
        <div>
          <AirMark className="site-footer-logo h-12 w-auto" />
          <p className="display mt-5 text-2xl">{FOOTER.tagline}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-mist">{FOOTER.line}</p>
          <p className="mt-3 text-sm leading-7 text-mist">{FOOTER.partnership} <a href={SITE.partnerUrl} target="_blank" rel="noreferrer" className="font-bold text-white underline-offset-4 hover:underline">{SITE.partnerName}</a></p>
        </div>
        <div>
          <p className="eyebrow mb-4">Move</p>
          <div className="grid gap-2 text-sm text-mist">
            {FOOTER.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">More</p>
          <div className="grid gap-2 text-sm text-mist">
            <Link href="/for">Who AiR is for</Link>
            <Link href="/community">Community</Link>
            <Link href="/trainers">Trainer knowledge base</Link>
            <Link href="/#faq">Questions</Link>
          </div>
        </div>
      </div>
      <div className="container mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[.16em] text-mist">
        <span>{FOOTER.name}</span><span>{FOOTER.copyright}</span>
      </div>
    </footer>
  );
}
