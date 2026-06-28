import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { TournamentDataProvider } from './types';
import type { Match, Team, Entrant, Pick, LeaderboardEntry, Round, BracketPicks } from '@/types';
import { ROUND_POINTS, CHAMPION_BONUS } from '@/types';
import crypto from 'crypto';

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

function toTeam(r: Row): Team {
  return {
    id: r.id,
    fifa_code: r.fifa_code,
    name: r.name,
    flag: r.flag,
    group_letter: r.group_letter ?? null,
  };
}

function toMatch(r: Row, teamsMap: Record<string, Team>): Match {
  return {
    id: r.id,
    round: r.round as Match['round'],
    match_number: r.match_number,
    home_team_id: r.home_team_id ?? null,
    away_team_id: r.away_team_id ?? null,
    home_team: r.home_team_id ? (teamsMap[r.home_team_id] ?? null) : null,
    away_team: r.away_team_id ? (teamsMap[r.away_team_id] ?? null) : null,
    winner_id: r.winner_id ?? null,
    winner: r.winner_id ? (teamsMap[r.winner_id] ?? null) : null,
    home_score: r.home_score ?? null,
    away_score: r.away_score ?? null,
    kickoff: r.kickoff ?? null,
    status: r.status as Match['status'],
    next_match_id: r.next_match_id ?? null,
    next_match_slot: r.next_match_slot ?? null,
  };
}

export class ManualTournamentProvider implements TournamentDataProvider {
  private get db() {
    return getSupabaseServerClient();
  }

  async getTeams(): Promise<Team[]> {
    const { data, error } = await this.db.from('teams').select('*').order('name');
    if (error) throw new Error(error.message);
    return (data as Row[]).map(toTeam);
  }

  async getTeam(id: string): Promise<Team | null> {
    const { data, error } = await this.db.from('teams').select('*').eq('id', id).single();
    if (error) return null;
    return toTeam(data as Row);
  }

  async getMatches(): Promise<Match[]> {
    const { data, error } = await this.db
      .from('matches')
      .select('*')
      .order('match_number');
    if (error) throw new Error(error.message);

    const rows = data as Row[];
    const teamIds = new Set<string>();
    for (const m of rows) {
      if (m.home_team_id) teamIds.add(m.home_team_id);
      if (m.away_team_id) teamIds.add(m.away_team_id);
      if (m.winner_id) teamIds.add(m.winner_id);
    }

    const teamsMap = await this.fetchTeamsMap([...teamIds]);
    return rows.map((m) => toMatch(m, teamsMap));
  }

  async getMatchesByRound(round: Round): Promise<Match[]> {
    const all = await this.getMatches();
    return all.filter((m) => m.round === round);
  }

  async getMatch(id: string): Promise<Match | null> {
    const all = await this.getMatches();
    return all.find((m) => m.id === id) ?? null;
  }

  async updateMatch(
    id: string,
    data: {
      winner_id?: string | null;
      home_score?: number | null;
      away_score?: number | null;
      status?: string;
      home_team_id?: string | null;
      away_team_id?: string | null;
      kickoff?: string | null;
    }
  ): Promise<Match> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await this.db.from('matches').update(data as any).eq('id', id);
    if (error) throw new Error(error.message);
    const match = await this.getMatch(id);
    if (!match) throw new Error('Match not found after update');
    return match;
  }

  async advanceWinner(matchId: string, winnerId: string): Promise<void> {
    const { data: matchRow, error: matchError } = await this.db
      .from('matches')
      .select('next_match_id, next_match_slot')
      .eq('id', matchId)
      .single();
    if (matchError) throw new Error(matchError.message);

    const row = matchRow as Row;
    if (row.next_match_id && row.next_match_slot) {
      const slot = row.next_match_slot === 'home' ? 'home_team_id' : 'away_team_id';
      const update = row.next_match_slot === 'home'
        ? { home_team_id: winnerId }
        : { away_team_id: winnerId };
      const { error } = await this.db
        .from('matches')
        .update(update)
        .eq('id', row.next_match_id);
      if (error) throw new Error(error.message);
    }
  }

  async getEntrants(): Promise<Entrant[]> {
    const { data, error } = await this.db
      .from('entrants')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data as Entrant[];
  }

  async getEntrant(idOrToken: string): Promise<Entrant | null> {
    const isUUID = /^[0-9a-f-]{36}$/i.test(idOrToken);
    const query = this.db.from('entrants').select('*');
    const { data, error } = isUUID
      ? await query.eq('id', idOrToken).single()
      : await query.eq('bracket_token', idOrToken).single();
    if (error) return null;
    return data as Entrant;
  }

  async createEntrant(input: {
    full_name: string;
    team_name: string;
  }): Promise<{ entrant: Entrant; token: string }> {
    const token = generateToken();
    const { data, error } = await this.db
      .from('entrants')
      .insert({ full_name: input.full_name, team_name: input.team_name, bracket_token: token })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { entrant: data as Entrant, token };
  }

  async submitBracket(entrantId: string, token: string): Promise<void> {
    const entrant = await this.getEntrant(entrantId);
    if (!entrant) throw new Error('Entrant not found');
    if (entrant.bracket_token !== token) throw new Error('Invalid token');
    if (entrant.submitted_at) throw new Error('Bracket already submitted');

    const { error } = await this.db
      .from('entrants')
      .update({ submitted_at: new Date().toISOString() })
      .eq('id', entrantId);
    if (error) throw new Error(error.message);
  }

  async getPicksForEntrant(entrantId: string): Promise<Pick[]> {
    const { data, error } = await this.db
      .from('picks')
      .select('*, picked_team:teams(*)')
      .eq('entrant_id', entrantId);
    if (error) throw new Error(error.message);
    return (data as Row[]).map((p) => ({
      entrant_id: p.entrant_id,
      match_id: p.match_id,
      picked_team_id: p.picked_team_id,
      picked_team: p.picked_team ? toTeam(p.picked_team) : null,
    }));
  }

  async savePick(entrantId: string, matchId: string, pickedTeamId: string): Promise<void> {
    const entrant = await this.getEntrant(entrantId);
    if (entrant?.submitted_at) throw new Error('Bracket is locked');

    const { error } = await this.db.from('picks').upsert(
      { entrant_id: entrantId, match_id: matchId, picked_team_id: pickedTeamId },
      { onConflict: 'entrant_id,match_id' }
    );
    if (error) throw new Error(error.message);
  }

  async saveAllPicks(entrantId: string, picks: BracketPicks): Promise<void> {
    const entrant = await this.getEntrant(entrantId);
    if (entrant?.submitted_at) throw new Error('Bracket is locked');

    const rows = Object.entries(picks).map(([matchId, teamId]) => ({
      entrant_id: entrantId,
      match_id: matchId,
      picked_team_id: teamId,
    }));
    if (rows.length === 0) return;

    const { error } = await this.db
      .from('picks')
      .upsert(rows, { onConflict: 'entrant_id,match_id' });
    if (error) throw new Error(error.message);
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const [matches, entrants] = await Promise.all([this.getMatches(), this.getEntrants()]);
    const submitted = entrants.filter((e) => e.submitted_at);
    if (submitted.length === 0) return [];

    const { data: picksData, error } = await this.db
      .from('picks')
      .select('*')
      .in(
        'entrant_id',
        submitted.map((e) => e.id)
      );
    if (error) throw new Error(error.message);

    const picksByEntrant: Record<string, Record<string, string>> = {};
    for (const p of picksData as Row[]) {
      if (!picksByEntrant[p.entrant_id]) picksByEntrant[p.entrant_id] = {};
      picksByEntrant[p.entrant_id][p.match_id] = p.picked_team_id;
    }

    const scored: LeaderboardEntry[] = submitted.map((entrant, i) => {
      const myPicks = picksByEntrant[entrant.id] ?? {};
      let points = 0;
      let correct = 0;
      let maxPossible = 0;

      for (const match of matches) {
        if (match.round === 'THIRD') continue;
        const pick = myPicks[match.id];
        if (!pick) continue;
        const roundPts = ROUND_POINTS[match.round];
        const bonus = match.round === 'FINAL' ? CHAMPION_BONUS : 0;

        if (match.status === 'COMPLETED' && match.winner_id) {
          if (pick === match.winner_id) {
            points += roundPts + bonus;
            correct++;
          }
        } else {
          maxPossible += roundPts + bonus;
        }
      }

      return {
        ...entrant,
        points,
        correct_picks: correct,
        max_possible: points + maxPossible,
        rank: i + 1,
      };
    });

    scored.sort((a, b) => b.points - a.points || b.max_possible - a.max_possible);
    scored.forEach((e, i) => (e.rank = i + 1));
    return scored;
  }

  async recalculateScores(): Promise<void> {
    // Scores are computed dynamically from match results; nothing to persist.
  }

  async resetTournament(): Promise<void> {
    const sentinel = '00000000-0000-0000-0000-000000000000';
    await this.db.from('picks').delete().neq('id', sentinel);
    await this.db.from('entrants').delete().neq('id', sentinel);
    await this.db
      .from('matches')
      .update({ winner_id: null, home_score: null, away_score: null, status: 'SCHEDULED' })
      .neq('id', sentinel);
  }

  private async fetchTeamsMap(ids: string[]): Promise<Record<string, Team>> {
    if (ids.length === 0) return {};
    const { data, error } = await this.db.from('teams').select('*').in('id', ids);
    if (error) throw new Error(error.message);
    const map: Record<string, Team> = {};
    for (const t of data as Row[]) map[t.id] = toTeam(t);
    return map;
  }
}
