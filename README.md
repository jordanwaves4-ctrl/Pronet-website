# ProNet — WASH in Ghana

Website for ProNet, a Ghanaian non-profit working on water, sanitation and
hygiene. Fifteen hand-written static pages, no build step and no dependencies:
the HTML, CSS and a little vanilla JS are the whole site.

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | Full-bleed photo slideshow home. Deliberately does not scroll — the whole page fits the viewport. |
| `work.html` | The eight programme lines in one chain, each linking to its own page. |
| `boreholes.html`, `mechanisation.html`, `sanitation.html`, `hygiene-education.html`, `school-wash.html`, `training.html`, `assessments.html`, `maintenance.html` | One gallery page per programme line. |
| `why-hygiene.html` | The case for hygiene, framed for funders. |
| `about.html` | Who ProNet is and how it works. |
| `donate.html` | Giving tiers, a partnership brief form and the funder block. |
| `faqs.html` | Fifteen funder questions and answers. |
| `contact.html` | Contact details and district offices. |

## Run it locally

No install, no build. Any static file server works:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173/>.

## Layout

```
*.html                 the fifteen pages; header, drawer nav and footer are copied in each
assets/css/styles.css  all styling: type scale, grid, header, drawer, galleries
assets/js/main.js      slideshow, drawer, gallery lightbox, form notices
assets/img/             photography and the logo
tools/build-galleries.mjs  generator for the eight programme pages
```

## Regenerating the programme pages

The eight programme pages share one template, so they are generated rather than
maintained by hand. Edit the programme data in `tools/build-galleries.mjs`, then:

```sh
node tools/build-galleries.mjs
```

It rewrites those eight pages and removes any programme page whose data entry was
deleted. The other seven pages are hand-written and safe to edit directly.

## The logo

`assets/img/pronet-logo.png` is 967 × 507 with a genuinely transparent background,
rebuilt from the supplied 170 × 89 file by keying out the white and un-premultiplying
the alpha so the edges stay clean. If the original vector artwork (AI, EPS, SVG or
PDF) turns up, replace this file with an SVG — it will stay sharp at any size and
drop the page weight.

## What is still placeholder

Everything visual and factual that ProNet has not supplied yet:

- all photography (`picsum.photos` URLs)
- the figures (96 / 41 / 68 / 87%, 31 staff, 24 districts, 12%)
- staff names (Kwame Asare, Efua Mensah, Yaw Boateng)
- contact details (`info@pronet.org`, `partnerships@pronet.org`, `+233 30 000 0000`, East Legon)
- the donate/partnership form — it shows a confirmation notice and posts nowhere
