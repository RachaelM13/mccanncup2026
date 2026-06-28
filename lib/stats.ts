import type { Pick } from '@/types';

// Returns, for each match, the percentage of submitted brackets that picked each team
export function computePickPopularity(
  allPicks: Pick[][], // one array of picks per entrant
  matchIds: string[]
): Record<string, Record<string, number>> {
  const total = allPicks.length;
  if (total === 0) return {};

  // matchId → teamId → count
  const counts: Record<string, Record<string, number>> = {};
  for (const matchId of matchIds) {
    counts[matchId] = {};
  }

  for (const entrantPicks of allPicks) {
    for (const pick of entrantPicks) {
      if (!counts[pick.match_id]) counts[pick.match_id] = {};
      counts[pick.match_id][pick.picked_team_id] =
        (counts[pick.match_id][pick.picked_team_id] ?? 0) + 1;
    }
  }

  // Convert counts to percentages
  const pct: Record<string, Record<string, number>> = {};
  for (const [matchId, teamCounts] of Object.entries(counts)) {
    pct[matchId] = {};
    for (const [teamId, count] of Object.entries(teamCounts)) {
      pct[matchId][teamId] = Math.round((count / total) * 100);
    }
  }

  return pct;
}
