import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Onboarding() {
  const [, navigate] = useLocation();
  const { data: catalog = [] } = trpc.catalog.list.useQuery();
  const [displayName, setDisplayName] = useState("");
  const [publicRole, setPublicRole] = useState<"learner" | "parent" | "educator" | "creator" | "community_leader">("learner");
  const [mode, setMode] = useState<"explore" | "create" | "build">("explore");
  const [pathSlug, setPathSlug] = useState("clear");
  const [safety, setSafety] = useState(false);
  const update = trpc.profile.update.useMutation();
  const enroll = trpc.learning.enroll.useMutation();

  async function finish() {
    if (!safety) return toast.error("Please read and accept the community privacy promise.");
    try {
      await update.mutateAsync({ displayName, publicRole, learningMode: mode, currentPathSlug: pathSlug, safetyAcknowledged: true, onboardingComplete: true });
      await enroll.mutateAsync({ pathSlug, mode });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not save your start.");
    }
  }

  return <PublicShell><AuthGate>
    <section className="onboarding-shell"><div className="container grid gap-10 py-16 lg:grid-cols-[.75fr_1.25fr] lg:py-24">
      <div><p className="eyebrow">Your first move</p><h1 className="display mt-4 text-7xl leading-[.88] sm:text-8xl">Make AiR<br /><em>yours.</em></h1><p className="mt-6 max-w-md text-base leading-7 text-mist">No placement test. No age gate. Choose the kind of support you want today—you can switch anytime.</p></div>
      <div className="form-panel">
        <div><Label htmlFor="displayName">What should the community call you?</Label><Input id="displayName" value={displayName} onChange={event => setDisplayName(event.target.value)} placeholder="A short display name" className="air-input mt-2" /><p className="mt-2 text-xs text-mist">Use a nickname or short display name. Do not include your full name, school, or location.</p></div>
        <div className="grid gap-5 sm:grid-cols-2"><div><Label>I am here as a…</Label><Select value={publicRole} onValueChange={value => setPublicRole(value as typeof publicRole)}><SelectTrigger className="air-input mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="learner">Learner</SelectItem><SelectItem value="parent">Parent / caregiver</SelectItem><SelectItem value="educator">Educator</SelectItem><SelectItem value="creator">Creator</SelectItem><SelectItem value="community_leader">Community leader</SelectItem></SelectContent></Select></div><div><Label>Start me in…</Label><Select value={mode} onValueChange={value => setMode(value as typeof mode)}><SelectTrigger className="air-input mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="explore">Explore · more guidance</SelectItem><SelectItem value="create">Create · a real project</SelectItem><SelectItem value="build">Build · go deeper</SelectItem></SelectContent></Select></div></div>
        <div><Label>Choose your first path</Label><div className="mt-3 grid gap-2 sm:grid-cols-2">{catalog.map(path => <button key={path.id} onClick={() => setPathSlug(path.slug)} className={`choice-card ${pathSlug === path.slug ? "selected" : ""}`}><span>{path.number}</span><b>{path.title}</b><small>{path.kicker}</small></button>)}</div></div>
        <label className="safety-box"><Checkbox checked={safety} onCheckedChange={value => setSafety(value === true)} /><ShieldCheck className="size-5 shrink-0 text-[var(--go)]" /><span>I will keep private details private and help make the community kind, useful, and safe.</span></label>
        <Button disabled={!displayName.trim() || update.isPending || enroll.isPending} onClick={finish} className="air-button big w-full">Start my path <ArrowRight /></Button>
      </div>
    </div></section>
  </AuthGate></PublicShell>;
}
