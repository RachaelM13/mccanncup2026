import type { Match, Pick, Round } from '@/types';
import { ROUND_POINTS, CHAMPION_BONUS } from '@/types';

export interface ScoringResult {
  points: number;
  correct_picks: number;
  max_possible: number;
  pick_status: Record<string, 'correct' | 'incorrect' | 'pending' | 'unknown'>;
}

export function calculateScore(
  matches: Match[],
  picks: Pick[]
): ScoringResult {
  const pickMap: Record<string, string> = {};
  for (const p of picks) {
    pickMap[p.match_id] = p.picked_team_id;
  }

  let points = 0;
  let correct = 0;
  let maxPossible = 0;
  const pick_status: ScoringResult['pick_status'] = {};

  for (const match of matches) {
    if (match.round === 'THIRD') continue;

    const picked = pickMap[match.id];
    const roundPts = ROUND_POINTS[match.round];
    const isChampionMatch = match.round === 'FINAL';
    const bonus = isChampionMatch ? CHAMPION_BONUS : 0;

    if (!picked) {
      pick_status[match.id] = 'unknown';
      continue;
    }

    if (match.status === 'COMPLETED' && match.winner_id) {
      if (picked === match.winner_id) {
        points += roundPts + bonus;
        correct++;
        pick_status[match.id] = 'correct';
      } else {
        pick_status[match.id] = 'incorrect';
      }
    } else {
      maxPossible += roundPts + bonus;
      pick_status[match.id] = 'pending';
    }
  }

  return { points, correct_picks: correct, max_possible: points + maxPossible, pick_status };
}

export function getMaxPossiblePoints(): number {
  const rounds: Round[] = ['R32', 'R16', 'QF', 'SF', 'FINAL'];
  const matchCounts: Record<Round, number> = { R32: 16, R16: 8, QF: 4, SF: 2, THIRD: 0, FINAL: 1 };
  return rounds.reduce((sum, round) => sum + ROUND_POINTS[round] * matchCounts[round], 0) + CHAMPION_BONUS;
}
