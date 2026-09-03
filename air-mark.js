/* AIR — the mark IS the interface
   Ported from the Figma Make prototype ("Interactive AIR Presentation"):
   the full-screen AIR mark is the home screen, its i-dot is a draggable
   playhead with eight stops, arrow keys and number keys navigate, and each
   lesson re-crops the oversized mark geometry behind the stage. */

(function () {
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var LESSONS = [
    { kicker: "AI READINESS", num: "00",
      title: "Clear the air.<br>Un-clutter the mindset.",
      line: "Communicate with intention. Drag the dot — or press → — to begin.",
      crop: { s: 2.8, x: -90, y: -40 } },
    { kicker: "LESSON 1 · CLEAR THE AIR", num: "01",
      title: "One meaningful <em>goal</em>.",
      line: "Move from fear, hype and overload to the single thing you actually want to make.",
      crop: { s: 5.2, x: -30, y: -20 } },
    { kicker: "LESSON 2 · SEE THE POSSIBILITY", num: "02",
      title: "Useful beats <em>impressive</em>.",
      line: "Understand what makes finished work useful to a real person.",
      crop: { s: 4.6, x: -160, y: -60 } },
    { kicker: "LESSON 3 · CHOOSE YOUR MISSION", num: "03",
      title: "Person. Problem. <em>Outcome</em>.",
      line: "Name who it's for, what it fixes, and what exists when you're done.",
      crop: { s: 5.8, x: -95, y: -110 } },
    { kicker: "LESSON 4 · DIRECT THE MACHINE", num: "04",
      title: "Direct, don't <em>wish</em>.",
      line: "Speak to AI like a creative director — not a magic-prompt hunter.",
      crop: { s: 5.0, x: -60, y: -150 } },
    { kicker: "LESSON 5 · MAKE IT CLEAR", num: "05",
      title: "Let space do the <em>talking</em>.",
      line: "Hierarchy, contrast, alignment. Design is how the message survives.",
      crop: { s: 4.2, x: -190, y: -30 } },
    { kicker: "LESSON 6 · CHALLENGE THE RESULT", num: "06",
      title: "Judgment is the <em>work</em>.",
      line: "Critique, verify, question, improve. Generating is only the beginning.",
      crop: { s: 6.4, x: -120, y: -70 } },
    { kicker: "LESSON 7 · BUILD YOUR WAY", num: "07",
      title: "Make it <em>repeatable</em>.",
      line: "Turn what worked into a workflow you can run again — and hand to someone else.",
      crop: { s: 4.8, x: -20, y: -90 } },
    { kicker: "LESSON 8 · PUT IT IN THE WORLD", num: "08",
      title: "Finish. <em>Release.</em>",
      line: "Complete something real and let someone use it. That's the whole point.",
      crop: { s: 3.4, x: -140, y: -130 } },
  ];
  var N = LESSONS.length; /* 9 states: intro + 8 lessons */

  var stage = document.querySelector(".markstage");
  if (!stage) return;
  var dot = document.getElementById("idot");
  var track = document.getElementById("dottrack");
  var stopsEl = document.getElementById("dotstops");
  var scene = document.getElementById("scenemark");
  var kickerEl = document.getElementById("lesson-kicker");
  var titleEl = document.getElementById("lesson-title");
  var lineEl = document.getElementById("lesson-line");
  var numEl = document.getElementById("lesson-num");

  /* stop markers */
  var stops = [];
  for (var i = 0; i < N; i++) {
    var m = document.createElement("i");
    m.style.left = (i / (N - 1)) * 100 + "%";
    stopsEl.appendChild(m);
    stops.push(m);
  }

  var cur = -1;
  function setLesson(n, announce) {
    n = Math.max(0, Math.min(N - 1, n));
    if (n === cur) return;
    cur = n;
    var L = LESSONS[n];
    kickerEl.textContent = L.kicker;
    titleEl.innerHTML = L.title;
    lineEl.textContent = L.line;
    numEl.textContent = L.num;
    dot.style.left = (n / (N - 1)) * 100 + "%";
    dot.setAttribute("aria-valuenow", n);
    dot.setAttribute("aria-valuetext", L.kicker);
    stops.forEach(function (s, i) { s.classList.toggle("past", i <= n); });
    /* re-crop the giant background mark */
    scene.style.transform = "scale(" + (L.crop.s / 2.8) + ")";
    scene.style.left = L.crop.x + "%";
    scene.style.top = L.crop.y + "%";
    if (!reduced) {
      stage.classList.remove("wipe");
      void stage.offsetWidth; /* restart animation */
      stage.classList.add("wipe");
    }
  }

  /* --- drag --- */
  var dragging = false;
  function posToLesson(clientX) {
    var r = track.getBoundingClientRect();
    var p = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    return Math.round(p * (N - 1));
  }
  dot.setAttribute("role", "slider");
  dot.setAttribute("aria-valuemin", 0);
  dot.setAttribute("aria-valuemax", N - 1);
  dot.addEventListener("pointerdown", function (e) {
    dragging = true; dot.classList.add("drag");
    dot.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  dot.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    setLesson(posToLesson(e.clientX));
  });
  ["pointerup", "pointercancel"].forEach(function (ev) {
    dot.addEventListener(ev, function () { dragging = false; dot.classList.remove("drag"); });
  });
  track.addEventListener("pointerdown", function (e) {
    if (e.target === dot) return;
    setLesson(posToLesson(e.clientX));
  });

  /* --- keyboard --- */
  addEventListener("keydown", function (e) {
    if (e.target.matches("input,textarea,[contenteditable]")) return;
    if (e.key === "ArrowRight") { setLesson(cur + 1); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { setLesson(cur - 1); e.preventDefault(); }
    else if (/^[1-8]$/.test(e.key)) { setLesson(+e.key); }
    else if (e.key === "0" || e.key === "Home") { setLesson(0); }
  });

  /* --- hover zones on the mark: three letterform regions preview stops --- */
  var hero = document.getElementById("heromark");
  var ZONES = [ /* x-ranges of the 2048 viewBox → lesson to preview */
    { x0: 0, x1: 760, to: 1 },     /* A → begin */
    { x0: 760, x1: 1180, to: 4 },  /* i → direct the machine */
    { x0: 1180, x1: 2048, to: 8 }, /* R → put it in the world */
  ];
  hero.addEventListener("click", function (e) {
    var r = hero.getBoundingClientRect();
    var x = ((e.clientX - r.left) / r.width) * 2048;
    for (var z = 0; z < ZONES.length; z++)
      if (x >= ZONES[z].x0 && x < ZONES[z].x1) { setLesson(ZONES[z].to); return; }
  });
  hero.style.cursor = "pointer";

  setLesson(0);
})();
