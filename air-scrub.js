/* AIR — scroll-scrubbed film hero
   Method from Affirm' (borngifted/affirmations): clips generated with
   Seedance 2.5 start→end-frame chaining, extracted to webp frame sequences,
   scrubbed on a <canvas> indexed by scroll progress. The film IS the
   presentation — copy beats are keyed to frame ranges. */

(function () {
  var MOBILE = matchMedia("(max-width: 720px)").matches;
  var DIR = MOBILE ? "frames-m" : "frames";
  var CLIPS = 4, PER = 61, TOTAL = CLIPS * PER; /* 244 */
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* The presentation, keyed to the film's four acts (61 frames each). */
  var BEATS = [
    { at: 0,   act: "ACT 1 · THE CLUTTER", text: "You've been told to learn twelve tools." },
    { at: 20,  act: "ACT 1 · THE CLUTTER", text: "Automate everything. Get certified. Keep up." },
    { at: 42,  act: "ACT 1 · THE CLUTTER", text: "The noise isn't readiness. It's the opposite." },
    { at: 61,  act: "ACT 2 · THE CLEARING", text: "Stop. Breathe." },
    { at: 80,  act: "ACT 2 · THE CLEARING", text: "<em>Clear the air.</em>" },
    { at: 100, act: "ACT 2 · THE CLEARING", text: "What are you actually trying to make?" },
    { at: 122, act: "ACT 3 · THE MAKING", text: "Start with a person, not a prompt." },
    { at: 142, act: "ACT 3 · THE MAKING", text: "Make it. Then make it clear." },
    { at: 162, act: "ACT 3 · THE MAKING", text: "Challenge the result — judgment is the work." },
    { at: 183, act: "ACT 4 · THE WORLD", text: "Finish one thing." },
    { at: 203, act: "ACT 4 · THE WORLD", text: "<em>Put it in the world.</em>" },
    { at: 224, act: "ACT 4 · THE WORLD", text: "Explore. Create. Build." },
  ];

  var canvas = document.getElementById("film-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var section = document.querySelector(".scrub");
  var quoteEl = document.getElementById("scrub-quote");
  var actEl = document.getElementById("scrub-act");
  var numEl = document.getElementById("scrub-num");
  var hintEl = document.getElementById("scrub-hint");

  /* ---------- frames ---------- */
  var frames = new Array(TOTAL);
  function src(i) {
    var clip = Math.floor(i / PER) + 1;
    var n = (i % PER) + 1;
    return DIR + "/clip" + clip + "/f" + String(n).padStart(4, "0") + ".webp";
  }
  function load(i, cb) {
    if (frames[i]) return;
    var img = new Image();
    img.onload = function () { frames[i] = img; if (cb) cb(); };
    img.src = src(i);
  }
  /* first frame immediately, then everything in the background */
  load(0, function () { drawn = -1; requestDraw(); });
  var qi = 0;
  (function pump() {
    var inflight = 0;
    while (qi < TOTAL && inflight < 6) {
      (function (i) { if (!frames[i]) { inflight++; load(i, function(){ inflight--; }); } })(qi++);
    }
    if (qi < TOTAL) setTimeout(pump, 60);
  })();

  function nearest(i) {
    if (frames[i]) return frames[i];
    for (var d = 1; d < TOTAL; d++) {
      if (frames[i - d]) return frames[i - d];
      if (frames[i + d]) return frames[i + d];
    }
    return null;
  }

  /* ---------- draw (cover, no letterbox → no background conflict) ---------- */
  function size() {
    var dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    drawn = -1; requestDraw();
  }
  addEventListener("resize", size);

  var drawn = -1;
  function draw(i) {
    var img = nearest(i);
    if (!img) return;
    var cw = canvas.width, ch = canvas.height;
    var s = Math.max(cw / img.width, ch / img.height);
    var w = img.width * s, hgt = img.height * s;
    ctx.drawImage(img, (cw - w) / 2, (ch - hgt) / 2, w, hgt);
    drawn = i;
  }

  /* ---------- beats ---------- */
  var beat = -1;
  function setBeat(b) {
    if (b === beat) return;
    beat = b;
    var B = BEATS[b];
    actEl.textContent = B.act;
    numEl.textContent = String(b + 1).padStart(2, "0");
    quoteEl.innerHTML = B.text.split(/\s+/).map(function (w) {
      return '<span class="w">' + w + "</span>";
    }).join(" ");
    var ws = quoteEl.querySelectorAll(".w");
    ws.forEach(function (w, i) {
      setTimeout(function () { w.classList.add("on"); }, 40 + i * 55);
    });
  }
  function beatFor(f) {
    var b = 0;
    for (var i = 0; i < BEATS.length; i++) if (f >= BEATS[i].at) b = i;
    return b;
  }

  /* ---------- scroll → frame ---------- */
  var target = 0, current = 0, raf = null;
  function onScroll() {
    var r = section.getBoundingClientRect();
    var span = r.height - innerHeight;
    var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
    target = p * (TOTAL - 1);
    if (hintEl) hintEl.classList.toggle("off", p > 0.02);
    requestDraw();
  }
  function requestDraw() {
    if (raf) return;
    raf = requestAnimationFrame(function step() {
      raf = null;
      current += (target - current) * (reduced ? 1 : 0.22);
      if (Math.abs(target - current) < 0.4) current = target;
      var i = Math.round(current);
      if (i !== drawn) draw(i);
      setBeat(beatFor(i));
      if (i !== target && Math.abs(target - current) >= 0.4) requestDraw();
    });
  }
  addEventListener("scroll", onScroll, { passive: true });

  if (reduced) { /* static: show one frame per beat as the page flows */
    section.style.height = "auto";
  }
  size(); onScroll(); setBeat(0);
})();
