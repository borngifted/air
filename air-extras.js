/* AIR — practice widgets. Everything stays in this browser (localStorage). */
(function () {
  var LS = "air-";
  function save(k, v) { try { localStorage.setItem(LS + k, JSON.stringify(v)); } catch (e) {} }
  function load(k, d) { try { var v = localStorage.getItem(LS + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }

  /* ---- 01 · Readiness Pulse ---- */
  var SIGNALS = [
    ["PURPOSE", "I can name the human outcome first."],
    ["PRACTICE", "I can give useful context and constraints."],
    ["JUDGMENT", "I can inspect important claims and assumptions."],
    ["CARE", "I can spot privacy, fairness, and high-stakes concerns."],
  ];
  var LEVELS = ["Exploring", "Practicing", "Confident"];
  var pulseGrid = document.getElementById("pulse-grid");
  if (pulseGrid) {
    var state = load("pulse", {});
    function pulseCount() {
      var n = Object.keys(state).length;
      document.getElementById("pulse-count").textContent = n;
    }
    SIGNALS.forEach(function (sig, i) {
      var d = document.createElement("div");
      d.className = "pg";
      d.innerHTML = "<b>" + sig[0] + "</b><span>" + sig[1] + "</span>";
      var opts = document.createElement("div");
      opts.className = "opts";
      LEVELS.forEach(function (lv) {
        var b = document.createElement("button");
        b.className = "pill" + (state[i] === lv ? " on" : "");
        b.textContent = lv;
        b.addEventListener("click", function () {
          state[i] = lv; save("pulse", state);
          opts.querySelectorAll(".pill").forEach(function (p) { p.classList.toggle("on", p === b); });
          pulseCount();
        });
        opts.appendChild(b);
      });
      d.appendChild(opts);
      pulseGrid.appendChild(d);
    });
    pulseCount();
  }

  /* ---- 03 · Task Fit sorter ---- */
  var TASKS = [
    ["“Brainstorm questions for a community meeting.”", 0, "Low stakes, easy to inspect — a good place to practice."],
    ["“Summarize this public article for our newsletter.”", 1, "Useful — but verify names, numbers and claims before sharing."],
    ["“Draft a reply about a neighbor's medical situation.”", 2, "Private, sensitive, personal. Keep it human-led."],
    ["“Suggest color palettes for the fundraiser flyer.”", 0, "Reversible and visual — practice freely, judge the result."],
    ["“Write the grant budget narrative.”", 1, "Draft with care — every figure needs human verification."],
    ["“Decide which volunteer applications to accept.”", 2, "Decisions about people stay with people."],
  ];
  var sortN = document.getElementById("sort-n");
  if (sortN) {
    var si = 0;
    var taskEl = document.getElementById("sort-task"), fbEl = document.getElementById("sort-fb");
    function showTask() {
      taskEl.textContent = TASKS[si][0];
      sortN.textContent = si + 1;
      fbEl.textContent = "";
    }
    document.querySelectorAll("#sorter .pill").forEach(function (b) {
      b.addEventListener("click", function () {
        var pick = +b.dataset.b, right = TASKS[si][1];
        fbEl.innerHTML = (pick === right ? "<b>Good call.</b> " : "<b>Worth a pause.</b> ") + TASKS[si][2];
        setTimeout(function () { si = (si + 1) % TASKS.length; showTask(); }, 2600);
      });
    });
    showTask();
  }

  /* ---- 04 · Brief builder ---- */
  var PARTS = {
    context: "I coordinate a neighborhood food drive.",
    task: "Draft a two-paragraph reminder for returning volunteers.",
    constraints: "Use warm, plain language. Include arrival time and what to bring. Avoid guilt-based language.",
    check: "Put any missing details in a short ‘Confirm before sending’ list.",
  };
  var briefOut = document.getElementById("brief-out");
  if (briefOut) {
    var on = { context: true, task: true, constraints: true, check: true };
    function renderBrief() {
      var txt = ["context", "task", "constraints", "check"]
        .filter(function (k) { return on[k]; })
        .map(function (k) { return PARTS[k]; }).join(" ");
      briefOut.textContent = txt || "(toggle at least one layer)";
    }
    document.querySelectorAll("#brief .brief-toggles .pill").forEach(function (b) {
      b.addEventListener("click", function () {
        on[b.dataset.k] = !on[b.dataset.k];
        b.classList.toggle("on", on[b.dataset.k]);
        renderBrief();
      });
    });
    document.getElementById("brief-copy").addEventListener("click", function () {
      navigator.clipboard && navigator.clipboard.writeText(briefOut.textContent).then(function () {
        var btn = document.getElementById("brief-copy");
        btn.textContent = "Copied ✓"; setTimeout(function () { btn.textContent = "Copy prompt"; }, 1600);
      });
    });
    renderBrief();
  }

  /* ---- 05 · Review signals ---- */
  var REVIEW = [
    ["FIT", "Does it answer the task for the intended audience?"],
    ["EVIDENCE", "Which dates, names, numbers, or claims need verification?"],
    ["PEOPLE", "Could it exclude, stereotype, mislead, or unfairly affect someone?"],
    ["PRIVACY", "Did I expose anything I did not have permission to share?"],
  ];
  var revGrid = document.getElementById("rev-grid");
  if (revGrid) {
    var done = 0, leftEl = document.getElementById("rev-left");
    REVIEW.forEach(function (r) {
      var b = document.createElement("button");
      b.className = "rv";
      b.innerHTML = "<b>" + r[0] + "</b><span>" + r[1] + "</span>";
      b.addEventListener("click", function () {
        if (b.classList.contains("done")) return;
        b.classList.add("done"); done++;
        leftEl.textContent = 4 - done;
        if (done === 4) leftEl.parentElement.innerHTML = "All four checked — <b style='color:var(--air-lime)'>now you decide</b>";
      });
      revGrid.appendChild(b);
    });
  }

  /* ---- 06 · Scenarios ---- */
  var SCEN = [
    ["You want headline ideas for a public event flyer.", 0, "Creative, low-stakes, fully inspectable — practice and edit."],
    ["AI drafted a claim about a local law for your post.", 1, "Laws change and models lag. Verify against the source first."],
    ["You're tempted to paste a client's contract in for a summary.", 2, "Someone else's confidential material — pause and protect it."],
    ["Choosing which community member gets emergency funds.", 3, "High-stakes judgment about people. Keep it human-led."],
  ];
  var scenN = document.getElementById("scen-n");
  if (scenN) {
    var ci = 0;
    var scenTask = document.getElementById("scen-task"), scenFb = document.getElementById("scen-fb");
    function showScen() { scenTask.textContent = SCEN[ci][0]; scenN.textContent = ci + 1; scenFb.textContent = ""; }
    document.querySelectorAll("#scen-btns .pill").forEach(function (b) {
      b.addEventListener("click", function () {
        var pick = +b.dataset.b, right = SCEN[ci][1];
        scenFb.innerHTML = (pick === right ? "<b>Good call.</b> " : "<b>Worth a pause.</b> ") + SCEN[ci][2];
        setTimeout(function () { ci = (ci + 1) % SCEN.length; showScen(); }, 2600);
      });
    });
    showScen();
  }

  /* ---- 07 · Action plan ---- */
  var FIELDS = ["p-task", "p-out", "p-priv", "p-ver", "p-when"];
  var plan = document.getElementById("plan");
  if (plan) {
    var saved = load("plan", {});
    FIELDS.forEach(function (id) {
      var el = document.getElementById(id);
      if (saved[id]) el.value = saved[id];
      el.addEventListener("input", function () {
        saved[id] = el.value; save("plan", saved);
      });
    });
    document.getElementById("plan-copy").addEventListener("click", function () {
      var labels = ["One safe task", "Human outcome", "Stays private", "How I'll verify", "When"];
      var txt = "MY AIR PLAN\n" + FIELDS.map(function (id, i) {
        return labels[i] + ": " + (document.getElementById(id).value || "—");
      }).join("\n");
      navigator.clipboard && navigator.clipboard.writeText(txt).then(function () {
        var btn = document.getElementById("plan-copy");
        btn.textContent = "Copied ✓"; setTimeout(function () { btn.textContent = "Copy my plan"; }, 1600);
      });
    });
    document.getElementById("plan-clear").addEventListener("click", function () {
      FIELDS.forEach(function (id) { document.getElementById(id).value = ""; });
      saved = {}; save("plan", saved);
    });
  }
})();

/* ---- section video atmosphere: play only in view, respect data saver ---- */
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (navigator.connection && navigator.connection.saveData) return;
  var vids = document.querySelectorAll("[data-secvid]");
  if (!vids.length || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (en.isIntersecting) {
        if (v.readyState === 0) v.load();
        var p = v.play();
        if (p) p.then(function () { v.classList.add("playing"); })
               .catch(function () { setTimeout(function () {
                 v.play().then(function(){ v.classList.add("playing"); }).catch(function(){}); }, 600); });
      } else { v.pause(); v.classList.remove("playing"); }
    });
  }, { rootMargin: "120px" });
  vids.forEach(function (v) {
    v.addEventListener("playing", function () { v.classList.add("playing"); });
    io.observe(v);
  });
})();
