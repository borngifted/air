import { AdminGate } from "@/components/AdminGate";
import { PublicShell } from "@/components/PublicShell";
import { QueryError } from "@/components/QueryError";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Check, Eye, MessageSquareWarning, ShieldCheck, X } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function AdminCommunity() {
  const utils = trpc.useUtils();
  const { data: reports = [], isLoading, error, refetch } = trpc.admin.reports.useQuery();
  const resolve = trpc.admin.resolveReport.useMutation({ onSuccess: async () => { await utils.admin.reports.invalidate(); toast.success("Report status updated."); } });
  const hidePost = trpc.community.hidePost.useMutation({ onSuccess: () => toast.success("Post hidden from the community.") });
  const hideComment = trpc.community.hideComment.useMutation({ onSuccess: () => toast.success("Reply hidden from the community.") });
  return <PublicShell><AdminGate><section className="admin-hero"><div className="container py-14 sm:py-20"><Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-mist"><ArrowLeft className="size-4" /> Admin workspace</Link><div className="mt-10 flex items-center gap-3"><ShieldCheck className="size-6 text-[var(--spark)]" /><p className="eyebrow">Community safety</p></div><h1 className="display mt-4 text-7xl">Read. Check. Act.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-mist">Read each report. Open the conversation. Hide harmful content. Mark the report done.</p></div></section><section className="admin-body py-14"><div className="container">{error ? <QueryError message={error.message} retry={() => refetch()} /> : isLoading ? <div className="h-64 animate-pulse rounded-3xl bg-black/5" /> : reports.length ? <div className="grid gap-3">{reports.map(report => <article key={report.id} className="moderation-card"><div className="moderation-icon"><MessageSquareWarning className="size-5" /></div><div><div className="flex flex-wrap items-center gap-2"><span className={`report-status ${report.status}`}>{report.status}</span><span className="text-xs text-mist">{new Date(report.createdAt).toLocaleString()}</span></div><h2 className="mt-3 text-xl font-extrabold">{report.targetTitle}</h2><p className="mt-2 text-sm leading-7 text-mist"><b>{report.reporterName || "Member"}:</b> {report.reason}</p><div className="mt-5 flex flex-wrap gap-2">{report.targetPostId > 0 && <Link href={`/community/${report.targetPostId}`}><Button variant="outline"><Eye /> Open conversation</Button></Link>}<Button variant="outline" onClick={() => report.targetType === "post" ? hidePost.mutate({ id: report.targetId }) : hideComment.mutate({ id: report.targetId })}><X /> Hide {report.targetType}</Button><Button className="air-button" onClick={() => resolve.mutate({ id: report.id, status: "resolved" })}><Check /> Mark done</Button><Button variant="ghost" onClick={() => resolve.mutate({ id: report.id, status: "dismissed" })}>Close report</Button></div></div></article>)}</div> : <div className="empty-community"><ShieldCheck className="size-8 text-[var(--go)]" /><h2 className="display mt-6 text-5xl">No reports to review.</h2><p className="mt-3 text-mist">Everything is clear.</p></div>}</div></section></AdminGate></PublicShell>;
}
