'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Match, Pick, Round } from '@/types';
import { ROUND_LABELS } from '@/types';
import { computeEffectiveTeams, buildTeamsMap } from '@/lib/bracket';
import PickMatchCard from './PickMatchCard';

const PICKABLE_ROUNDS: Round[] = ['R32', 'R16', 'QF', 'SF', 'FINAL'];

interface LockedBracketProps {
  matches: Match[];
  picks: Pick[];
  teamName: string;
  fullName: string;
  points: number;
  correctPicks: number;
}

export default function LockedBracket({
  matches,
  picks,
  teamName,
  fullName,
  points,
  correctPicks,
}: LockedBracketProps) {
  const picksMap = Object.fromEntries(picks.map((p) => [p.match_id, p.picked_team_id]));
  const teamsMap = buildTeamsMap(matches);
  const effectiveTeams = computeEffectiveTeams(matches, picksMap, teamsMap);

  const activeRoundDefault = PICKABLE_ROUNDS.find((r) =>
    matches.filter((m) => m.round === r).some((m) => m.status !== 'COMPLETED')
  ) ?? PICKABLE_ROUNDS[PICKABLE_ROUNDS.length - 1];

  const [activeRound, setActiveRound] = useState<Round>(activeRoundDefault);

  const roundMatches = matches
    .filter((m) => m.round === activeRound)
    .sort((a, b) => a.match_number - b.match_number);

  return (
    <div className="space-y-5">
      {/* Score summary */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-black text-white">{teamName}</p>
            <p className="text-sm text-muted-foreground">{fullName}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-[#2563EB]">{points}</p>
            <p className="text-xs text-muted-foreground">pts · {correctPicks} correct</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-[#22C55E]">
          <span>🔒</span>
          <span>Bracket locked</span>
        </div>
      </div>

      {/* Round tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {PICKABLE_ROUNDS.filter((r) => matches.some((m) => m.round === r)).map((round) => {
          const isActive = round === activeRound;
          return (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-white'
              }`}
            >
              {ROUND_LABELS[round]}
            </button>
          );
        })}
      </div>

      {/* Picks */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRound}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {roundMatches.map((match) => {
            const eff = effectiveTeams[match.id] ?? { home: null, away: null };
            return (
              <div key={match.id}>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1 px-1">
                  Match {match.match_number}
                </p>
                <PickMatchCard
                  match={match}
                  homeTeam={eff.home}
                  awayTeam={eff.away}
                  pickedTeamId={picksMap[match.id]}
                  onPick={() => {}}
                  locked
                  actualWinnerId={match.winner_id}
                  matchComplete={match.status === 'COMPLETED'}
                />
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
