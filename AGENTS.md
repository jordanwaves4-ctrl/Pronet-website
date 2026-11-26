# Project notes

## Locked: the slideshow left and right arrows

The previous/next arrows on the home slideshow are **frozen**. Do not edit,
restyle, re-time, re-animate, refactor, relocate or "tidy" them — not as part of
an unrelated task, not as a drive-by improvement, and not because a change
elsewhere seems to invite it. Leave them exactly as they are.

This covers everything that makes them work:

- `assets/css/styles.css` — `.showcase .slide-nav`, `.slide-nav.prev`,
  `.slide-nav.next`, the revealed/`show-left`/`show-right` states, the
  `nav-nudge-left` / `nav-nudge-right` keyframes, their transitions, and the
  reduced-motion overrides for them.
- `index.html` — the two `<button class="slide-nav …">` elements and their SVG
  chevrons.
- `assets/js/main.js` — the arrow reveal logic: `measure()`, `showSide()`,
  `track()`, `clearSide()`, the edge band calculation, and the
  `pointerenter` / `pointermove` / `pointerdown` / `pointerup` / `pointerleave`
  listeners on `[data-showcase]`.

The only exception is a request that explicitly names the arrows and asks for a
change to them. Anything vaguer ("clean up the hero", "simplify the JS", "make
the interaction smoother") is not that request. If a task appears to need the
arrows changed, stop and ask the user instead of editing them.

If the arrows are affected incidentally — for example by a shared variable, a
global reset, or a container rule — check them before finishing and preserve
their current behaviour.
