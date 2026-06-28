'use client';

import { useEffect, useState } from 'react';
import type { Match, Team } from '@/types';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

interface AdminClientProps {
  initialMatches: Match[];
  teams: Team[];
  totalEntrants: number;
  totalSubmitted: number;
}

export default function AdminClient(props: AdminClientProps) {
  const [password, setPassword] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw');
    if (saved) setPassword(saved);
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!password) {
    return <AdminLogin onAuthenticated={setPassword} />;
  }

  return (
    <AdminDashboard
      {...props}
      password={password}
    />
  );
}
