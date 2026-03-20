import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataFilePath = resolve(
  rootDir,
  'apps/business-showcase/src/app/data/showcase-data.ts',
);
const outputFilePath = resolve(
  rootDir,
  'apps/business-showcase/public/sitemap.xml',
);
const siteUrl = 'https://shashikanth.me';

const source = readFileSync(dataFilePath, 'utf8');
const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map(
  (match) => match[1],
);
const publishedDates = [
  ...source.matchAll(/publishedDate:\s*'(\d{4}-\d{2}-\d{2})'/g),
].map((match) => match[1]);

if (slugs.length === 0 || publishedDates.length === 0) {
  throw new Error(
    `No blog metadata found in ${dataFilePath}. Cannot generate sitemap.`,
  );
}

if (slugs.length !== publishedDates.length) {
  throw new Error(
    `Mismatch while generating sitemap: found ${slugs.length} slugs but ${publishedDates.length} publishedDate entries.`,
  );
}

const blogLastMod = publishedDates
  .slice()
  .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))[0];

const homeUrl = [
  '  <url>',
  `    <loc>${siteUrl}/</loc>`,
  `    <lastmod>${blogLastMod}</lastmod>`,
  '    <changefreq>weekly</changefreq>',
  '    <priority>1.0</priority>',
  '  </url>',
].join('\n');

const blogIndexUrl = [
  '  <url>',
  `    <loc>${siteUrl}/blog</loc>`,
  `    <lastmod>${blogLastMod}</lastmod>`,
  '    <changefreq>weekly</changefreq>',
  '    <priority>0.9</priority>',
  '  </url>',
].join('\n');

const blogUrls = slugs
  .map((slug, index) =>
    [
      '  <url>',
      `    <loc>${siteUrl}/blog/${slug}</loc>`,
      `    <lastmod>${publishedDates[index]}</lastmod>`,
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
  blogUrls,
  '</urlset>',
  '',
].join('\n');

writeFileSync(outputFilePath, xml, 'utf8');
console.log(
  `Generated sitemap with ${slugs.length + 2} URLs at ${outputFilePath}`,
);
