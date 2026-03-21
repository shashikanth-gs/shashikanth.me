import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataFilePath = resolve(
  rootDir,
  'apps/business-showcase/src/app/data/showcase-data.ts',
);
const landingFilePath = resolve(
  rootDir,
  'apps/business-showcase/src/app/data/landing-pages.ts',
);
const publicDir = resolve(rootDir, 'apps/business-showcase/public');

const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL ?? 'https://shashikanth.me',
);

const dataSource = readFileSync(dataFilePath, 'utf8');
const landingSource = readFileSync(landingFilePath, 'utf8');

const portfolioProfile = evalLiteral(
  extractLiteral(dataSource, 'export const portfolioProfile', '{'),
);
const authorProfile = evalLiteral(
  extractLiteral(dataSource, 'export const authorProfile', '{'),
);
const blogPosts = evalLiteral(
  extractLiteral(dataSource, 'export const blogPosts', '['),
  { authorProfile },
);
const landingPages = evalLiteral(
  extractLiteral(landingSource, 'export const landingPages', '['),
);

if (!Array.isArray(blogPosts) || blogPosts.length === 0) {
  throw new Error('No blog posts found. Cannot generate SEO assets.');
}

if (!Array.isArray(landingPages)) {
  throw new Error('No landing pages found. Cannot generate SEO assets.');
}

const posts = blogPosts
  .map((post) => ({
    slug: String(post.slug),
    title: String(post.title),
    summary: String(post.summary),
    publishedDate: String(post.publishedDate),
    category: String(post.category ?? ''),
    tags: Array.isArray(post.tags) ? post.tags.map((tag) => String(tag)) : [],
  }))
  .filter((post) => post.slug && post.title && post.publishedDate)
  .sort((a, b) => (a.publishedDate > b.publishedDate ? -1 : 1));

const landing = landingPages
  .map((page) => ({
    slug: String(page.slug),
    title: String(page.title),
    metaDescription: String(page.metaDescription ?? ''),
    headline: String(page.headline ?? page.title ?? ''),
  }))
  .filter((page) => page.slug && page.title);

const blogLastMod = posts[0]?.publishedDate;
if (!blogLastMod) {
  throw new Error('No blog publish date found. Cannot generate SEO assets.');
}

const landingLastMod = statSync(landingFilePath).mtime
  .toISOString()
  .slice(0, 10);

generateSitemap({
  siteUrl,
  blogLastMod,
  landingLastMod,
  landingSlugs: landing.map((entry) => entry.slug),
  posts,
});

generateLlms({
  siteUrl,
  profile: portfolioProfile,
  landing,
  posts,
});

generateFeeds({
  siteUrl,
  profile: portfolioProfile,
  posts,
});

console.log(
  `Generated SEO assets in ${publicDir}: sitemap.xml, llms.txt, rss.xml, atom.xml, feed.json`,
);

function generateSitemap({
  siteUrl: site,
  blogLastMod: blogMod,
  landingLastMod: landingMod,
  landingSlugs,
  posts: entries,
}) {
  const homeUrl = [
    '  <url>',
    `    <loc>${site}/</loc>`,
    `    <lastmod>${blogMod}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
  ].join('\n');

  const blogIndexUrl = [
    '  <url>',
    `    <loc>${site}/blog</loc>`,
    `    <lastmod>${blogMod}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>0.9</priority>',
    '  </url>',
  ].join('\n');

  const landingUrls = landingSlugs
    .map((slug) =>
      [
        '  <url>',
        `    <loc>${site}/${xmlEscape(slug)}</loc>`,
        `    <lastmod>${landingMod}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.85</priority>',
        '  </url>',
      ].join('\n'),
    )
    .join('\n');

  const blogUrls = entries
    .map((post) =>
      [
        '  <url>',
        `    <loc>${site}/blog/${xmlEscape(post.slug)}</loc>`,
        `    <lastmod>${post.publishedDate}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.8</priority>',
        '  </url>',
      ].join('\n'),
    )
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    homeUrl,
    blogIndexUrl,
    landingUrls,
    blogUrls,
    '</urlset>',
    '',
  ].join('\n');

  writeFileSync(resolve(publicDir, 'sitemap.xml'), xml, 'utf8');
}

function generateLlms({ siteUrl: site, profile, landing: pages, posts: entries }) {
  const profileName = String(profile?.name ?? 'Author');
  const profileHeadline = String(profile?.headline ?? '');
  const profileWebsite = String(profile?.website ?? `${site}/`);
  const profileLinkedIn = String(profile?.linkedin ?? '');
  const profileGitHub = String(profile?.github ?? '');

  const lines = [
    `# ${profileName}`,
    '',
    `Portfolio website for ${profileName}${
      profileHeadline ? `, ${profileHeadline}` : ''
    }`,
    '',
    '## Primary Pages',
    `- Home: ${site}/`,
    `- Writing archive: ${site}/blog`,
    ...pages.map((page) => `- ${page.headline}: ${site}/${page.slug}`),
    '',
    '## Writing',
    ...entries.map((post) => `- ${post.title}: ${site}/blog/${post.slug}`),
    '',
    '## Author',
    `- Name: ${profileName}`,
    `- Website: ${profileWebsite}`,
  ];

  if (profileLinkedIn) {
    lines.push(`- LinkedIn: ${profileLinkedIn}`);
  }

  if (profileGitHub) {
    lines.push(`- GitHub: ${profileGitHub}`);
  }

  lines.push('');

  writeFileSync(resolve(publicDir, 'llms.txt'), lines.join('\n'), 'utf8');
}

function generateFeeds({ siteUrl: site, profile, posts: entries }) {
  const authorName = String(profile?.name ?? 'Author');
  const authorWebsite = String(profile?.website ?? `${site}/`);
  const description =
    'Architecture and engineering writing on airline systems modernization, platform design, and AI-assisted operations.';
  const blogUrl = `${site}/blog`;
  const rssUrl = `${site}/rss.xml`;
  const atomUrl = `${site}/atom.xml`;
  const jsonFeedUrl = `${site}/feed.json`;

  const latestRfc2822 = toRfc2822(entries[0].publishedDate);
  const latestIso = toIsoDate(entries[0].publishedDate);

  const rssItems = entries
    .map((post) => {
      const url = `${site}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `      <category>${xmlEscape(tag)}</category>`)
        .join('\n');

      return [
        '    <item>',
        `      <title>${xmlEscape(post.title)}</title>`,
        `      <link>${xmlEscape(url)}</link>`,
        '      <guid isPermaLink="true">' + xmlEscape(url) + '</guid>',
        `      <pubDate>${toRfc2822(post.publishedDate)}</pubDate>`,
        `      <description>${xmlEscape(post.summary)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${xmlEscape(authorName)} | Writing</title>`,
    `    <link>${xmlEscape(blogUrl)}</link>`,
    `    <description>${xmlEscape(description)}</description>`,
    '    <language>en-IN</language>',
    `    <lastBuildDate>${latestRfc2822}</lastBuildDate>`,
    `    <atom:link href="${xmlEscape(rssUrl)}" rel="self" type="application/rss+xml" />`,
    rssItems,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  const atomEntries = entries
    .map((post) => {
      const url = `${site}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `    <category term="${xmlEscape(tag)}" />`)
        .join('\n');

      return [
        '  <entry>',
        `    <title>${xmlEscape(post.title)}</title>`,
        `    <id>${xmlEscape(url)}</id>`,
        `    <link href="${xmlEscape(url)}" />`,
        `    <published>${toIsoDate(post.publishedDate)}</published>`,
        `    <updated>${toIsoDate(post.publishedDate)}</updated>`,
        `    <summary>${xmlEscape(post.summary)}</summary>`,
        categories,
        '  </entry>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const atom = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${xmlEscape(authorName)} | Writing</title>`,
    `  <id>${xmlEscape(blogUrl)}</id>`,
    `  <link href="${xmlEscape(atomUrl)}" rel="self" />`,
    `  <link href="${xmlEscape(blogUrl)}" />`,
    `  <updated>${latestIso}</updated>`,
    `  <subtitle>${xmlEscape(description)}</subtitle>`,
    '  <author>',
    `    <name>${xmlEscape(authorName)}</name>`,
    `    <uri>${xmlEscape(authorWebsite)}</uri>`,
    '  </author>',
    atomEntries,
    '</feed>',
    '',
  ].join('\n');

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: `${authorName} | Writing`,
    home_page_url: blogUrl,
    feed_url: jsonFeedUrl,
    description,
    language: 'en-IN',
    authors: [{ name: authorName, url: authorWebsite }],
    items: entries.map((post) => {
      const url = `${site}/blog/${post.slug}`;
      return {
        id: url,
        url,
        title: post.title,
        summary: post.summary,
        content_text: post.summary,
        date_published: toIsoDate(post.publishedDate),
        date_modified: toIsoDate(post.publishedDate),
        tags: post.tags,
      };
    }),
  };

  writeFileSync(resolve(publicDir, 'rss.xml'), rss, 'utf8');
  writeFileSync(resolve(publicDir, 'atom.xml'), atom, 'utf8');
  writeFileSync(
    resolve(publicDir, 'feed.json'),
    `${JSON.stringify(jsonFeed, null, 2)}\n`,
    'utf8',
  );
}

function extractLiteral(source, marker, expectedStartChar) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) {
    throw new Error(`Could not locate marker: ${marker}`);
  }

  const equalsIndex = source.indexOf('=', markerIndex);
  if (equalsIndex < 0) {
    throw new Error(`Could not locate assignment for marker: ${marker}`);
  }

  let literalStart = equalsIndex + 1;
  while (literalStart < source.length && /\s/.test(source[literalStart])) {
    literalStart += 1;
  }

  if (source[literalStart] !== expectedStartChar) {
    throw new Error(
      `Expected '${expectedStartChar}' after marker ${marker}, found '${source[literalStart] ?? 'EOF'}'.`,
    );
  }

  return extractBalanced(source, literalStart);
}

function extractBalanced(source, startIndex) {
  const startChar = source[startIndex];
  const closeChar = startChar === '[' ? ']' : startChar === '{' ? '}' : null;

  if (!closeChar) {
    throw new Error(`Unsupported literal start: ${startChar}`);
  }

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '\'' || char === '"' || char === '`') {
      quote = char;
      continue;
    }

    if (char === startChar) {
      depth += 1;
      continue;
    }

    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  throw new Error('Unbalanced literal while parsing source metadata.');
}

function evalLiteral(literal, context = {}) {
  return vm.runInNewContext(`(${literal})`, context, { timeout: 1000 });
}

function normalizeSiteUrl(url) {
  return String(url).replace(/\/+$/, '');
}

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toIsoDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toISOString();
}

function toRfc2822(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toUTCString();
}
