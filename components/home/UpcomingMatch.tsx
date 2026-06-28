'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Match } from '@/types';
import { ROUND_LABELS } from '@/types';
import { format, formatDistanceToNow, isPast } from 'date-fns';

interface UpcomingMatchProps {
  match: Match;
}

export default function UpcomingMatch({ match }: UpcomingMatchProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!match.kickoff) return;
    const update = () => {
      const kickoff = new Date(match.kickoff!);
      if (isPast(kickoff)) {
        setTimeLeft('Underway');
      } else {
        setTimeLeft(formatDistanceToNow(kickoff, { addSuffix: true }));
      }
    };
    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, [match.kickoff]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Next Match
        </span>
        <span className="text-xs font-semibold text-[#2563EB]">
          {ROUND_LABELS[match.round]}
        </span>
      </div>

      <div className="p-5">
        {/* Teams */}
        <div className="flex items-center justify-between gap-4">
          {/* Home */}
          <div className="flex-1 flex flex-col items-center gap-2 text-center">
            <span className="text-5xl">{match.home_team?.flag ?? '🏳️'}</span>
            <span className="font-semibold text-sm">{match.home_team?.name ?? 'TBD'}</span>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-black text-muted-foreground/40">VS</span>
            {match.kickoff && (
              <span className="text-[11px] text-muted-foreground text-center">
                {format(new Date(match.kickoff), 'MMM d • HH:mm')}
              </span>
            )}
          </div>

          {/* Away */}
          <div className="flex-1 flex flex-col items-center gap-2 text-center">
            <span className="text-5xl">{match.away_team?.flag ?? '🏳️'}</span>
            <span className="font-semibold text-sm">{match.away_team?.name ?? 'TBD'}</span>
          </div>
        </div>

        {/* Countdown */}
        {timeLeft && (
          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">{timeLeft}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
