'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Match, Entrant, Pick, BracketPicks } from '@/types';
import { calculateScore } from '@/lib/scoring';
import { getEntrantAction, getPicksForEntrantAction, submitBracketAction } from '@/app/actions/tournament';
import BracketEntryForm from './BracketEntryForm';
import PickBracket from './PickBracket';
import LockedBracket from './LockedBracket';
import SubmissionCountdown from './SubmissionCountdown';

const LS_ID    = 'wc2026_entrant_id';
const LS_TOKEN = 'wc2026_token';

interface MyBracketClientProps {
  matches: Match[];
  deadline: Date;
}

type Phase = 'loading' | 'create' | 'building' | 'locked';

interface BracketSession {
  entrant: Entrant;
  token: string;
  picks: Pick[];
}

export default function MyBracketClient({ matches, deadline }: MyBracketClientProps) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [session, setSession] = useState<BracketSession | null>(null);
  const deadlinePassed = new Date() > deadline;

  // On mount, check localStorage for existing session
  useEffect(() => {
    async function init() {
      const id    = localStorage.getItem(LS_ID);
      const token = localStorage.getItem(LS_TOKEN);

      if (!id || !token) {
        setPhase('create');
        return;
      }

      try {
        const [entrant, picks] = await Promise.all([
          getEntrantAction(id),
          getPicksForEntrantAction(id),
        ]);

        if (!entrant) {
          // Stale localStorage — clear it
          localStorage.removeItem(LS_ID);
          localStorage.removeItem(LS_TOKEN);
          setPhase('create');
          return;
        }

        setSession({ entrant, token, picks });
        setPhase(entrant.submitted_at ? 'locked' : 'building');
      } catch {
        setPhase('create');
      }
    }
    init();
  }, []);

  function handleCreated(entrantId: string, token: string, fullName: string, teamName: string) {
    localStorage.setItem(LS_ID, entrantId);
    localStorage.setItem(LS_TOKEN, token);
    const entrant: Entrant = {
      id: entrantId,
      full_name: fullName,
      team_name: teamName,
      bracket_token: token,
      submitted_at: null,
      created_at: new Date().toISOString(),
    };
    setSession({ entrant, token, picks: [] });
    setPhase('building');
  }

  async function handleSubmit() {
    if (!session) return;
    await submitBracketAction(session.entrant.id, session.token);
    // Reload picks and move to locked view
    const [entrant, picks] = await Promise.all([
      getEntrantAction(session.entrant.id),
      getPicksForEntrantAction(session.entrant.id),
    ]);
    if (entrant) setSession({ entrant, token: session.token, picks });
    setPhase('locked');
  }

  if (phase === 'loading') {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white">My Bracket</h1>
          {session && (
            <p className="text-muted-foreground text-sm mt-0.5">
              <span className="text-white font-semibold">{session.entrant.team_name}</span>
              {' · '}{session.entrant.full_name}
            </p>
          )}
        </div>
        {phase === 'building' && <SubmissionCountdown deadline={deadline} />}
      </div>

      {/* Content */}
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {phase === 'create' && (
          <BracketEntryForm onCreated={handleCreated} deadlinePassed={deadlinePassed} />
        )}

        {phase === 'building' && session && (
          <PickBracket
            matches={matches}
            initialPicks={Object.fromEntries(session.picks.map((p) => [p.match_id, p.picked_team_id]))}
            entrantId={session.entrant.id}
            token={session.token}
            teamName={session.entrant.team_name}
            onSubmit={handleSubmit}
            deadlinePassed={deadlinePassed}
          />
        )}

        {phase === 'locked' && session && (
          <LockedBracketWithScore matches={matches} session={session} />
        )}
      </motion.div>
    </div>
  );
}

function LockedBracketWithScore({ matches, session }: { matches: Match[]; session: BracketSession }) {
  const { points, correct_picks } = calculateScore(matches, session.picks);
  return (
    <LockedBracket
      matches={matches}
      picks={session.picks}
      teamName={session.entrant.team_name}
      fullName={session.entrant.full_name}
      points={points}
      correctPicks={correct_picks}
    />
  );
}
