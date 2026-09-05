import { curriculum } from "../../../server/content";

const seededAt = new Date("2026-01-01T00:00:00.000Z");

export const staticCatalog = curriculum.map((path, pathIndex) => {
  const pathId = pathIndex + 1;
  return {
    id: pathId,
    slug: path.slug,
    number: path.number,
    title: path.title,
    kicker: path.kicker,
    summary: path.summary,
    description: path.description,
    promise: path.promise,
    accent: path.accent,
    sortOrder: pathIndex + 1,
    isPublished: true,
    createdAt: seededAt,
    updatedAt: seededAt,
    modules: path.modules.map((module, moduleIndex) => {
      const moduleId = pathId * 100 + moduleIndex + 1;
      return {
        id: moduleId,
        pathId,
        slug: module.slug,
        title: module.title,
        summary: module.summary,
        sortOrder: moduleIndex + 1,
        isPublished: true,
        createdAt: seededAt,
        updatedAt: seededAt,
        lessons: module.lessons.map((lesson, lessonIndex) => ({
          id: moduleId * 100 + lessonIndex + 1,
          pathId,
          moduleId,
          slug: lesson.slug,
          number: lesson.number,
          title: lesson.title,
          kicker: lesson.kicker,
          summary: lesson.summary,
          story: lesson.story,
          bigIdea: lesson.bigIdea,
          learnerPromise: lesson.learnerPromise,
          videoAssetId: null,
          videoPosterUrl: null,
          durationMinutes: lesson.durationMinutes,
          sortOrder: lessonIndex + 1,
          discussionPrompt: lesson.discussionPrompt,
          isPublished: true,
          createdAt: seededAt,
          updatedAt: seededAt,
        })),
      };
    }),
  };
});
