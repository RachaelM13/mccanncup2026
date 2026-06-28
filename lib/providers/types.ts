import type { Match, Team, Entrant, Pick, LeaderboardEntry, Round, BracketPicks } from '@/types';

export interface TournamentDataProvider {
  // Teams
  getTeams(): Promise<Team[]>;
  getTeam(id: string): Promise<Team | null>;

  // Matches
  getMatches(): Promise<Match[]>;
  getMatchesByRound(round: Round): Promise<Match[]>;
  getMatch(id: string): Promise<Match | null>;

  // Admin: match updates
  updateMatch(id: string, data: {
    winner_id?: string | null;
    home_score?: number | null;
    away_score?: number | null;
    status?: string;
    home_team_id?: string | null;
    away_team_id?: string | null;
    kickoff?: string | null;
  }): Promise<Match>;
  advanceWinner(matchId: string, winnerId: string): Promise<void>;

  // Entrants
  getEntrants(): Promise<Entrant[]>;
  getEntrant(idOrToken: string): Promise<Entrant | null>;
  createEntrant(data: { full_name: string; team_name: string }): Promise<{ entrant: Entrant; token: string }>;
  submitBracket(entrantId: string, token: string): Promise<void>;

  // Picks
  getPicksForEntrant(entrantId: string): Promise<Pick[]>;
  savePick(entrantId: string, matchId: string, pickedTeamId: string): Promise<void>;
  saveAllPicks(entrantId: string, picks: BracketPicks): Promise<void>;

  // Leaderboard
  getLeaderboard(): Promise<LeaderboardEntry[]>;
  recalculateScores(): Promise<void>;

  // Admin
  resetTournament(): Promise<void>;
}
