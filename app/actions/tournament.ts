'use server';

import { getTournamentProvider } from '@/lib/providers';
import type { BracketPicks } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getMatchesAction() {
  const provider = getTournamentProvider();
  return provider.getMatches();
}

export async function getLeaderboardAction() {
  const provider = getTournamentProvider();
  return provider.getLeaderboard();
}

export async function getTeamsAction() {
  const provider = getTournamentProvider();
  return provider.getTeams();
}

export async function createEntrantAction(data: { full_name: string; team_name: string }) {
  const provider = getTournamentProvider();
  return provider.createEntrant(data);
}

export async function savePicksAction(entrantId: string, picks: BracketPicks) {
  const provider = getTournamentProvider();
  await provider.saveAllPicks(entrantId, picks);
}

export async function submitBracketAction(entrantId: string, token: string) {
  const provider = getTournamentProvider();
  await provider.submitBracket(entrantId, token);
  revalidatePath('/');
  revalidatePath('/leaderboard');
}

export async function getEntrantAction(idOrToken: string) {
  const provider = getTournamentProvider();
  return provider.getEntrant(idOrToken);
}

export async function getPicksForEntrantAction(entrantId: string) {
  const provider = getTournamentProvider();
  return provider.getPicksForEntrant(entrantId);
}

// Admin
export async function adminUpdateMatchAction(
  password: string,
  matchId: string,
  data: {
    winner_id?: string | null;
    home_score?: number | null;
    away_score?: number | null;
    status?: string;
    home_team_id?: string | null;
    away_team_id?: string | null;
    kickoff?: string | null;
  }
) {
  if (password !== process.env.ADMIN_PASSWORD) throw new Error('Unauthorized');
  const provider = getTournamentProvider();
  const match = await provider.updateMatch(matchId, data);
  if (data.winner_id) {
    await provider.advanceWinner(matchId, data.winner_id);
  }
  revalidatePath('/');
  revalidatePath('/leaderboard');
  revalidatePath('/admin');
  return match;
}

export async function adminResetTournamentAction(password: string) {
  if (password !== process.env.ADMIN_PASSWORD) throw new Error('Unauthorized');
  const provider = getTournamentProvider();
  await provider.resetTournament();
  revalidatePath('/');
  revalidatePath('/leaderboard');
  revalidatePath('/admin');
}
