/* AIR — scroll-driven section reveals + dynamic per-section intro lines.
   Each section rises into view; its children cascade in with a stagger; a
   short accent line wipes in above each heading, keyed to the section. */

(function () {
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* a dynamic line introduced for each section, by id */
  var INTROS = {
    mission:   "Start here",
    lessons:   "The whole course, one journey",
    practice:  "Hands on — try it now",
    portal:    "Take it with you",
    resources: "Keep going",
    start:     "Twenty minutes, no tools",
    doors:     "Two ways in",
    watch:     "Made with the method",
    proof:     "Real, and live",
  };

  /* tag children of each section for a staggered cascade */
  var sections = document.querySelectorAll("section");
  sections.forEach(function (sec) {
    var wrap = sec.querySelector(".wrap") || sec;
    var kids = [].filter.call(wrap.children, function (c) {
      return !c.classList.contains("sec-bg");
    });
    kids.forEach(function (c, i) {
      c.classList.add("reveal");
      c.style.setProperty("--d", (i * 90) + "ms");
    });
    /* inject the dynamic intro line before the first heading */
    var id = sec.id;
    var h = wrap.querySelector("h2");
    if (INTROS[id] && h && !wrap.querySelector(".sec-intro")) {
      var line = document.createElement("p");
      line.className = "sec-intro reveal";
      line.style.setProperty("--d", "0ms");
      line.innerHTML = "<span>" + INTROS[id] + "</span>";
      h.parentNode.insertBefore(line, h);
    }
    /* grid cards inside get their own finer stagger once the section is in */
    var cards = wrap.querySelectorAll(".qa .q, .course .ls, .doors .door, .plat a, .cases .case-c");
    cards.forEach(function (c, i) {
      c.classList.add("reveal-card");
      c.style.setProperty("--cd", (i * 70) + "ms");
    });
  });

  if (reduced) {
    /* show everything, no motion */
    document.querySelectorAll(".reveal,.reveal-card,.sec-intro").forEach(function (el) {
      el.classList.add("in");
    });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

  document.querySelectorAll("section").forEach(function (sec) {
    io.observe(sec);
    /* when the section crosses in, flip its reveal children */
    var inner = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          sec.querySelectorAll(".reveal,.reveal-card").forEach(function (el) {
            el.classList.add("in");
          });
          obs.disconnect();
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    inner.observe(sec);
  });
})();
