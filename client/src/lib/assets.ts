// Every AiR media file is served from the app's own /media folder, in both the
// full-stack build and the static GitHub Pages build. The source files live in
// the repository's top-level `media/` directory; scripts/build-pages.mjs and
// scripts/build-fullstack.mjs copy them into the build output.
const MEDIA_BASE = `${import.meta.env.BASE_URL}media`;
const media = (fileName: string) => `${MEDIA_BASE}/${fileName}`;

export const AIR_ASSETS = {
  logo: media("AiR_Logo-MAIN.svg"),
  logoPng: media("AiR_Logo-MAIN.png"),
  poster: media("bg-poster.jpg"),
  heroVideo: media("bg.mp4"),
  startVideo: media("start.mp4"),
  courseVideo: media("course-african-american-lead-v2.mp4"),
  coursePoster: media("air-course-african-american-reference.png"),
  practiceVideo: media("practice.mp4"),
  campaignMove: media("air-campaign-move.png"),
  campaignJudge: media("air-campaign-judge.png"),
  campaignCommunity: media("air-campaign-community.png"),
} as const;
