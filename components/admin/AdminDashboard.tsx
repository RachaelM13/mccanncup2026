'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Match, Team, Round } from '@/types';
import { ROUND_LABELS, ROUND_ORDER } from '@/types';
import { adminResetTournamentAction } from '@/app/actions/tournament';
import MatchEditor from './MatchEditor';

interface AdminDashboardProps {
  initialMatches: Match[];
  teams: Team[];
  password: string;
  totalEntrants: number;
  totalSubmitted: number;
}

export default function AdminDashboard({
  initialMatches,
  teams,
  password,
  totalEntrants,
  totalSubmitted,
}: AdminDashboardProps) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [activeRound, setActiveRound] = useState<Round>('R32');
  const [resetting, setResetting] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const rounds = ROUND_ORDER.filter((r) => matches.some((m) => m.round === r));
  const roundMatches = matches
    .filter((m) => m.round === activeRound)
    .sort((a, b) => a.match_number - b.match_number);

  const completedCount = matches.filter((m) => m.status === 'COMPLETED').length;
  const liveCount = matches.filter((m) => m.status === 'LIVE').length;

  function handleMatchUpdated(updated: Match) {
    setMatches((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  }

  async function handleReset() {
    if (!resetConfirm) { setResetConfirm(true); return; }
    setResetting(true);
    try {
      await adminResetTournamentAction(password);
      setMatches((prev) => prev.map((m) => ({ ...m, winner_id: null, winner: null, home_score: null, away_score: null, status: 'SCHEDULED' as const })));
      setResetConfirm(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Reset failed');
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white">Admin</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Match results · World Cup 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" className="text-xs text-muted-foreground hover:text-white transition-colors">
            ← Back to site
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Brackets', value: totalEntrants },
          { label: 'Submitted', value: totalSubmitted },
          { label: 'Matches played', value: completedCount },
          { label: 'Live now', value: liveCount },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Round tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {rounds.map((round) => {
          const isActive   = round === activeRound;
          const doneCount  = matches.filter((m) => m.round === round && m.status === 'COMPLETED').length;
          const totalCount = matches.filter((m) => m.round === round).length;
          const allDone    = doneCount === totalCount;
          return (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-white'
              }`}
            >
              {ROUND_LABELS[round]}
              <span className={`ml-1.5 text-[10px] ${allDone ? 'text-[#22C55E]' : 'text-muted-foreground'}`}>
                {doneCount}/{totalCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Match editors */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRound}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-2"
        >
          {roundMatches.map((match) => (
            <MatchEditor
              key={match.id}
              match={match}
              teams={teams}
              password={password}
              onUpdated={handleMatchUpdated}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Danger zone */}
      <div className="rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/5 p-4 space-y-3">
        <p className="text-sm font-bold text-[#EF4444]">Danger zone</p>
        <p className="text-xs text-muted-foreground">
          Reset clears all match results and entrant brackets. For development only.
        </p>
        <button
          disabled={resetting}
          onClick={handleReset}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors disabled:opacity-50 ${
            resetConfirm
              ? 'bg-[#EF4444] text-white border-[#EF4444] hover:bg-[#DC2626]'
              : 'bg-transparent text-[#EF4444] border-[#EF4444]/50 hover:bg-[#EF4444]/10'
          }`}
        >
          {resetting
            ? 'Resetting…'
            : resetConfirm
            ? 'Are you sure? Click again to confirm'
            : 'Reset tournament'}
        </button>
        {resetConfirm && !resetting && (
          <button
            onClick={() => setResetConfirm(false)}
            className="text-xs text-muted-foreground hover:text-white ml-3"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
