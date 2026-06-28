'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { Match, Pick, Round } from '@/types';
import { ROUND_LABELS } from '@/types';
import { computeEffectiveTeams, buildTeamsMap } from '@/lib/bracket';
import { calculateScore } from '@/lib/scoring';
import PickMatchCard from './PickMatchCard';
import FlagIcon from '@/components/ui/FlagIcon';

const PICKABLE_ROUNDS: Round[] = ['R32', 'R16', 'QF', 'SF', 'FINAL'];

interface BracketViewerProps {
  matches: Match[];
  picks: Pick[];
  teamName: string;
  fullName: string;
  // matchId → teamId → pct
  popularity: Record<string, Record<string, number>>;
  isOwn: boolean;
}

export default function BracketViewer({
  matches,
  picks,
  teamName,
  fullName,
  popularity,
  isOwn,
}: BracketViewerProps) {
  const picksMap = Object.fromEntries(picks.map((p) => [p.match_id, p.picked_team_id]));
  const teamsMap = buildTeamsMap(matches);
  const effectiveTeams = computeEffectiveTeams(matches, picksMap, teamsMap);
  const { points, correct_picks, pick_status } = calculateScore(matches, picks);

  const activeRoundDefault = PICKABLE_ROUNDS.find((r) =>
    matches.filter((m) => m.round === r).some((m) => m.status !== 'COMPLETED')
  ) ?? PICKABLE_ROUNDS[PICKABLE_ROUNDS.length - 1];

  const [activeRound, setActiveRound] = useState<Round>(activeRoundDefault);

  const roundMatches = matches
    .filter((m) => m.round === activeRound)
    .sort((a, b) => a.match_number - b.match_number);

  return (
    <div className="space-y-5">
      {/* Hero card */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xl font-black text-white">{teamName}</p>
            <p className="text-sm text-muted-foreground">{fullName}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-3xl font-black text-[#2563EB]">{points}</p>
            <p className="text-xs text-muted-foreground">{correct_picks} correct</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {isOwn && (
            <span className="text-xs bg-[#2563EB]/20 text-[#2563EB] font-semibold px-2.5 py-1 rounded-full">
              Your bracket
            </span>
          )}
          <span className="text-xs bg-white/5 text-muted-foreground px-2.5 py-1 rounded-full">
            🔒 Locked
          </span>
          <Link
            href="/leaderboard"
            className="ml-auto text-xs text-[#2563EB] font-semibold hover:underline"
          >
            ← Leaderboard
          </Link>
        </div>
      </div>

      {/* Round tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {PICKABLE_ROUNDS.filter((r) => matches.some((m) => m.round === r)).map((round) => {
          const isActive = round === activeRound;
          const status = getRoundStatus(
            matches.filter((m) => m.round === round),
            pick_status
          );
          return (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-white'
              }`}
            >
              {ROUND_LABELS[round]}
              {status === 'all-correct' && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22C55E]" />
              )}
              {status === 'has-incorrect' && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#EF4444]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Match cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRound}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {roundMatches.map((match) => {
            const eff = effectiveTeams[match.id] ?? { home: null, away: null };
            const pickedId = picksMap[match.id];
            const matchPop = popularity[match.id] ?? {};

            return (
              <div key={match.id} className="space-y-1.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide px-1">
                  Match {match.match_number}
                </p>
                <PickMatchCard
                  match={match}
                  homeTeam={eff.home}
                  awayTeam={eff.away}
                  pickedTeamId={pickedId}
                  onPick={() => {}}
                  locked
                  actualWinnerId={match.winner_id}
                  matchComplete={match.status === 'COMPLETED'}
                />
                {/* Pick popularity */}
                {pickedId && matchPop[pickedId] !== undefined && (
                  <p className="text-[10px] text-muted-foreground px-1">
                    {matchPop[pickedId]}% of players picked{' '}
                    <span className="inline-flex items-center gap-1 text-white">
                      <FlagIcon code={teamsMap[pickedId]?.flag} name={teamsMap[pickedId]?.name ?? ''} className="h-3.5 w-5" />
                      {teamsMap[pickedId]?.name ?? '—'}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function getRoundStatus(
  roundMatches: Match[],
  pickStatus: Record<string, 'correct' | 'incorrect' | 'pending' | 'unknown'>
): 'all-correct' | 'has-incorrect' | 'mixed' | 'pending' {
  const completed = roundMatches.filter((m) => m.status === 'COMPLETED');
  if (completed.length === 0) return 'pending';

  const statuses = completed.map((m) => pickStatus[m.id]);
  if (statuses.every((s) => s === 'correct')) return 'all-correct';
  if (statuses.some((s) => s === 'incorrect')) return 'has-incorrect';
  return 'mixed';
}
