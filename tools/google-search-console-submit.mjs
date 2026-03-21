import { createSign } from 'node:crypto';

const args = new Set(process.argv.slice(2));
const productionOnly = args.has('--production-only');
const dryRun = args.has('--dry-run');

if (productionOnly && process.env.VERCEL_ENV !== 'production') {
  console.log(
    `Google Search Console submit skipped: VERCEL_ENV is '${process.env.VERCEL_ENV ?? 'undefined'}' (requires 'production').`,
  );
  process.exit(0);
}

const siteUrlBase = normalizeSiteUrl(process.env.SITE_URL ?? 'https://shashikanth.me');
const siteProperty = process.env.GSC_SITE_URL ?? `${siteUrlBase}/`;
const sitemapUrl = process.env.GSC_SITEMAP_URL ?? `${siteUrlBase}/sitemap.xml`;
const clientEmail = process.env.GSC_CLIENT_EMAIL;
const privateKeyRaw = process.env.GSC_PRIVATE_KEY;
const tokenEndpoint = process.env.GSC_TOKEN_ENDPOINT ?? 'https://oauth2.googleapis.com/token';
const apiBase = process.env.GSC_API_BASE ?? 'https://www.googleapis.com/webmasters/v3';

if (dryRun) {
  console.log('Google Search Console dry run:');
  console.log(`- Property: ${siteProperty}`);
  console.log(`- Sitemap: ${sitemapUrl}`);
  console.log(`- Client: ${clientEmail ?? 'missing (GSC_CLIENT_EMAIL)'}`);
  console.log(
    `- Private key: ${privateKeyRaw ? 'set (GSC_PRIVATE_KEY)' : 'missing (GSC_PRIVATE_KEY)'}`,
  );
  process.exit(0);
}

if (!clientEmail || !privateKeyRaw) {
  console.warn(
    'Google Search Console submit skipped: set GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY to enable automated sitemap submission.',
  );
  process.exit(0);
}

const privateKey = privateKeyRaw.replaceAll('\\n', '\n');

try {
  const accessToken = await fetchAccessToken({
    clientEmail,
    privateKey,
    tokenEndpoint,
  });

  const endpoint = `${apiBase}/sites/${encodeURIComponent(siteProperty)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    console.warn(
      `Google Search Console submit failed (${response.status} ${response.statusText}). Response: ${body}`,
    );
    process.exit(0);
  }

  console.log(
    `Google Search Console sitemap submitted successfully for property '${siteProperty}': ${sitemapUrl}`,
  );
} catch (error) {
  console.warn(`Google Search Console submit error: ${String(error)}`);
}

async function fetchAccessToken({ clientEmail: email, privateKey: key, tokenEndpoint: endpoint }) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const header = base64UrlEncode(
    JSON.stringify({ alg: 'RS256', typ: 'JWT' }),
  );
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/webmasters',
      aud: endpoint,
      iat,
      exp,
    }),
  );

  const unsignedToken = `${header}.${payload}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(key);
  const assertion = `${unsignedToken}.${base64UrlEncode(signature)}`;

  const tokenResponse = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!tokenResponse.ok) {
    const body = await tokenResponse.text();
    throw new Error(
      `OAuth token request failed (${tokenResponse.status} ${tokenResponse.statusText}): ${body}`,
    );
  }

  const tokenJson = await tokenResponse.json();
  const accessToken = tokenJson?.access_token;

  if (!accessToken) {
    throw new Error('OAuth token response did not include access_token.');
  }

  return accessToken;
}

function base64UrlEncode(input) {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buffer
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

function normalizeSiteUrl(url) {
  return String(url).replace(/\/+$/, '');
}
