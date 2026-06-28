-- Rachael's World Cup 2026 – Seed Data
-- 48 teams + knockout bracket structure
-- Run AFTER schema.sql

-- ── Teams (48 qualified nations) ───────────────────────────────────────────
-- Groups A-L, 4 teams each
INSERT INTO teams (id, fifa_code, name, flag, group_letter) VALUES
-- Group A
('a1000000-0000-0000-0000-000000000001', 'MEX', 'Mexico',                  '🇲🇽', 'A'),
('a1000000-0000-0000-0000-000000000002', 'KOR', 'South Korea',             '🇰🇷', 'A'),
('a1000000-0000-0000-0000-000000000003', 'CZE', 'Czechia',                 '🇨🇿', 'A'),
('a1000000-0000-0000-0000-000000000004', 'RSA', 'South Africa',            '🇿🇦', 'A'),

-- Group B
('a2000000-0000-0000-0000-000000000001', 'CAN', 'Canada',                  '🇨🇦', 'B'),
('a2000000-0000-0000-0000-000000000002', 'SUI', 'Switzerland',             '🇨🇭', 'B'),
('a2000000-0000-0000-0000-000000000003', 'BIH', 'Bosnia and Herzegovina',  '🇧🇦', 'B'),
('a2000000-0000-0000-0000-000000000004', 'QAT', 'Qatar',                   '🇶🇦', 'B'),

-- Group C
('a3000000-0000-0000-0000-000000000001', 'BRA', 'Brazil',                  '🇧🇷', 'C'),
('a3000000-0000-0000-0000-000000000002', 'MAR', 'Morocco',                 '🇲🇦', 'C'),
('a3000000-0000-0000-0000-000000000003', 'SCO', 'Scotland',                '🏴', 'C'),
('a3000000-0000-0000-0000-000000000004', 'HTI', 'Haiti',                   '🇭🇹', 'C'),

-- Group D
('a4000000-0000-0000-0000-000000000001', 'USA', 'United States',           '🇺🇸', 'D'),
('a4000000-0000-0000-0000-000000000002', 'AUS', 'Australia',               '🇦🇺', 'D'),
('a4000000-0000-0000-0000-000000000003', 'PAR', 'Paraguay',                '🇵🇾', 'D'),
('a4000000-0000-0000-0000-000000000004', 'TUR', 'Türkiye',                 '🇹🇷', 'D'),

-- Group E
('a5000000-0000-0000-0000-000000000001', 'GER', 'Germany',                 '🇩🇪', 'E'),
('a5000000-0000-0000-0000-000000000002', 'CIV', 'Côte d''Ivoire',          '🇨🇮', 'E'),
('a5000000-0000-0000-0000-000000000003', 'ECU', 'Ecuador',                 '🇪🇨', 'E'),
('a5000000-0000-0000-0000-000000000004', 'CUW', 'Curaçao',                 '🇨🇼', 'E'),

-- Group F
('a6000000-0000-0000-0000-000000000001', 'NED', 'Netherlands',             '🇳🇱', 'F'),
('a6000000-0000-0000-0000-000000000002', 'JPN', 'Japan',                   '🇯🇵', 'F'),
('a6000000-0000-0000-0000-000000000003', 'SWE', 'Sweden',                  '🇸🇪', 'F'),
('a6000000-0000-0000-0000-000000000004', 'TUN', 'Tunisia',                 '🇹🇳', 'F'),

-- Group G
('a7000000-0000-0000-0000-000000000001', 'BEL', 'Belgium',                 '🇧🇪', 'G'),
('a7000000-0000-0000-0000-000000000002', 'IRI', 'IR Iran',                 '🇮🇷', 'G'),
('a7000000-0000-0000-0000-000000000003', 'EGY', 'Egypt',                   '🇪🇬', 'G'),
('a7000000-0000-0000-0000-000000000004', 'NZL', 'New Zealand',             '🇳🇿', 'G'),

-- Group H
('a8000000-0000-0000-0000-000000000001', 'ESP', 'Spain',                   '🇪🇸', 'H'),
('a8000000-0000-0000-0000-000000000002', 'URU', 'Uruguay',                 '🇺🇾', 'H'),
('a8000000-0000-0000-0000-000000000003', 'KSA', 'Saudi Arabia',            '🇸🇦', 'H'),
('a8000000-0000-0000-0000-000000000004', 'CPV', 'Cape Verde',              '🇨🇻', 'H'),

-- Group I
('a9000000-0000-0000-0000-000000000001', 'FRA', 'France',                  '🇫🇷', 'I'),
('a9000000-0000-0000-0000-000000000002', 'NOR', 'Norway',                  '🇳🇴', 'I'),
('a9000000-0000-0000-0000-000000000003', 'SEN', 'Senegal',                 '🇸🇳', 'I'),
('a9000000-0000-0000-0000-000000000004', 'IRQ', 'Iraq',                    '🇮🇶', 'I'),

-- Group J
('b0000000-0000-0000-0000-000000000001', 'ARG', 'Argentina',               '🇦🇷', 'J'),
('b0000000-0000-0000-0000-000000000002', 'AUT', 'Austria',                 '🇦🇹', 'J'),
('b0000000-0000-0000-0000-000000000003', 'JOR', 'Jordan',                  '🇯🇴', 'J'),
('b0000000-0000-0000-0000-000000000004', 'DZA', 'Algeria',                 '🇩🇿', 'J'),

-- Group K
('b1000000-0000-0000-0000-000000000001', 'COL', 'Colombia',                '🇨🇴', 'K'),
('b1000000-0000-0000-0000-000000000002', 'POR', 'Portugal',                '🇵🇹', 'K'),
('b1000000-0000-0000-0000-000000000003', 'COD', 'DR Congo',                '🇨🇩', 'K'),
('b1000000-0000-0000-0000-000000000004', 'UZB', 'Uzbekistan',              '🇺🇿', 'K'),

-- Group L
('b2000000-0000-0000-0000-000000000001', 'ENG', 'England',                 '🏴', 'L'),
('b2000000-0000-0000-0000-000000000002', 'CRO', 'Croatia',                 '🇭🇷', 'L'),
('b2000000-0000-0000-0000-000000000003', 'GHA', 'Ghana',                   '🇬🇭', 'L'),
('b2000000-0000-0000-0000-000000000004', 'PAN', 'Panama',                  '🇵🇦', 'L')

ON CONFLICT (fifa_code) DO NOTHING;

-- ── Knockout Stage Matches ─────────────────────────────────────────────────
-- UUID prefix key (all hex digits only — 0-9 and a-f):
--   32xxxxxx = Round of 32
--   16xxxxxx = Round of 16
--   04xxxxxx = Quarterfinals
--   02xxxxxx = Semifinals
--   03xxxxxx = Third Place
--   01xxxxxx = Final

-- Round of 32 (16 matches)
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('32000000-0000-0000-0000-000000000001', 'R32',  1,  '2026-07-04 19:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000002', 'R32',  2,  '2026-07-04 22:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000003', 'R32',  3,  '2026-07-05 01:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000004', 'R32',  4,  '2026-07-05 18:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000005', 'R32',  5,  '2026-07-05 21:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000006', 'R32',  6,  '2026-07-06 00:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000007', 'R32',  7,  '2026-07-06 18:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000008', 'R32',  8,  '2026-07-06 21:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000009', 'R32',  9,  '2026-07-07 00:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-00000000000a', 'R32', 10,  '2026-07-07 18:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-00000000000b', 'R32', 11,  '2026-07-07 21:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-00000000000c', 'R32', 12,  '2026-07-08 00:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-00000000000d', 'R32', 13,  '2026-07-08 18:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-00000000000e', 'R32', 14,  '2026-07-08 21:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-00000000000f', 'R32', 15,  '2026-07-09 00:00:00+00', 'SCHEDULED'),
('32000000-0000-0000-0000-000000000010', 'R32', 16,  '2026-07-09 18:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Round of 16 (8 matches)
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('16000000-0000-0000-0000-000000000001', 'R16',  1,  '2026-07-11 22:00:00+00', 'SCHEDULED'),
('16000000-0000-0000-0000-000000000002', 'R16',  2,  '2026-07-12 02:00:00+00', 'SCHEDULED'),
('16000000-0000-0000-0000-000000000003', 'R16',  3,  '2026-07-12 22:00:00+00', 'SCHEDULED'),
('16000000-0000-0000-0000-000000000004', 'R16',  4,  '2026-07-13 02:00:00+00', 'SCHEDULED'),
('16000000-0000-0000-0000-000000000005', 'R16',  5,  '2026-07-13 22:00:00+00', 'SCHEDULED'),
('16000000-0000-0000-0000-000000000006', 'R16',  6,  '2026-07-14 02:00:00+00', 'SCHEDULED'),
('16000000-0000-0000-0000-000000000007', 'R16',  7,  '2026-07-14 22:00:00+00', 'SCHEDULED'),
('16000000-0000-0000-0000-000000000008', 'R16',  8,  '2026-07-15 02:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Quarterfinals (4 matches)
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('04000000-0000-0000-0000-000000000001', 'QF',  1,  '2026-07-17 22:00:00+00', 'SCHEDULED'),
('04000000-0000-0000-0000-000000000002', 'QF',  2,  '2026-07-18 02:00:00+00', 'SCHEDULED'),
('04000000-0000-0000-0000-000000000003', 'QF',  3,  '2026-07-18 22:00:00+00', 'SCHEDULED'),
('04000000-0000-0000-0000-000000000004', 'QF',  4,  '2026-07-19 02:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Semifinals (2 matches)
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('02000000-0000-0000-0000-000000000001', 'SF',  1,  '2026-07-22 02:00:00+00', 'SCHEDULED'),
('02000000-0000-0000-0000-000000000002', 'SF',  2,  '2026-07-23 02:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Third Place
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('03000000-0000-0000-0000-000000000001', 'THIRD', 1, '2026-07-25 19:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Final
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('01000000-0000-0000-0000-000000000001', 'FINAL', 1, '2026-07-26 20:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- ── Wire up bracket advancement ───────────────────────────────────────────
-- R32 → R16
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000001', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000001';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000001', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000002';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000002', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000003';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000002', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000004';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000003', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000005';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000003', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000006';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000004', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000007';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000004', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000008';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000005', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000009';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000005', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-00000000000a';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000006', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-00000000000b';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000006', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-00000000000c';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000007', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-00000000000d';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000007', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-00000000000e';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000008', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-00000000000f';
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000008', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000010';

-- R16 → QF
UPDATE matches SET next_match_id = '04000000-0000-0000-0000-000000000001', next_match_slot = 'home' WHERE id = '16000000-0000-0000-0000-000000000001';
UPDATE matches SET next_match_id = '04000000-0000-0000-0000-000000000001', next_match_slot = 'away' WHERE id = '16000000-0000-0000-0000-000000000002';
UPDATE matches SET next_match_id = '04000000-0000-0000-0000-000000000002', next_match_slot = 'home' WHERE id = '16000000-0000-0000-0000-000000000003';
UPDATE matches SET next_match_id = '04000000-0000-0000-0000-000000000002', next_match_slot = 'away' WHERE id = '16000000-0000-0000-0000-000000000004';
UPDATE matches SET next_match_id = '04000000-0000-0000-0000-000000000003', next_match_slot = 'home' WHERE id = '16000000-0000-0000-0000-000000000005';
UPDATE matches SET next_match_id = '04000000-0000-0000-0000-000000000003', next_match_slot = 'away' WHERE id = '16000000-0000-0000-0000-000000000006';
UPDATE matches SET next_match_id = '04000000-0000-0000-0000-000000000004', next_match_slot = 'home' WHERE id = '16000000-0000-0000-0000-000000000007';
UPDATE matches SET next_match_id = '04000000-0000-0000-0000-000000000004', next_match_slot = 'away' WHERE id = '16000000-0000-0000-0000-000000000008';

-- QF → SF
UPDATE matches SET next_match_id = '02000000-0000-0000-0000-000000000001', next_match_slot = 'home' WHERE id = '04000000-0000-0000-0000-000000000001';
UPDATE matches SET next_match_id = '02000000-0000-0000-0000-000000000001', next_match_slot = 'away' WHERE id = '04000000-0000-0000-0000-000000000002';
UPDATE matches SET next_match_id = '02000000-0000-0000-0000-000000000002', next_match_slot = 'home' WHERE id = '04000000-0000-0000-0000-000000000003';
UPDATE matches SET next_match_id = '02000000-0000-0000-0000-000000000002', next_match_slot = 'away' WHERE id = '04000000-0000-0000-0000-000000000004';

-- SF → Final (winners)
UPDATE matches SET next_match_id = '01000000-0000-0000-0000-000000000001', next_match_slot = 'home' WHERE id = '02000000-0000-0000-0000-000000000001';
UPDATE matches SET next_match_id = '01000000-0000-0000-0000-000000000001', next_match_slot = 'away' WHERE id = '02000000-0000-0000-0000-000000000002';
-- SF losers → Third Place (set manually in admin after semifinals)
