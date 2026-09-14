import { useProjectDraft } from "@/hooks/useProjectDraft";
import { useAuth } from "@/_core/hooks/useAuth";
import { AuthGate } from "@/components/AuthGate";
import { PublicShell } from "@/components/PublicShell";
import { QueryError } from "@/components/QueryError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import {
  buildSteps,
  reviewSteps,
  completionProblem,
  type ReviewId,
  type ProjectWork,
} from "@shared/projects";
import type { Project } from "../../../drizzle/schema";
import { ArrowLeft, ArrowRight, Check, Download, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

const statusNames = {
  idea: "Idea saved",
  building: "In the making",
  completed: "Ready to learn",
};
function ProjectShell({ children }: { children: React.ReactNode }) {
  return (
    <PublicShell>
      <AuthGate message="Sign in to save your ideas, build a project, and learn from what you made.">
        <div className="container max-w-6xl py-10 sm:py-16">{children}</div>
      </AuthGate>
    </PublicShell>
  );
}
export default function Projects() {
  return (
    <ProjectShell>
      <ProjectList />
    </ProjectShell>
  );
}
export function NewProject() {
  return (
    <ProjectShell>
      <Link href="/projects" className="text-link">
        <ArrowLeft className="size-4" /> Your projects
      </Link>
      <h1 className="display mt-8 text-5xl sm:text-7xl">
        What do you want to make?
      </h1>
      <p className="mt-4 max-w-2xl text-mist">
        Start with your idea. Build something useful. Then look back and learn
        how you made it.
      </p>
      <IdeaForm />
    </ProjectShell>
  );
}
export function ProjectDetail({ id }: { id: number }) {
  return (
    <ProjectShell>
      <ProjectLoader id={id} />
    </ProjectShell>
  );
}

export function ProjectList({ compact = false }: { compact?: boolean }) {
  const { user } = useAuth();
  const query = trpc.projects.list.useQuery(undefined, {
    enabled: Boolean(user),
  });
  const Heading = compact ? "h2" : "h1";
  return (
    <section aria-label="Your projects">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          className={`display ${compact ? "text-4xl" : "text-5xl sm:text-7xl"}`}
        >
          Your projects.
        </Heading>
        <Button className="air-button" asChild>
          <Link href="/projects/new">
            <Plus className="size-4" /> Start an idea
          </Link>
        </Button>
      </div>
      <p className="mt-3 max-w-2xl text-mist">
        Make it first. Understand it next. Your work and learning notes are
        private.
      </p>
      {query.isLoading ? (
        <p role="status" className="py-12 text-mist">
          Loading your projects…
        </p>
      ) : query.error ? (
        <div className="mt-6">
          <QueryError
            message={query.error.message}
            retry={() => query.refetch()}
          />
        </div>
      ) : !query.data?.length ? (
        <div className="my-8 border-y py-10">
          <h2 className="display text-3xl">Your next idea belongs here.</h2>
          <p className="mt-3 max-w-xl text-mist">
            A story, a poster, a small website, a solution for your community.
            Pick one thing you want to bring to life.
          </p>
          <Link href="/projects/new" className="text-link mt-6">
            Create your first project <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 divide-y border-y">
          {(compact ? query.data.slice(0, 3) : query.data).map(project => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="flex items-center justify-between gap-5 py-6 hover:bg-muted/40"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-mist">
                  {project.status === "completed" &&
                  Object.keys(project.reflections).length === reviewSteps.length
                    ? "Review complete"
                    : statusNames[project.status]}
                </p>
                <h2 className="mt-2 break-words text-xl font-bold">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-mist">
                  {project.idea}
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0" />
            </Link>
          ))}
        </div>
      )}
      {compact && (
        <Link href="/projects" className="text-link mt-6">
          Open all projects <ArrowRight className="size-4" />
        </Link>
      )}
    </section>
  );
}

function useUnsavedWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
}
function ErrorMessage({ message }: { message?: string }) {
  return message ? (
    <p
      role="alert"
      className="rounded-xl border border-destructive p-4 text-sm"
    >
      {message}
    </p>
  ) : null;
}
function IdeaForm({ project }: { project?: Project }) {
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();
  const { user } = useAuth();
  const draft = useProjectDraft(
    `${user?.id}:idea:${project?.id ?? "new"}:${project?.version ?? 0}`,
    {
      title: project?.title ?? "",
      idea: project?.idea ?? "",
      audience: project?.audience ?? "",
      success: project?.success ?? "",
    }
  );
  const { value: values, update: setValues, dirty } = draft;
  useUnsavedWarning(dirty);
  async function saved(data: Project) {
    draft.clear();
    utils.projects.get.setData({ id: data.id }, data);
    await utils.projects.list.invalidate();
    toast.success(
      data.status === "building"
        ? "Your workspace is ready."
        : "Your idea is saved."
    );
    if (!project) navigate(`/projects/${data.id}`);
  }
  const create = trpc.projects.create.useMutation({ onSuccess: saved });
  const save = trpc.projects.saveIdea.useMutation({ onSuccess: saved });
  const pending = create.isPending || save.isPending;
  const fields = [
    {
      key: "title",
      label: "Give it a name",
      hint: "For example: A guide to our community garden",
      max: 160,
      min: 3,
    },
    {
      key: "idea",
      label: "What do you want to make?",
      hint: "Describe the idea in a few sentences.",
      max: 4000,
      min: 10,
    },
    {
      key: "audience",
      label: "Who will it help?",
      hint: "Describe the people, without names or private details.",
      max: 500,
      min: 2,
    },
    {
      key: "success",
      label: "What will a useful result do?",
      hint: "For example: Help a new gardener choose what to plant.",
      max: 1000,
      min: 5,
    },
  ] as const;
  return (
    <form
      className="mt-10 max-w-3xl space-y-7"
      onSubmit={event => {
        event.preventDefault();
        if (project)
          save.mutate({
            id: project.id,
            version: project.version,
            idea: values,
            start: true,
          });
        else create.mutate(values);
      }}
    >
      <fieldset disabled={pending} className="space-y-7">
        {fields.map(field => (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <p id={`${field.key}-hint`} className="mt-2 text-sm text-mist">
              {field.hint}
            </p>
            {field.key === "title" ? (
              <Input
                id={field.key}
                aria-describedby={`${field.key}-hint`}
                className="mt-3"
                value={values[field.key]}
                required
                minLength={field.min}
                maxLength={field.max}
                onChange={e => {
                  setValues({ ...values, [field.key]: e.target.value });
                }}
              />
            ) : (
              <Textarea
                id={field.key}
                aria-describedby={`${field.key}-hint`}
                className="mt-3 min-h-28"
                value={values[field.key]}
                required
                minLength={field.min}
                maxLength={field.max}
                onChange={e => {
                  setValues({ ...values, [field.key]: e.target.value });
                }}
              />
            )}
          </div>
        ))}
      </fieldset>
      <ErrorMessage message={create.error?.message ?? save.error?.message} />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" className="air-button big" disabled={pending}>
          {pending
            ? "Saving…"
            : project
              ? "My idea is ready. Start building"
              : "Save my idea"}
          <ArrowRight className="size-4" />
        </Button>
        {project && (
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() =>
              save.mutate({
                id: project.id,
                version: project.version,
                idea: values,
              })
            }
          >
            Save idea for later
          </Button>
        )}
      </div>
      <p role="status" className="text-sm text-mist">
        {dirty
          ? "You have unsaved changes."
          : "Save now and come back whenever you are ready."}
      </p>
    </form>
  );
}
function ProjectLoader({ id }: { id: number }) {
  const query = trpc.projects.get.useQuery(
    { id },
    { enabled: Number.isInteger(id) && id > 0, refetchOnWindowFocus: false }
  );
  if (!Number.isInteger(id) || id <= 0)
    return (
      <p>
        This project link is not valid.{" "}
        <Link href="/projects" className="underline">
          Open your projects.
        </Link>
      </p>
    );
  if (query.error)
    return (
      <QueryError message={query.error.message} retry={() => query.refetch()} />
    );
  if (!query.data) return <p role="status">Loading your project…</p>;
  const project = query.data;
  return (
    <>
      <Link href="/projects" className="text-link">
        <ArrowLeft className="size-4" /> Your projects
      </Link>
      <h1 className="display mt-8 break-words text-5xl sm:text-7xl">
        {project.title}
      </h1>
      <ol
        aria-label="Project progress"
        className="my-8 flex flex-wrap gap-x-8 gap-y-3 border-y py-5 text-sm"
      >
        {["idea", "building", "completed"].map((status, index) => (
          <li
            key={status}
            aria-current={project.status === status ? "step" : undefined}
            className={project.status === status ? "font-bold" : "text-mist"}
          >
            {index + 1}.{" "}
            {status === "idea"
              ? "Shape the idea"
              : status === "building"
                ? "Make the result"
                : "Learn how you made it"}
          </li>
        ))}
      </ol>
      {project.status === "idea" ? (
        <IdeaForm key={project.version} project={project} />
      ) : project.status === "building" ? (
        <BuildWorkspace key={project.version} project={project} />
      ) : (
        <ProjectReview project={project} />
      )}
    </>
  );
}
function BuildWorkspace({ project }: { project: Project }) {
  const utils = trpc.useUtils();
  const draft = useProjectDraft<ProjectWork>(
    `${project.userId}:work:${project.id}:${project.version}`,
    {
      notes: project.notes,
      resultText: project.resultText,
      resultUrl: project.resultUrl,
    }
  );
  const { value: work, update: setWork, dirty } = draft;
  const [problem, setProblem] = useState<string | null>(null);
  useUnsavedWarning(dirty);
  const save = trpc.projects.saveWork.useMutation({
    onSuccess: async data => {
      draft.clear();
      utils.projects.get.setData({ id: data.id }, data);
      await utils.projects.list.invalidate();
      toast.success(
        data.status === "completed"
          ? "You made it. Your learning review is ready."
          : "Your work is saved."
      );
    },
  });
  const update = (patch: Partial<ProjectWork>) => {
    setProblem(null);
    setWork({ ...work, ...patch });
  };
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <form
        className="min-w-0 space-y-8"
        onSubmit={event => {
          event.preventDefault();
          const message = completionProblem(work);
          setProblem(message);
          if (!message)
            save.mutate({
              id: project.id,
              version: project.version,
              work,
              finish: true,
            });
        }}
      >
        <div>
          <h2 className="display text-4xl">Bring your idea to life.</h2>
          <p className="mt-3 text-mist">
            Work here or in your own tools. Keep a few notes as you go. They
            will become the story you learn from when your result is done.
          </p>
        </div>
        <fieldset disabled={save.isPending} className="space-y-7">
          {buildSteps.map((step, index) => (
            <div key={step.id}>
              <Label htmlFor={`note-${step.id}`}>
                {index + 1}. {step.title}
              </Label>
              <p className="mt-2 text-sm text-mist" id={`${step.id}-help`}>
                {step.prompt}
              </p>
              <Textarea
                id={`note-${step.id}`}
                aria-describedby={`${step.id}-help`}
                value={work.notes[step.id]}
                maxLength={6000}
                className="mt-3 min-h-28"
                onChange={event =>
                  update({
                    notes: { ...work.notes, [step.id]: event.target.value },
                  })
                }
              />
            </div>
          ))}
          <div className="border-t pt-8">
            <h2 className="display text-3xl">Your finished result</h2>
            <p className="mt-3 text-sm text-mist">
              Paste what you made, describe the finished piece, or add a link.
              Only you can see this in AiR.
            </p>
            <Label htmlFor="resultText" className="mt-5">
              Your work or a description
            </Label>
            <Textarea
              id="resultText"
              value={work.resultText}
              maxLength={30000}
              className="mt-3 min-h-48"
              onChange={e => update({ resultText: e.target.value })}
            />
            <Label htmlFor="resultUrl" className="mt-5">
              Link to your result (optional)
            </Label>
            <Input
              id="resultUrl"
              type="url"
              placeholder="https://"
              value={work.resultUrl}
              maxLength={2000}
              className="mt-3"
              onChange={e => update({ resultUrl: e.target.value })}
            />
          </div>
        </fieldset>
        <ErrorMessage message={problem ?? save.error?.message} />
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={save.isPending}
            onClick={() =>
              save.mutate({ id: project.id, version: project.version, work })
            }
          >
            {save.isPending ? "Saving…" : "Save my progress"}
          </Button>
          <Button
            type="submit"
            className="air-button"
            disabled={save.isPending}
          >
            My result is finished <Check className="size-4" />
          </Button>
        </div>
        <p role="status" className="text-sm text-mist">
          {dirty
            ? "You have unsaved changes. Save before leaving this page."
            : "Your latest work is saved."}
        </p>
      </form>
      <aside className="border-t pt-6 lg:border-t-0 lg:pt-0">
        <h2 className="display text-3xl">Your starting point</h2>
        <dl className="mt-5 space-y-5 text-sm">
          <div>
            <dt className="font-bold">The idea</dt>
            <dd className="mt-2 whitespace-pre-wrap break-words text-mist">
              {project.idea}
            </dd>
          </div>
          <div>
            <dt className="font-bold">Who it helps</dt>
            <dd className="mt-2 break-words text-mist">{project.audience}</dd>
          </div>
          <div>
            <dt className="font-bold">What success looks like</dt>
            <dd className="mt-2 break-words text-mist">{project.success}</dd>
          </div>
        </dl>
        <p className="mt-8 border-t pt-5 text-sm text-mist">
          The learning review opens when you finish. You do not need to take a
          course before making something.
        </p>
      </aside>
    </div>
  );
}
function ProjectReview({ project }: { project: Project }) {
  const utils = trpc.useUtils();
  const [active, setActive] = useState<ReviewId>(
    () =>
      reviewSteps.find(step => !project.reflections[step.id])?.id ?? "result"
  );
  const [editing, setEditing] = useState(false);
  const reopen = trpc.projects.reopen.useMutation({
    onSuccess: async data => {
      utils.projects.get.setData({ id: data.id }, data);
      await utils.projects.list.invalidate();
    },
  });
  const count = Object.keys(project.reflections).length;
  const step = reviewSteps.find(item => item.id === active)!;
  const evidence =
    active === "result"
      ? project.resultText || "Open your result using the link above."
      : project.notes[active];
  function download() {
    const content =
      `${project.title}\n\nIDEA\n${project.idea}\n\nFOR\n${project.audience}\n\nSUCCESS\n${project.success}\n\nRESULT\n${project.resultText}\n${project.resultUrl}\n\n` +
      buildSteps
        .map(item => `${item.title}\n${project.notes[item.id]}`)
        .join("\n\n") +
      "\n\nWHAT I LEARNED\n" +
      reviewSteps
        .map(
          item =>
            `${item.title}\n${project.reflections[item.id] || "Not reviewed yet"}`
        )
        .join("\n\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `air-project-${project.id}.txt`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-5">
        <div>
          <h2 className="display text-4xl">You made it. Now see how.</h2>
          <p className="mt-3 max-w-2xl text-mist">
            Start with your result and work backward. Use your own notes to
            discover what worked, why it worked, and how to do it again.
          </p>
        </div>
        <Button variant="outline" onClick={download}>
          <Download className="size-4" /> Download my project
        </Button>
      </div>
      {project.resultUrl && (
        <a
          href={project.resultUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link mt-5"
        >
          Open my finished result <ArrowRight className="size-4" />
        </a>
      )}
      <p role="status" className="mt-7 text-sm font-semibold">
        {count === reviewSteps.length
          ? "Review complete. You have a process you can use again."
          : `${count} of ${reviewSteps.length} reflections saved`}
      </p>
      <div className="mt-7 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <nav
          aria-label="Learning review"
          className="flex flex-col items-stretch"
        >
          {reviewSteps.map((item, index) => (
            <button
              key={item.id}
              disabled={editing}
              onClick={() => setActive(item.id)}
              aria-current={active === item.id ? "step" : undefined}
              className={`flex min-h-14 items-center gap-3 border-b px-3 py-4 text-left text-sm disabled:opacity-60 ${active === item.id ? "bg-muted font-bold" : "hover:bg-muted/50"}`}
            >
              <span>
                {project.reflections[item.id] ? (
                  <Check aria-label="Saved" className="size-4" />
                ) : (
                  `${index + 1}.`
                )}
              </span>
              {item.title}
            </button>
          ))}
        </nav>
        <section className="min-w-0">
          <h3 className="display text-3xl">{step.title}</h3>
          <p className="mt-5 text-xs font-bold uppercase">From your project</p>
          <blockquote className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-muted p-5 text-sm leading-7">
            {evidence}
          </blockquote>
          {active === "clear" && (
            <p className="mt-4 whitespace-pre-wrap text-sm text-mist">
              Original idea: {project.idea}
            </p>
          )}
          <ReflectionForm
            key={`${project.version}-${active}`}
            project={project}
            step={step}
            onEditing={setEditing}
            onNext={() => {
              const index = reviewSteps.findIndex(item => item.id === active);
              setActive(reviewSteps[index + 1]?.id ?? active);
            }}
          />
          {active !== "result" && (
            <Link
              href={`/learn/${buildSteps.find(item => item.id === active)!.lesson}`}
              className="text-link mt-6"
            >
              Explore the related lesson <ArrowRight className="size-4" />
            </Link>
          )}
        </section>
      </div>
      <div className="mt-12 border-t pt-6">
        <p className="mb-4 text-sm text-mist">
          Want to improve the result? Reopen the project. Your notes and
          reflections will stay saved.
        </p>
        <Button
          variant="outline"
          disabled={reopen.isPending || editing}
          onClick={() =>
            reopen.mutate({ id: project.id, version: project.version })
          }
        >
          {reopen.isPending ? "Opening…" : "Keep building"}
        </Button>
        <ErrorMessage message={reopen.error?.message} />
      </div>
    </div>
  );
}
function ReflectionForm({
  project,
  step,
  onNext,
  onEditing,
}: {
  project: Project;
  step: (typeof reviewSteps)[number];
  onNext: () => void;
  onEditing: (value: boolean) => void;
}) {
  const utils = trpc.useUtils();
  const draft = useProjectDraft(
    `${project.userId}:reflection:${project.id}:${project.version}:${step.id}`,
    project.reflections[step.id] ?? ""
  );
  const { value: answer, update: setAnswer, dirty } = draft;
  useUnsavedWarning(dirty);
  useEffect(() => {
    onEditing(dirty);
    return () => onEditing(false);
  }, [dirty, onEditing]);
  const save = trpc.projects.reflect.useMutation({
    onSuccess: async data => {
      draft.clear();
      utils.projects.get.setData({ id: data.id }, data);
      await utils.projects.list.invalidate();
      toast.success("Reflection saved.");
      onNext();
    },
  });
  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={event => {
        event.preventDefault();
        save.mutate({
          id: project.id,
          version: project.version,
          step: step.id,
          answer,
        });
      }}
    >
      <Label htmlFor="reflection">{step.prompt}</Label>
      <Textarea
        id="reflection"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        minLength={10}
        maxLength={6000}
        required
        disabled={save.isPending}
        className="min-h-36"
      />
      <ErrorMessage message={save.error?.message} />
      <Button type="submit" disabled={save.isPending} className="air-button">
        {save.isPending
          ? "Saving…"
          : step.id === "clear"
            ? "Save my reflection"
            : "Save and continue"}
        <ArrowRight className="size-4" />
      </Button>
      {dirty && (
        <p role="status" className="text-sm text-mist">
          Save your reflection before choosing another step.
        </p>
      )}
    </form>
  );
}
