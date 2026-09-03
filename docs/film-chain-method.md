# AIR — Seedance 2.5 chain test

Run 2026-09-02. **Proof of the start-frame / end-frame chaining method**, the
same technique documented in `affirmations` (`nano_banana_pro` → Seedance
`start_image`/`end_image`), applied here to AIR's own campaign arc.

## What was made

Four videos and three transitions — **32.3 seconds continuous**.

| Order | Clip | Dur | Content |
| --- | --- | ---: | --- |
| 1 | `air_v1_clutter.mp4` | 5.0s | Figure buried to the eyes in pale cards, dark green void |
| 2 | `T1_clutter_to_stillness.mp4` | 4.0s | **transition** — cards collapse and clear away |
| 3 | `air_v2_stillness.mp4` | 5.0s | Alone. Breath. One card settles. |
| 4 | `T2_stillness_to_making.mp4` | 4.0s | **transition** — descend from void to tabletop, light warms |
| 5 | `air_v3_making.mp4` | 5.0s | Hands simplifying a printed page |
| 6 | `T3_making_to_world.mp4` | 4.0s | **transition** — lift out of interior into street daylight |
| 7 | `air_v4_world.mp4` | 5.0s | Poster on a community noticeboard, passers-by |

Narrative: **clutter → stillness → making → the world.** The AIR philosophy in
four beats, which is also the arc of Commercials 01 and 05.

## The method, exactly

```
1. Generate videos 1-4 independently          seedance_2_5, t2v, 5s, 720p, 16:9
2. Download each                              curl
3. Extract the boundary frames                ffmpeg
     last frame  of video N     → vN_END.jpg
     first frame of video N+1   → vN+1_START.jpg
4. Host the frames publicly                   raw.githubusercontent.com
5. Import to Higgsfield                       media_import_url → media_id
6. Generate the transition                    seedance_2_5, mode: omni_reference
     medias: [{role: start_image, value: vN_END},
              {role: end_image,   value: vN+1_START}]
7. Concatenate                                ffmpeg concat demuxer
```

Frame extraction that works:

```bash
# last frame — use n=118 of 121, not -sseof; the true last frame is often partial
ffmpeg -i in.mp4 -vf "select=eq(n\,118)" -q:v 2 -frames:v 1 -update 1 END.jpg -y
# first frame — n=2, not n=0; frame 0 can carry encoder warm-up artifacts
ffmpeg -i in.mp4 -vf "select=eq(n\,2)"   -q:v 2 -frames:v 1 -update 1 START.jpg -y
```

## Things that cost time, so they don't again

**Preset interception.** Seedance submissions were silently swapped for a
Higgsfield preset called *"IN THE DARK"* — 3 of 4 in the first batch, and again
on every transition. The fix is to pass the preset's id back as
`declined_preset_id` on retry. Without it the art direction is overridden by
someone else's look.

```json
"declined_preset_id": "24bae836-2c4a-48e0-89b6-49fcc0b21612"
```

**Frame hosting.** `media_upload` returns presigned S3 URLs that must be PUT to
manually — workable but clumsy from an agent. `media_import_url` against
**raw.githubusercontent.com** is immediate after a push and far simpler. Vercel
was tried first and its production alias did not pick up new files reliably.

**Video jobs report `type: image` while running.** They only become
`type: video` on completion. Don't read that as a failure.

**Timing.** ~2–4 minutes per 5s clip. Poll in 15s windows.

## Cost

| Item | Credits |
| --- | ---: |
| 4 × 5s @ 720p | 130.0 |
| 3 × 4s @ 720p | ~78.0 |
| **Total** | **~208** |

Balance was 1,160 before the run.

## Honest assessment of the output

**What works.** Video 1 is genuinely strong — the figure buried to the eyes in
pale cards against dark green is on-brief and on-brand, with no robots, neon, or
screens. Video 4's weathered noticeboard with blurred passers-by has real
documentary texture.

**What needs work.**
- Video 4's poster carries AI-gibberish text. Treat it as a **plate** and
  composite the real AIR poster over it.
- The transitions are interpolations, not directed camera moves. They read as
  morphs at close inspection. For a finished commercial, `T3` in particular
  (interior → street) is the shot the scripts already recommend **shooting
  practically** — one afternoon, a printed poster, a real wall.
- Subject identity drifts between clips. Seedance has no character lock across
  independent generations. For the real campaign, generate a character reference
  in ComfyUI with the `Noerman_African_American_Lifelike` LoRA first, then feed
  it as an image reference to every clip.

**Verdict.** The chaining method is proven and repeatable. Use it for the
campaign's *connective tissue*, not for shots where a camera and a location would
be cheaper and better — exactly as the five scripts already specify.

## Files

```
_chain/
├── videos/            the four source clips
├── transitions/       the three interpolated joins
├── frames/            six boundary frames (also pushed to borngifted/air)
├── concat.txt         ffmpeg concat list
├── AIR_CHAIN_MASTER.mp4   32.3s · 1280×720 · 16:9
└── AIR_CHAIN_9x16.mp4     32.3s · 1080×1920 · vertical
```
