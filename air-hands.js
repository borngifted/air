/* AIR — webcam hand-conducting (ported from Affirm' site/hands.js)
   MediaPipe Tasks Vision HandLandmarker: your wrist height becomes the
   lesson playhead. Raise your hand to move forward through the eight
   lessons, lower it to move back. Loaded lazily on first toggle; the
   camera feed is processed entirely in your browser and never uploaded. */

(function () {
  var CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
  var MODEL_URL =
    "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
  var FINGERTIPS = [4, 8, 12, 16, 20];
  var NO_HAND_MS = 700;
  var ERROR_LINGER_MS = 1800;

  var toggle = document.getElementById("hands-toggle");
  var label = document.getElementById("hands-label");
  if (!toggle) return;

  var landmarker = null, stream = null, running = false, rafId = 0;
  var card = null, video = null, dots = null, statusEl = null;

  function buildCard() {
    card = document.createElement("aside");
    card.className = "hands-card";
    card.setAttribute("aria-live", "polite");
    card.innerHTML =
      '<div class="hands-view">' +
      '<video class="hands-video" autoplay playsinline muted></video>' +
      '<canvas class="hands-dots"></canvas>' +
      "</div>" +
      '<p class="hands-status">REQUESTING…</p>';
    document.body.appendChild(card);
    video = card.querySelector(".hands-video");
    dots = card.querySelector(".hands-dots");
    statusEl = card.querySelector(".hands-status");
  }
  function setStatus(t) { if (statusEl) statusEl.textContent = t; }
  function removeCard() { if (card) card.remove(); card = video = dots = statusEl = null; }
  function stopStream() { if (stream) stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }

  function fail(labelTxt) {
    setStatus(labelTxt);
    if (card) card.classList.add("hands-error");
    running = false;
    cancelAnimationFrame(rafId);
    stopStream();
    setTimeout(removeCard, ERROR_LINGER_MS);
    setToggle(false);
  }

  function drawDots(landmarks) {
    var ctx = dots.getContext("2d");
    ctx.clearRect(0, 0, dots.width, dots.height);
    if (!landmarks) return;
    ctx.fillStyle = "#D8FF45";
    for (var k = 0; k < FINGERTIPS.length; k++) {
      var lm = landmarks[FINGERTIPS[k]];
      ctx.beginPath();
      ctx.arc((1 - lm.x) * dots.width, lm.y * dots.height, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* the dot follows your hand: hand X (mirrored, matching the preview) maps
     straight onto the playhead track. Move your hand left↔right and the dot
     glides with it; stops switch as you cross them. */
  var lastVideoTime = -1, smoothed = -1, lastSeen = 0;

  function loop(now) {
    if (!running) return;
    if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;
      var res = landmarker.detectForVideo(video, now);
      var hand = res.landmarks && res.landmarks[0];
      if (hand) {
        /* palm center (avg of wrist + middle-mcp) is steadier than the wrist */
        var cx = (hand[0].x + hand[9].x) / 2;
        var mx = 1 - cx; /* mirror so moving right moves the dot right */
        var p = Math.max(0, Math.min(1, (mx - 0.12) / 0.76));
        var N = (window.AIR ? window.AIR.lessons : 9) - 1;
        var target = p * N;
        smoothed = smoothed < 0 ? target : smoothed + (target - smoothed) * 0.45;
        if (window.AIR) window.AIR.setPos(smoothed);
        lastSeen = now;
        setStatus("TRACKING · move your hand left and right");
        drawDots(hand);
      } else {
        drawDots(null);
        if (now - lastSeen > NO_HAND_MS) {
          setStatus("NO HAND — show your palm");
          if (window.AIR && window.AIR.releasePos) window.AIR.releasePos();
          smoothed = -1;
        }
      }
    }
    rafId = requestAnimationFrame(loop);
  }

  async function enable() {
    buildCard();
    if (!landmarker) {
      try {
        var vision = await import(CDN + "/+esm");
        var files = await vision.FilesetResolver.forVisionTasks(CDN + "/wasm");
        var make = function (delegate) {
          return vision.HandLandmarker.createFromOptions(files, {
            baseOptions: { modelAssetPath: MODEL_URL, delegate: delegate },
            runningMode: "VIDEO",
            numHands: 1,
          });
        };
        landmarker = await make("GPU").catch(function () { return make("CPU"); });
      } catch (err) { fail("LOAD FAILED"); return; }
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" }, audio: false,
      });
    } catch (err) { fail("CAMERA BLOCKED"); return; }
    video.srcObject = stream;
    await video.play().catch(function () {});
    var view = card.querySelector(".hands-view");
    dots.width = view.clientWidth; dots.height = view.clientHeight;
    lastVideoTime = -1; smoothed = -1; lastSeen = performance.now();
    running = true;
    setStatus("SHOW YOUR PALM · move it left–right");
    rafId = requestAnimationFrame(loop);
  }

  function disable() {
    running = false;
    cancelAnimationFrame(rafId);
    stopStream();
    removeCard();
    if (window.AIR && window.AIR.releasePos) window.AIR.releasePos();
  }

  function setToggle(on) {
    toggle.setAttribute("aria-pressed", on ? "true" : "false");
    label.textContent = on ? "HANDS ON" : "HANDS OFF";
    toggle.classList.toggle("on", on);
  }

  toggle.addEventListener("click", function () {
    var on = toggle.getAttribute("aria-pressed") === "true";
    if (on) { disable(); setToggle(false); }
    else { setToggle(true); enable(); }
  });
})();
