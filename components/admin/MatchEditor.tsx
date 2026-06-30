'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Match, Team } from '@/types';
import { adminUpdateMatchAction } from '@/app/actions/tournament';
import { format } from 'date-fns';
import FlagIcon from '@/components/ui/FlagIcon';

interface MatchEditorProps {
  match: Match;
  teams: Team[];
  password: string;
  onUpdated: (match: Match) => void;
}

export default function MatchEditor({ match, teams, password, onUpdated }: MatchEditorProps) {
  const [expanded, setExpanded] = useState(false);
  const [homeScore, setHomeScore] = useState(match.home_score?.toString() ?? '');
  const [awayScore, setAwayScore] = useState(match.away_score?.toString() ?? '');
  const [homeTeamId, setHomeTeamId] = useState(match.home_team_id ?? '');
  const [awayTeamId, setAwayTeamId] = useState(match.away_team_id ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sortedTeams = [...teams].sort((a, b) => a.name.localeCompare(b.name));

  async function completeMatch(winnerId: string) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updated = await adminUpdateMatchAction(password, match.id, {
        home_team_id: homeTeamId || null,
        away_team_id: awayTeamId || null,
        home_score: homeScore !== '' ? parseInt(homeScore) : null,
        away_score: awayScore !== '' ? parseInt(awayScore) : null,
        winner_id: winnerId,
        status: 'COMPLETED',
      });
      onUpdated(updated);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); setExpanded(false); }, 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  async function saveScores() {
    setLoading(true);
    setError(null);
    try {
      const updated = await adminUpdateMatchAction(password, match.id, {
        home_team_id: homeTeamId || null,
        away_team_id: awayTeamId || null,
        home_score: homeScore !== '' ? parseInt(homeScore) : null,
        away_score: awayScore !== '' ? parseInt(awayScore) : null,
        status: match.status === 'SCHEDULED' ? 'LIVE' : match.status,
      });
      onUpdated(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  const isCompleted = match.status === 'COMPLETED';
  const isLive = match.status === 'LIVE';
  const homeTeam = match.home_team;
  const awayTeam = match.away_team;

  return (
    <div className={`rounded-xl border bg-card overflow-hidden transition-colors ${
      isCompleted ? 'border-[#22C55E]/30' : isLive ? 'border-[#F59E0B]/40' : 'border-border'
    }`}>
      {/* Summary row */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Match number */}
        <span className="text-xs font-bold text-muted-foreground w-6 flex-shrink-0 tabular-nums">
          {match.match_number}
        </span>

        {/* Teams */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <FlagIcon code={homeTeam?.flag} name={homeTeam?.name} className="h-4 w-6 flex-shrink-0" />
            <span className={`font-medium truncate ${isCompleted && match.winner_id === match.home_team_id ? 'text-white' : 'text-muted-foreground'}`}>
              {homeTeam?.name ?? 'TBD'}
            </span>
            {isCompleted && (
              <span className="tabular-nums font-bold text-white ml-auto">
                {match.home_score ?? '-'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm mt-0.5">
            <FlagIcon code={awayTeam?.flag} name={awayTeam?.name} className="h-4 w-6 flex-shrink-0" />
            <span className={`font-medium truncate ${isCompleted && match.winner_id === match.away_team_id ? 'text-white' : 'text-muted-foreground'}`}>
              {awayTeam?.name ?? 'TBD'}
            </span>
            {isCompleted && (
              <span className="tabular-nums font-bold text-white ml-auto">
                {match.away_score ?? '-'}
              </span>
            )}
          </div>
        </div>

        {/* Status badge */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <span className="text-[11px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">FT</span>
          ) : isLive ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#F59E0B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />LIVE
            </span>
          ) : match.kickoff ? (
            <span className="text-[11px] text-muted-foreground">{format(new Date(match.kickoff), 'MMM d')}</span>
          ) : (
            <span className="text-[11px] text-muted-foreground">TBD</span>
          )}
        </div>

        {/* Expand arrow */}
        <svg
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Editor panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              {/* Warning when editing a completed match */}
              {isCompleted && (
                <div className="rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 p-2.5 text-xs text-[#F59E0B]">
                  ⚠️ Editing a completed match — saving will update the score and winner in place.
                </div>
              )}

              {/* Team selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Home team</label>
                  <select
                    value={homeTeamId}
                    onChange={(e) => setHomeTeamId(e.target.value)}
                    className="w-full rounded-lg bg-background border border-border text-white text-sm px-3 py-2 focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="">— TBD —</option>
                    {sortedTeams.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Away team</label>
                  <select
                    value={awayTeamId}
                    onChange={(e) => setAwayTeamId(e.target.value)}
                    className="w-full rounded-lg bg-background border border-border text-white text-sm px-3 py-2 focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="">— TBD —</option>
                    {sortedTeams.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Score inputs */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Home score</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                    placeholder="—"
                    className="w-full rounded-lg bg-background border border-border text-white text-center text-lg font-bold px-3 py-2 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <span className="text-muted-foreground text-lg font-bold mt-5">–</span>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Away score</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                    placeholder="—"
                    className="w-full rounded-lg bg-background border border-border text-white text-center text-lg font-bold px-3 py-2 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-[#EF4444]">{error}</p>}
              {success && <p className="text-sm text-[#22C55E]">✓ Updated successfully</p>}

              {/* Actions */}
              <div className="space-y-2">
                {/* Complete + advance — one button per team */}
                {(homeTeamId || match.home_team_id) && (awayTeamId || match.away_team_id) && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      disabled={loading}
                      onClick={() => completeMatch(homeTeamId || match.home_team_id!)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E] text-sm font-semibold border border-[#22C55E]/30 transition-colors disabled:opacity-50"
                    >
                      <FlagIcon code={teams.find(t => t.id === (homeTeamId || match.home_team_id))?.flag} name={teams.find(t => t.id === (homeTeamId || match.home_team_id))?.name ?? ''} className="h-4 w-6 flex-shrink-0" />
                      <span className="truncate">{(teams.find(t => t.id === (homeTeamId || match.home_team_id))?.name) ?? 'Home'} wins</span>
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => completeMatch(awayTeamId || match.away_team_id!)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E] text-sm font-semibold border border-[#22C55E]/30 transition-colors disabled:opacity-50"
                    >
                      <FlagIcon code={teams.find(t => t.id === (awayTeamId || match.away_team_id))?.flag} name={teams.find(t => t.id === (awayTeamId || match.away_team_id))?.name ?? ''} className="h-4 w-6 flex-shrink-0" />
                      <span className="truncate">{(teams.find(t => t.id === (awayTeamId || match.away_team_id))?.name) ?? 'Away'} wins</span>
                    </button>
                  </div>
                )}

                {/* Save scores only */}
                <button
                  disabled={loading}
                  onClick={saveScores}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white text-sm font-medium border border-border transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving…' : isCompleted ? 'Save score correction' : 'Save scores (keep live)'}
                </button>

                {/* Re-open a completed match as live */}
                {isCompleted && (
                  <button
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const updated = await adminUpdateMatchAction(password, match.id, {
                          home_team_id: homeTeamId || null,
                          away_team_id: awayTeamId || null,
                          home_score: homeScore !== '' ? parseInt(homeScore) : null,
                          away_score: awayScore !== '' ? parseInt(awayScore) : null,
                          winner_id: null,
                          status: 'LIVE',
                        });
                        onUpdated(updated);
                        setExpanded(false);
                      } catch (e) {
                        setError(e instanceof Error ? e.message : 'Update failed');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] text-sm font-medium border border-[#EF4444]/30 transition-colors disabled:opacity-50"
                  >
                    Re-open as Live (undo Full Time)
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
