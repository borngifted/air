import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

type Reply = { id: number; postId: number; parentId?: number; authorId: number; authorName: string; authorRole: "learner"; body: string; createdAt: Date };
type Post = { id: number; channelId: number; authorId: number; authorName: string; authorRole: "learner"; category: "practice" | "question" | "reflection" | "win"; title: string; body: string; createdAt: Date; comments: Reply[]; reactionCount: number };

const state = vi.hoisted(() => ({ posts: [] as Post[] }));

vi.mock("./communityDb", () => ({
  listChannels: vi.fn(async () => [{ id: 1, slug: "start-here", name: "Start Here", description: "Begin", icon: "compass", access: "members", sortOrder: 1, postCount: state.posts.length }]),
  listCommunityMembers: vi.fn(async () => [{ id: 22, displayName: "Sky", publicRole: "learner", lastSignedIn: new Date() }]),
  listPosts: vi.fn(async (_viewerId: number, filters?: { channelId?: number }) => state.posts.filter(post => !filters?.channelId || post.channelId === filters.channelId).map(post => ({ ...post, commentCount: post.comments.length }))),
  getPost: vi.fn(async (id: number) => state.posts.find(post => post.id === id)),
  createPost: vi.fn(async (authorId: number, input: { channelId: number; category: "practice" | "question" | "reflection" | "win"; title: string; body: string }) => {
    const post: Post = { id: state.posts.length + 1, authorId, authorName: "Sky", authorRole: "learner", ...input, createdAt: new Date(), comments: [], reactionCount: 0 };
    state.posts.push(post);
    return post;
  }),
  createComment: vi.fn(async (authorId: number, postId: number, body: string, parentId?: number) => {
    const post = state.posts.find(item => item.id === postId);
    if (!post) return undefined;
    post.comments.push({ id: post.comments.length + 1, postId, parentId, authorId, authorName: "Sky", authorRole: "learner", body, createdAt: new Date() });
    return post;
  }),
  toggleReaction: vi.fn(async (_userId: number, _targetType: "post" | "comment", targetId: number) => {
    const post = state.posts.find(item => item.id === targetId);
    if (post) post.reactionCount += 1;
    return { active: true };
  }),
  updatePost: vi.fn(),
  hidePost: vi.fn(),
  hideComment: vi.fn(),
  reportContent: vi.fn(),
}));

import { appRouter } from "./routers";

function memberContext(): TrpcContext {
  return {
    user: { id: 22, openId: "member-22", email: null, name: "Sky", loginMethod: "test", role: "user", displayName: "Sky", headline: null, bio: null, publicRole: "learner", learningMode: "explore", currentPathSlug: "clear", onboardingComplete: true, safetyAcknowledged: true, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("community router social flow", () => {
  beforeEach(() => { state.posts.length = 0; });

  it("loads channels and recently active members", async () => {
    const caller = appRouter.createCaller(memberContext());
    expect((await caller.community.channels())[0]?.slug).toBe("start-here");
    expect((await caller.community.members())[0]?.displayName).toBe("Sky");
  });

  it("creates in a channel, reacts, and adds a threaded reply", async () => {
    const caller = appRouter.createCaller(memberContext());
    const created = await caller.community.create({ channelId: 1, category: "practice", title: "I changed the audience", body: "I tried a clearer brief and the result became easier to use." });
    expect(created?.channelId).toBe(1);
    expect(await caller.community.list({ channelId: 1 })).toHaveLength(1);
    expect((await caller.community.detail({ id: created!.id }))?.title).toBe("I changed the audience");
    const root = await caller.community.comment({ postId: created!.id, body: "I noticed the same change in my project." });
    const parentId = root!.comments[0]!.id;
    const threaded = await caller.community.comment({ postId: created!.id, parentId, body: "That helped me see the next move." });
    expect(threaded?.comments[1]?.parentId).toBe(parentId);
    expect((await caller.community.react({ targetType: "post", targetId: created!.id, kind: "support" })).active).toBe(true);
  });
});
