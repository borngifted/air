/** Run only against a migrated, disposable local test database. */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb } from "../server/db";
import { users } from "../drizzle/schema";
import { projectsRouter } from "../server/routers/projects";
import type { TrpcContext } from "../server/_core/context";
import { reviewSteps } from "../shared/projects";

const target = new URL(process.env.DATABASE_URL || "mysql://invalid");
assert(
  ["127.0.0.1", "localhost"].includes(target.hostname) &&
    target.pathname === "/air_test",
  "Use a disposable local database named air_test."
);
const db = await getDb();
assert(db);
const inserted = await db
  .insert(users)
  .values([
    { openId: `test:${randomUUID()}` },
    { openId: `test:${randomUUID()}` },
  ])
  .$returningId();
const ids = inserted.map(row => row.id);
const api = (id: number) =>
  projectsRouter.createCaller({ user: { id } } as TrpcContext);
try {
  const owner = api(ids[0]);
  const other = api(ids[1]);
  const idea = {
    title: "Persistence test",
    idea: "A guide that helps someone make a small garden.",
    audience: "First-time gardeners",
    success: "Choose and grow the first plants.",
  };
  let project = await owner.create(idea);
  assert.equal((await owner.list()).length, 1);
  assert.equal((await other.list()).length, 0);
  await assert.rejects(other.get({ id: project.id }), { code: "NOT_FOUND" });
  project = await owner.saveIdea({
    id: project.id,
    version: project.version,
    idea,
    start: true,
  });
  const work = {
    notes: {
      clear: "Choose a garden guide for beginners.",
      direct: "Use photos and a checklist to make it simple.",
      judge: "Ask someone to try it and fix unclear parts.",
      make: "Put the steps in order on one page.",
    },
    resultText: "界".repeat(30000),
    resultUrl: "https://example.com/garden",
  };
  // This also exercises non-ASCII output larger than a MySQL TEXT column.
  project = await owner.saveWork({
    id: project.id,
    version: project.version,
    work,
    finish: true,
  });
  assert.equal(
    (await owner.get({ id: project.id })).resultText,
    work.resultText
  );
  assert.equal(project.status, "completed");
  for (const step of reviewSteps)
    project = await owner.reflect({
      id: project.id,
      version: project.version,
      step: step.id,
      answer: `I learned how ${step.id} connects to this project.`,
    });
  assert.equal(
    Object.keys((await owner.get({ id: project.id })).reflections).length,
    5
  );
  const stale = project.version;
  project = await owner.reopen({ id: project.id, version: project.version });
  await assert.rejects(
    owner.saveWork({ id: project.id, version: stale, work }),
    { code: "CONFLICT" }
  );
  await assert.rejects(
    other.saveWork({ id: project.id, version: project.version, work }),
    { code: "NOT_FOUND" }
  );
  assert.equal(Object.keys(project.reflections).length, 5);
  console.log(
    "PASS: real MySQL migration, private creation/list/read, Unicode result persistence, completion, five reflections, reopening, stale-write and cross-account protection."
  );
} finally {
  // Delete only the two test accounts created by this script; projects cascade.
  for (const id of ids) await db.delete(users).where(eq(users.id, id));
}
process.exit(0);
