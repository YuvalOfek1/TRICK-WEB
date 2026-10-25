// Builds the site into www/: js/main.js and its imports are bundled into js/app.js with esbuild;
// everything else is copied as is. Set WEB_PASSCODE to put a passcode screen in front of the app.
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';

const OUT = 'www';
const STATIC = ['index.html', 'styles.css', 'manifest.webmanifest', 'robots.txt', 'icons', 'media'];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const file of STATIC) cpSync(file, `${OUT}/${file}`, { recursive: true });

// A new offline-cache version for every build, so installed copies always pick up the update.
const sw = readFileSync('sw.js', 'utf8').replace(/const VERSION = '[^']*';/, `const VERSION = 'build-${Date.now()}';`);
writeFileSync(`${OUT}/sw.js`, sw);

const passcode = (process.env.WEB_PASSCODE ?? '').trim();
const hash = passcode ? createHash('sha256').update(`foldwise:${passcode}`).digest('hex') : '';

await build({
  entryPoints: ['js/main.js'],
  outfile: `${OUT}/js/app.js`,
  bundle: true,
  format: 'esm',
  target: ['safari15', 'chrome100'],
  minify: true,
  define: { __PASSCODE_HASH__: JSON.stringify(hash) },
  logLevel: 'warning',
});
console.log(`Built ${OUT}/${hash ? ' (with passcode screen)' : ''}`);
