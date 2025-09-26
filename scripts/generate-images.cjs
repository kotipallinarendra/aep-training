const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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

const outDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Edit this list to include ALL product base names you want generated
const IMAGE_LIST = [
  // Electronics
  'electronics-1', 'electronics-2', 'electronics-3', 'electronics-4', 'electronics-5',
  'electronics-6', 'electronics-7', 'electronics-8', 'electronics-9', 'electronics-10',
  
  // Fashion
  'fashion-1', 'fashion-2', 'fashion-3', 'fashion-4', 'fashion-5',
  'fashion-6', 'fashion-7', 'fashion-8', 'fashion-9', 'fashion-10',
  
  // Home & Kitchen
  'home-1', 'home-2', 'home-3', 'home-4', 'home-5',
  'home-6', 'home-7', 'home-8', 'home-9', 'home-10',
  
  // Books
  'books-1', 'books-2', 'books-3', 'books-4', 'books-5',
  'books-6', 'books-7', 'books-8', 'books-9', 'books-10'
  ];

(async () => {
  for (const name of IMAGE_LIST) {
    const url = `http://picsum.photos/800/800?random=${Math.floor(Math.random() * 100000)}`;
    const res = await fetchFn(url);
    // node-fetch v2 returns a Response with .buffer(); native fetch returns .arrayBuffer()
    const arrayBuf = res.arrayBuffer ? await res.arrayBuffer() : await res.buffer();
    const buffer = Buffer.from(arrayBuf);

    // generate formats
    await sharp(buffer).resize(800, 800).jpeg({ quality: 85 }).toFile(path.join(outDir, `${name}.jpg`));
    await sharp(buffer).resize(800, 800).webp({ quality: 80 }).toFile(path.join(outDir, `${name}.webp`));
    await sharp(buffer).resize(800, 800).avif({ quality: 50 }).toFile(path.join(outDir, `${name}.avif`));
    await sharp(buffer).resize(800, 800).png().toFile(path.join(outDir, `${name}.png`));

    console.log('generated', name);
  }
})();