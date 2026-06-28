"use client";

import { motion } from "framer-motion";
import type { Match } from "@/types";
import { format } from "date-fns";
import FlagIcon from "@/components/ui/FlagIcon";

interface MatchCardProps {
  match: Match;
  compact?: boolean;
  highlightTeamId?: string;
}

export default function MatchCard({
  match,
  compact = false,
  highlightTeamId,
}: MatchCardProps) {
  const isCompleted = match.status === "COMPLETED";
  const isLive = match.status === "LIVE";

  return (
    <div
      className={`relative rounded-xl border border-border bg-card overflow-hidden transition-all ${
        compact ? "text-xs" : "text-sm"
      }`}
    >
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#22C55E]">
          <motion.div
            className="h-full bg-[#22C55E] opacity-60"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      )}

      <div className={`${compact ? "p-2" : "p-3"}`}>
        {/* Match header */}
        {!compact && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Match {match.match_number}
            </span>
            {isLive ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#22C55E] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                Live
              </span>
            ) : isCompleted ? (
              <span className="text-[10px] text-muted-foreground">FT</span>
            ) : match.kickoff ? (
              <span className="text-[10px] text-muted-foreground">
                {format(new Date(match.kickoff), "MMM d, HH:mm")}
              </span>
            ) : null}
          </div>
        )}

        {/* Home team */}
        <TeamRow
          team={match.home_team}
          score={match.home_score}
          isWinner={isCompleted && match.winner_id === match.home_team_id}
          isLoser={
            isCompleted &&
            match.winner_id !== null &&
            match.winner_id !== match.home_team_id
          }
          isHighlighted={highlightTeamId === match.home_team_id}
          compact={compact}
          showScore={isCompleted || isLive}
        />

        {/* Divider */}
        <div
          className={`${compact ? "my-1" : "my-2"} border-t border-border/50`}
        />

        {/* Away team */}
        <TeamRow
          team={match.away_team}
          score={match.away_score}
          isWinner={isCompleted && match.winner_id === match.away_team_id}
          isLoser={
            isCompleted &&
            match.winner_id !== null &&
            match.winner_id !== match.away_team_id
          }
          isHighlighted={highlightTeamId === match.away_team_id}
          compact={compact}
          showScore={isCompleted || isLive}
        />
      </div>
    </div>
  );
}

interface TeamRowProps {
  team: Match["home_team"];
  score: number | null;
  isWinner: boolean;
  isLoser: boolean;
  isHighlighted: boolean;
  compact: boolean;
  showScore: boolean;
}

function TeamRow({
  team,
  score,
  isWinner,
  isLoser,
  isHighlighted,
  compact,
  showScore,
}: TeamRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-1 transition-colors ${
        isHighlighted ? "bg-[#2563EB]/10" : ""
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <FlagIcon
          code={team?.flag}
          name={team?.name}
          className={compact ? "h-4 w-6" : "h-5 w-7"}
        />
        <span
          className={`font-medium truncate ${
            isWinner
              ? "text-white font-semibold"
              : isLoser
                ? "text-muted-foreground"
                : "text-foreground"
          }`}
        >
          {team?.name ?? "TBD"}
        </span>
      </div>
      {showScore && (
        <span
          className={`font-bold tabular-nums min-w-[1.25rem] text-center ${
            isWinner ? "text-white" : "text-muted-foreground"
          }`}
        >
          {score ?? "-"}
        </span>
      )}
    </div>
  );
}
