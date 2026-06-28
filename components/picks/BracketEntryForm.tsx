"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEntrantAction } from "@/app/actions/tournament";

interface BracketEntryFormProps {
  onCreated: (
    entrantId: string,
    token: string,
    fullName: string,
    teamName: string,
  ) => void;
  deadlinePassed: boolean;
}

export default function BracketEntryForm({
  onCreated,
  deadlinePassed,
}: BracketEntryFormProps) {
  const [fullName, setFullName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !teamName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { entrant, token } = await createEntrantAction({
        full_name: fullName.trim(),
        team_name: teamName.trim(),
      });
      onCreated(entrant.id, token, entrant.full_name, entrant.team_name);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (deadlinePassed) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <span className="text-6xl">🔒</span>
        <h2 className="text-xl font-bold text-white">Submissions closed</h2>
        <p className="text-muted-foreground text-sm">
          The bracket submission deadline has passed. Check out the leaderboard
          to see how everyone is doing.
        </p>
        <a
          href="/leaderboard"
          className="inline-block text-sm font-semibold text-[#2563EB] hover:underline"
        >
          View leaderboard →
        </a>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <span className="text-5xl">⚽</span>
        <h2 className="text-2xl font-black text-white mt-3">
          Create your bracket
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
          One step closer to the trophy! Pick your winners from the Round of 32
          all the way to the champion.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card p-6 space-y-5"
      >
        <div className="space-y-2">
          <Label
            htmlFor="full-name"
            className="text-sm font-semibold text-white"
          >
            Your full name
          </Label>
          <Input
            id="full-name"
            placeholder="Rachael McCann"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="bg-background border-border text-white placeholder:text-muted-foreground focus:border-[#2563EB]"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="team-name"
            className="text-sm font-semibold text-white"
          >
            Team name{" "}
            <span className="text-muted-foreground font-normal">
              (shown on the leaderboard)
            </span>
          </Label>
          <Input
            id="team-name"
            placeholder="New York Knicks"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="bg-background border-border text-white placeholder:text-muted-foreground focus:border-[#2563EB]"
          />
          <p className="text-[11px] text-muted-foreground">
            This is your fun display name on the leaderboard.
          </p>
        </div>

        {error && <p className="text-sm text-[#EF4444]">{error}</p>}

        <Button
          type="submit"
          disabled={loading || !fullName.trim() || !teamName.trim()}
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold h-11"
        >
          {loading ? "Creating…" : "Start picking →"}
        </Button>

        <p className="text-[11px] text-muted-foreground text-center">
          Once submitted, your bracket is locked forever 🔒 only I have the key.
        </p>
      </form>
    </motion.div>
  );
}
