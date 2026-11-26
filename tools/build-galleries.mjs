/**
 * Generates the programme fieldwork pages.
 * Run: node tools/build-galleries.mjs
 *
 * Photographs live in assets/img/work/<slug>/ as WebP at 640 and 1200 px wide
 * (team portraits: 480 and 880) — one cut for phones, one for retina and the
 * lightbox. Each programme's `images` array holds the alt text for those files,
 * in order; the page count comes from its length.
 */
import { writeFileSync, unlinkSync, existsSync } from "node:fs";

const WIDTHS = [640, 1200];

const photo = (slug, i, width) =>
  `assets/img/work/${slug}/${String(i + 1).padStart(2, "0")}-${width}.webp`;

const srcset = (slug, i) => WIDTHS.map((w) => `${photo(slug, i, w)} ${w}w`).join(", ");

const programmes = [
  {
    slug: "boreholes",
    title: "boreholes &amp; wells",
    crumb: "boreholes &amp; wells",
    lede: "Drilling, test-pumping and handing over safe water points with the community that asked for them.",
    body: "We drill with a local contractor, test the yield and water quality, and hand the pump to a trained committee with a spare-parts box. A borehole is only finished when the committee can maintain it without us.",
    images: [
      "A drilling rig boring a new borehole in a rural Ghanaian village",
      "Drilling crew guiding the drill string beside the rig",
      "Children taking turns at a newly installed hand pump",
      "A woman filling a basin at a new village hand pump",
      "Test-pumping a new borehole into a measuring container",
      "The community gathered for the handover of a new well",
      "The pump head and concrete apron of a finished borehole",
      "A trained caretaker servicing a hand pump with a spares box"
    ]
  },
  {
    slug: "mechanisation",
    title: "mechanisation &amp; piped systems",
    crumb: "mechanisation &amp; piped systems",
    lede: "Upgrading hand pumps into solar-powered systems and running piped water to standpipes.",
    body: "A mechanised system turns a queue at a pump into taps in a courtyard. We size the tank and pump to the dry-season demand, not the wet-season average, and train two caretakers per site.",
    images: [
      "Solar panels powering a village water system",
      "An elevated storage tank above a Ghanaian village",
      "A woman filling a jerrycan at a courtyard standpipe",
      "A technician wiring a solar pump controller",
      "Laying PVC pipes in a trench towards the village",
      "Children at a newly built standpipe",
      "Workers assembling the steel tank tower",
      "A caretaker opening the valve at a water kiosk"
    ]
  },
  {
    slug: "sanitation",
    title: "sanitation &amp; latrines",
    crumb: "sanitation &amp; latrines",
    lede: "Household and institutional latrines, built with local masons and kept away from water sources.",
    body: "We build with, not for, households: the family digs, we supply the slab and the training. Siting matters as much as the structure — every latrine is placed downslope and away from the well.",
    images: [
      "A mason laying the first blocks of a household latrine",
      "A finished household latrine with a ventilation pipe",
      "Villagers mapping their households at a sanitation meeting",
      "Casting a concrete latrine slab",
      "A school latrine block",
      "A handwashing station beside a household latrine",
      "A household digging the pit for a new latrine",
      "An environmental health officer inspecting a new latrine"
    ]
  },
  {
    slug: "hygiene-education",
    title: "hygiene education",
    crumb: "hygiene education",
    lede: "Handwashing, safe storage and household hygiene, taught by people from the community.",
    body: "Our social staff run sessions in the language of the community, at times the community chooses, with demonstrations rather than leaflets. Follow-up visits measure whether the habit held.",
    images: [
      "A field officer demonstrating handwashing with soap",
      "Showing a family how to use a tippy-tap",
      "Treating household drinking water with chlorine",
      "Pupils washing hands at school taps",
      "A household visit about safe water storage",
      "A community hygiene meeting under a tree",
      "Safe storage of drinking water at home",
      "Soapy hands under running water"
    ]
  },
  {
    slug: "school-wash",
    title: "WASH in schools",
    crumb: "WASH in schools",
    lede: "Water, latrines and handwashing stations in primary schools, plus a hygiene club in each one.",
    body: "A school block without water is a building. We pair every facility with a hygiene club and a teacher who owns the maintenance schedule, so the taps are still working after the handover ceremony.",
    images: [
      "Pupils washing hands at the school's outdoor taps",
      "The school hygiene club with their teacher",
      "A rainwater harvesting tank at the school",
      "The new school latrine block",
      "A pupil drinking from the school water point",
      "A hygiene lesson in a Ghanaian classroom",
      "Pupils collecting water at the school standpipe",
      "Handwashing at a tippy-tap outside the classroom"
    ]
  },
  {
    slug: "training",
    title: "community training",
    crumb: "community training",
    lede: "Pump caretakers, water committees and local masons trained to keep systems running.",
    body: "Every site leaves with named caretakers, a maintenance schedule and a lockable spares box. We return at three months and twelve months to check the record book, not just the pump.",
    images: [
      "Pump caretakers learning to service a hand pump",
      "The water committee reviewing their maintenance record",
      "Local masons training on a latrine build",
      "A women's group session on household water use",
      "Dismantled pump parts laid out for repair training",
      "Handing over the community spare-parts box",
      "A trainer leading a session with a flipchart",
      "Two caretakers repairing a pump together"
    ]
  },
  {
    slug: "assessments",
    title: "assessments &amp; surveys",
    crumb: "assessments &amp; surveys",
    lede: "The baseline work that tells us — and our donors — what a community actually needs.",
    body: "Household surveys, water-point mapping, yield and quality testing, and a costed proposal before any drilling starts. This is the evidence our partners review when they decide whether to fund us.",
    images: [
      "Interviewing a household head during a baseline survey",
      "Mapping water points with the community",
      "Testing water quality at a village well",
      "Measuring the water level in a borehole",
      "A household survey in a village compound",
      "Recording pump details on a phone during a survey",
      "A focus group discussion with community members",
      "Recording the serial number on a village pump"
    ]
  },
  {
    slug: "maintenance",
    title: "operations &amp; maintenance",
    crumb: "operations &amp; maintenance",
    lede: "Repairs, monitoring visits and the five-year record that decides whether we succeeded.",
    body: "We track every water point we have built: functionality, down-time, repair cost and who paid for it. Our headline number is the share still working after five years — currently 87%.",
    images: [
      "The repair team dismantling a pump head",
      "Replacing a rising main pipe in a borehole",
      "A caretaker with the community tool kit",
      "Reviewing the pump logbook with the caretaker",
      "Servicing a motorised pump",
      "A village technician tightening the pump bolts",
      "Spare parts on the shelf at the district store",
      "A monitoring visit to check pump functionality"
    ]
  }
];

const LOGO_MARK = `<img class="brand-logo" src="assets/img/pronet-logo.png" alt="ProNet" width="320" height="168">`;

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
    <p class="count">${p.images.length} photographs</p>
  </div>

  <div class="prose" style="padding-bottom:0">
    <h1 class="display">${p.title}</h1>
    <p class="lede">${p.lede}</p>
    <p>${p.body}</p>
    <p><a href="donate.html">fund this work</a></p>
  </div>

  <div class="grid">
${p.images
  .map((alt, i) => {
    const src = (w) => photo(p.slug, i, w);
    return `    <a class="tile" href="${src(1200)}" data-full="${src(1200)}" aria-label="Open photograph ${i + 1}">
      <img src="${src(640)}"
           srcset="${srcset(p.slug, i)}"
           sizes="(min-width: 900px) 33vw, 50vw"
           width="1200" height="800"
           alt="${alt}"
           loading="${i === 0 ? "eager" : "lazy"}"${i === 0 ? ' fetchpriority="high"' : ""} decoding="async">
      <span class="tile-plus" aria-hidden="true">+</span>
    </a>`;
  })
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
