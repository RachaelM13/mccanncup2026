'use client';

import { motion } from 'framer-motion';
import type { Match } from '@/types';
import { ROUND_LABELS } from '@/types';

interface RecentResultsProps {
  matches: Match[];
}

export default function RecentResults({ matches }: RecentResultsProps) {
  if (matches.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 text-center text-sm text-muted-foreground">
        No results yet — the tournament is just getting started!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {matches.map((match, i) => (
        <motion.div
          key={match.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl border border-border bg-card p-3"
        >
          <div className="flex items-center justify-between gap-3">
            {/* Home */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xl flex-shrink-0">{match.home_team?.flag ?? '🏳️'}</span>
              <span
                className={`text-sm font-medium truncate ${
                  match.winner_id === match.home_team_id ? 'text-white font-semibold' : 'text-muted-foreground'
                }`}
              >
                {match.home_team?.name ?? 'TBD'}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <span
                className={`text-base font-bold tabular-nums w-5 text-right ${
                  match.winner_id === match.home_team_id ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                {match.home_score ?? '-'}
              </span>
              <span className="text-muted-foreground text-sm px-1">–</span>
              <span
                className={`text-base font-bold tabular-nums w-5 ${
                  match.winner_id === match.away_team_id ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                {match.away_score ?? '-'}
              </span>
            </div>

            {/* Away */}
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
              <span
                className={`text-sm font-medium truncate text-right ${
                  match.winner_id === match.away_team_id ? 'text-white font-semibold' : 'text-muted-foreground'
                }`}
              >
                {match.away_team?.name ?? 'TBD'}
              </span>
              <span className="text-xl flex-shrink-0">{match.away_team?.flag ?? '🏳️'}</span>
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {ROUND_LABELS[match.round]} · Match {match.match_number}
            </span>
            <span className="text-[10px] text-[#22C55E] font-semibold uppercase">FT</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
