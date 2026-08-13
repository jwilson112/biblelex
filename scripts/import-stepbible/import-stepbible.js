import { createClient } from '@supabase/supabase-js';
import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dir = dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Parse TSV line
function parseTSVLine(line) {
  return line.split('\t');
}

// Convert STEPBible book abbreviation to your format
const BOOK_MAP = {
  Gen: 'GEN', Exo: 'EXO', Lev: 'LEV', Num: 'NUM', Deu: 'DEU',
  Jos: 'JOS', Jdg: 'JDG', Rut: 'RUT', '1Sa': '1SA', '2Sa': '2SA',
  '1Ki': '1KI', '2Ki': '2KI', '1Ch': '1CH', '2Ch': '2CH',
  Ezr: 'EZR', Neh: 'NEH', Est: 'EST', Job: 'JOB', Psa: 'PSA',
  Pro: 'PRO', Ecc: 'ECC', Sng: 'SNG', Isa: 'ISA', Jer: 'JER',
  Lam: 'LAM', Ezk: 'EZK', Dan: 'DAN', Hos: 'HOS', Jol: 'JOL',
  Amo: 'AMO', Oba: 'OBA', Jon: 'JON', Mic: 'MIC', Nam: 'NAM',
  Hab: 'HAB', Zep: 'ZEP', Hag: 'HAG', Zec: 'ZEC', Mal: 'MAL',
  Mat: 'MAT', Mrk: 'MRK', Luk: 'LUK', Jhn: 'JHN', Act: 'ACT',
  Rom: 'ROM', '1Co': '1CO', '2Co': '2CO', Gal: 'GAL', Eph: 'EPH',
  Php: 'PHP', Col: 'COL', '1Th': '1TH', '2Th': '2TH',
  '1Ti': '1TI', '2Ti': '2TI', Tit: 'TIT', Phm: 'PHM',
  Heb: 'HEB', Jas: 'JAS', '1Pe': '1PE', '2Pe': '2PE',
  '1Jn': '1JN', '2Jn': '2JN', '3Jn': '3JN', Jud: 'JUD', Rev: 'REV',
};

async function importTBESH(filePath) {
  console.log('Importing TBESH (Hebrew lexicon)...');
  
  const fileStream = createReadStream(filePath, { encoding: 'utf-8' });
  const rl = createInterface({ input: fileStream, crlfDelay: Infinity });
  
  let lineCount = 0;
  
  for await (const line of rl) {
    if (line.startsWith('#') || line.trim() === '') continue;
    
    const fields = parseTSVLine(line);
    // TBESH format: strongs_id, lemma, pronunciation, definition, usage_counts
    const [strongsId, lemma, pronunciation, definition, usageCounts] = fields;
    
    await supabase.from('lexicon_entries').upsert({
      strongs_id: `H${strongsId}`,
      original_lang: 'hebrew',
      lemma: lemma,
      pronunciation: pronunciation || null,
      definition: definition,
      usage_counts: usageCounts ? JSON.parse(usageCounts) : null,
      source: 'BDB (STEPBible)',
    }, { onConflict: 'strongs_id' });
    
    lineCount++;
  }
  
  console.log(`✅ TBESH import complete. ${lineCount} entries inserted.`);
}

async function importTBESG(filePath) {
  console.log('Importing TBESG (Greek lexicon)...');
  
  const fileStream = createReadStream(filePath, { encoding: 'utf-8' });
  const rl = createInterface({ input: fileStream, crlfDelay: Infinity });
  
  let lineCount = 0;
  
  for await (const line of rl) {
    if (line.startsWith('#') || line.trim() === '') continue;
    
    const fields = parseTSVLine(line);
    const [strongsId, lemma, pronunciation, definition, usageCounts] = fields;
    
    await supabase.from('lexicon_entries').upsert({
      strongs_id: `G${strongsId}`,
      original_lang: 'greek',
      lemma: lemma,
      pronunciation: pronunciation || null,
      definition: definition,
      usage_counts: usageCounts ? JSON.parse(usageCounts) : null,
      source: 'Abbott-Smith (STEPBible)',
    }, { onConflict: 'strongs_id' });
    
    lineCount++;
  }
  
  console.log(`✅ TBESG import complete. ${lineCount} entries inserted.`);
}

async function importTAHOT(filePath) {
  console.log('Importing TAHOT (Hebrew OT with Strong\'s)...');
  
  const fileStream = createReadStream(filePath, { encoding: 'utf-8' });
  const rl = createInterface({ input: fileStream, crlfDelay: Infinity });
  
  let lineCount = 0;
  const verseMap = new Map();
  
  for await (const line of rl) {
    if (line.startsWith('#') || line.trim() === '') continue;
    
    const fields = parseTSVLine(line);
    // TAHOT format: book, chapter, verse, word_order, Hebrew_text, transliteration, strongs_id, morphology, lemma
    const [bookAbbr, chapter, verse, wordOrder, hebrewText, transliteration, strongsId, morphology, lemma] = fields;
    
    const book = BOOK_MAP[bookAbbr];
    if (!book) continue;
    
    const verseKey = `${book}.${parseInt(chapter)}.${parseInt(verse)}`;
    
    // Ensure verse exists
    if (!verseMap.has(verseKey)) {
      const { data: verseRow } = await supabase
        .from('verses')
        .select('id')
        .eq('verse_key', verseKey)
        .single();
      
      if (verseRow) {
        verseMap.set(verseKey, verseRow.id);
      }
    }
    
    const verseId = verseMap.get(verseKey);
    if (!verseId) continue;
    
    // Insert word
    await supabase.from('words').insert({
      verse_id: verseId,
      word_order: parseInt(wordOrder),
      original_lang: 'hebrew',
      original_text: hebrewText,
      transliteration: transliteration || null,
      strongs_id: strongsId ? `H${strongsId}` : null,
      morphology: morphology || null,
      lemma: lemma || null,
    });
    
    lineCount++;
    if (lineCount % 10000 === 0) {
      console.log(`Processed ${lineCount} words...`);
    }
  }
  
  console.log(`✅ TAHOT import complete. ${lineCount} words inserted.`);
}

async function importTAGNT(filePath) {
  console.log('Importing TAGNT (Greek NT with Strong\'s)...');
  
  const fileStream = createReadStream(filePath, { encoding: 'utf-8' });
  const rl = createInterface({ input: fileStream, crlfDelay: Infinity });
  
  let lineCount = 0;
  const verseMap = new Map();
  
  for await (const line of rl) {
    if (line.startsWith('#') || line.trim() === '') continue;
    
    const fields = parseTSVLine(line);
    // TAGNT format: book, chapter, verse, word_order, Greek_text, transliteration, strongs_id, morphology, lemma
    const [bookAbbr, chapter, verse, wordOrder, greekText, transliteration, strongsId, morphology, lemma] = fields;
    
    const book = BOOK_MAP[bookAbbr];
    if (!book) continue;
    
    const verseKey = `${book}.${parseInt(chapter)}.${parseInt(verse)}`;
    
    if (!verseMap.has(verseKey)) {
      const { data: verseRow } = await supabase
        .from('verses')
        .select('id')
        .eq('verse_key', verseKey)
        .single();
      
      if (verseRow) {
        verseMap.set(verseKey, verseRow.id);
      }
    }
    
    const verseId = verseMap.get(verseKey);
    if (!verseId) continue;
    
    await supabase.from('words').insert({
      verse_id: verseId,
      word_order: parseInt(wordOrder),
      original_lang: 'greek',
      original_text: greekText,
      transliteration: transliteration || null,
      strongs_id: strongsId ? `G${strongsId}` : null,
      morphology: morphology || null,
      lemma: lemma || null,
    });
    
    lineCount++;
    if (lineCount % 5000 === 0) {
      console.log(`Processed ${lineCount} words...`);
    }
  }
  
  console.log(`✅ TAGNT import complete. ${lineCount} words inserted.`);
}

async function main() {
  const dataDir = join(__dir, '../../data/stepbible');
  
  // Import in order: lexicons first, then texts
  await importTBESH(join(dataDir, 'TBESH.tsv'));
  await importTBESG(join(dataDir, 'TBESG.tsv'));
  await importTAHOT(join(dataDir, 'TAHOT.tsv'));
  await importTAGNT(join(dataDir, 'TAGNT.tsv'));
  
  // Refresh usage stats
  console.log('Refreshing word usage stats...');
  await supabase.rpc('refresh_word_usage_stats');
  console.log('✅ Word usage stats refreshed.');
  
  console.log('\n🎉 All STEPBible imports complete!');
  console.log('\nNext steps:');
  console.log('1. Verify data in Supabase dashboard');
  console.log('2. Test lexicon lookup in your app at /lexicon?strongs=H7225');
  console.log('3. Test word-level interlinear view in verse reader');
}

main().catch(console.error);
