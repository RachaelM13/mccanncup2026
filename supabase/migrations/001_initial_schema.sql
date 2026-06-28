-- Rachael's World Cup 2026 – Database Schema
-- Run this in your Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Teams ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teams (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fifa_code    VARCHAR(3)   NOT NULL UNIQUE,
  name         VARCHAR(100) NOT NULL,
  flag         VARCHAR(10)  NOT NULL,
  group_letter VARCHAR(1),
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

-- ── Matches ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS matches (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  round            VARCHAR(10)  NOT NULL CHECK (round IN ('R32','R16','QF','SF','THIRD','FINAL')),
  match_number     INT          NOT NULL,
  home_team_id     UUID         REFERENCES teams(id),
  away_team_id     UUID         REFERENCES teams(id),
  winner_id        UUID         REFERENCES teams(id),
  home_score       INT,
  away_score       INT,
  kickoff          TIMESTAMPTZ,
  status           VARCHAR(20)  NOT NULL DEFAULT 'SCHEDULED'
                                CHECK (status IN ('SCHEDULED','LIVE','COMPLETED')),
  next_match_id    UUID         REFERENCES matches(id),
  next_match_slot  VARCHAR(4)   CHECK (next_match_slot IN ('home','away')),
  created_at       TIMESTAMPTZ  DEFAULT NOW(),
  UNIQUE (round, match_number)
);

-- ── Entrants ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS entrants (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name      VARCHAR(200) NOT NULL,
  team_name      VARCHAR(200) NOT NULL,
  bracket_token  VARCHAR(64)  NOT NULL UNIQUE,
  submitted_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ  DEFAULT NOW()
);

-- ── Picks ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS picks (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entrant_id     UUID NOT NULL REFERENCES entrants(id) ON DELETE CASCADE,
  match_id       UUID NOT NULL REFERENCES matches(id),
  picked_team_id UUID NOT NULL REFERENCES teams(id),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (entrant_id, match_id)
);

-- ── Leaderboard view ───────────────────────────────────────────────────────
CREATE OR REPLACE VIEW leaderboard AS
SELECT
  e.id,
  e.full_name,
  e.team_name,
  e.bracket_token,
  e.submitted_at,
  COALESCE(SUM(
    CASE
      WHEN m.winner_id IS NOT NULL AND m.winner_id = p.picked_team_id THEN
        CASE m.round
          WHEN 'R32'   THEN 1
          WHEN 'R16'   THEN 2
          WHEN 'QF'    THEN 4
          WHEN 'SF'    THEN 8
          WHEN 'FINAL' THEN 26  -- 16 + 10 champion bonus
          ELSE 0
        END
      ELSE 0
    END
  ), 0)::INT AS points,
  COUNT(CASE WHEN m.winner_id IS NOT NULL AND m.winner_id = p.picked_team_id THEN 1 END)::INT AS correct_picks
FROM entrants e
LEFT JOIN picks p    ON p.entrant_id = e.id
LEFT JOIN matches m  ON m.id = p.match_id
WHERE e.submitted_at IS NOT NULL
GROUP BY e.id, e.full_name, e.team_name, e.bracket_token, e.submitted_at
ORDER BY points DESC;

-- ── Row Level Security ─────────────────────────────────────────────────────
-- Public read for everything
ALTER TABLE teams    ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches  ENABLE ROW LEVEL SECURITY;
ALTER TABLE entrants ENABLE ROW LEVEL SECURITY;
ALTER TABLE picks    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read teams"    ON teams    FOR SELECT USING (true);
CREATE POLICY "public read matches"  ON matches  FOR SELECT USING (true);
CREATE POLICY "public read entrants" ON entrants FOR SELECT USING (true);
CREATE POLICY "public read picks"    ON picks    FOR SELECT USING (true);

-- Service role bypasses RLS (used by server-side actions)
-- No additional policies needed — service role key ignores RLS
