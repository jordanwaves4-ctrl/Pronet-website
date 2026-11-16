/**
 * Generates the programme fieldwork pages.
 * Run: node tools/build-galleries.mjs
 *
 * Photography is placeholder (picsum.photos). Replace the `images` arrays with
 * the organisation's own field photographs before publishing.
 */
import { writeFileSync, unlinkSync, existsSync } from "node:fs";

const img = (seed, size) => `https://picsum.photos/seed/${seed}/${size}`;

const programmes = [
  {
    slug: "boreholes",
    title: "boreholes &amp; wells",
    crumb: "boreholes &amp; wells",
    lede: "Drilling, test-pumping and handing over safe water points with the community that asked for them.",
    body: "We drill with a local contractor, test the yield and water quality, and hand the pump to a trained committee with a spare-parts box. A borehole is only finished when the committee can maintain it without us.",
    count: "24 photographs",
    images: ["borehole-1", "borehole-2", "borehole-3", "borehole-4", "borehole-5", "borehole-6", "borehole-7", "borehole-8"]
  },
  {
    slug: "mechanisation",
    title: "mechanisation &amp; piped systems",
    crumb: "mechanisation &amp; piped systems",
    lede: "Upgrading hand pumps into solar-powered systems and running piped water to standpipes.",
    body: "A mechanised system turns a queue at a pump into taps in a courtyard. We size the tank and pump to the dry-season demand, not the wet-season average, and train two caretakers per site.",
    count: "18 photographs",
    images: ["mechanised-1", "mechanised-2", "mechanised-3", "mechanised-4", "mechanised-5", "mechanised-6", "mechanised-7", "mechanised-8"]
  },
  {
    slug: "sanitation",
    title: "sanitation &amp; latrines",
    crumb: "sanitation &amp; latrines",
    lede: "Household and institutional latrines, built with local masons and kept away from water sources.",
    body: "We build with, not for, households: the family digs, we supply the slab and the training. Siting matters as much as the structure — every latrine is placed downslope and away from the well.",
    count: "21 photographs",
    images: ["sanitation-1", "sanitation-2", "sanitation-3", "sanitation-4", "sanitation-5", "sanitation-6", "sanitation-7", "sanitation-8"]
  },
  {
    slug: "hygiene-education",
    title: "hygiene education",
    crumb: "hygiene education",
    lede: "Handwashing, safe storage and household hygiene, taught by people from the community.",
    body: "Our social staff run sessions in the language of the community, at times the community chooses, with demonstrations rather than leaflets. Follow-up visits measure whether the habit held.",
    count: "27 photographs",
    images: ["hygiene-1", "hygiene-2", "hygiene-3", "hygiene-4", "hygiene-5", "hygiene-6", "hygiene-7", "hygiene-8"]
  },
  {
    slug: "school-wash",
    title: "WASH in schools",
    crumb: "WASH in schools",
    lede: "Water, latrines and handwashing stations in primary schools, plus a hygiene club in each one.",
    body: "A school block without water is a building. We pair every facility with a hygiene club and a teacher who owns the maintenance schedule, so the taps are still working after the handover ceremony.",
    count: "16 photographs",
    images: ["school-1", "school-2", "school-3", "school-4", "school-5", "school-6", "school-7", "school-8"]
  },
  {
    slug: "training",
    title: "community training",
    crumb: "community training",
    lede: "Pump caretakers, water committees and local masons trained to keep systems running.",
    body: "Every site leaves with named caretakers, a maintenance schedule and a lockable spares box. We return at three months and twelve months to check the record book, not just the pump.",
    count: "19 photographs",
    images: ["training-1", "training-2", "training-3", "training-4", "training-5", "training-6", "training-7", "training-8"]
  },
  {
    slug: "assessments",
    title: "assessments &amp; surveys",
    crumb: "assessments &amp; surveys",
    lede: "The baseline work that tells us — and our donors — what a community actually needs.",
    body: "Household surveys, water-point mapping, yield and quality testing, and a costed proposal before any drilling starts. This is the evidence our partners review when they decide whether to fund us.",
    count: "14 photographs",
    images: ["assessment-1", "assessment-2", "assessment-3", "assessment-4", "assessment-5", "assessment-6", "assessment-7", "assessment-8"]
  },
  {
    slug: "maintenance",
    title: "operations &amp; maintenance",
    crumb: "operations &amp; maintenance",
    lede: "Repairs, monitoring visits and the five-year record that decides whether we succeeded.",
    body: "We track every water point we have built: functionality, down-time, repair cost and who paid for it. Our headline number is the share still working after five years — currently 87%.",
    count: "12 photographs",
    images: ["maintenance-1", "maintenance-2", "maintenance-3", "maintenance-4", "maintenance-5", "maintenance-6", "maintenance-7", "maintenance-8"]
  }
];

const LOGO_MARK = `<img class="brand-logo" src="assets/img/pronet-logo.png" alt="ProNet" width="967" height="507">`;

const drawer = (current) => `
<div class="drawer" id="drawer" data-drawer data-open="false" aria-hidden="true" aria-label="Site menu">
  <div class="drawer-top">
    <span class="label">menu</span>
    <button class="drawer-close" data-drawer-close>close</button>
  </div>
  <nav aria-label="Primary">
    <div>
      <a class="drawer-primary" href="work.html">our work</a>
      <div class="drawer-sub">
        ${programmes.map(p => `<a href="${p.slug}.html">${p.crumb}</a>`).join("\n        ")}
      </div>
    </div>
    <a class="drawer-primary" href="why-hygiene.html"${current === "why-hygiene" ? ' aria-current="page"' : ""}>why hygiene</a>
    <a class="drawer-primary" href="about.html"${current === "about" ? ' aria-current="page"' : ""}>about</a>
    <a class="drawer-primary" href="faqs.html"${current === "faqs" ? ' aria-current="page"' : ""}>news &amp; resources</a>
    <a class="drawer-primary" href="contact.html"${current === "contact" ? ' aria-current="page"' : ""}>contact</a>
    <div class="drawer-minor">
      <a href="donate.html">donate &amp; partner</a>
    </div>
  </nav>
  <div class="drawer-foot">
    <span>Accra, Ghana</span>
    <a href="mailto:info@pronet.org">info@pronet.org</a>
  </div>
</div>`;

const header = (current) => `
<header class="site-header">
  <a class="logo" href="index.html" aria-label="ProNet — home">
    ${LOGO_MARK}
  </a>

  <nav class="header-nav" aria-label="Primary">
    <a href="about.html"${current === "about" ? ' aria-current="page"' : ""}>about</a>
    <a href="why-hygiene.html"${current === "why-hygiene" ? ' aria-current="page"' : ""}>why hygiene</a>
    <a href="work.html"${current === "work" ? ' aria-current="page"' : ""}>our work</a>
    <a href="faqs.html"${current === "faqs" ? ' aria-current="page"' : ""}>news &amp; resources</a>
    <a href="donate.html"${current === "donate" ? ' aria-current="page"' : ""}>donate</a>
  </nav>

  <button class="menu-toggle" data-drawer-toggle aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
    <span></span><span></span>
  </button>
</header>`;

const footer = () => `
<footer class="site-footer">
  <p class="footer-line">ProNet &middot; water, sanitation &amp; hygiene &middot; Accra, Ghana</p>
  <p class="footer-line"><a href="mailto:info@pronet.org">info@pronet.org</a> &middot; <a href="tel:+233300000000">+233 30 000 0000</a></p>
  <p class="footer-line"><a href="donate.html">donate</a> &middot; <a href="faqs.html">resources</a></p>
</footer>`;

const page = (p) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.crumb.replace(/&amp;/g, "&")} — ProNet</title>
<meta name="description" content="${p.lede}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="page-inner">
${header("work")}
${drawer("")}

<main>
  <div class="page-head">
    <p class="crumb">work<span class="slash">/</span>${p.crumb}</p>
    <p class="count">${p.count}</p>
  </div>

  <div class="prose" style="padding-bottom:0">
    <h1 class="display">${p.title}</h1>
    <p class="lede">${p.lede}</p>
    <p>${p.body}</p>
    <p><a href="donate.html">fund this work</a></p>
  </div>

  <div class="grid">
${p.images
  .map(
    (seed, i) => `    <a class="tile" href="${img(seed, 2000)}" data-full="${img(seed, 2000)}" aria-label="Open field photograph ${i + 1}">
      <img src="${img(seed, 900)}" alt="ProNet field photograph — ${p.crumb.replace(/&amp;/g, "&")} ${i + 1}" loading="${i < 3 ? "eager" : "lazy"}">
      <span class="tile-plus" aria-hidden="true">+</span>
    </a>`
  )
  .join("\n")}
  </div>
</main>

${footer()}

<div class="lightbox" data-lightbox data-open="false" aria-hidden="true" role="dialog" aria-label="Image viewer">
  <button class="lightbox-close" data-lightbox-close>close</button>
  <img src="" alt="">
  <div class="lightbox-nav">
    <button data-lightbox-prev>prev</button>
    <button data-lightbox-next>next</button>
  </div>
</div>

<script src="assets/js/main.js" defer></script>
</body>
</html>
`;

const stale = [
  "weddingpics.html", "socialeventpics.html", "corporateeventspics.html", "docu.html",
  "aerialpics.html", "real-esate.html", "people.html", "corporate-portraits.html",
  "fashion.html", "foodpics.html", "industrialpics.html", "product.html",
  "film-portfolio.html", "contact-1.html", "bookings.html"
];

for (const p of programmes) {
  writeFileSync(`${p.slug}.html`, page(p));
}

let removed = 0;
for (const f of stale) {
  if (existsSync(f)) { unlinkSync(f); removed++; }
}

console.log(`wrote ${programmes.length} programme pages, removed ${removed} stale pages`);
