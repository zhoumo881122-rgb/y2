import fs from "node:fs";
import path from "node:path";

const rootDir = "E:/codex/vagatools/y2";
const config = JSON.parse(fs.readFileSync(path.join(rootDir, "seo.config.json"), "utf8"));
const today = new Date().toISOString().slice(0, 10);
const siteUrl = config.siteUrl.replace(/\/$/, "");
const langUrl = (code) => `${siteUrl}/${code}/`;
const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

function alternateLinks(currentCode) {
  const links = config.languages.map((lang) =>
    `    <link rel="alternate" hreflang="${lang.code}" href="${langUrl(lang.code)}">`
  );
  links.push(`    <link rel="alternate" hreflang="x-default" href="${langUrl(config.defaultLanguage)}">`);
  return links.join("\n");
}

function pageHtml(lang) {
  const isRtl = lang.code === "ar";
  const url = langUrl(lang.code);
  const keywords = lang.keywords.join(", ");
  const faqJson = lang.faq.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer
    }
  }));

  return `<!doctype html>
<html lang="${lang.code}"${isRtl ? " dir=\"rtl\"" : ""}>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(lang.title)} | ${escapeHtml(config.siteName)}</title>
    <meta name="description" content="${escapeHtml(lang.description)}">
    <meta name="keywords" content="${escapeHtml(keywords)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#0f766e">
    <link rel="canonical" href="${url}">
${alternateLinks(lang.code)}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${escapeHtml(config.siteName)}">
    <meta property="og:title" content="${escapeHtml(lang.title)}">
    <meta property="og:description" content="${escapeHtml(lang.description)}">
    <meta property="og:url" content="${url}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeHtml(lang.title)}">
    <meta name="twitter:description" content="${escapeHtml(lang.description)}">
    <link rel="stylesheet" href="../styles.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9943771829287979" crossorigin="anonymous"></script>
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: `${config.siteName} ${lang.h1}`,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url,
        inLanguage: lang.code,
        description: lang.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
      }, null, 8)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: lang.code,
        mainEntity: faqJson
      }, null, 8)}
    </script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="../" aria-label="${escapeHtml(config.siteName)} home">
        <span class="brand-mark">V</span>
        <span>${escapeHtml(config.siteName)}</span>
      </a>
      <nav class="top-nav" aria-label="Language navigation">
        ${config.languages.map((item) => `<a href="${lang.code === item.code ? "#" : langUrl(item.code)}">${escapeHtml(item.name)}</a>`).join("\n        ")}
      </nav>
    </header>

    <main>
      <section class="tool-section" aria-labelledby="main-title">
        <div class="tool-copy">
          <p class="eyebrow">${escapeHtml(lang.keywords[0])}</p>
          <h1 id="main-title">${escapeHtml(lang.h1)}</h1>
          <p class="intro">${escapeHtml(lang.intro)}</p>
        </div>

        <form class="converter" action="../download.html">
          <label for="videoUrl">YouTube URL</label>
          <div class="url-row">
            <input id="videoUrl" name="url" type="url" inputmode="url" placeholder="https://www.youtube.com/watch?v=..." autocomplete="url" required>
            <button type="submit">Start</button>
          </div>
          <div class="format-row" aria-label="Choose output format">
            <label class="choice"><input type="radio" name="format" value="MP4" checked><span>MP4</span></label>
            <label class="choice"><input type="radio" name="format" value="MP3"><span>MP3</span></label>
            <label class="choice"><input type="radio" name="format" value="WEBM"><span>WEBM</span></label>
          </div>
        </form>

        <div class="ad-slot" aria-label="Advertisement">
          <span>Advertisement</span>
        </div>
      </section>

      <section class="content-band" id="keywords">
        <div class="section-inner">
          <h2>Search Keywords</h2>
          <p class="section-lead">${escapeHtml(lang.description)}</p>
          <div class="keyword-grid">
            ${lang.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("\n            ")}
          </div>
        </div>
      </section>

      <section class="content-band muted" id="faq">
        <div class="section-inner">
          <h2>FAQ</h2>
          <div class="faq-list">
            ${lang.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("\n            ")}
          </div>
        </div>
      </section>
    </main>
  </body>
</html>
`;
}

for (const lang of config.languages) {
  const html = pageHtml(lang);
  const dir = path.join(rootDir, lang.code);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

const rootAlternates = config.languages.map((alt) => `<xhtml:link rel="alternate" hreflang="${alt.code}" href="${langUrl(alt.code)}" />`).join("\n    ");
const rootUrl = `  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    ${rootAlternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>`;

const sitemapUrls = config.languages.map((lang) => `  <url>
    <loc>${langUrl(lang.code)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${lang.code === config.defaultLanguage ? "0.9" : "0.8"}</priority>
    ${config.languages.map((alt) => `<xhtml:link rel="alternate" hreflang="${alt.code}" href="${langUrl(alt.code)}" />`).join("\n    ")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>`).join("\n");

fs.writeFileSync(path.join(rootDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${rootUrl}
${sitemapUrls}
</urlset>
`);

fs.writeFileSync(path.join(rootDir, "robots.txt"), `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: Yeti
Allow: /

User-agent: Sogou web spider
Allow: /

User-agent: 360Spider
Allow: /

User-agent: SeznamBot
Allow: /

User-agent: Applebot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`);

fs.writeFileSync(path.join(rootDir, "ads.txt"), "google.com, pub-9943771829287979, DIRECT, f08c47fec0942fa0\n");

fs.writeFileSync(path.join(rootDir, "site.webmanifest"), JSON.stringify({
  name: config.siteName,
  short_name: config.siteName,
  start_url: "/",
  display: "standalone",
  background_color: "#f7faf9",
  theme_color: "#0f766e"
}, null, 2) + "\n");
