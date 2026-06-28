'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow, isPast, differenceInHours, differenceInMinutes } from 'date-fns';

interface SubmissionCountdownProps {
  deadline: Date;
}

export default function SubmissionCountdown({ deadline }: SubmissionCountdownProps) {
  const [display, setDisplay] = useState('');
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    const update = () => {
      if (isPast(deadline)) {
        setDisplay('Bracket submissions are closed');
        setUrgent(false);
        return;
      }
      const hours = differenceInHours(deadline, new Date());
      const mins  = differenceInMinutes(deadline, new Date()) % 60;
      setUrgent(hours < 24);
      if (hours < 1) {
        setDisplay(`Closes in ${mins}m`);
      } else if (hours < 24) {
        setDisplay(`Closes in ${hours}h ${mins}m`);
      } else {
        setDisplay(`Submissions close ${formatDistanceToNow(deadline, { addSuffix: true })}`);
      }
    };
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, [deadline]);

  if (!display) return null;

  return (
    <div
      className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg ${
        urgent
          ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30'
          : 'bg-card border border-border text-muted-foreground'
      }`}
    >
      {urgent && <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse flex-shrink-0" />}
      {display}
    </div>
  );
}
