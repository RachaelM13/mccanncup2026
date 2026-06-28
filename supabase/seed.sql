-- Rachael's World Cup 2026 – Seed Data
-- 48 teams + knockout bracket structure
-- Run AFTER schema.sql

-- ── Teams (48 qualified nations) ───────────────────────────────────────────
-- Groups A-L, 4 teams each
INSERT INTO teams (id, fifa_code, name, flag, group_letter) VALUES
-- Group A
('a1000000-0000-0000-0000-000000000001', 'MEX', 'Mexico',                  'mx',     'A'),
('a1000000-0000-0000-0000-000000000002', 'KOR', 'South Korea',             'kr',     'A'),
('a1000000-0000-0000-0000-000000000003', 'CZE', 'Czechia',                 'cz',     'A'),
('a1000000-0000-0000-0000-000000000004', 'RSA', 'South Africa',            'za',     'A'),

-- Group B
('a2000000-0000-0000-0000-000000000001', 'CAN', 'Canada',                  'ca',     'B'),
('a2000000-0000-0000-0000-000000000002', 'SUI', 'Switzerland',             'ch',     'B'),
('a2000000-0000-0000-0000-000000000003', 'BIH', 'Bosnia and Herzegovina',  'ba',     'B'),
('a2000000-0000-0000-0000-000000000004', 'QAT', 'Qatar',                   'qa',     'B'),

-- Group C
('a3000000-0000-0000-0000-000000000001', 'BRA', 'Brazil',                  'br',     'C'),
('a3000000-0000-0000-0000-000000000002', 'MAR', 'Morocco',                 'ma',     'C'),
('a3000000-0000-0000-0000-000000000003', 'SCO', 'Scotland',                'gb-sct', 'C'),
('a3000000-0000-0000-0000-000000000004', 'HTI', 'Haiti',                   'ht',     'C'),

-- Group D
('a4000000-0000-0000-0000-000000000001', 'USA', 'United States',           'us',     'D'),
('a4000000-0000-0000-0000-000000000002', 'AUS', 'Australia',               'au',     'D'),
('a4000000-0000-0000-0000-000000000003', 'PAR', 'Paraguay',                'py',     'D'),
('a4000000-0000-0000-0000-000000000004', 'TUR', 'Türkiye',                 'tr',     'D'),

-- Group E
('a5000000-0000-0000-0000-000000000001', 'GER', 'Germany',                 'de',     'E'),
('a5000000-0000-0000-0000-000000000002', 'CIV', 'Côte d''Ivoire',          'ci',     'E'),
('a5000000-0000-0000-0000-000000000003', 'ECU', 'Ecuador',                 'ec',     'E'),
('a5000000-0000-0000-0000-000000000004', 'CUW', 'Curaçao',                 'cw',     'E'),

-- Group F
('a6000000-0000-0000-0000-000000000001', 'NED', 'Netherlands',             'nl',     'F'),
('a6000000-0000-0000-0000-000000000002', 'JPN', 'Japan',                   'jp',     'F'),
('a6000000-0000-0000-0000-000000000003', 'SWE', 'Sweden',                  'se',     'F'),
('a6000000-0000-0000-0000-000000000004', 'TUN', 'Tunisia',                 'tn',     'F'),

-- Group G
('a7000000-0000-0000-0000-000000000001', 'BEL', 'Belgium',                 'be',     'G'),
('a7000000-0000-0000-0000-000000000002', 'IRI', 'IR Iran',                 'ir',     'G'),
('a7000000-0000-0000-0000-000000000003', 'EGY', 'Egypt',                   'eg',     'G'),
('a7000000-0000-0000-0000-000000000004', 'NZL', 'New Zealand',             'nz',     'G'),

-- Group H
('a8000000-0000-0000-0000-000000000001', 'ESP', 'Spain',                   'es',     'H'),
('a8000000-0000-0000-0000-000000000002', 'URU', 'Uruguay',                 'uy',     'H'),
('a8000000-0000-0000-0000-000000000003', 'KSA', 'Saudi Arabia',            'sa',     'H'),
('a8000000-0000-0000-0000-000000000004', 'CPV', 'Cape Verde',              'cv',     'H'),

-- Group I
('a9000000-0000-0000-0000-000000000001', 'FRA', 'France',                  'fr',     'I'),
('a9000000-0000-0000-0000-000000000002', 'NOR', 'Norway',                  'no',     'I'),
('a9000000-0000-0000-0000-000000000003', 'SEN', 'Senegal',                 'sn',     'I'),
('a9000000-0000-0000-0000-000000000004', 'IRQ', 'Iraq',                    'iq',     'I'),

-- Group J
('b0000000-0000-0000-0000-000000000001', 'ARG', 'Argentina',               'ar',     'J'),
('b0000000-0000-0000-0000-000000000002', 'AUT', 'Austria',                 'at',     'J'),
('b0000000-0000-0000-0000-000000000003', 'JOR', 'Jordan',                  'jo',     'J'),
('b0000000-0000-0000-0000-000000000004', 'DZA', 'Algeria',                 'dz',     'J'),

-- Group K
('b1000000-0000-0000-0000-000000000001', 'COL', 'Colombia',                'co',     'K'),
('b1000000-0000-0000-0000-000000000002', 'POR', 'Portugal',                'pt',     'K'),
('b1000000-0000-0000-0000-000000000003', 'COD', 'DR Congo',                'cd',     'K'),
('b1000000-0000-0000-0000-000000000004', 'UZB', 'Uzbekistan',              'uz',     'K'),

-- Group L
('b2000000-0000-0000-0000-000000000001', 'ENG', 'England',                 'gb-eng', 'L'),
('b2000000-0000-0000-0000-000000000002', 'CRO', 'Croatia',                 'hr',     'L'),
('b2000000-0000-0000-0000-000000000003', 'GHA', 'Ghana',                   'gh',     'L'),
('b2000000-0000-0000-0000-000000000004', 'PAN', 'Panama',                  'pa',     'L')

ON CONFLICT (fifa_code) DO NOTHING;

-- ── Knockout Stage Matches ─────────────────────────────────────────────────
-- UUID prefix key (all hex digits only — 0-9 and a-f):
--   32xxxxxx = Round of 32
--   16xxxxxx = Round of 16
--   04xxxxxx = Quarterfinals
--   02xxxxxx = Semifinals
--   03xxxxxx = Third Place
--   01xxxxxx = Final

-- Round of 32 (16 matches) — kickoffs in UTC (ET = UTC-4)
INSERT INTO matches (id, round, match_number, home_team_id, away_team_id, kickoff, status) VALUES
-- Sun Jun 28 · 3:00 PM ET  | 🇿🇦 South Africa vs 🇨🇦 Canada
('32000000-0000-0000-0000-000000000001', 'R32',  1, 'a1000000-0000-0000-0000-000000000004', 'a2000000-0000-0000-0000-000000000001', '2026-06-28 19:00:00+00', 'SCHEDULED'),
-- Mon Jun 29 · 1:00 PM ET  | 🇧🇷 Brazil vs 🇯🇵 Japan
('32000000-0000-0000-0000-000000000002', 'R32',  2, 'a3000000-0000-0000-0000-000000000001', 'a6000000-0000-0000-0000-000000000002', '2026-06-29 17:00:00+00', 'SCHEDULED'),
-- Mon Jun 29 · 4:30 PM ET  | 🇩🇪 Germany vs 🇵🇾 Paraguay
('32000000-0000-0000-0000-000000000003', 'R32',  3, 'a5000000-0000-0000-0000-000000000001', 'a4000000-0000-0000-0000-000000000003', '2026-06-29 20:30:00+00', 'SCHEDULED'),
-- Mon Jun 29 · 9:00 PM ET  | 🇳🇱 Netherlands vs 🇲🇦 Morocco
('32000000-0000-0000-0000-000000000004', 'R32',  4, 'a6000000-0000-0000-0000-000000000001', 'a3000000-0000-0000-0000-000000000002', '2026-06-30 01:00:00+00', 'SCHEDULED'),
-- Tue Jun 30 · 1:00 PM ET  | 🇨🇮 Côte d'Ivoire vs 🇳🇴 Norway
('32000000-0000-0000-0000-000000000005', 'R32',  5, 'a5000000-0000-0000-0000-000000000002', 'a9000000-0000-0000-0000-000000000002', '2026-06-30 17:00:00+00', 'SCHEDULED'),
-- Tue Jun 30 · 5:00 PM ET  | 🇫🇷 France vs 🇸🇪 Sweden
('32000000-0000-0000-0000-000000000006', 'R32',  6, 'a9000000-0000-0000-0000-000000000001', 'a6000000-0000-0000-0000-000000000003', '2026-06-30 21:00:00+00', 'SCHEDULED'),
-- Tue Jun 30 · 9:00 PM ET  | 🇲🇽 Mexico vs 🇪🇨 Ecuador
('32000000-0000-0000-0000-000000000007', 'R32',  7, 'a1000000-0000-0000-0000-000000000001', 'a5000000-0000-0000-0000-000000000003', '2026-07-01 01:00:00+00', 'SCHEDULED'),
-- Wed Jul 1  · 12:00 PM ET | 🏴 England vs 🇨🇩 DR Congo
('32000000-0000-0000-0000-000000000008', 'R32',  8, 'b2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', '2026-07-01 16:00:00+00', 'SCHEDULED'),
-- Wed Jul 1  · 4:00 PM ET  | 🇧🇪 Belgium vs 🇸🇳 Senegal
('32000000-0000-0000-0000-000000000009', 'R32',  9, 'a7000000-0000-0000-0000-000000000001', 'a9000000-0000-0000-0000-000000000003', '2026-07-01 20:00:00+00', 'SCHEDULED'),
-- Wed Jul 1  · 8:00 PM ET  | 🇺🇸 United States vs 🇧🇦 Bosnia & Herzegovina
('32000000-0000-0000-0000-00000000000a', 'R32', 10, 'a4000000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000003', '2026-07-02 00:00:00+00', 'SCHEDULED'),
-- Thu Jul 2  · 3:00 PM ET  | 🇪🇸 Spain vs 🇦🇹 Austria
('32000000-0000-0000-0000-00000000000b', 'R32', 11, 'a8000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', '2026-07-02 19:00:00+00', 'SCHEDULED'),
-- Thu Jul 2  · 7:00 PM ET  | 🇵🇹 Portugal vs 🇭🇷 Croatia
('32000000-0000-0000-0000-00000000000c', 'R32', 12, 'b1000000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000002', '2026-07-02 23:00:00+00', 'SCHEDULED'),
-- Thu Jul 2  · 11:00 PM ET | 🇨🇭 Switzerland vs 🇩🇿 Algeria
('32000000-0000-0000-0000-00000000000d', 'R32', 13, 'a2000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004', '2026-07-03 03:00:00+00', 'SCHEDULED'),
-- Fri Jul 3  · 2:00 PM ET  | 🇦🇺 Australia vs 🇪🇬 Egypt
('32000000-0000-0000-0000-00000000000e', 'R32', 14, 'a4000000-0000-0000-0000-000000000002', 'a7000000-0000-0000-0000-000000000003', '2026-07-03 18:00:00+00', 'SCHEDULED'),
-- Fri Jul 3  · 6:00 PM ET  | 🇦🇷 Argentina vs 🇨🇻 Cape Verde
('32000000-0000-0000-0000-00000000000f', 'R32', 15, 'b0000000-0000-0000-0000-000000000001', 'a8000000-0000-0000-0000-000000000004', '2026-07-03 22:00:00+00', 'SCHEDULED'),
-- Fri Jul 3  · 9:30 PM ET  | 🇨🇴 Colombia vs 🇬🇭 Ghana
('32000000-0000-0000-0000-000000000010', 'R32', 16, 'b1000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000003', '2026-07-04 01:30:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Round of 16 (8 matches)
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('16000000-0000-0000-0000-000000000001', 'R16',  1,  '2026-07-04 17:00:00+00', 'SCHEDULED'), -- Sat Jul  4 · 1:00 PM ET
('16000000-0000-0000-0000-000000000002', 'R16',  2,  '2026-07-04 21:00:00+00', 'SCHEDULED'), -- Sat Jul  4 · 5:00 PM ET
('16000000-0000-0000-0000-000000000003', 'R16',  3,  '2026-07-07 00:00:00+00', 'SCHEDULED'), -- Mon Jul  6 · 8:00 PM ET
('16000000-0000-0000-0000-000000000004', 'R16',  4,  '2026-07-06 19:00:00+00', 'SCHEDULED'), -- Mon Jul  6 · 3:00 PM ET
('16000000-0000-0000-0000-000000000005', 'R16',  5,  '2026-07-05 20:00:00+00', 'SCHEDULED'), -- Sun Jul  5 · 4:00 PM ET
('16000000-0000-0000-0000-000000000006', 'R16',  6,  '2026-07-06 00:00:00+00', 'SCHEDULED'), -- Sun Jul  5 · 8:00 PM ET
('16000000-0000-0000-0000-000000000007', 'R16',  7,  '2026-07-07 20:00:00+00', 'SCHEDULED'), -- Tue Jul  7 · 4:00 PM ET
('16000000-0000-0000-0000-000000000008', 'R16',  8,  '2026-07-07 16:00:00+00', 'SCHEDULED')  -- Tue Jul  7 · 12:00 PM ET
ON CONFLICT (round, match_number) DO NOTHING;

-- Quarterfinals (4 matches)
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('04000000-0000-0000-0000-000000000001', 'QF',  1,  '2026-07-09 20:00:00+00', 'SCHEDULED'), -- Thu Jul  9 · 4:00 PM ET
('04000000-0000-0000-0000-000000000002', 'QF',  2,  '2026-07-10 19:00:00+00', 'SCHEDULED'), -- Fri Jul 10 · 3:00 PM ET
('04000000-0000-0000-0000-000000000003', 'QF',  3,  '2026-07-11 21:00:00+00', 'SCHEDULED'), -- Sat Jul 11 · 5:00 PM ET
('04000000-0000-0000-0000-000000000004', 'QF',  4,  '2026-07-12 01:00:00+00', 'SCHEDULED')  -- Sat Jul 11 · 9:00 PM ET
ON CONFLICT (round, match_number) DO NOTHING;

-- Semifinals (2 matches)
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('02000000-0000-0000-0000-000000000001', 'SF',  1,  '2026-07-14 19:00:00+00', 'SCHEDULED'), -- Tue Jul 14 · 3:00 PM ET
('02000000-0000-0000-0000-000000000002', 'SF',  2,  '2026-07-15 19:00:00+00', 'SCHEDULED')  -- Wed Jul 15 · 3:00 PM ET
ON CONFLICT (round, match_number) DO NOTHING;

-- Third Place
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('03000000-0000-0000-0000-000000000001', 'THIRD', 1, '2026-07-15 19:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Final
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('01000000-0000-0000-0000-000000000001', 'FINAL', 1, '2026-07-19 19:00:00+00', 'SCHEDULED') -- Sun Jul 19 · 3:00 PM ET
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
