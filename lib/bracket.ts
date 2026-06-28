import type { Match, Team, BracketPicks, Round } from '@/types';
import { ROUND_ORDER } from '@/types';

// Build a map of teamId → Team for fast lookup
export function buildTeamsMap(matches: Match[]): Record<string, Team> {
  const map: Record<string, Team> = {};
  for (const m of matches) {
    if (m.home_team) map[m.home_team.id] = m.home_team;
    if (m.away_team) map[m.away_team.id] = m.away_team;
    if (m.winner)    map[m.winner.id]    = m.winner;
  }
  return map;
}

// Given a set of picks and the full match list, compute the teams available in
// each match for the *prediction* bracket (as opposed to the live bracket which
// uses actual results).
export function computeEffectiveTeams(
  matches: Match[],
  picks: BracketPicks,
  teamsMap: Record<string, Team>
): Record<string, { home: Team | null; away: Team | null }> {
  const result: Record<string, { home: Team | null; away: Team | null }> = {};

  // Seed from actual match data
  for (const m of matches) {
    result[m.id] = { home: m.home_team, away: m.away_team };
  }

  // Propagate user picks through the bracket in round order
  for (const round of ROUND_ORDER) {
    const roundMatches = matches.filter((m) => m.round === round);
    for (const m of roundMatches) {
      const pickedId = picks[m.id];
      if (pickedId && m.next_match_id && m.next_match_slot) {
        const team = teamsMap[pickedId] ?? null;
        if (result[m.next_match_id]) {
          if (m.next_match_slot === 'home') result[m.next_match_id].home = team;
          else                              result[m.next_match_id].away = team;
        }
      }
    }
  }

  return result;
}

// When a user changes a pick, remove any downstream picks that depended on the
// team that is no longer advancing.
export function clearDownstreamPicks(
  matchId: string,
  removedTeamId: string,
  matches: Match[],
  picks: BracketPicks
): BracketPicks {
  const match = matches.find((m) => m.id === matchId);
  if (!match?.next_match_id) return picks;

  const nextId = match.next_match_id;
  if (picks[nextId] === removedTeamId) {
    const updated = { ...picks };
    delete updated[nextId];
    return clearDownstreamPicks(nextId, removedTeamId, matches, updated);
  }
  return picks;
}

// Apply a single pick and cascade-clear any now-invalid downstream picks.
export function applyPick(
  matchId: string,
  newTeamId: string,
  matches: Match[],
  currentPicks: BracketPicks
): BracketPicks {
  const oldTeamId = currentPicks[matchId];
  let updated = { ...currentPicks, [matchId]: newTeamId };
  if (oldTeamId && oldTeamId !== newTeamId) {
    updated = clearDownstreamPicks(matchId, oldTeamId, matches, updated);
  }
  return updated;
}

// Count how many pickable matches (non-THIRD) exist and how many are picked
export function getCompletionStats(matches: Match[], picks: BracketPicks) {
  const pickable = matches.filter((m) => m.round !== 'THIRD');
  const picked   = pickable.filter((m) => picks[m.id]);
  return { total: pickable.length, done: picked.length };
}
