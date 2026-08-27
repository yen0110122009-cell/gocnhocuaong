import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

const manifest = JSON.parse(read('manifest.webmanifest'));
const html = read('index.html');
const worker = read('sw.js');
const css = read('assets/css/app.css');

await test('manifest PWA có scope, standalone, icon và shortcut hợp lệ', () => {
  assert.equal(manifest.name, 'Góc nhỏ của Ong');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.scope, './');
  assert.equal(manifest.start_url, './?source=pwa');
  assert.deepEqual(manifest.icons.map(icon => icon.sizes), ['192x192', '512x512']);
  assert.ok(manifest.icons.every(icon => icon.type === 'image/png'));
  assert.ok(manifest.shortcuts.length >= 3);
});

await test('index liên kết manifest, icon và service worker có cache-buster mới', () => {
  assert.match(html, /rel="manifest" href="\.\/manifest\.webmanifest"/);
  assert.match(html, /apple-touch-icon/);
  assert.match(html, /assets\/css\/app\.css\?v=10/);
  assert.match(html, /sw-register\.js\?v=10/);
});

await test('website áp dụng ảnh nền vuông mới', () => {
  assert.match(css, /bee-study-background\.png/);
  assert.match(css, /background-size:cover/);
  assert.match(css, /background-repeat:no-repeat/);
});

await test('service worker cache shell và có fallback offline', () => {
  assert.match(worker, /gocnhocuaong-pwa-v10/);
  assert.match(worker, /app\.css\?v=10/);
  assert.match(worker, /sw-register\.js\?v=10/);
  assert.match(worker, /manifest\.webmanifest/);
  assert.match(worker, /icon-192\.png/);
  assert.match(worker, /bee-study-background\.png/);
  assert.match(worker, /request\.mode === 'navigate'/);
  assert.match(worker, /networkFirst/);
  assert.match(worker, /self\.clients\.claim/);
});

await test('icon PWA tồn tại đúng kích thước', () => {
  assert.ok(fs.existsSync(path.join(root, 'assets/pwa/bee-study-background.png')));
  for (const [file, width, height] of [['assets/pwa/icon-192.png', 192, 192], ['assets/pwa/icon-512.png', 512, 512]]) {
    const header = fs.readFileSync(path.join(root, file));
    assert.equal(header.readUInt32BE(16), width);
    assert.equal(header.readUInt32BE(20), height);
  }
});
