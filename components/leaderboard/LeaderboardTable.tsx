'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { LeaderboardEntry } from '@/types';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  totalSubmitted: number;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export default function LeaderboardTable({ entries, totalSubmitted }: LeaderboardTableProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter(
      (e) =>
        e.team_name.toLowerCase().includes(q) ||
        e.full_name.toLowerCase().includes(q)
    );
  }, [entries, query]);

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <div className="flex items-center justify-between gap-3 text-sm flex-wrap">
        <span className="text-muted-foreground">
          <span className="text-white font-semibold">{totalSubmitted}</span>{' '}
          {totalSubmitted === 1 ? 'bracket' : 'brackets'} submitted
        </span>
        {entries.length > 0 && (
          <span className="text-muted-foreground text-xs">
            Leader: <span className="text-white font-semibold">{entries[0]?.points ?? 0} pts</span>
          </span>
        )}
      </div>

      {/* Search */}
      {entries.length > 4 && (
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or team…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-[#2563EB] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-12 text-center text-muted-foreground text-sm">
          {query ? `No results for "${query}"` : 'No brackets submitted yet.'}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {/* Column headers */}
          <div className="hidden sm:grid grid-cols-[2rem_1fr_auto_auto_auto] items-center gap-4 px-4 py-2 border-b border-border">
            <span />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Team</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Pts</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Correct</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Max</span>
          </div>

          <AnimatePresence initial={false}>
            {filtered.map((entry, i) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={`/bracket/${entry.bracket_token}`}
                  className="grid grid-cols-[2rem_1fr_auto] sm:grid-cols-[2rem_1fr_auto_auto_auto] items-center gap-4 px-4 py-3.5 hover:bg-white/5 transition-colors border-b border-border last:border-0"
                >
                  {/* Rank */}
                  <span className="text-center">
                    {entry.rank <= 3 ? (
                      <span className="text-lg">{MEDALS[entry.rank - 1]}</span>
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">{entry.rank}</span>
                    )}
                  </span>

                  {/* Name */}
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{entry.team_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{entry.full_name}</p>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="font-bold text-white tabular-nums">{entry.points}</p>
                    <p className="text-[10px] text-muted-foreground sm:hidden">{entry.correct_picks} correct</p>
                  </div>

                  {/* Correct — desktop only */}
                  <span className="hidden sm:block text-sm text-muted-foreground tabular-nums text-right">
                    {entry.correct_picks}
                  </span>

                  {/* Max — desktop only */}
                  <span className="hidden sm:block text-sm text-muted-foreground tabular-nums text-right">
                    {entry.max_possible}
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
