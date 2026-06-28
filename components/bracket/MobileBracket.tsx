"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Match, Round } from "@/types";
import { ROUND_LABELS, ROUND_ORDER } from "@/types";
import MatchCard from "./MatchCard";

interface MobileBracketProps {
  matches: Match[];
}

export default function MobileBracket({ matches }: MobileBracketProps) {
  const rounds = ROUND_ORDER.filter((r) => matches.some((m) => m.round === r));

  // Default to the earliest active/upcoming round
  const defaultRound =
    rounds.find((r) =>
      matches
        .filter((m) => m.round === r)
        .some((m) => m.status !== "COMPLETED"),
    ) ?? rounds[rounds.length - 1];

  const [activeRound, setActiveRound] = useState<Round>(defaultRound);
  const roundMatches = matches.filter((m) => m.round === activeRound);

  return (
    <div className="space-y-4">
      {/* Round tabs - horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {rounds.map((round) => {
          const isActive = round === activeRound;
          const hasLive = matches
            .filter((m) => m.round === round)
            .some((m) => m.status === "LIVE");
          return (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#2563EB] text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-white hover:border-white/20"
              }`}
            >
              {hasLive && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22C55E]" />
              )}
              {ROUND_LABELS[round]}
            </button>
          );
        })}
      </div>

      {/* Match list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRound}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid gap-3"
        >
          {roundMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
