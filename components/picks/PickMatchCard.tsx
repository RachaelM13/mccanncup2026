'use client';

import { motion } from 'framer-motion';
import type { Match, Team } from '@/types';
import FlagIcon from '@/components/ui/FlagIcon';

interface PickMatchCardProps {
  match: Match;
  homeTeam: Team | null;
  awayTeam: Team | null;
  pickedTeamId: string | undefined;
  onPick: (matchId: string, teamId: string) => void;
  disabled?: boolean;
  // For locked view
  locked?: boolean;
  actualWinnerId?: string | null;
  matchComplete?: boolean;
}

export default function PickMatchCard({
  match,
  homeTeam,
  awayTeam,
  pickedTeamId,
  onPick,
  disabled = false,
  locked = false,
  actualWinnerId,
  matchComplete = false,
}: PickMatchCardProps) {
  const canPick = !locked && !disabled;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="divide-y divide-border/50">
        <TeamButton
          team={homeTeam}
          isPicked={pickedTeamId === homeTeam?.id}
          isOtherPicked={!!pickedTeamId && pickedTeamId !== homeTeam?.id}
          isActualWinner={matchComplete && actualWinnerId === homeTeam?.id}
          isActualLoser={matchComplete && !!actualWinnerId && actualWinnerId !== homeTeam?.id}
          canPick={canPick && !!homeTeam}
          onClick={() => homeTeam && onPick(match.id, homeTeam.id)}
        />
        <TeamButton
          team={awayTeam}
          isPicked={pickedTeamId === awayTeam?.id}
          isOtherPicked={!!pickedTeamId && pickedTeamId !== awayTeam?.id}
          isActualWinner={matchComplete && actualWinnerId === awayTeam?.id}
          isActualLoser={matchComplete && !!actualWinnerId && actualWinnerId !== awayTeam?.id}
          canPick={canPick && !!awayTeam}
          onClick={() => awayTeam && onPick(match.id, awayTeam.id)}
        />
      </div>
    </div>
  );
}

interface TeamButtonProps {
  team: Team | null;
  isPicked: boolean;
  isOtherPicked: boolean;
  isActualWinner: boolean;
  isActualLoser: boolean;
  canPick: boolean;
  onClick: () => void;
}

function TeamButton({
  team,
  isPicked,
  isOtherPicked,
  isActualWinner,
  isActualLoser,
  canPick,
  onClick,
}: TeamButtonProps) {
  const isTBD = !team;

  let bg = '';
  let textColor = 'text-foreground';
  let statusIcon = null;

  if (isPicked && isActualWinner) {
    bg = 'bg-[#22C55E]/10';
    textColor = 'text-[#22C55E]';
    statusIcon = <span className="text-[#22C55E] text-sm">✓</span>;
  } else if (isPicked && isActualLoser) {
    bg = 'bg-[#EF4444]/10';
    textColor = 'text-[#EF4444]';
    statusIcon = <span className="text-[#EF4444] text-sm">✗</span>;
  } else if (isPicked) {
    bg = 'bg-[#2563EB]/15 border-l-2 border-l-[#2563EB]';
    textColor = 'text-white font-semibold';
  } else if (isOtherPicked || isTBD) {
    textColor = 'text-muted-foreground';
  }

  return (
    <motion.button
      whileTap={canPick ? { scale: 0.98 } : {}}
      onClick={canPick ? onClick : undefined}
      disabled={!canPick || isTBD}
      className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left
        ${canPick && !isTBD ? 'hover:bg-white/5 cursor-pointer active:bg-white/10' : 'cursor-default'}
        ${bg}
      `}
    >
      <FlagIcon code={team?.flag} name={team?.name ?? ''} className="h-5 w-7 flex-shrink-0" />
      <span className={`flex-1 text-sm truncate ${textColor} ${isTBD ? 'italic' : ''}`}>
        {team?.name ?? 'TBD'}
      </span>
      {statusIcon}
      {isPicked && !isActualWinner && !isActualLoser && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
      )}
    </motion.button>
  );
}
