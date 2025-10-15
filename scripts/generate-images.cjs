const fs = require('fs');
const path = require('path');
const sharp = require('sharp');


// Import IMAGE_LIST using require for CommonJS
const { IMAGE_LIST } = require('./image-list.cjs');

// Resolve a fetch function: prefer global fetch (Node 18+), else require node-fetch@2
let fetchFn;
if (typeof fetch === 'function') {
  fetchFn = fetch;
} else {
  try {
    // node-fetch v2 exposes a function when required
    fetchFn = require('node-fetch');
  } catch (err) {
    console.error('\nERROR: No global fetch and node-fetch not installed.');
    console.error('Install node-fetch v2 with: npm install node-fetch@2');
    process.exit(1);
  }
}


// --- Output directory ---
const outDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const name of IMAGE_LIST) {
    const url = `http://picsum.photos/800/800?random=${Math.floor(Math.random() * 100000)}`;
    const res = await fetchFn(url);
    const arrayBuf = res.arrayBuffer ? await res.arrayBuffer() : await res.buffer();
    const buffer = Buffer.from(arrayBuf);

    // Generate all formats
    await sharp(buffer).resize(800, 800).jpeg({ quality: 85 }).toFile(path.join(outDir, `${name}.jpg`));
    await sharp(buffer).resize(800, 800).webp({ quality: 80 }).toFile(path.join(outDir, `${name}.webp`));
    await sharp(buffer).resize(800, 800).avif({ quality: 50 }).toFile(path.join(outDir, `${name}.avif`));
    await sharp(buffer).resize(800, 800).png().toFile(path.join(outDir, `${name}.png`));

    console.log('Generated:', name);
  }
})();