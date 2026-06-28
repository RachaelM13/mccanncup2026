-- Rachael's World Cup 2026 – Round of 32 Matchups
-- Run this in your Supabase SQL Editor to populate R32 teams and kickoff times.
-- All times stored as UTC (ET = UTC-4 / EDT in summer).
--
-- Team ID reference (from seed.sql):
--   South Africa  a1000000-0000-0000-0000-000000000004
--   Canada        a2000000-0000-0000-0000-000000000001
--   Brazil        a3000000-0000-0000-0000-000000000001
--   Japan         a6000000-0000-0000-0000-000000000002
--   Germany       a5000000-0000-0000-0000-000000000001
--   Paraguay      a4000000-0000-0000-0000-000000000003
--   Netherlands   a6000000-0000-0000-0000-000000000001
--   Morocco       a3000000-0000-0000-0000-000000000002
--   Côte d'Ivoire a5000000-0000-0000-0000-000000000002
--   Norway        a9000000-0000-0000-0000-000000000002
--   France        a9000000-0000-0000-0000-000000000001
--   Sweden        a6000000-0000-0000-0000-000000000003
--   Mexico        a1000000-0000-0000-0000-000000000001
--   Ecuador       a5000000-0000-0000-0000-000000000003
--   England       b2000000-0000-0000-0000-000000000001
--   DR Congo      b1000000-0000-0000-0000-000000000003
--   Belgium       a7000000-0000-0000-0000-000000000001
--   Senegal       a9000000-0000-0000-0000-000000000003
--   United States a4000000-0000-0000-0000-000000000001
--   Bosnia & Herz a2000000-0000-0000-0000-000000000003
--   Spain         a8000000-0000-0000-0000-000000000001
--   Austria       b0000000-0000-0000-0000-000000000002
--   Portugal      b1000000-0000-0000-0000-000000000002
--   Croatia       b2000000-0000-0000-0000-000000000002
--   Switzerland   a2000000-0000-0000-0000-000000000002
--   Algeria       b0000000-0000-0000-0000-000000000004
--   Australia     a4000000-0000-0000-0000-000000000002
--   Egypt         a7000000-0000-0000-0000-000000000003
--   Argentina     b0000000-0000-0000-0000-000000000001
--   Cape Verde    a8000000-0000-0000-0000-000000000004
--   Colombia      b1000000-0000-0000-0000-000000000001
--   Ghana         b2000000-0000-0000-0000-000000000003

-- Match 1 | Sun Jun 28 · 3:00 PM ET → 19:00 UTC
-- 🇿🇦 South Africa vs 🇨🇦 Canada
UPDATE matches SET
  home_team_id = 'a1000000-0000-0000-0000-000000000004',
  away_team_id = 'a2000000-0000-0000-0000-000000000001',
  kickoff      = '2026-06-28 19:00:00+00'
WHERE id = '32000000-0000-0000-0000-000000000001';

-- Match 2 | Mon Jun 29 · 1:00 PM ET → 17:00 UTC
-- 🇧🇷 Brazil vs 🇯🇵 Japan
UPDATE matches SET
  home_team_id = 'a3000000-0000-0000-0000-000000000001',
  away_team_id = 'a6000000-0000-0000-0000-000000000002',
  kickoff      = '2026-06-29 17:00:00+00'
WHERE id = '32000000-0000-0000-0000-000000000002';

-- Match 3 | Mon Jun 29 · 4:30 PM ET → 20:30 UTC
-- 🇩🇪 Germany vs 🇵🇾 Paraguay
UPDATE matches SET
  home_team_id = 'a5000000-0000-0000-0000-000000000001',
  away_team_id = 'a4000000-0000-0000-0000-000000000003',
  kickoff      = '2026-06-29 20:30:00+00'
WHERE id = '32000000-0000-0000-0000-000000000003';

-- Match 4 | Mon Jun 29 · 9:00 PM ET → Tue 01:00 UTC
-- 🇳🇱 Netherlands vs 🇲🇦 Morocco
UPDATE matches SET
  home_team_id = 'a6000000-0000-0000-0000-000000000001',
  away_team_id = 'a3000000-0000-0000-0000-000000000002',
  kickoff      = '2026-06-30 01:00:00+00'
WHERE id = '32000000-0000-0000-0000-000000000004';

-- Match 5 | Tue Jun 30 · 1:00 PM ET → 17:00 UTC
-- 🇨🇮 Côte d'Ivoire vs 🇳🇴 Norway
UPDATE matches SET
  home_team_id = 'a5000000-0000-0000-0000-000000000002',
  away_team_id = 'a9000000-0000-0000-0000-000000000002',
  kickoff      = '2026-06-30 17:00:00+00'
WHERE id = '32000000-0000-0000-0000-000000000005';

-- Match 6 | Tue Jun 30 · 5:00 PM ET → 21:00 UTC
-- 🇫🇷 France vs 🇸🇪 Sweden
UPDATE matches SET
  home_team_id = 'a9000000-0000-0000-0000-000000000001',
  away_team_id = 'a6000000-0000-0000-0000-000000000003',
  kickoff      = '2026-06-30 21:00:00+00'
WHERE id = '32000000-0000-0000-0000-000000000006';

-- Match 7 | Tue Jun 30 · 9:00 PM ET → Wed 01:00 UTC
-- 🇲🇽 Mexico vs 🇪🇨 Ecuador
UPDATE matches SET
  home_team_id = 'a1000000-0000-0000-0000-000000000001',
  away_team_id = 'a5000000-0000-0000-0000-000000000003',
  kickoff      = '2026-07-01 01:00:00+00'
WHERE id = '32000000-0000-0000-0000-000000000007';

-- Match 8 | Wed Jul 1 · 12:00 PM ET → 16:00 UTC
-- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England vs 🇨🇩 DR Congo
UPDATE matches SET
  home_team_id = 'b2000000-0000-0000-0000-000000000001',
  away_team_id = 'b1000000-0000-0000-0000-000000000003',
  kickoff      = '2026-07-01 16:00:00+00'
WHERE id = '32000000-0000-0000-0000-000000000008';

-- Match 9 | Wed Jul 1 · 4:00 PM ET → 20:00 UTC
-- 🇧🇪 Belgium vs 🇸🇳 Senegal
UPDATE matches SET
  home_team_id = 'a7000000-0000-0000-0000-000000000001',
  away_team_id = 'a9000000-0000-0000-0000-000000000003',
  kickoff      = '2026-07-01 20:00:00+00'
WHERE id = '32000000-0000-0000-0000-000000000009';

-- Match 10 | Wed Jul 1 · 8:00 PM ET → Thu 00:00 UTC
-- 🇺🇸 United States vs 🇧🇦 Bosnia & Herzegovina
UPDATE matches SET
  home_team_id = 'a4000000-0000-0000-0000-000000000001',
  away_team_id = 'a2000000-0000-0000-0000-000000000003',
  kickoff      = '2026-07-02 00:00:00+00'
WHERE id = '32000000-0000-0000-0000-00000000000a';

-- Match 11 | Thu Jul 2 · 3:00 PM ET → 19:00 UTC
-- 🇪🇸 Spain vs 🇦🇹 Austria
UPDATE matches SET
  home_team_id = 'a8000000-0000-0000-0000-000000000001',
  away_team_id = 'b0000000-0000-0000-0000-000000000002',
  kickoff      = '2026-07-02 19:00:00+00'
WHERE id = '32000000-0000-0000-0000-00000000000b';

-- Match 12 | Thu Jul 2 · 7:00 PM ET → 23:00 UTC
-- 🇵🇹 Portugal vs 🇭🇷 Croatia
UPDATE matches SET
  home_team_id = 'b1000000-0000-0000-0000-000000000002',
  away_team_id = 'b2000000-0000-0000-0000-000000000002',
  kickoff      = '2026-07-02 23:00:00+00'
WHERE id = '32000000-0000-0000-0000-00000000000c';

-- Match 13 | Thu Jul 2 · 11:00 PM ET → Fri 03:00 UTC
-- 🇨🇭 Switzerland vs 🇩🇿 Algeria
UPDATE matches SET
  home_team_id = 'a2000000-0000-0000-0000-000000000002',
  away_team_id = 'b0000000-0000-0000-0000-000000000004',
  kickoff      = '2026-07-03 03:00:00+00'
WHERE id = '32000000-0000-0000-0000-00000000000d';

-- Match 14 | Fri Jul 3 · 2:00 PM ET → 18:00 UTC
-- 🇦🇺 Australia vs 🇪🇬 Egypt
UPDATE matches SET
  home_team_id = 'a4000000-0000-0000-0000-000000000002',
  away_team_id = 'a7000000-0000-0000-0000-000000000003',
  kickoff      = '2026-07-03 18:00:00+00'
WHERE id = '32000000-0000-0000-0000-00000000000e';

-- Match 15 | Fri Jul 3 · 6:00 PM ET → 22:00 UTC
-- 🇦🇷 Argentina vs 🇨🇻 Cape Verde
UPDATE matches SET
  home_team_id = 'b0000000-0000-0000-0000-000000000001',
  away_team_id = 'a8000000-0000-0000-0000-000000000004',
  kickoff      = '2026-07-03 22:00:00+00'
WHERE id = '32000000-0000-0000-0000-00000000000f';

-- Match 16 | Fri Jul 3 · 9:30 PM ET → Sat 01:30 UTC
-- 🇨🇴 Colombia vs 🇬🇭 Ghana
UPDATE matches SET
  home_team_id = 'b1000000-0000-0000-0000-000000000001',
  away_team_id = 'b2000000-0000-0000-0000-000000000003',
  kickoff      = '2026-07-04 01:30:00+00'
WHERE id = '32000000-0000-0000-0000-000000000010';
