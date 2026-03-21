import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = new Set(process.argv.slice(2));
const productionOnly = args.has('--production-only');
const dryRun = args.has('--dry-run');
const endpoint = process.env.INDEXNOW_ENDPOINT ?? 'https://api.indexnow.org/indexnow';

if (productionOnly && process.env.VERCEL_ENV !== 'production') {
  console.log(
    `IndexNow skipped: VERCEL_ENV is '${process.env.VERCEL_ENV ?? 'undefined'}' (requires 'production').`,
  );
  process.exit(0);
}

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(rootDir, 'apps/business-showcase/public');
const sitemapPath = resolve(publicDir, 'sitemap.xml');

if (!existsSync(sitemapPath)) {
  console.warn(`IndexNow skipped: sitemap not found at ${sitemapPath}`);
  process.exit(0);
}

const sitemap = readFileSync(sitemapPath, 'utf8');
const urlList = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))];

if (urlList.length === 0) {
  console.warn('IndexNow skipped: no URLs found in sitemap.');
  process.exit(0);
}

const key = (process.env.INDEXNOW_KEY ?? findKeyFromPublicDir(publicDir))?.trim();

if (!key) {
  console.warn(
    'IndexNow skipped: no key found. Set INDEXNOW_KEY env var or add <key>.txt in apps/business-showcase/public.',
  );
  process.exit(0);
}

const firstUrl = new URL(urlList[0]);
const host = firstUrl.host;
const keyLocation = process.env.INDEXNOW_KEY_LOCATION ?? `${firstUrl.origin}/${key}.txt`;
const batchSize = 10000;
const batches = chunk(urlList, batchSize);

if (dryRun) {
  console.log(
    `IndexNow dry run: would submit ${urlList.length} URLs in ${batches.length} request(s) for host '${host}'.`,
  );
  console.log(`IndexNow keyLocation: ${keyLocation}`);
  process.exit(0);
}

let submitted = 0;
for (const urls of batches) {
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text();
      console.warn(
        `IndexNow request failed (${response.status} ${response.statusText}). Response: ${body}`,
      );
      continue;
    }

    submitted += urls.length;
  } catch (error) {
    console.warn(`IndexNow request error: ${String(error)}`);
  }
}

console.log(
  `IndexNow submission complete: ${submitted}/${urlList.length} URL(s) accepted.`,
);

function findKeyFromPublicDir(directory) {
  const files = readdirSync(directory);
  for (const fileName of files) {
    if (!/^[a-z0-9]{8,128}\.txt$/i.test(fileName)) {
      continue;
    }

    const keyFromName = fileName.slice(0, -4);
    const keyFilePath = resolve(directory, fileName);
    const keyFromFile = readFileSync(keyFilePath, 'utf8').trim();
    if (keyFromName === keyFromFile) {
      return keyFromName;
    }
  }
  return undefined;
}

function chunk(items, size) {
  const output = [];
  for (let index = 0; index < items.length; index += size) {
    output.push(items.slice(index, index + size));
  }
  return output;
}
