import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/PublicShell";
import { CONTACT, EVENT_INTRO, PARTNER, SITE } from "@/content/siteCopy";
import { ArrowUpRight, Check, Globe, Handshake } from "lucide-react";

const external = { target: "_blank", rel: "noreferrer" } as const;

export default function Partner() {
  return (
    <PublicShell>
      <section className="page-hero">
        <div className="container py-20 sm:py-28">
          <p className="eyebrow">{PARTNER.eyebrow}</p>
          <h1 className="display mt-5 max-w-5xl text-7xl leading-[.88] sm:text-8xl lg:text-[9rem]">{PARTNER.title[0]}<br /><em>{PARTNER.title[1]}</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">{PARTNER.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={SITE.contactUrl} {...external}><Button className="air-button big">{PARTNER.become} <ArrowUpRight /></Button></a>
            <a href={SITE.contactUrl} {...external}><Button variant="outline" className="air-button secondary big">{PARTNER.request} <ArrowUpRight /></Button></a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-20 lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><Handshake className="size-8 text-[var(--go)]" aria-hidden="true" /><h2 className="display mt-6 text-5xl sm:text-6xl">{PARTNER.listLabel}</h2></div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {PARTNER.opportunities.map(item => <li key={item} className="flex gap-3 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-raised)] p-4 text-sm font-semibold leading-6"><Check className="mt-1 size-4 shrink-0 text-[var(--go)]" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--deep)] py-20 text-white lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow">{EVENT_INTRO.eyebrow}</p><h2 className="display mt-4 text-5xl sm:text-6xl">Welcome<br />to AiR.</h2></div>
          <blockquote className="max-w-2xl border-l-2 border-[var(--spark)] pl-6">
            {EVENT_INTRO.lines.slice(1).map(line => <p key={line} className="text-xl leading-9 [&+p]:mt-4">{line}</p>)}
          </blockquote>
        </div>
      </section>

      <section className="community-band scroll-mt-24" id="contact">
        <div className="container grid gap-10 py-20 text-[var(--deep)] lg:grid-cols-[1fr_1fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow dark">{CONTACT.eyebrow}</p>
            <h2 className="display mt-4 text-6xl sm:text-8xl">{CONTACT.title[0]}<br />{CONTACT.title[1]}</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--deep-soft)]">{CONTACT.intro}</p>
          </div>
          <div className="grid gap-4">
            <a href={SITE.websiteUrl} className="flex items-center justify-between rounded-2xl border border-[var(--deep)]/20 bg-white/40 p-5 font-bold"><span className="flex items-center gap-3"><Globe className="size-5" aria-hidden="true" /> Website</span><span>{SITE.domain}</span></a>
            <a href={SITE.partnerUrl} {...external} className="flex items-center justify-between rounded-2xl border border-[var(--deep)]/20 bg-white/40 p-5 font-bold"><span className="flex items-center gap-3"><Handshake className="size-5" aria-hidden="true" /> Community partner</span><span>{SITE.partnerName} <ArrowUpRight className="inline size-4" /></span></a>
            <a href={SITE.contactUrl} {...external}><Button className="big w-full bg-[var(--deep)] text-white hover:bg-[var(--ink)]">{CONTACT.cta} <ArrowUpRight /></Button></a>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
