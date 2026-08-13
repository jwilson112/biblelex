# STEPBible Importer

This script imports Hebrew and Greek texts with Strong's numbers, morphology, and lexicons from STEPBible into your BibleLex Supabase database.

## Prerequisites

1. **Supabase project** with the BibleLex schema already set up
2. **Node.js** (v18 or later)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Download STEPBible data

```bash
npm run download
```

This downloads all required TSV files from the STEPBible GitHub releases:
- `TBESH.tsv` – Hebrew lexicon (BDB)
- `TBESG.tsv` – Greek lexicon (Abbott-Smith)
- `TAHOT.tsv` – Hebrew OT with Strong's numbers
- `TAGNT.tsv` – Greek NT with Strong's numbers
- `TVTMS.tsv` – Versification mapping (optional, for future use)

### 3. Configure environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Important:** Use the **service role key**, not the anon key, for bulk imports.

### 4. Run the importer

```bash
npm run import
```

This will:
1. Import Hebrew lexicon entries (H1–H8674)
2. Import Greek lexicon entries (G1–G5624)
3. Import Hebrew OT words with Strong's numbers and morphology
4. Import Greek NT words with Strong's numbers and morphology
5. Refresh word usage statistics

## Expected Output

```
Importing TBESH (Hebrew lexicon)...
✅ TBESH import complete. 8674 entries inserted.
Importing TBESG (Greek lexicon)...
✅ TBESG import complete. 5624 entries inserted.
Importing TAHOT (Hebrew OT with Strong's)...
Processed 10000 words...
Processed 20000 words...
✅ TAHOT import complete. 305221 words inserted.
Importing TAGNT (Greek NT with Strong's)...
Processed 5000 words...
Processed 10000 words...
✅ TAGNT import complete. 138132 words inserted.
Refreshing word usage stats...
✅ Word usage stats refreshed.

🎉 All STEPBible imports complete!
```

## Verify the Import

### 1. Check lexicon entries

In Supabase SQL editor:

```sql
SELECT COUNT(*) FROM lexicon_entries WHERE original_lang = 'hebrew';
SELECT COUNT(*) FROM lexicon_entries WHERE original_lang = 'greek';
SELECT * FROM lexicon_entries WHERE strongs_id = 'H7225';
SELECT * FROM lexicon_entries WHERE strongs_id = 'G26';
```

### 2. Check words table

```sql
SELECT COUNT(*) FROM words WHERE original_lang = 'hebrew';
SELECT COUNT(*) FROM words WHERE original_lang = 'greek';
SELECT * FROM words WHERE verse_id = (SELECT id FROM verses WHERE verse_key = 'GEN.1.1') LIMIT 10;
```

### 3. Test in your app

- Visit `/lexicon?strongs=H7225` – Should show "רֵאשִׁית" (beginning) with BDB definition
- Visit `/lexicon?strongs=G26` – Should show "ἀγάπη" (love) with Abbott-Smith definition
- Visit `/verse/GEN.1.1` – Should show all translations
- Future: Word-level interlinear view will show Hebrew/Greek words with clickable Strong's numbers

## Troubleshooting

### "Verse not found" warnings

This is normal if your Bible text import hasn't been run yet. The word importer expects verses to already exist in the `verses` table.

**Solution:** Run your Bible translation importer first (e.g., `import-kjv.js`, `import-web.js`, etc.) before running the STEPBible word importer.

### Memory issues

If you run out of memory during import, the script processes line-by-line using streams, so it should handle large files efficiently. If you still have issues, consider:

- Increasing Node.js memory: `node --max-old-space-size=4096 import-stepbible.js`
- Splitting the import into separate runs (lexicons vs texts)

### Slow import

The import is I/O bound (network + database). Typical speeds:
- Lexicons: ~10 seconds
- Hebrew OT: ~2-3 minutes
- Greek NT: ~1-2 minutes

## Data Sources

- **STEPBible Data Repository**: https://github.com/STEPBible/STEPBible-Data
- **License**: CC BY 4.0 – Creative Commons Attribution 4.0 International
- **Attribution**: "STEP Bible" (www.STEPBible.org)
- **Original Creator**: Tyndale House Cambridge

## Files Imported

| File | Description | Records |
|------|-------------|---------|
| `TBESH.tsv` | Hebrew lexicon (BDB) | ~8,674 entries (H1–H8674) |
| `TBESG.tsv` | Greek lexicon (Abbott-Smith) | ~5,624 entries (G1–G5624) |
| `TAHOT.tsv` | Hebrew OT with Strong's | ~305,221 words |
| `TAGNT.tsv` | Greek NT with Strong's | ~138,132 words |

## Attribution Requirements

CC BY 4.0 requires attribution. Your app already includes:

- Footer attribution on every page
- Dedicated `/licenses` page with full details
- `/about` page with data source information
- Clickable modal with complete license information

This satisfies the license requirements.

## Next Steps

After successful import:

1. **Test lexicon lookup** – Verify definitions appear correctly
2. **Build interlinear view** – Show Hebrew/Greek words aligned with English
3. **Add word-level tapping** – Click any word to see its Strong's number and lexicon entry
4. **Implement cross-references** – Link verses based on shared Strong's numbers
5. **Add search by Strong's** – Allow users to search for all occurrences of a Hebrew/Greek word

## Support

For issues with STEPBible data itself:
- GitHub Issues: https://github.com/STEPBible/STEPBible-Data/issues
- Website: https://www.STEPBible.org

For issues with this importer script:
- Check the BibleLex repository issues
- Verify your Supabase schema matches the expected structure
