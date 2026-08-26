import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const excluded = new Set(['google4e08a8803a39e9f9.html', 'offline.html']);

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== '.git') return htmlFiles(full);
    return entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
  });
}

test('central loader replaces direct GA snippets in content pages', () => {
  const pages = htmlFiles(root).filter((file) => !excluded.has(relative(root, file)));
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    assert.equal((html.match(/site-tags\.js\?v=site-tags-1/g) || []).length, 1, relative(root, page));
    assert.equal(html.includes('googletagmanager.com/gtag/js'), false, relative(root, page));
    assert.equal(html.includes("gtag('config'"), false, relative(root, page));
  }
});

test('central loader carries documented GA4 and AdSense identifiers with a single loader per source', () => {
  const loader = readFileSync(join(root, 'js', 'site-tags.js'), 'utf8');
  assert.match(loader, /G-2R9CE6PH9K/);
  assert.match(loader, /ca-pub-5656416032906373/);
  assert.match(loader, /loadScriptOnce/);
  assert.match(loader, /data-ad-client/);
});

test('manual ad units appear only after public content and outside the report form', () => {
  const home = readFileSync(join(root, 'index.html'), 'utf8');
  const detail = readFileSync(join(root, 'pages', 'detail.html'), 'utf8');
  const report = readFileSync(join(root, 'pages', 'report.html'), 'utf8');
  const about = readFileSync(join(root, 'pages', 'about.html'), 'utf8');
  const privacy = readFileSync(join(root, 'pages', 'privacy.html'), 'utf8');
  const contact = readFileSync(join(root, 'pages', 'contact.html'), 'utf8');
  assert.match(home, /data-ad-slot="3143411927"/);
  assert.match(detail, /data-ad-slot="6118497380"/);
  assert.match(about, /data-ad-slot="1760836049"/);
  assert.match(privacy, /data-ad-slot="5508509362"/);
  assert.match(contact, /data-ad-slot="7319898418"/);
  assert.equal(report.includes('adsbygoogle'), false);
  const contactForm = contact.match(/<form[\s\S]*?<\/form>/)?.[0] || '';
  assert.equal(contactForm.includes('adsbygoogle'), false);
});
