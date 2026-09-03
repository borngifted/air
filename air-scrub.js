/* AIR — the eight lessons as a scroll-scrubbed journey
   Method from Affirm' (borngifted/affirmations): 8 still anchors generated in
   the AIR brand world, joined by 7 Seedance 2.5 start→end-frame morphs,
   extracted to webp frames and scrubbed on a canvas by scroll. The scroll
   rests on each lesson, then carries you to the next. */

(function () {
  var MOBILE = matchMedia("(max-width: 720px)").matches;
  var DIR = MOBILE ? "frames-m" : "frames";
  var SEGS = 7, PER = 49, HOLD = 16;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* timeline: hold anchor 1, morph, hold anchor 2, morph, … hold anchor 8 */
  var timeline = []; /* each entry: [segIndex(1-based), frameIndex(1-based)] */
  var anchors = [];  /* timeline positions where each lesson rests */
  for (var s = 1; s <= SEGS; s++) {
    anchors.push(timeline.length);
    for (var h = 0; h < HOLD; h++) timeline.push([s, 1]);
    for (var f = 2; f <= PER; f++) timeline.push([s, f]);
  }
  anchors.push(timeline.length);
  for (var h2 = 0; h2 < HOLD + 8; h2++) timeline.push([SEGS, PER]);
  var TOTAL = timeline.length;

  var LESSONS = [
    { act: "LESSON 1 · CLEAR THE AIR",        text: "Move from fear, hype and overload to <em>one meaningful goal</em>." },
    { act: "LESSON 2 · SEE THE POSSIBILITY",  text: "Understand what makes finished work useful." },
    { act: "LESSON 3 · CHOOSE YOUR MISSION",  text: "Name the person, the problem, the outcome." },
    { act: "LESSON 4 · DIRECT THE MACHINE",   text: "Speak like a creative director — not a magic-prompt hunter." },
    { act: "LESSON 5 · MAKE IT CLEAR",        text: "Let hierarchy, contrast and space do the talking." },
    { act: "LESSON 6 · CHALLENGE THE RESULT", text: "Critique, verify, question, improve. <em>Judgment is the work.</em>" },
    { act: "LESSON 7 · BUILD YOUR WAY",       text: "Turn what worked into your own repeatable workflow." },
    { act: "LESSON 8 · PUT IT IN THE WORLD",  text: "Complete something real. <em>Let someone use it.</em>" },
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
  var cache = {}; /* "s/f" -> Image */
  function key(t) { return t[0] + "/" + t[1]; }
  function src(t) {
    return DIR + "/t" + t[0] + "/f" + String(t[1]).padStart(4, "0") + ".webp";
  }
  function load(t, cb) {
    var k = key(t);
    if (cache[k]) return;
    var img = new Image();
    img.onload = function () { cache[k] = img; if (cb) cb(); };
    img.src = src(t);
  }
  load(timeline[0], function () { drawn = -1; requestDraw(); });
  var qi = 0, inflight = 0;
  (function pump() {
    while (qi < TOTAL && inflight < 6) {
      (function (t) {
        var k = key(t);
        if (!cache[k]) { inflight++; load(t, function () { inflight--; }); }
      })(timeline[qi++]);
    }
    if (qi < TOTAL) setTimeout(pump, 60);
  })();

  function nearest(i) {
    if (cache[key(timeline[i])]) return cache[key(timeline[i])];
    for (var d = 1; d < TOTAL; d++) {
      if (i - d >= 0 && cache[key(timeline[i - d])]) return cache[key(timeline[i - d])];
      if (i + d < TOTAL && cache[key(timeline[i + d])]) return cache[key(timeline[i + d])];
    }
    return null;
  }

  /* ---------- draw: cover, never letterbox ---------- */
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
    var w = img.width * s, hh = img.height * s;
    ctx.drawImage(img, (cw - w) / 2, (ch - hh) / 2, w, hh);
    drawn = i;
  }

  /* ---------- lesson beats ---------- */
  var beat = -1;
  function setBeat(b) {
    if (b === beat) return;
    beat = b;
    var L = LESSONS[b];
    actEl.textContent = L.act;
    numEl.textContent = String(b + 1).padStart(2, "0");
    quoteEl.innerHTML = L.text.split(/\s+/).map(function (w) {
      return '<span class="w">' + w + "</span>";
    }).join(" ");
    quoteEl.querySelectorAll(".w").forEach(function (w, i) {
      setTimeout(function () { w.classList.add("on"); }, 40 + i * 55);
    });
  }
  function beatFor(i) {
    var b = 0;
    for (var k2 = 0; k2 < anchors.length; k2++) if (i >= anchors[k2]) b = k2;
    return Math.min(b, LESSONS.length - 1);
  }

  /* ---------- scroll → timeline ---------- */
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
    raf = requestAnimationFrame(function () {
      raf = null;
      current += (target - current) * (reduced ? 1 : 0.22);
      if (Math.abs(target - current) < 0.4) current = target;
      var i = Math.round(current);
      if (i !== drawn) draw(i);
      setBeat(beatFor(i));
      if (Math.abs(target - current) >= 0.4) requestDraw();
    });
  }
  addEventListener("scroll", onScroll, { passive: true });

  if (reduced) section.style.height = "auto";
  size(); onScroll(); setBeat(0);
})();
