-- Sample kids devotional
INSERT INTO devotionals (slug, title, content, reading_reference, audience, tags, author)
VALUES (
  'kids-god-is-love',
  'God Is Love',
  'God loves you very much. He sent Jesus to show us His love. When we love others, we show that we know God.',
  '1JN.4.8',
  'kids',
  ARRAY['love','kids','family'],
  'BibleLex Team'
);

-- Sample general devotional
INSERT INTO devotionals (slug, title, content, reading_reference, audience, tags, author)
VALUES (
  'john-3-16-gods-love',
  'John 3:16 – God''s Love',
  'John 3:16 tells us that God loves the world so much that He gave His only Son. Everyone who believes in Him will have eternal life.',
  'JHN.3.16',
  'general',
  ARRAY['love','gospel','salvation'],
  'BibleLex Team'
);

-- Another kids devotional
INSERT INTO devotionals (slug, title, content, reading_reference, audience, tags, author)
VALUES (
  'kids-david-and-goliath',
  'David and Goliath',
  'David was a young shepherd, but he trusted God. With God''s help, he defeated the giant Goliath. You can trust God too, no matter how big your problems are.',
  '1SA.17.45',
  'kids',
  ARRAY['faith','courage','kids'],
  'BibleLex Team'
);

-- Sample map entry
INSERT INTO maps (slug, title, description, image_url, region, related_references, audience)
VALUES (
  'paul-first-journey',
  'Paul''s First Missionary Journey',
  'Follow Paul and Barnabas as they travel to share the good news about Jesus.',
  'https://example.com/maps/paul-first-journey.png',
  'Asia Minor',
  ARRAY['ACT.13.1','ACT.13.2','ACT.14.1'],
  'general'
);

-- Sample kids Bible entry
INSERT INTO kids_bibles (slug, name, language, age_range, description, source, license_type, license_text, attribution)
VALUES (
  'kids-story-bible',
  'Kids Story Bible',
  'en',
  '4-8',
  'Simple Bible stories for young children.',
  'Public domain stories adapted for kids',
  'public_domain',
  'No known copyright restrictions.',
  'BibleLex Kids'
);
