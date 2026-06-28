-- Fix England and Scotland flag emojis
-- Their flags use Unicode tag sequences (not regional indicator pairs like 🇪🇸)
-- and were being stored as plain 🏴 (generic black flag) without the tag characters.

UPDATE teams SET flag = '🏴󠁧󠁢󠁥󠁮󠁧󠁿' WHERE fifa_code = 'ENG';
UPDATE teams SET flag = '🏴󠁧󠁢󠁳󠁣󠁴󠁿' WHERE fifa_code = 'SCO';
