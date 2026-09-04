import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { attachMediaToLesson, createMediaAsset, getMediaAsset, listMediaAssets } from "../db";
import { storageGetSignedUrl, storagePut } from "../storage";
import { adminProcedure, protectedProcedure, router } from "../_core/trpc";

const allowedVideoTypes = new Set(["video/mp4", "video/webm"]);

export const mediaRouter = router({
  list: adminProcedure.query(() => listMediaAssets()),
  uploadVideo: adminProcedure
    .input(z.object({
      title: z.string().trim().min(2).max(180),
      fileName: z.string().trim().min(1).max(255),
      mimeType: z.string().trim(),
      base64Data: z.string().min(1),
      durationSeconds: z.number().int().positive().max(21600).optional(),
      visibility: z.enum(["members", "trainers", "public"]).default("members"),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!allowedVideoTypes.has(input.mimeType)) throw new TRPCError({ code: "BAD_REQUEST", message: "Only MP4 and WebM course videos are supported." });
      const bytes = Buffer.from(input.base64Data, "base64");
      if (bytes.byteLength > 25 * 1024 * 1024) throw new TRPCError({ code: "PAYLOAD_TOO_LARGE", message: "Video uploads are limited to 25 MB." });
      const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
      const stored = await storagePut(`course-videos/${Date.now()}-${safeName}`, bytes, input.mimeType);
      return createMediaAsset({
        kind: "video",
        title: input.title,
        fileName: safeName,
        storageKey: stored.key,
        mimeType: input.mimeType,
        byteSize: bytes.byteLength,
        durationSeconds: input.durationSeconds,
        visibility: input.visibility,
        uploadedBy: ctx.user.id,
      });
    }),
  attachToLesson: adminProcedure
    .input(z.object({ lessonId: z.number().int().positive(), mediaAssetId: z.number().int().positive() }))
    .mutation(({ input }) => attachMediaToLesson(input.lessonId, input.mediaAssetId)),
  playback: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const asset = await getMediaAsset(input.id);
      if (!asset || asset.kind !== "video") throw new TRPCError({ code: "NOT_FOUND", message: "Video not found." });
      if (asset.visibility === "trainers" && ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Trainer access required." });
      return { url: await storageGetSignedUrl(asset.storageKey), title: asset.title, mimeType: asset.mimeType };
    }),
});
