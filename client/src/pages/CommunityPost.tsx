import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { QueryError } from "@/components/QueryError";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Flag, MessageCircle, Reply, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const reactions = [
  { kind: "support" as const, label: "This helps", symbol: "↗", key: "supportCount" as const },
  { kind: "insight" as const, label: "Good idea", symbol: "✦", key: "insightCount" as const },
  { kind: "celebrate" as const, label: "Celebrate", symbol: "●", key: "celebrateCount" as const },
  { kind: "curious" as const, label: "I wonder", symbol: "?", key: "curiousCount" as const },
];

export default function CommunityPost({ id }: { id: number }) {
  const utils = trpc.useUtils();
  const { data: post, isLoading, error, refetch } = trpc.community.detail.useQuery({ id });
  const [reply, setReply] = useState("");
  const [replyTo, setReplyTo] = useState<number | undefined>();
  const comment = trpc.community.comment.useMutation({ onSuccess: async () => { setReply(""); setReplyTo(undefined); await utils.community.detail.invalidate({ id }); toast.success("Reply added."); } });
  const react = trpc.community.react.useMutation({ onSuccess: async () => { await utils.community.detail.invalidate({ id }); } });
  const report = trpc.community.report.useMutation({ onSuccess: () => toast.success("Thank you. A moderator can review this.") });
  if (error) return <PublicShell><AuthGate><div className="container py-24"><QueryError message={error.message} retry={() => refetch()} /></div></AuthGate></PublicShell>;
  if (isLoading || !post) return <PublicShell><AuthGate><div className="container py-24"><div className="h-64 animate-pulse rounded-3xl bg-black/5" /></div></AuthGate></PublicShell>;
  const roots = post.comments.filter(item => !item.parentId);
  return <PublicShell><AuthGate><section className="discussion-page"><div className="container max-w-5xl py-14 sm:py-20"><Link href={`/community?channel=${post.channelSlug || "start-here"}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-mist"><ArrowLeft className="size-4" /> #{post.channelSlug || "community"}</Link><article className="post-detail social-post mt-8"><header><span className="member-avatar">{(post.authorName || "A").slice(0,1).toUpperCase()}</span><div><Link href={`/members/${post.authorId}`} className="font-extrabold">{post.authorName || "AiR member"}</Link><p className="text-xs text-mist">{post.authorRole.replace("_", " ")} · {new Date(post.createdAt).toLocaleString()}</p></div><span className="post-category ml-auto">{post.category}</span></header><h1 className="mt-7 text-3xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1><p className="mt-6 whitespace-pre-wrap text-base leading-8 text-mist">{post.body}</p>{post.lessonTitle && <p className="mt-5 text-xs font-bold uppercase tracking-[.12em] text-[var(--go)]">From lesson · {post.lessonTitle}</p>}<footer><div className="reaction-row">{reactions.map(item => <button key={item.kind} onClick={() => react.mutate({ targetType: "post", targetId: post.id, kind: item.kind })}><span>{item.symbol}</span><b>{Number(post[item.key]) || ""}</b><small>{item.label}</small></button>)}</div><button onClick={() => report.mutate({ targetType: "post", targetId: post.id, reason: "Member requested moderator review" })} className="report-link"><Flag className="size-4" /> Report</button></footer></article>
      <section className="thread-section"><div className="flex items-center justify-between"><div><p className="eyebrow">Talk about it</p><h2 className="display mt-2 text-5xl">{post.comments.length} replies</h2></div><MessageCircle className="size-7 text-[var(--go)]" /></div><div className="mt-6 grid gap-3">{roots.map(item => { const children = post.comments.filter(child => child.parentId === item.id); return <div key={item.id} className="thread-group"><article className="comment-card"><header><Link href={`/members/${item.authorId}`} className="font-bold">{item.authorName || "AiR member"}</Link><span>{new Date(item.createdAt).toLocaleDateString()}</span></header><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-mist">{item.body}</p><footer><button onClick={() => { setReplyTo(item.id); setReply(""); }}><Reply className="size-4" /> Reply</button><button onClick={() => react.mutate({ targetType: "comment", targetId: item.id, kind: "support" })}>↗ {Number(item.reactionCount) || "This helps"}</button></footer></article>{children.map(child => <article key={child.id} className="comment-card nested"><header><Link href={`/members/${child.authorId}`} className="font-bold">{child.authorName || "AiR member"}</Link><span>replied</span></header><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-mist">{child.body}</p><footer><button onClick={() => react.mutate({ targetType: "comment", targetId: child.id, kind: "support" })}>↗ {Number(child.reactionCount) || "This helps"}</button></footer></article>)}</div>; })}</div><div className="reply-composer">{replyTo && <div className="reply-context">Replying to this person <button onClick={() => setReplyTo(undefined)}>Cancel</button></div>}<Textarea value={reply} onChange={event => setReply(event.target.value)} className="air-textarea min-h-28" placeholder="I noticed… I wondered… One idea to try…" /><div className="mt-3 flex justify-end"><Button disabled={!reply.trim() || comment.isPending} onClick={() => comment.mutate({ postId: id, parentId: replyTo, body: reply })} className="air-button"><Send className="size-4" /> {replyTo ? "Reply to this person" : "Add reply"}</Button></div></div></section>
    </div></section></AuthGate></PublicShell>;
}
