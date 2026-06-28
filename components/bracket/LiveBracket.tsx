'use client';

import { motion } from 'framer-motion';
import type { Match, Round } from '@/types';
import { ROUND_LABELS, ROUND_ORDER } from '@/types';
import MatchCard from './MatchCard';
import MobileBracket from './MobileBracket';

interface LiveBracketProps {
  matches: Match[];
}

const ROUNDS_IN_ORDER: Round[] = ['R32', 'R16', 'QF', 'SF', 'FINAL'];

export default function LiveBracket({ matches }: LiveBracketProps) {
  const activeRounds = ROUNDS_IN_ORDER.filter((r) => matches.some((m) => m.round === r));

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        <MobileBracket matches={matches} />
      </div>

      {/* Desktop horizontal scrolling bracket */}
      <div className="hidden md:block">
        <div className="overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-4 min-w-max">
            {activeRounds.map((round, roundIdx) => {
              const roundMatches = matches
                .filter((m) => m.round === round)
                .sort((a, b) => a.match_number - b.match_number);

              const hasLive = roundMatches.some((m) => m.status === 'LIVE');

              return (
                <motion.div
                  key={round}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: roundIdx * 0.05 }}
                  className="flex flex-col"
                  style={{ width: 220 }}
                >
                  {/* Round header */}
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {ROUND_LABELS[round]}
                    </span>
                    {hasLive && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#22C55E] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>

                  {/* Matches vertically centered for bracket visual */}
                  <div className="flex flex-col justify-around flex-1 gap-3">
                    {roundMatches.map((match) => (
                      <MatchCard key={match.id} match={match} compact />
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Third Place — shown at the end, separate */}
            {matches.some((m) => m.round === 'THIRD') && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: activeRounds.length * 0.05 }}
                className="flex flex-col"
                style={{ width: 220 }}
              >
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {ROUND_LABELS['THIRD']}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {matches
                    .filter((m) => m.round === 'THIRD')
                    .map((match) => (
                      <MatchCard key={match.id} match={match} compact />
                    ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
