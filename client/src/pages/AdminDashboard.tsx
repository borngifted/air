import { AdminGate } from "@/components/AdminGate";
import { PublicShell } from "@/components/PublicShell";
import { QueryError } from "@/components/QueryError";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BookOpenCheck, Clapperboard, LibraryBig, MessageSquareMore, Presentation, ShieldCheck, Users, Video } from "lucide-react";
import { Link } from "wouter";

const tools = [
  { href: "/admin/community", icon: MessageSquareMore, title: "Community safety", body: "Review rooms, reports, and member posts." },
  { href: "/admin/media", icon: Video, title: "Lesson videos", body: "Upload videos and add them to lessons." },
  { href: "/present", icon: Presentation, title: "Teach live", body: "Show the AiR lesson steps on a big screen." },
  { href: "/trainers", icon: LibraryBig, title: "Trainer knowledge", body: "Open facilitator guides and delivery notes." },
];

export default function AdminDashboard() {
  const { data, isLoading, error, refetch } = trpc.admin.overview.useQuery();
  const stats = [
    { label: "Members", value: data?.members ?? 0, icon: Users },
    { label: "Community posts", value: data?.posts ?? 0, icon: MessageSquareMore },
    { label: "Lessons", value: data?.lessonCount ?? 0, icon: BookOpenCheck },
    { label: "Media assets", value: data?.videos ?? 0, icon: Clapperboard },
  ];
  return <PublicShell><AdminGate><section className="admin-hero"><div className="container py-16 sm:py-24"><div className="flex items-center gap-3"><ShieldCheck className="size-6 text-[var(--spark)]" /><p className="eyebrow">Administrator workspace</p></div><h1 className="display mt-5 text-7xl leading-[.88] sm:text-9xl">Lead from<br /><em>one place.</em></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-mist">Keep the learning sharp, the community safe, and the live room moving.</p></div></section><section className="admin-body py-16"><div className="container">{error ? <QueryError message={error.message} retry={() => refetch()} /> : <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{stats.map(stat => <div key={stat.label} className="admin-stat"><stat.icon className="size-5 text-[var(--go)]" />{isLoading ? <span className="h-10 w-20 animate-pulse rounded bg-black/10" /> : <b>{stat.value}</b>}<small>{stat.label}</small></div>)}</div><div className="mt-10 grid gap-4 md:grid-cols-2">{tools.map(tool => <Link key={tool.href} href={tool.href} className="admin-tool group"><tool.icon className="size-7 text-[var(--go)]" /><div><h2 className="display text-4xl">{tool.title}</h2><p className="mt-2 text-sm leading-7 text-mist">{tool.body}</p></div><ArrowRight className="size-5 transition-transform group-hover:translate-x-1" /></Link>)}</div></>}</div></section></AdminGate></PublicShell>;
}
