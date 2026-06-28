'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminLoginProps {
  onAuthenticated: (password: string) => void;
}

export default function AdminLogin({ onAuthenticated }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Verify by attempting a no-op admin action
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem('admin_pw', password);
        onAuthenticated(password);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-sm mx-auto pt-24"
    >
      <div className="text-center mb-8">
        <span className="text-5xl">🔐</span>
        <h1 className="text-2xl font-black text-white mt-3">Admin access</h1>
        <p className="text-muted-foreground text-sm mt-1">Enter your admin password to continue.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <Input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          autoFocus
          className={`bg-background border-border text-white ${error ? 'border-[#EF4444] focus:border-[#EF4444]' : ''}`}
        />
        {error && (
          <p className="text-sm text-[#EF4444]">Incorrect password.</p>
        )}
        <Button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold"
        >
          {loading ? 'Checking…' : 'Enter'}
        </Button>
      </form>
    </motion.div>
  );
}
