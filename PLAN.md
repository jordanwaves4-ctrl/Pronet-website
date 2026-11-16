# ProNet — WASH site build

The design system is cloned from captureghana.com (full-bleed slideshow, caption
strip, right slide-out nav, Futura-style type). The content, structure and argument
are rebuilt for a Ghanaian water, sanitation and hygiene organisation.

Open `index.html`, or `python -m http.server 4173` → <http://localhost:4173>.

---

## The argument the site makes

Ordered so a visitor is persuaded before being asked for anything, and so a funder
finds evidence rather than adjectives.

1. **Hero** — six field images, captioned `work / boreholes`, click through to the
   programme.
2. **Statement** — "A hand pump is not safe water. A hand pump that still works in
   five years is." Positions maintenance, not construction, as the product.
3. **Numbers** — water points, systems mechanised, communities, and the 87%
   five-year functionality figure.
4. **What we do** — the eight programme lines, each with its own page and budget.
5. **How we are organised** — the three departments (technical / social /
   administrative), which is also the budget skeleton.
6. **Why hygiene** — the section that distinguishes supply from disease
   prevention; links to the dedicated argument page.
7. **For funders** — costed assessment, line-item budget, capacity record. This is
   the direct answer to the stated bottleneck: international NGOs preferring to
   build directly.
8. **Proof quote** — a committee chair, not a founder.
9. **Get involved** — monthly giving, funded sites, institutional partnership.

## Pages

| File | Job |
| --- | --- |
| `index.html` | Hero, statement, stats, eight work lines, departments, why-hygiene band, funder section, CTA |
| `why-hygiene.html` | The case for hygiene education: three-part problem, teaching method, follow-up measurement |
| `about.html` | Who we are, departments, named responsibility, accountability, site visits |
| `boreholes.html` … `maintenance.html` | Eight programme pages: intro copy plus a field-photo grid with lightbox |
| `donate.html` | Giving tiers mapped to real costs, institutional partnership terms, proposal-request form |
| `faqs.html` | Fifteen funder questions: selection, budgets, contractor policy, reporting, overheads, maintenance |
| `contact.html` | Programmes/partnerships, general enquiries, office, proposal route |

Directories: `assets/css/styles.css`, `assets/js/main.js`, `tools/build-galleries.mjs`.
The eight programme pages are generated — edit the data at the top of the
generator and run `node tools/build-galleries.mjs`. It also deletes the stale
Capture-era pages listed in that file.

## Design decisions carried over from the clone

- The slideshow stays full-viewport with the caption strip: it reads as fieldwork
  documentation, not a stock hero.
- Type: Jost (Futura substitute) for headings and labels, Inter (Proxima
  substitute) for body.
- Hairline rules instead of cards and shadows. Nothing rounded, nothing coloured
  except the paper-warm section bands.
- Every nav item is lowercase except the header, which is uppercase letterspaced.

## What must be replaced before this goes live

- **Photography** — every image is a `picsum.photos` placeholder. Programme pages
  need real field photographs with consent for any identifiable person, especially
  children.
- **Numbers** — 96 / 41 / 68 / 87%, 31 staff, 24 districts, 12% overhead, and the
  four giving tiers are illustrative. Replace with audited figures and the current
  cost schedule.
- **Names** — the three people on `about.html` are placeholders.
- **Contacts** — `info@` / `partnerships@pronet.org`, both phone numbers and the
  East Legon address are placeholders.
- **Legal** — registration number, audited accounts, safeguarding and photo-consent
  policy, privacy policy.
- **Forms** — the partnership form posts nowhere; connect a handler or CRM.

## Not built

No CMS, no payments, no news/blog listing (the nav's "news & resources" is the FAQ
page), no local-language versions, no analytics. Those are Phase 2 in the original
plan and none of them are needed to show a funder the work.
