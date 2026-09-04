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

/* ================= Framework modules (Dweck / Zipf / Navarro) ================= */
(function () {
  /* ---- The Shift to Yet (growth mindset) ---- */
  var MIND = [
    ["I don't know how to code, so I can't build AI tools.",
     "I don't know how to code <span class='yet'>yet</span> — I'm on the curve to building AI tools."],
    ["The AI gave a bad result. I'm terrible at this.",
     "The AI gave a bad result <span class='yet'>yet</span> — that's an informative error to learn from."],
    ["AI is too complicated and changes too fast for me.",
     "AI moves fast <span class='yet'>yet</span> I can navigate it with my own human-led process."],
  ];
  var grid = document.getElementById("mgrid");
  if (grid) {
    var brain = document.getElementById("brain"),
        count = document.getElementById("mcount"),
        ann = document.getElementById("mannounce"),
        shifted = 0;
    MIND.forEach(function (pair) {
      var b = document.createElement("button");
      b.className = "mcard"; b.type = "button"; b.setAttribute("aria-pressed", "false");
      b.innerHTML = "<span class='mlabel'>Fixed</span><span class='mtext'>" + pair[0] + "</span>";
      b.addEventListener("click", function () {
        var on = b.getAttribute("aria-pressed") === "true";
        if (on) {
          b.setAttribute("aria-pressed", "false");
          b.querySelector(".mlabel").textContent = "Fixed";
          b.querySelector(".mtext").innerHTML = pair[0]; shifted--;
        } else {
          b.setAttribute("aria-pressed", "true");
          b.querySelector(".mlabel").textContent = "Growth";
          b.querySelector(".mtext").innerHTML = pair[1]; shifted++;
          ann.textContent = "Shifted to growth: " + pair[1].replace(/<[^>]+>/g, "");
        }
        count.textContent = shifted;
        brain.classList.toggle("lit", shifted > 0);
      });
      grid.appendChild(b);
    });
  }

  /* ---- The Formula of Genius (combinatorial + Zipf) ---- */
  var A = ["a community meeting", "a neighborhood food drive", "a public event flyer",
           "an after-school program", "a local fundraiser"];
  var B = ["warm, plain language", "visible seams left in", "the NIST risk framework",
           "a human-first brief", "one loud accent and lots of space"];
  var C = ["a two-paragraph reminder", "an eight-frame morphed film", "a four-line brief",
           "a one-page explainer", "a 15-second vertical cut"];
  var comboOut = document.getElementById("combo-out");
  if (comboOut) {
    var made = 0, r = function (a) { return a[Math.floor(Math.random() * a.length)]; };
    document.getElementById("combo-go").addEventListener("click", function () {
      comboOut.textContent = "Draft " + r(C) + " for " + r(A) + ", using " + r(B) + ".";
      made++;
      var total = A.length * B.length * C.length;
      document.getElementById("combo-count").innerHTML =
        "Combination <b>" + made + "</b> of <b>" + total + "</b> possible — from just " +
        (A.length + B.length + C.length) + " building blocks.";
    });
  }
  var zipf = document.getElementById("zipf");
  if (zipf) {
    var chart = document.getElementById("zipf-chart"),
        val = document.getElementById("zipf-val"),
        znote = document.getElementById("zipf-note");
    function draw() {
      var n = +zipf.value; val.textContent = n; chart.innerHTML = "";
      for (var i = 1; i <= n; i++) {
        var d = document.createElement("div");
        var master = (i === 1 && n >= 16);
        d.className = "zdot" + (master ? " master" : "");
        d.style.left = ((i - 0.5) / n * 100) + "%";
        d.style.bottom = Math.min(96, (100 / i)) + "%";
        chart.appendChild(d);
      }
      znote.innerHTML = n >= 16
        ? "Enough volume — a <b style='color:var(--air-lime)'>breakthrough outlier</b> emerges. Quantity is how you reach quality."
        : "Mostly noise so far. The signal hides in the outliers — and outliers need volume.";
    }
    zipf.addEventListener("input", draw); draw();
  }

  /* ---- AI Seams & Tells (FBI nonverbals) ---- */
  var TELLS = {
    evidence: { t: "The Detail Tell — computational 'sweating'",
      f: "Like throat-clearing or neck-touching under pressure: the AI states parking and timing it never verified.",
      a: "VERIFY: confirm the schedule and access before you send." },
    privacy: { t: "The Boundary Tell — high-stakes exposure",
      f: "Like withdrawing or crossing feet to manage discomfort: it casually crosses a personal-data line.",
      a: "PAUSE & PROTECT: never put private medical or personal data into a public model." },
    fit: { t: "The Overconfidence Tell — a false baseline",
      f: "Like arms-akimbo posturing: superlatives ('100% accurate') mask the limits of a prediction.",
      a: "CHALLENGE: treat it as a pattern-powered draft, never an absolute answer." },
  };
  var box = document.getElementById("tellbox");
  if (box) {
    document.querySelectorAll(".tell").forEach(function (el) {
      function fire() {
        var d = TELLS[el.dataset.tell]; if (!d) return;
        document.querySelectorAll(".tell").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        el.setAttribute("aria-pressed", "true");
        box.innerHTML = "<h5>" + d.t + "</h5><p>" + d.f + "</p><p class='act'>" + d.a + "</p>";
      }
      el.addEventListener("click", fire);
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire(); } });
    });
  }
})();
