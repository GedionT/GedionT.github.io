import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const siteUrl = "https://gediont.github.io";
const basePath = normalizePath(process.env.VITE_BASE_PATH || "/");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");
const today = new Date().toISOString().slice(0, 10);
const identity = JSON.parse(await readFile(path.join(rootDir, "content/identity.json"), "utf8"));
const nameVariants = identity.nameVariants;
const articleRegistry = JSON.parse(await readFile(path.join(rootDir, "content/articles.json"), "utf8"));
const projectRegistry = JSON.parse(await readFile(path.join(rootDir, "content/projects.json"), "utf8"));
const articleTags = Array.from(new Set(articleRegistry.flatMap((article) => article.tags))).sort();

const staticPages = [
  {
    route: "/",
    title: "Gedion Teshome Disassa | Software Architect & AI Engineer",
    description:
      "Official portfolio of Gedion Teshome Disassa, covering AI engineering, high-performance systems, data intelligence, and governance.",
    keywords:
      "Gedion Teshome Disassa, AI engineer, software architect, data science, UNDP, SDGi Corpus, governance technology",
    body:
      "Gedion Teshome Disassa builds AI, data, and software systems across research, governance, and public-interest technology.",
    html:
      "<p>Gedion Teshome Disassa builds AI, data, and software systems across research, governance, and public-interest technology.</p>",
  },
  {
    route: "/about",
    title: "About Gedion Teshome Disassa | Software Architect & AI Engineer",
    description:
      "About Gedion Teshome Disassa: research software engineer working across AI, data science, governance, backend systems, and computational intelligence.",
    keywords:
      "Gedion Disassa profile, AI specialist, research software engineer, UNDP data science, SDGi Corpus, MLH Top 50",
    body:
      "Gedion Teshome Disassa is a research software engineer focused on AI, data systems, computational neuroscience, policy, and governance.",
    html:
      "<p>Gedion Teshome Disassa is a research software engineer focused on AI, data systems, computational neuroscience, policy, and governance.</p>",
  },
  {
    route: "/projects",
    title: "Projects | Gedion Teshome Disassa",
    description:
      "Selected software, AI, data, infrastructure, and research projects by Gedion Teshome Disassa.",
    keywords:
      "Gedion Disassa projects, AI infrastructure, agent mesh, geospatial systems, civic technology, software case studies",
    body:
      projectRegistry.map((project) => `${project.title}. ${project.description}. ${project.caseStudy.summary}`).join(" "),
    html: renderProjectList(projectRegistry),
  },
  {
    route: "/blogs",
    title: "Engineering Logs & Research | Gedion Teshome Disassa",
    description:
      "Essays on AI, technology, governance, art, projection mapping, gene sequencing, geospatial intelligence, and cellular biology.",
    keywords:
      "AI essays, technology governance, mechanistic interpretability, projection mapping, geospatial intelligence, genomics, agentic workflows",
    body: articleRegistry.map((article) => `${article.title}. ${article.excerpt}`).join(" "),
    html: renderArticleList(articleRegistry),
  },
  {
    route: "/contact",
    title: "Contact | Gedion Teshome Disassa",
    description:
      "Contact Gedion Teshome Disassa for AI, research software, governance technology, and data systems collaboration.",
    keywords:
      "contact Gedion Disassa, AI collaboration, research software, data systems, governance technology",
    body:
      "Contact Gedion Teshome Disassa for collaboration across AI, research software, governance, and data platforms.",
    html:
      "<p>Contact Gedion Teshome Disassa for collaboration across AI, research software, governance, and data platforms.</p>",
  },
];

const baseHtml = await readFile(path.join(distDir, "index.html"), "utf8");
const articlePages = await Promise.all(
  articleRegistry.map(async (article) => {
    const markdown = await readFile(path.join(publicDir, article.filePath), "utf8");

    return {
      route: `/blogs/${article.id}`,
      title: `${article.title} | Gedion Disassa`,
      description: article.excerpt,
      type: "article",
      date: article.date,
      keywords: [
        article.title,
        ...article.tags,
        ...(article.relatedProjects || []),
        "Gedion Disassa",
        "AI",
        "software engineering"
      ].join(", "),
      body: markdownToText(markdown),
      html: markdownToHtml(markdown),
    };
  }),
);
const tagPages = articleTags.map((tag) => {
  const taggedArticles = articleRegistry.filter((article) => article.tags.includes(tag));

  return {
    route: tagPath(tag),
    title: `${tag} Essays | Gedion Disassa`,
    description: `Essays by Gedion Disassa tagged ${tag}, including ${taggedArticles.map((article) => article.title).join(", ")}.`,
    keywords: [tag, slugify(tag), "Gedion Disassa essays", "AI", "technology"].join(", "),
    body: taggedArticles.map((article) => `${article.title}. ${article.excerpt}`).join(" "),
    html: renderArticleList(taggedArticles),
  };
});
const projectPages = projectRegistry.map((project) => ({
  route: projectPath(project),
  title: `${project.title} Case Study | Gedion Disassa`,
  description: project.caseStudy.summary,
  type: "article",
  keywords: [...project.tags, ...project.tech, project.title, "case study", "Gedion Disassa"].join(", "),
  body: [
    project.description,
    project.caseStudy.summary,
    project.caseStudy.challenge,
    ...project.caseStudy.approach,
    ...project.caseStudy.outcome,
  ].join(" "),
  html: renderProjectCaseStudy(project),
}));
const allPages = [...staticPages, ...tagPages, ...projectPages, ...articlePages];

for (const page of allPages) {
  await writeRoute(page.route, renderPage(page));
}

await writeFile(
  path.join(distDir, "404.html"),
  renderPage({
    route: "/",
    title: "Page Loading | Gedion Teshome Disassa",
    description: "Fallback page for Gedion Teshome Disassa's portfolio.",
    body: "Gedion Teshome Disassa portfolio route fallback.",
  }).replace(/<meta name="robots" content="index, follow"\s*\/?>/, '<meta name="robots" content="noindex, follow">'),
);

await writeFile(path.join(distDir, "sitemap.xml"), renderSitemap(allPages));
await writeFile(path.join(distDir, "feed.xml"), renderFeed());
await writeFile(path.join(distDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`);

async function writeRoute(route, html) {
  if (route === "/") {
    await writeFile(path.join(distDir, "index.html"), html);
    return;
  }

  const routeDir = path.join(distDir, route.replace(/^\/+/, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html);
}

function renderPage(page) {
  const canonical = absoluteUrl(page.route);
  const fullTitle = page.title.includes("|") ? page.title : `${page.title} | Gedion Disassa`;
  let html = baseHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`);
  html = upsertMeta(html, "name", "title", fullTitle);
  html = upsertMeta(html, "name", "description", page.description);
  html = upsertMeta(html, "name", "keywords", withNameKeywords(page.keywords));
  html = upsertMeta(html, "property", "og:type", page.type || "website");
  html = upsertMeta(html, "property", "og:url", canonical);
  html = upsertMeta(html, "property", "og:title", fullTitle);
  html = upsertMeta(html, "property", "og:description", page.description);
  html = upsertMeta(html, "property", "og:image", absoluteUrl("/Ged-384.png"));
  html = upsertMeta(html, "name", "twitter:url", canonical);
  html = upsertMeta(html, "name", "twitter:title", fullTitle);
  html = upsertMeta(html, "name", "twitter:description", page.description);
  html = upsertMeta(html, "name", "twitter:image", absoluteUrl("/Ged-384.png"));
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}">`);
  html = html.replace(/<link rel="alternate" hreflang="en" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en" href="${canonical}">`);
  html = upsertJsonLd(html, renderStructuredData());
  html = html.replace(
    /<div id="seo-shell" class="sr-only">[\s\S]*?<\/div>\s*<div class="noise-bg"><\/div>/,
    `${renderSeoShell(page, fullTitle)}<div class="noise-bg"></div>`,
  );
  html = html.replace(/<div id="root"><\/div>/, `${renderNoscriptFallback(page, fullTitle)}<div id="root"></div>`);

  if (page.type === "article" && page.date) {
    html = upsertMeta(html, "property", "article:published_time", `${page.date}T00:00:00.000Z`);
  }

  return html;
}

function renderSeoShell(page, fullTitle) {
  return `<div id="seo-shell" class="sr-only"><header><h1>${escapeHtml(fullTitle)}</h1><nav><ul>${[
    ["/", "Home"],
    ["/about", "About"],
    ["/projects", "Projects"],
    ["/blogs", "Engineering Logs"],
    ["/contact", "Contact"],
  ]
    .map(([href, label]) => `<li><a href="${absoluteUrl(href)}">${label}</a></li>`)
    .join("")}</ul></nav><p>Canonical person entity: ${escapeHtml(identity.canonicalName)}. Also known as ${escapeHtml(nameVariants.join(", "))}.</p></header><main><article>${page.html || `<p>${escapeHtml(page.body)}</p>`}</article></main></div>`;
}

function renderNoscriptFallback(page, fullTitle) {
  return `<noscript><main style="max-width: 760px; margin: 40px auto; padding: 24px; font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.65; color: #0f172a;"><h1>${escapeHtml(fullTitle)}</h1><p><strong>${escapeHtml(page.description)}</strong></p><article>${page.html || `<p>${escapeHtml(page.body)}</p>`}</article><p><a href="${absoluteUrl("/")}">Return home</a></p></main></noscript>`;
}

function renderSitemap(pages) {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${absoluteUrl(page.route)}</loc>
    <lastmod>${page.date || today}</lastmod>
    <changefreq>${page.type === "article" || page.route.includes("/tags/") ? "monthly" : "weekly"}</changefreq>
    <priority>${page.route === "/" ? "1.0" : page.type === "article" ? "0.7" : page.route.includes("/tags/") ? "0.6" : "0.8"}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function renderFeed() {
  const items = articleRegistry
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${absoluteUrl(`/blogs/${article.id}`)}</link>
      <guid>${absoluteUrl(`/blogs/${article.id}`)}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(`${article.date}T00:00:00.000Z`).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Gedion Disassa Engineering Logs</title>\n    <link>${absoluteUrl("/")}</link>\n    <description>Essays on AI, technology, governance, geospatial intelligence, biology, and public-interest software.</description>\n${items}\n  </channel>\n</rss>\n`;
}

function renderStructuredData() {
  const breadcrumb = (route, items) => ({
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(route)}#breadcrumb`,
    "itemListElement": items.map(([itemRoute, name], index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": name,
      "item": absoluteUrl(itemRoute),
    })),
  });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        "name": identity.canonicalName,
        "alternateName": nameVariants.filter((name) => name !== identity.canonicalName),
        "url": absoluteUrl("/"),
        "image": absoluteUrl("/Ged-384.png"),
        "sameAs": [
          "https://www.linkedin.com/in/gedion-teshome",
          "https://x.com/gedionteshome",
          "https://github.com/gediont",
          "https://devpost.com/gedionteshome",
          "https://huggingface.co/datasets/UNDP/sdgi-corpus",
          "https://github.com/UNDP-Data/dsc-sdgi-corpus",
          "https://ceur-ws.org/Vol-3764/paper3.pdf",
          "https://top.mlh.com/2022/profiles/gedion-teshome",
          "https://scholar.google.com/citations?user=N_wHleQAAAAJ&hl=en",
          "https://orcid.org/0009-0000-8552-154X",
          "https://www.projects.tuebingen.mpg.de/cactues-2023/",
          "https://www.informationisbeautifulawards.com/showcase/7312-undp-data-futures-exchange",
        ],
        "jobTitle": "AI specialist and software engineer",
        "worksFor": { "@type": "Organization", "name": "United Nations Development Programme" },
        "award": [
          "MLH Top 50 Hackers 2022",
          "Information is Beautiful Awards 2024 Longlist credit for UNDP Data Futures Exchange",
        ],
        "description": "Data Science, AI, and software professional specializing in high-performance backend systems, generative AI, NLP, governance, public-interest data systems, and research software.",
        "knowsAbout": [
          "Generative AI",
          "Software Engineering",
          "Computational Neuroscience",
          "Systems Design",
          "Sustainable Development Goals",
          "Data Governance",
          "Geospatial Intelligence",
          "Agentic Workflows",
          "NLP for Social Good",
        ],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        "url": absoluteUrl("/"),
        "name": "Gedion Disassa | Portfolio",
        "alternateName": nameVariants,
        "about": { "@id": absoluteUrl("/#person") },
        "publisher": { "@id": absoluteUrl("/#person") },
      },
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl("/about")}#profilepage`,
        "url": absoluteUrl("/about"),
        "name": "About Gedion Teshome Disassa",
        "about": { "@id": absoluteUrl("/#person") },
        "mainEntity": { "@id": absoluteUrl("/#person") },
        "isPartOf": { "@id": absoluteUrl("/#website") },
        "breadcrumb": { "@id": `${absoluteUrl("/about")}#breadcrumb` },
      },
      {
        "@type": "Blog",
        "@id": `${absoluteUrl("/blogs")}#blog`,
        "url": absoluteUrl("/blogs"),
        "name": "Gedion Disassa Engineering Logs",
        "publisher": { "@id": absoluteUrl("/#person") },
        "isPartOf": { "@id": absoluteUrl("/#website") },
      },
      {
        "@type": "Dataset",
        "@id": "https://huggingface.co/datasets/UNDP/sdgi-corpus#dataset",
        "name": "SDGi Corpus",
        "alternateName": "SDG Integration Corpus",
        "description": "A multilingual dataset for text classification by Sustainable Development Goals, with over 7,000 English, French, and Spanish examples from Voluntary National Reviews and Voluntary Local Reviews.",
        "url": "https://huggingface.co/datasets/UNDP/sdgi-corpus",
        "creator": { "@type": "Organization", "name": "United Nations Development Programme" },
        "contributor": { "@id": absoluteUrl("/#person") },
        "citation": "https://ceur-ws.org/Vol-3764/paper3.pdf",
        "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
        "keywords": ["SDGi Corpus", "Sustainable Development Goals", "text classification", "NLP", "multilingual dataset", "UNDP"],
        "inLanguage": ["en", "fr", "es"],
        "isAccessibleForFree": true,
      },
      breadcrumb("/", [["/", "Home"]]),
      breadcrumb("/about", [["/", "Home"], ["/about", "About"]]),
      breadcrumb("/projects", [["/", "Home"], ["/projects", "Projects"]]),
      breadcrumb("/blogs", [["/", "Home"], ["/blogs", "Engineering Logs"]]),
      breadcrumb("/contact", [["/", "Home"], ["/contact", "Contact"]]),
      ...articleTags.map((tag) =>
        breadcrumb(tagPath(tag), [["/", "Home"], ["/blogs", "Engineering Logs"], [tagPath(tag), `${tag} Essays`]]),
      ),
      ...projectRegistry.map((project) =>
        breadcrumb(projectPath(project), [["/", "Home"], ["/projects", "Projects"], [projectPath(project), project.title]]),
      ),
      ...articleRegistry.map((article) =>
        breadcrumb(`/blogs/${article.id}`, [["/", "Home"], ["/blogs", "Engineering Logs"], [`/blogs/${article.id}`, article.title]]),
      ),
      ...projectRegistry.map((project) => ({
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl(projectPath(project))}#softwareapplication`,
        "name": project.title,
        "url": absoluteUrl(projectPath(project)),
        "sameAs": project.link || undefined,
        "description": project.caseStudy.summary || project.description,
        "applicationCategory": project.tags[0] || "DeveloperApplication",
        "operatingSystem": "Web",
        "programmingLanguage": project.tech,
        "keywords": [...project.tags, ...project.tech],
        "author": { "@id": absoluteUrl("/#person") },
        "creator": { "@id": absoluteUrl("/#person") },
        "mainEntityOfPage": absoluteUrl(projectPath(project)),
      })),
      ...articleRegistry.map((article) => ({
        "@type": "BlogPosting",
        "@id": absoluteUrl(`/blogs/${article.id}#article`),
        "headline": article.title,
        "description": article.excerpt,
        "datePublished": article.date,
        "dateModified": article.date,
        "url": absoluteUrl(`/blogs/${article.id}`),
        "mainEntityOfPage": absoluteUrl(`/blogs/${article.id}`),
        "image": absoluteUrl("/Ged-384.png"),
        "keywords": article.tags,
        "articleSection": article.tags[0],
        "isPartOf": { "@id": `${absoluteUrl("/blogs")}#blog` },
        "about": article.tags.map((tag) => ({ "@type": "Thing", "name": tag })),
        "mentions": [
          ...(article.relatedProjects || []).map((slug) => ({ "@id": `${absoluteUrl(`/projects/${slug}`)}#softwareapplication` })),
          ...(article.relatedArticles || []).map((id) => ({ "@id": absoluteUrl(`/blogs/${id}#article`) })),
        ],
        "breadcrumb": { "@id": `${absoluteUrl(`/blogs/${article.id}`)}#breadcrumb` },
        "author": { "@id": absoluteUrl("/#person") },
        "publisher": { "@id": absoluteUrl("/#person") },
      })),
    ],
  };

  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function upsertMeta(html, attr, key, content) {
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}">`;
  const pattern = new RegExp(`<meta\\s+${attr}="${escapeRegExp(key)}"[\\s\\S]*?>`);

  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `${tag}</head>`);
}

function upsertJsonLd(html, json) {
  const tag = `<script type="application/ld+json" id="site-structured-data">${json}</script>`;
  const pattern = /<script type="application\/ld\+json" id="site-structured-data">[\s\S]*?<\/script>/;

  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `${tag}</head>`);
}

function withNameKeywords(value = "") {
  return [...nameVariants, ...value.split(",").map((item) => item.trim()).filter(Boolean)]
    .filter((item, index, items) => items.indexOf(item) === index)
    .join(", ");
}

function renderArticleList(articles) {
  return `<ul>${articles
    .map(
      (article) =>
        `<li><a href="${absoluteUrl(`/blogs/${article.id}`)}">${escapeHtml(article.title)}</a><p>${escapeHtml(article.excerpt)}</p></li>`,
    )
    .join("")}</ul>`;
}

function renderProjectList(projects) {
  return `<ul>${projects
    .map(
      (project) =>
        `<li><a href="${absoluteUrl(projectPath(project))}">${escapeHtml(project.title)}</a><p>${escapeHtml(project.caseStudy.summary || project.description)}</p></li>`,
    )
    .join("")}</ul>`;
}

function renderProjectCaseStudy(project) {
  return `<p>${escapeHtml(project.description)}</p><section><h2>Challenge</h2><p>${escapeHtml(project.caseStudy.challenge)}</p></section><section><h2>Approach</h2><ul>${project.caseStudy.approach
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul></section><section><h2>Outcome</h2><ul>${project.caseStudy.outcome
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul></section>`;
}

function markdownToHtml(markdown) {
  const html = [];
  const paragraph = [];
  let listOpen = false;

  const closeParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph.length = 0;
  };
  const closeList = () => {
    if (!listOpen) return;
    html.push("</ul>");
    listOpen = false;
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      closeParagraph();
      closeList();
      continue;
    }

    if (line.startsWith("### ")) {
      closeParagraph();
      closeList();
      html.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("## ")) {
      closeParagraph();
      closeList();
      html.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith("# ")) {
      closeParagraph();
      closeList();
      html.push(`<h1>${renderInline(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith("- ")) {
      closeParagraph();
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${renderInline(line.slice(2))}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  closeParagraph();
  closeList();
  return html.join("");
}

function renderInline(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, (_, label, href) => `<a href="${escapeHtml(normalizeHref(href))}">${label}</a>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function normalizeHref(href) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  return href.startsWith("/") ? absoluteUrl(href) : href;
}

function absoluteUrl(route) {
  const base = basePath.replace(/^\/+|\/+$/g, "");
  const cleanRoute = route.replace(/^\/+|\/+$/g, "");
  const joined = [base, cleanRoute].filter(Boolean).join("/");

  return `${siteUrl}/${joined}`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function tagPath(tag) {
  return `/blogs/tags/${slugify(tag)}`;
}

function projectPath(project) {
  return `/projects/${project.slug}`;
}

function normalizePath(value) {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

function markdownToText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~]/g, " ")
    .replace(/^-+\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
