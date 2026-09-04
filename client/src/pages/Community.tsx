import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { QueryError } from "@/components/QueryError";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Compass, Eye, Flag, Hammer, Lightbulb, MessageCircle, PartyPopper, Plus, Presentation, ShieldCheck, Sparkles, Trophy, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const channelIcons = { compass: Compass, flag: Flag, spark: Sparkles, eye: Eye, hammer: Hammer, trophy: Trophy, presentation: Presentation } as const;
const reactionOptions = [
  { kind: "support" as const, label: "This helps", symbol: "↗" },
  { kind: "insight" as const, label: "Good idea", symbol: "✦" },
  { kind: "celebrate" as const, label: "Celebrate", symbol: "●" },
  { kind: "curious" as const, label: "I wonder", symbol: "?" },
];

export default function Community() {
  const params = new URLSearchParams(window.location.search);
  const linkedLessonId = Number(params.get("lessonId")) || undefined;
  const channelSlug = params.get("channel");
  const utils = trpc.useUtils();
  const { data: channels = [], isLoading: channelsLoading } = trpc.community.channels.useQuery();
  const { data: members = [] } = trpc.community.members.useQuery();
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [open, setOpen] = useState(Boolean(linkedLessonId));
  const [category, setCategory] = useState<"practice" | "question" | "reflection" | "win">("reflection");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!channels.length || selectedChannel) return;
    const requested = channels.find(channel => channel.slug === channelSlug);
    setSelectedChannel(requested?.id ?? channels[0]!.id);
  }, [channelSlug, channels, selectedChannel]);

  const listInput = useMemo(() => ({ lessonId: linkedLessonId, channelId: selectedChannel || undefined }), [linkedLessonId, selectedChannel]);
  const { data: posts = [], isLoading, error, refetch } = trpc.community.list.useQuery(listInput, { enabled: Boolean(selectedChannel) });
  const activeChannel = channels.find(channel => channel.id === selectedChannel);

  const create = trpc.community.create.useMutation({ onSuccess: async () => { setOpen(false); setTitle(""); setBody(""); await utils.community.list.invalidate(); await utils.community.channels.invalidate(); toast.success("Your post is in the community."); } });
  const react = trpc.community.react.useMutation({ onSuccess: async () => { await utils.community.list.invalidate(); } });

  return <PublicShell><AuthGate>
    <section className="community-hero"><div className="container py-12 sm:py-18"><div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end"><div><p className="eyebrow">The AiR community</p><h1 className="display mt-4 text-7xl leading-[.88] sm:text-8xl">Learn<br /><em>together.</em></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-mist">Pick a room. Share what you tried. Help someone make their next move.</p></div><div className="safety-callout"><ShieldCheck className="size-6 shrink-0 text-[var(--go)]" /><p><b>Keep private things private.</b> Do not share your full name, school, location, phone number, schedule, password, or private links.</p></div></div></div></section>
    <section className="community-hub"><div className="community-layout">
      <aside className="channel-rail"><div className="channel-brand"><Sparkles className="size-5" /><div><b>AiR Rooms</b><small>Learn and make together</small></div></div><p className="channel-label">Pick a room</p>{channelsLoading ? <div className="h-40 animate-pulse rounded-xl bg-black/5" /> : <nav aria-label="Community rooms" className="channel-list">{channels.map(channel => { const Icon = channelIcons[channel.icon as keyof typeof channelIcons] ?? MessageCircle; return <button key={channel.id} onClick={() => setSelectedChannel(channel.id)} className={`channel-button ${selectedChannel === channel.id ? "active" : ""}`}><Icon className="size-4" /><span><b>{channel.name}</b><small>{Number(channel.postCount)} posts</small></span></button>; })}</nav>}<div className="community-promise"><ShieldCheck className="size-5 text-[var(--go)]" /><b>People before popularity.</b><p>No follower counts. No public rankings. Helping people matters here.</p></div></aside>

      <main className="feed-column"><header className="feed-header"><div><p className="eyebrow">#{activeChannel?.slug ?? "community"}</p><h2 className="display mt-2 text-5xl">{activeChannel?.name ?? "Community"}</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-mist">{activeChannel?.description}</p></div><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button className="air-button"><Plus /> New post</Button></DialogTrigger><DialogContent className="border-[var(--hairline)] bg-[var(--surface-raised)] text-[var(--foreground)]"><DialogHeader><DialogTitle className="display text-4xl">Post to #{activeChannel?.slug}</DialogTitle></DialogHeader><div className="grid gap-4"><Select value={category} onValueChange={value => setCategory(value as typeof category)}><SelectTrigger className="air-input"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="practice">What I tried</SelectItem><SelectItem value="question">Question</SelectItem><SelectItem value="reflection">What changed</SelectItem><SelectItem value="win">A useful win</SelectItem></SelectContent></Select><Input value={title} onChange={event => setTitle(event.target.value)} className="air-input" placeholder="A clear title" /><Textarea value={body} onChange={event => setBody(event.target.value)} className="air-textarea min-h-40" placeholder="I tried… I noticed… I changed… My next move is…" /><Button disabled={!selectedChannel || !title.trim() || !body.trim() || create.isPending} onClick={() => create.mutate({ channelId: selectedChannel, lessonId: linkedLessonId, category, title, body })} className="air-button">Publish post</Button></div></DialogContent></Dialog></header>
        <div className="feed-stream">{error ? <QueryError message={error.message} retry={() => refetch()} /> : isLoading ? <div className="h-64 animate-pulse rounded-3xl bg-black/5" /> : posts.length ? posts.map(post => <article key={post.id} className="social-post"><header><Link href={`/members/${post.authorId}`} className="member-avatar">{(post.authorName || "A").slice(0,1).toUpperCase()}</Link><div><Link href={`/members/${post.authorId}`} className="font-extrabold">{post.authorName || "AiR member"}</Link><p className="text-xs text-mist">{post.authorRole.replace("_", " ")} · {new Date(post.createdAt).toLocaleDateString()}</p></div><span className="post-category ml-auto">{post.category}</span></header><Link href={`/community/${post.id}`}><h3 className="mt-5 text-2xl font-extrabold leading-tight">{post.title}</h3><p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-7 text-mist">{post.body}</p>{post.lessonTitle && <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[var(--go)]"><Lightbulb className="size-4" /> {post.lessonTitle}</p>}</Link><footer><div className="reaction-row">{reactionOptions.map(option => { const count = Number(post[`${option.kind}Count` as "supportCount"] ?? 0); return <button key={option.kind} onClick={() => react.mutate({ targetType: "post", targetId: post.id, kind: option.kind })} aria-label={`${option.label}: ${count}`}><span>{option.symbol}</span>{count > 0 && <b>{count}</b>}</button>; })}</div><Link href={`/community/${post.id}`} className="comment-link"><MessageCircle className="size-4" /> {Number(post.commentCount)} replies <ArrowRight className="size-4" /></Link></footer></article>) : <div className="empty-community"><MessageCircle className="size-8 text-[var(--go)]" /><h2 className="display mt-6 text-5xl">Open the conversation.</h2><p className="mt-3 max-w-md text-sm leading-7 text-mist">Be the first to share a real attempt, an honest question, or a useful change in this room.</p></div>}</div>
      </main>

      <aside className="member-rail"><p className="channel-label">People here lately</p><div className="member-list">{members.map(member => <Link key={member.id} href={`/members/${member.id}`} className="member-row"><span className="member-avatar small">{(member.displayName || "A").slice(0,1).toUpperCase()}</span><span><b>{member.displayName || "AiR member"}</b><small>{member.publicRole.replace("_", " ")}</small></span><i aria-label="Here lately" /></Link>)}</div><div className="field-note"><Users className="size-5 text-[var(--spark)]" /><p className="eyebrow mt-4">Try these words</p><h3 className="display mt-2 text-3xl">Help someone build.</h3><p className="mt-3 text-sm leading-7 text-mist">I noticed… I wondered… One idea to try…</p></div></aside>
    </div></section>
  </AuthGate></PublicShell>;
}
