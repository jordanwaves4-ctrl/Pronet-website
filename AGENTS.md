# AGENTS.md

The ProNet website: plain HTML, one stylesheet, one script. No framework, no
package manager, no bundler, no dependencies. Edit the files and reload.

## Run it locally

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173/>. Any static server works; there is nothing to
install or build.

## Styling and behaviour live in exactly two files

- `assets/css/styles.css` — the *only* stylesheet. Type scale, grid, header,
  drawer, galleries all live here. No inline `<style>` blocks, no per-page CSS,
  no `style=` attributes for anything reusable.
- `assets/js/main.js` — the *only* script: slideshow, drawer nav, gallery
  lightbox, form notices. No second JS file, no per-page scripts.

Page markup itself is duplicated: each page is standalone HTML carrying its own
copy of the header, drawer and footer. Changing the nav therefore means changing
every page (and the generator — see below).

## The eight programme pages are generated — do not hand-edit them

`boreholes.html`, `mechanisation.html`, `sanitation.html`,
`hygiene-education.html`, `school-wash.html`, `training.html`,
`assessments.html` and `maintenance.html` are written by
`tools/build-galleries.mjs` from the programme data inside that script.

To change them, edit the data in the generator, then:

```sh
node tools/build-galleries.mjs
```

It rewrites all eight from the shared template and deletes any programme page
whose data entry was removed. **Any hand edit to those eight files is destroyed on
the next run** — make the change in the generator instead.

The other seven pages are hand-written and safe to edit directly: `index.html`,
`work.html`, `why-hygiene.html`, `about.html`, `donate.html`, `faqs.html`,
`contact.html`.

## Conventions worth keeping

- `index.html` is deliberately scroll-free: one full-bleed slideshow sized to the
  viewport.
- The brand green is `--brand-green` (`#3cc63c`) in `styles.css`; the DONATE link
  is the only nav item coloured with it.
- `assets/img/pronet-logo.png` is transparent by design (967 × 507) and floats
  over the hero — do not put a background behind it.

## Publishing

GitHub Pages serves the repository root of `main` at
<https://jordanwaves4-ctrl.github.io/Pronet-website/>. Pushing to `main`
publishes; there is no deploy step to run.

## Locked: the slideshow left and right arrows — never touch them

The previous/next arrows on the home slideshow are **frozen**. Do not edit,
restyle, re-time, re-animate, refactor, relocate or "tidy" them — not as part of
an unrelated task, not as a drive-by improvement, and not because a change
elsewhere seems to invite it. Leave them exactly as they are.

This covers everything that makes them work:

- `assets/css/styles.css` — `.showcase .slide-nav`, `.slide-nav.prev`,
  `.slide-nav.next`, the revealed / `show-left` / `show-right` states, the
  `nav-nudge-left` and `nav-nudge-right` keyframes, their transitions, and the
  reduced-motion overrides for them.
- `index.html` — the two `<button class="slide-nav …">` elements and their SVG
  chevrons.
- `assets/js/main.js` — the arrow reveal logic: `measure()`, `showSide()`,
  `track()`, `clearSide()`, the edge-band calculation, and the
  `pointerenter` / `pointermove` / `pointerdown` / `pointerup` / `pointerleave`
  listeners on `[data-showcase]`.

The only exception is a request that explicitly names the arrows and asks for a
change to them. Anything vaguer ("clean up the hero", "simplify the JS", "make
the interaction smoother") is not that request. If a task appears to need the
arrows changed, stop and ask the user instead of editing them.

If the arrows are affected incidentally — by a shared variable, a global reset,
or a container rule — check them before finishing and preserve their current
behaviour.
