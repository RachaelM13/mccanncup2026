'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { LeaderboardEntry } from '@/types';

interface LeaderboardPreviewProps {
  entries: LeaderboardEntry[];
}

const MEDALS = ['🥇', '🥈', '🥉'];

export default function LeaderboardPreview({ entries }: LeaderboardPreviewProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 text-center">
        <p className="text-sm text-muted-foreground">No brackets submitted yet.</p>
        <Link href="/my-bracket" className="mt-2 inline-block text-sm font-semibold text-[#2563EB] hover:underline">
          Be the first →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {entries.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            href={`/bracket/${entry.bracket_token}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-border last:border-0"
          >
            {/* Rank */}
            <span className="w-7 text-center flex-shrink-0 text-lg">
              {i < 3 ? MEDALS[i] : <span className="text-sm font-bold text-muted-foreground">{entry.rank}</span>}
            </span>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white truncate">{entry.team_name}</p>
              <p className="text-xs text-muted-foreground truncate">{entry.full_name}</p>
            </div>

            {/* Points */}
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-sm text-white">{entry.points} pts</p>
              <p className="text-[10px] text-muted-foreground">{entry.correct_picks} correct</p>
            </div>
          </Link>
        </motion.div>
      ))}

      <Link
        href="/leaderboard"
        className="block px-4 py-3 text-center text-sm font-semibold text-[#2563EB] hover:bg-white/5 transition-colors"
      >
        View full leaderboard →
      </Link>
    </div>
  );
}
