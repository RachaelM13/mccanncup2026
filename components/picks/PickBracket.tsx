'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Match, Team, Round, BracketPicks } from '@/types';
import { ROUND_LABELS, ROUND_ORDER } from '@/types';
import { computeEffectiveTeams, applyPick, getCompletionStats, buildTeamsMap } from '@/lib/bracket';
import { savePicksAction } from '@/app/actions/tournament';
import PickMatchCard from './PickMatchCard';
import SubmitDialog from './SubmitDialog';

interface PickBracketProps {
  matches: Match[];
  initialPicks: BracketPicks;
  entrantId: string;
  token: string;
  teamName: string;
  onSubmit: () => Promise<void>;
  deadlinePassed: boolean;
}

const SAVE_DEBOUNCE_MS = 1500;
const PICKABLE_ROUNDS: Round[] = ['R32', 'R16', 'QF', 'SF', 'FINAL'];

export default function PickBracket({
  matches,
  initialPicks,
  entrantId,
  token,
  teamName,
  onSubmit,
  deadlinePassed,
}: PickBracketProps) {
  const [picks, setPicks] = useState<BracketPicks>(initialPicks);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [submitOpen, setSubmitOpen] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const teamsMap = buildTeamsMap(matches);
  const effectiveTeams = computeEffectiveTeams(matches, picks, teamsMap);
  const completion = getCompletionStats(matches, picks);

  // Default to earliest round with incomplete picks
  const activeRoundDefault = PICKABLE_ROUNDS.find((r) =>
    matches.filter((m) => m.round === r).some((m) => !picks[m.id])
  ) ?? PICKABLE_ROUNDS[PICKABLE_ROUNDS.length - 1];

  const [activeRound, setActiveRound] = useState<Round>(activeRoundDefault);

  const savePicks = useCallback(
    async (latestPicks: BracketPicks) => {
      setSaveStatus('saving');
      try {
        await savePicksAction(entrantId, latestPicks);
        setSaveStatus('saved');
      } catch {
        setSaveStatus('error');
      }
    },
    [entrantId]
  );

  function handlePick(matchId: string, teamId: string) {
    if (deadlinePassed) return;
    setPicks((prev) => {
      const next = applyPick(matchId, teamId, matches, prev);
      // Debounce save
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => savePicks(next), SAVE_DEBOUNCE_MS);
      return next;
    });
  }

  useEffect(() => () => { if (saveTimer.current) clearTimeout(saveTimer.current); }, []);

  const roundMatches = matches
    .filter((m) => m.round === activeRound)
    .sort((a, b) => a.match_number - b.match_number);

  const pct = completion.total > 0 ? Math.round((completion.done / completion.total) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          {/* Progress pill */}
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#2563EB] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ type: 'spring', bounce: 0 }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {completion.done}/{completion.total} picks
            </span>
          </div>

          {/* Save status */}
          <span className={`text-xs font-medium ${
            saveStatus === 'saving' ? 'text-[#F59E0B]' :
            saveStatus === 'error'  ? 'text-[#EF4444]' :
            'text-[#22C55E]'
          }`}>
            {saveStatus === 'saving' ? '↑ Saving…' :
             saveStatus === 'error'  ? '✗ Save failed' :
             '✓ Saved'}
          </span>
        </div>

        {/* Submit button */}
        {!deadlinePassed && (
          <button
            onClick={() => setSubmitOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors"
          >
            Submit bracket
          </button>
        )}
      </div>

      {deadlinePassed && (
        <div className="rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 p-3 text-sm text-[#EF4444]">
          🔒 Submissions are closed — you can view your picks but no longer edit them.
        </div>
      )}

      {/* Round tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {PICKABLE_ROUNDS.filter((r) => matches.some((m) => m.round === r)).map((round) => {
          const isActive   = round === activeRound;
          const roundDone  = matches.filter((m) => m.round === round).every((m) => picks[m.id]);
          return (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-white hover:border-white/20'
              }`}
            >
              {ROUND_LABELS[round]}
              {roundDone && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22C55E]" />
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
                  pickedTeamId={picks[match.id]}
                  onPick={handlePick}
                  disabled={deadlinePassed}
                />
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <SubmitDialog
        open={submitOpen}
        onOpenChange={setSubmitOpen}
        onConfirm={onSubmit}
        completion={completion}
        teamName={teamName}
      />
    </div>
  );
}
