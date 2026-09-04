import { useAuth } from "@/_core/hooks/useAuth";
import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { UploadCloud, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function MediaAdmin() {
  const { user } = useAuth();
  const utils = trpc.useUtils();
  const { data: assets = [] } = trpc.media.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const { data: catalog = [] } = trpc.catalog.list.useQuery();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<"members" | "trainers" | "public">("members");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const lessons = useMemo(() => catalog.flatMap(path => path.modules.flatMap(module => module.lessons)), [catalog]);
  const upload = trpc.media.uploadVideo.useMutation({ onSuccess: async asset => { setSelectedAsset(String(asset?.id || "")); setTitle(""); setFile(null); await utils.media.list.invalidate(); toast.success("Video stored securely."); } });
  const attach = trpc.media.attachToLesson.useMutation({ onSuccess: () => toast.success("Video attached to lesson.") });
  async function uploadFile() {
    if (!file || !title.trim()) return;
    if (file.size > 25 * 1024 * 1024) return toast.error("Choose a video smaller than 25 MB.");
    const base64Data = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(",")[1] || ""); reader.onerror = reject; reader.readAsDataURL(file); });
    upload.mutate({ title, fileName: file.name, mimeType: file.type, base64Data, visibility });
  }
  return <PublicShell><AuthGate>{user?.role !== "admin" ? <div className="container py-24"><h1 className="display text-6xl">Admin access required.</h1></div> : <section className="py-16"><div className="container"><p className="eyebrow">Course media</p><h1 className="display mt-4 text-7xl">Upload. Store. Teach.</h1><div className="mt-10 grid gap-6 lg:grid-cols-2"><div className="form-panel"><UploadCloud className="size-7 text-[var(--go)]" /><div><Label>Video title</Label><Input value={title} onChange={event => setTitle(event.target.value)} className="air-input mt-2" placeholder="Lesson video title" /></div><div><Label>MP4 or WebM · 25 MB max</Label><Input type="file" accept="video/mp4,video/webm" onChange={event => setFile(event.target.files?.[0] || null)} className="air-input mt-2" /></div><div><Label>Who can view it?</Label><Select value={visibility} onValueChange={value => setVisibility(value as typeof visibility)}><SelectTrigger className="air-input mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="members">Signed-in members</SelectItem><SelectItem value="trainers">Trainers only</SelectItem><SelectItem value="public">Public</SelectItem></SelectContent></Select></div><Button disabled={!file || !title.trim() || upload.isPending} onClick={uploadFile} className="air-button">Upload video</Button></div><div className="form-panel"><Video className="size-7 text-[var(--spark)]" /><div><Label>Stored video</Label><Select value={selectedAsset} onValueChange={setSelectedAsset}><SelectTrigger className="air-input mt-2"><SelectValue placeholder="Choose video" /></SelectTrigger><SelectContent>{assets.map(asset => <SelectItem key={asset.id} value={String(asset.id)}>{asset.title}</SelectItem>)}</SelectContent></Select></div><div><Label>Lesson</Label><Select value={selectedLesson} onValueChange={setSelectedLesson}><SelectTrigger className="air-input mt-2"><SelectValue placeholder="Choose lesson" /></SelectTrigger><SelectContent>{lessons.map(lesson => <SelectItem key={lesson.id} value={String(lesson.id)}>{lesson.number} · {lesson.title}</SelectItem>)}</SelectContent></Select></div><Button disabled={!selectedAsset || !selectedLesson || attach.isPending} onClick={() => attach.mutate({ lessonId: Number(selectedLesson), mediaAssetId: Number(selectedAsset) })} className="air-button">Attach to lesson</Button><p className="text-xs leading-6 text-mist">AiR course media is video-led and protected by member access.</p></div></div></div></section>}</AuthGate></PublicShell>;
}
