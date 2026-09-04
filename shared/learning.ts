export function calculateCompletion(completed: number, total: number) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((completed / total) * 100)));
}

export function nextLessonId(
  orderedLessonIds: number[],
  progress: Array<{ lessonId: number; status: "not_started" | "in_progress" | "completed" }>,
) {
  const inProgress = progress.find(item => item.status === "in_progress");
  if (inProgress) return inProgress.lessonId;
  const completedIds = new Set(progress.filter(item => item.status === "completed").map(item => item.lessonId));
  return orderedLessonIds.find(id => !completedIds.has(id)) ?? orderedLessonIds[0];
}
