import { IS_GITHUB_PAGES } from "./runtime";

const PAGES_MEDIA = `${import.meta.env.BASE_URL}media`;
const asset = (managedPath: string, releaseName: string) => IS_GITHUB_PAGES ? `${PAGES_MEDIA}/${releaseName}` : managedPath;

export const AIR_ASSETS = {
  logo: asset("/manus-storage/AiR_Logo-MAIN_1829c9c1.svg", "AiR_Logo-MAIN.svg"),
  logoPng: asset("/manus-storage/AiR_Logo-MAIN_06d27650.png", "AiR_Logo-MAIN.png"),
  poster: asset("/manus-storage/bg-poster_b66068e2.jpg", "bg-poster.jpg"),
  heroVideo: asset("/manus-storage/bg_9ad105a7.mp4", "bg.mp4"),
  startVideo: asset("/manus-storage/start_cf55d128.mp4", "start.mp4"),
  courseVideo: asset("/manus-storage/course-african-american-lead-v2_64a434bc.mp4", "course-african-american-lead-v2.mp4"),
  coursePoster: asset("/manus-storage/air-course-african-american-reference_1b55f51e.png", "air-course-african-american-reference.png"),
  practiceVideo: asset("/manus-storage/practice_521b841a.mp4", "practice.mp4"),
  campaignMove: asset("/manus-storage/air-campaign-move_757c847f.png", "air-campaign-move.png"),
  campaignJudge: asset("/manus-storage/air-campaign-judge_9fa99ba8.png", "air-campaign-judge.png"),
  campaignCommunity: asset("/manus-storage/air-campaign-community_061ee38b.png", "air-campaign-community.png"),
} as const;
