export type Round = 'R32' | 'R16' | 'QF' | 'SF' | 'THIRD' | 'FINAL';

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'COMPLETED';

export interface Team {
  id: string;
  fifa_code: string;
  name: string;
  flag: string;
  group_letter: string | null;
}

export interface Match {
  id: string;
  round: Round;
  match_number: number;
  home_team_id: string | null;
  away_team_id: string | null;
  home_team: Team | null;
  away_team: Team | null;
  winner_id: string | null;
  winner: Team | null;
  home_score: number | null;
  away_score: number | null;
  kickoff: string | null;
  status: MatchStatus;
  next_match_id: string | null;
  next_match_slot: 'home' | 'away' | null;
}

export interface Entrant {
  id: string;
  full_name: string;
  team_name: string;
  bracket_token: string;
  submitted_at: string | null;
  created_at: string;
}

export interface Pick {
  entrant_id: string;
  match_id: string;
  picked_team_id: string;
  picked_team: Team | null;
}

export interface EntrantWithScore extends Entrant {
  points: number;
  correct_picks: number;
  max_possible: number;
  rank?: number;
}

export interface BracketPicks {
  [matchId: string]: string; // matchId → picked team id
}

export interface LeaderboardEntry {
  id: string;
  full_name: string;
  team_name: string;
  bracket_token: string;
  submitted_at: string | null;
  points: number;
  correct_picks: number;
  max_possible: number;
  rank: number;
}

export const ROUND_LABELS: Record<Round, string> = {
  R32: 'Round of 32',
  R16: 'Round of 16',
  QF: 'Quarterfinals',
  SF: 'Semifinals',
  THIRD: 'Third Place',
  FINAL: 'Final',
};

export const ROUND_POINTS: Record<Round, number> = {
  R32: 1,
  R16: 2,
  QF: 4,
  SF: 8,
  THIRD: 0,
  FINAL: 16,
};

export const CHAMPION_BONUS = 10;

export const ROUND_ORDER: Round[] = ['R32', 'R16', 'QF', 'SF', 'THIRD', 'FINAL'];
