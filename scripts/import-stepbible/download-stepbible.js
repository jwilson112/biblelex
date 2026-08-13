import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { get } from 'https';

const __dir = dirname(fileURLToPath(import.meta.url));

// STEPBible release URLs (update with actual release version)
const BASE_URL = 'https://github.com/STEPBible/STEPBible-Data/releases/download/v1.0';

const FILES = [
  'TBESH.tsv',  // Hebrew lexicon
  'TBESG.tsv',  // Greek lexicon
  'TAHOT.tsv',  // Hebrew OT with Strong's
  'TAGNT.tsv',  // Greek NT with Strong's
  'TVTMS.tsv',  // Versification mapping
];

async function downloadFile(filename) {
  const url = `${BASE_URL}/${filename}`;
  const destPath = join(__dir, '../../data/stepbible', filename);

  console.log(`Downloading ${filename}...`);

  // Ensure directory exists
  await mkdir(dirname(destPath), { recursive: true });

  return new Promise((resolve, reject) => {
    const file = createWriteStream(destPath);
    
    get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode} ${response.statusMessage}`));
        return;
      }

      pipeline(response, file)
        .then(() => {
          console.log(`✅ ${filename} downloaded successfully`);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading STEPBible data files...\n');

  for (const file of FILES) {
    try {
      await downloadFile(file);
    } catch (err) {
      console.error(`❌ Error downloading ${file}:`, err.message);
    }
  }

  console.log('\nDownload complete!');
  console.log('Files saved to: data/stepbible/');
  console.log('\nNext steps:');
  console.log('1. Copy .env.example to .env and fill in your Supabase credentials');
  console.log('2. Run: npm run import');
}

main().catch(console.error);
