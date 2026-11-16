/* CAPTURE clone — slideshow, slide-out nav, lightbox */
(function () {
  "use strict";

  /* ---------- slide-out nav ---------- */
  var drawer = document.querySelector("[data-drawer]");
  var toggle = document.querySelector("[data-drawer-toggle]");

  function setDrawer(open) {
    if (!drawer) return;
    drawer.setAttribute("data-open", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("drawer-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (toggle) toggle.addEventListener("click", function () { setDrawer(true); });
  document.querySelectorAll("[data-drawer-close]").forEach(function (el) {
    el.addEventListener("click", function () { setDrawer(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setDrawer(false); closeLightbox(); }
  });

  /* ---------- homepage slideshow ---------- */
  var showcase = document.querySelector("[data-showcase]");
  if (showcase) {
    var slides = Array.prototype.slice.call(showcase.querySelectorAll(".slide"));
    var index = 0;
    var timer = null;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, n) {
        slide.classList.toggle("is-active", n === index);
        slide.setAttribute("aria-hidden", n === index ? "false" : "true");
        var counter = slide.querySelector("[data-slide-count]");
        if (counter) counter.textContent = String(n + 1);
      });
    }

    function start() {
      if (reduce) return;
      stop();
      timer = window.setInterval(function () { show(index + 1); }, 5200);
    }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    /* ---------- arrow controls ---------- */
    var prevBtn = showcase.querySelector("[data-slide-prev]");
    var nextBtn = showcase.querySelector("[data-slide-next]");
    var hovering = false;

    /* stepping by hand restarts the dwell timer so the new slide gets its full
       turn — unless the pointer is resting on the photo, which holds it still */
    function step(delta) {
      show(index + delta);
      stop();
      if (!hovering) start();
    }

    [[prevBtn, -1], [nextBtn, 1]].forEach(function (pair) {
      if (!pair[0]) return;
      pair[0].addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        step(pair[1]);
      });
    });

    showcase.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });

    /* which half of the slideshow the pointer sits in decides which arrow shows:
       left half reveals the previous arrow, right half the next one, never both */
    function showSide(clientX) {
      var box = showcase.getBoundingClientRect();
      var onLeft = clientX < box.left + box.width / 2;
      showcase.classList.toggle("show-left", onLeft);
      showcase.classList.toggle("show-right", !onLeft);
    }

    function clearSide() {
      showcase.classList.remove("show-left", "show-right");
    }

    showcase.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      showSide(e.clientX);
    });
    showcase.addEventListener("pointerdown", function (e) { showSide(e.clientX); });
    showcase.addEventListener("pointerleave", clearSide);
    showcase.addEventListener("pointercancel", clearSide);

    /* pause while someone is looking at a slide (mouse only, not touch) */
    showcase.addEventListener("pointerenter", function (e) {
      if (e.pointerType !== "mouse") return;
      hovering = true;
      stop();
    });
    showcase.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "mouse") return;
      hovering = false;
      start();
    });

    show(0);
    start();
  }

  /* ---------- gallery lightbox ---------- */
  var lightbox = document.querySelector("[data-lightbox]");
  var lbImg = lightbox ? lightbox.querySelector("img") : null;
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile[data-full]"));
  var current = -1;

  function openAt(i) {
    if (!lightbox || !lbImg || !tiles.length) return;
    current = (i + tiles.length) % tiles.length;
    var tile = tiles[current];
    var img = tile.querySelector("img");
    lbImg.src = tile.getAttribute("data-full") || (img && img.src) || "";
    lbImg.alt = (img && img.alt) || "";
    lightbox.setAttribute("data-open", "true");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute("data-open", "false");
    lightbox.setAttribute("aria-hidden", "true");
    if (!document.body.classList.contains("drawer-open")) return;
    document.body.classList.remove("drawer-open");
  }

  tiles.forEach(function (tile, i) {
    tile.addEventListener("click", function (e) {
      e.preventDefault();
      openAt(i);
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (b) {
      b.addEventListener("click", closeLightbox);
    });
    var prev = lightbox.querySelector("[data-lightbox-prev]");
    var next = lightbox.querySelector("[data-lightbox-next]");
    if (prev) prev.addEventListener("click", function () { openAt(current - 1); });
    if (next) next.addEventListener("click", function () { openAt(current + 1); });
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || lightbox.getAttribute("data-open") !== "true") return;
    if (e.key === "ArrowRight") openAt(current + 1);
    if (e.key === "ArrowLeft") openAt(current - 1);
  });

  /* ---------- booking form (Formspree endpoint) ---------- */
  var form = document.querySelector("form.bookings");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-note]");
      var btn = form.querySelector("button[type=submit]");
      if (note) {
        note.setAttribute("data-show", "false");
        notice.textContent = "Sending…";
      }
      if (btn) btn.disabled = true;
    });
  }
  // Handle Formspree success/error via the native event
  document.addEventListener("WebFormSubmitted", function (e) {
    var submittedForm = e.detail && e.detail[0] ? e.detail[0] : document.querySelector("form.bookings");
    if (!submittedForm) return;
    var note = submittedForm.querySelector("[data-form-note]");
    var btn = submittedForm.querySelector("button[type=submit]");
    if (e.detail[1] === "success") {
      if (note) {
        note.setAttribute("data-show", "false");
        notice.textContent = "Thank you! Your brief has been sent.";
      }
      if (btn) btn.disabled = false;
    } else {
      if (note) {
        note.setAttribute("data-show", "false");
        notice.textContent = "There was a problem sending your brief. Please try again.";
      }
      if (btn) btn.disabled = false;
    }
  });

})();