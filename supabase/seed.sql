-- Rachael's World Cup 2026 – Seed Data
-- 48 teams + knockout bracket structure
-- Run AFTER schema.sql

-- ── Teams (48 qualified nations) ───────────────────────────────────────────
-- Groups A-L, 4 teams each
INSERT INTO teams (id, fifa_code, name, flag, group_letter) VALUES
-- Group A
('a1000000-0000-0000-0000-000000000001', 'USA', 'United States',    '🇺🇸', 'A'),
('a1000000-0000-0000-0000-000000000002', 'PAN', 'Panama',           '🇵🇦', 'A'),
('a1000000-0000-0000-0000-000000000003', 'BOL', 'Bolivia',          '🇧🇴', 'A'),
('a1000000-0000-0000-0000-000000000004', 'NZL', 'New Zealand',      '🇳🇿', 'A'),
-- Group B
('a2000000-0000-0000-0000-000000000001', 'ARG', 'Argentina',        '🇦🇷', 'B'),
('a2000000-0000-0000-0000-000000000002', 'CHI', 'Chile',            '🇨🇱', 'B'),
('a2000000-0000-0000-0000-000000000003', 'ALB', 'Albania',          '🇦🇱', 'B'),
('a2000000-0000-0000-0000-000000000004', 'UKR', 'Ukraine',          '🇺🇦', 'B'),
-- Group C
('a3000000-0000-0000-0000-000000000001', 'MEX', 'Mexico',           '🇲🇽', 'C'),
('a3000000-0000-0000-0000-000000000002', 'ECU', 'Ecuador',          '🇪🇨', 'C'),
('a3000000-0000-0000-0000-000000000003', 'CRC', 'Costa Rica',       '🇨🇷', 'C'),
('a3000000-0000-0000-0000-000000000004', 'TUR', 'Turkey',           '🇹🇷', 'C'),
-- Group D
('a4000000-0000-0000-0000-000000000001', 'ENG', 'England',          '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'D'),
('a4000000-0000-0000-0000-000000000002', 'SEN', 'Senegal',          '🇸🇳', 'D'),
('a4000000-0000-0000-0000-000000000003', 'SLO', 'Slovenia',         '🇸🇮', 'D'),
('a4000000-0000-0000-0000-000000000004', 'ROU', 'Romania',          '🇷🇴', 'D'),
-- Group E
('a5000000-0000-0000-0000-000000000001', 'ESP', 'Spain',            '🇪🇸', 'E'),
('a5000000-0000-0000-0000-000000000002', 'BRA', 'Brazil',           '🇧🇷', 'E'),
('a5000000-0000-0000-0000-000000000003', 'JAP', 'Japan',            '🇯🇵', 'E'),
('a5000000-0000-0000-0000-000000000004', 'ZAM', 'Zambia',           '🇿🇲', 'E'),
-- Group F
('a6000000-0000-0000-0000-000000000001', 'FRA', 'France',           '🇫🇷', 'F'),
('a6000000-0000-0000-0000-000000000002', 'MAR', 'Morocco',          '🇲🇦', 'F'),
('a6000000-0000-0000-0000-000000000003', 'BEL', 'Belgium',          '🇧🇪', 'F'),
('a6000000-0000-0000-0000-000000000004', 'IRQ', 'Iraq',             '🇮🇶', 'F'),
-- Group G
('a7000000-0000-0000-0000-000000000001', 'GER', 'Germany',          '🇩🇪', 'G'),
('a7000000-0000-0000-0000-000000000002', 'CAN', 'Canada',           '🇨🇦', 'G'),
('a7000000-0000-0000-0000-000000000003', 'POR', 'Portugal',         '🇵🇹', 'G'),
('a7000000-0000-0000-0000-000000000004', 'CMR', 'Cameroon',         '🇨🇲', 'G'),
-- Group H
('a8000000-0000-0000-0000-000000000001', 'NED', 'Netherlands',      '🇳🇱', 'H'),
('a8000000-0000-0000-0000-000000000002', 'URU', 'Uruguay',          '🇺🇾', 'H'),
('a8000000-0000-0000-0000-000000000003', 'KOR', 'South Korea',      '🇰🇷', 'H'),
('a8000000-0000-0000-0000-000000000004', 'IRN', 'Iran',             '🇮🇷', 'H'),
-- Group I
('a9000000-0000-0000-0000-000000000001', 'COL', 'Colombia',         '🇨🇴', 'I'),
('a9000000-0000-0000-0000-000000000002', 'DEN', 'Denmark',          '🇩🇰', 'I'),
('a9000000-0000-0000-0000-000000000003', 'EGY', 'Egypt',            '🇪🇬', 'I'),
('a9000000-0000-0000-0000-000000000004', 'AUS', 'Australia',        '🇦🇺', 'I'),
-- Group J
('b0000000-0000-0000-0000-000000000001', 'ITA', 'Italy',            '🇮🇹', 'J'),
('b0000000-0000-0000-0000-000000000002', 'VEN', 'Venezuela',        '🇻🇪', 'J'),
('b0000000-0000-0000-0000-000000000003', 'NGA', 'Nigeria',          '🇳🇬', 'J'),
('b0000000-0000-0000-0000-000000000004', 'JPN', 'Jordan',           '🇯🇴', 'J'),
-- Group K
('b1000000-0000-0000-0000-000000000001', 'SUI', 'Switzerland',      '🇨🇭', 'K'),
('b1000000-0000-0000-0000-000000000002', 'CIV', 'Ivory Coast',      '🇨🇮', 'K'),
('b1000000-0000-0000-0000-000000000003', 'SRB', 'Serbia',           '🇷🇸', 'K'),
('b1000000-0000-0000-0000-000000000004', 'UZB', 'Uzbekistan',       '🇺🇿', 'K'),
-- Group L
('b2000000-0000-0000-0000-000000000001', 'POR2','Portugal',         '🇵🇹', 'L'),
('b2000000-0000-0000-0000-000000000002', 'CRO', 'Croatia',          '🇭🇷', 'L'),
('b2000000-0000-0000-0000-000000000003', 'SAU', 'Saudi Arabia',     '🇸🇦', 'L'),
('b2000000-0000-0000-0000-000000000004', 'GRN', 'Grenada',          '🇬🇩', 'L')
ON CONFLICT (fifa_code) DO NOTHING;

-- ── Knockout Stage Matches ─────────────────────────────────────────────────
-- First insert all matches with null next_match_id, then update links.
-- Round of 32 (16 matches), Round of 16 (8), QF (4), SF (2), THIRD (1), FINAL (1)

-- Round of 32
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('r32-0001-0000-0000-000000000001', 'R32',  1,  '2026-07-04 19:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000002', 'R32',  2,  '2026-07-04 22:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000003', 'R32',  3,  '2026-07-05 01:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000004', 'R32',  4,  '2026-07-05 18:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000005', 'R32',  5,  '2026-07-05 21:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000006', 'R32',  6,  '2026-07-06 00:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000007', 'R32',  7,  '2026-07-06 18:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000008', 'R32',  8,  '2026-07-06 21:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000009', 'R32',  9,  '2026-07-07 00:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000010', 'R32', 10,  '2026-07-07 18:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000011', 'R32', 11,  '2026-07-07 21:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000012', 'R32', 12,  '2026-07-08 00:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000013', 'R32', 13,  '2026-07-08 18:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000014', 'R32', 14,  '2026-07-08 21:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000015', 'R32', 15,  '2026-07-09 00:00:00+00', 'SCHEDULED'),
('r32-0001-0000-0000-000000000016', 'R32', 16,  '2026-07-09 18:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Round of 16
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('r16-0001-0000-0000-000000000001', 'R16',  1,  '2026-07-11 22:00:00+00', 'SCHEDULED'),
('r16-0001-0000-0000-000000000002', 'R16',  2,  '2026-07-12 02:00:00+00', 'SCHEDULED'),
('r16-0001-0000-0000-000000000003', 'R16',  3,  '2026-07-12 22:00:00+00', 'SCHEDULED'),
('r16-0001-0000-0000-000000000004', 'R16',  4,  '2026-07-13 02:00:00+00', 'SCHEDULED'),
('r16-0001-0000-0000-000000000005', 'R16',  5,  '2026-07-13 22:00:00+00', 'SCHEDULED'),
('r16-0001-0000-0000-000000000006', 'R16',  6,  '2026-07-14 02:00:00+00', 'SCHEDULED'),
('r16-0001-0000-0000-000000000007', 'R16',  7,  '2026-07-14 22:00:00+00', 'SCHEDULED'),
('r16-0001-0000-0000-000000000008', 'R16',  8,  '2026-07-15 02:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Quarterfinals
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('qf00-0001-0000-0000-000000000001', 'QF',  1,  '2026-07-17 22:00:00+00', 'SCHEDULED'),
('qf00-0001-0000-0000-000000000002', 'QF',  2,  '2026-07-18 02:00:00+00', 'SCHEDULED'),
('qf00-0001-0000-0000-000000000003', 'QF',  3,  '2026-07-18 22:00:00+00', 'SCHEDULED'),
('qf00-0001-0000-0000-000000000004', 'QF',  4,  '2026-07-19 02:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Semifinals
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('sf00-0001-0000-0000-000000000001', 'SF',  1,  '2026-07-22 02:00:00+00', 'SCHEDULED'),
('sf00-0001-0000-0000-000000000002', 'SF',  2,  '2026-07-23 02:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Third Place
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('tp00-0001-0000-0000-000000000001', 'THIRD', 1, '2026-07-25 19:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- Final
INSERT INTO matches (id, round, match_number, kickoff, status) VALUES
('fin0-0001-0000-0000-000000000001', 'FINAL', 1, '2026-07-26 20:00:00+00', 'SCHEDULED')
ON CONFLICT (round, match_number) DO NOTHING;

-- ── Wire up bracket advancement ───────────────────────────────────────────
-- R32 → R16
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000001', next_match_slot = 'home' WHERE id = 'r32-0001-0000-0000-000000000001';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000001', next_match_slot = 'away' WHERE id = 'r32-0001-0000-0000-000000000002';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000002', next_match_slot = 'home' WHERE id = 'r32-0001-0000-0000-000000000003';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000002', next_match_slot = 'away' WHERE id = 'r32-0001-0000-0000-000000000004';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000003', next_match_slot = 'home' WHERE id = 'r32-0001-0000-0000-000000000005';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000003', next_match_slot = 'away' WHERE id = 'r32-0001-0000-0000-000000000006';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000004', next_match_slot = 'home' WHERE id = 'r32-0001-0000-0000-000000000007';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000004', next_match_slot = 'away' WHERE id = 'r32-0001-0000-0000-000000000008';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000005', next_match_slot = 'home' WHERE id = 'r32-0001-0000-0000-000000000009';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000005', next_match_slot = 'away' WHERE id = 'r32-0001-0000-0000-000000000010';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000006', next_match_slot = 'home' WHERE id = 'r32-0001-0000-0000-000000000011';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000006', next_match_slot = 'away' WHERE id = 'r32-0001-0000-0000-000000000012';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000007', next_match_slot = 'home' WHERE id = 'r32-0001-0000-0000-000000000013';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000007', next_match_slot = 'away' WHERE id = 'r32-0001-0000-0000-000000000014';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000008', next_match_slot = 'home' WHERE id = 'r32-0001-0000-0000-000000000015';
UPDATE matches SET next_match_id = 'r16-0001-0000-0000-000000000008', next_match_slot = 'away' WHERE id = 'r32-0001-0000-0000-000000000016';

-- R16 → QF
UPDATE matches SET next_match_id = 'qf00-0001-0000-0000-000000000001', next_match_slot = 'home' WHERE id = 'r16-0001-0000-0000-000000000001';
UPDATE matches SET next_match_id = 'qf00-0001-0000-0000-000000000001', next_match_slot = 'away' WHERE id = 'r16-0001-0000-0000-000000000002';
UPDATE matches SET next_match_id = 'qf00-0001-0000-0000-000000000002', next_match_slot = 'home' WHERE id = 'r16-0001-0000-0000-000000000003';
UPDATE matches SET next_match_id = 'qf00-0001-0000-0000-000000000002', next_match_slot = 'away' WHERE id = 'r16-0001-0000-0000-000000000004';
UPDATE matches SET next_match_id = 'qf00-0001-0000-0000-000000000003', next_match_slot = 'home' WHERE id = 'r16-0001-0000-0000-000000000005';
UPDATE matches SET next_match_id = 'qf00-0001-0000-0000-000000000003', next_match_slot = 'away' WHERE id = 'r16-0001-0000-0000-000000000006';
UPDATE matches SET next_match_id = 'qf00-0001-0000-0000-000000000004', next_match_slot = 'home' WHERE id = 'r16-0001-0000-0000-000000000007';
UPDATE matches SET next_match_id = 'qf00-0001-0000-0000-000000000004', next_match_slot = 'away' WHERE id = 'r16-0001-0000-0000-000000000008';

-- QF → SF
UPDATE matches SET next_match_id = 'sf00-0001-0000-0000-000000000001', next_match_slot = 'home' WHERE id = 'qf00-0001-0000-0000-000000000001';
UPDATE matches SET next_match_id = 'sf00-0001-0000-0000-000000000001', next_match_slot = 'away' WHERE id = 'qf00-0001-0000-0000-000000000002';
UPDATE matches SET next_match_id = 'sf00-0001-0000-0000-000000000002', next_match_slot = 'home' WHERE id = 'qf00-0001-0000-0000-000000000003';
UPDATE matches SET next_match_id = 'sf00-0001-0000-0000-000000000002', next_match_slot = 'away' WHERE id = 'qf00-0001-0000-0000-000000000004';

-- SF → FINAL (winners)
UPDATE matches SET next_match_id = 'fin0-0001-0000-0000-000000000001', next_match_slot = 'home' WHERE id = 'sf00-0001-0000-0000-000000000001';
UPDATE matches SET next_match_id = 'fin0-0001-0000-0000-000000000001', next_match_slot = 'away' WHERE id = 'sf00-0001-0000-0000-000000000002';
-- SF losers → THIRD PLACE (handled manually in admin)
