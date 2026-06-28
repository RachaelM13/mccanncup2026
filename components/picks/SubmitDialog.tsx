"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  completion: { done: number; total: number };
  teamName: string;
}

export default function SubmitDialog({
  open,
  onOpenChange,
  onConfirm,
  completion,
  teamName,
}: SubmitDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const incomplete = completion.done < completion.total;

  async function handleConfirm() {
    setLoading(true);
    setError(null);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-sm bg-card border-border">
        <DialogHeader>
          <div className="text-4xl text-center mb-2">🏆</div>
          <DialogTitle className="text-center text-white text-xl">
            Submit your bracket?
          </DialogTitle>
          <DialogDescription className="text-center">
            <span className="font-semibold text-white">{teamName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {incomplete && (
            <div className="rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 p-3 text-sm text-[#EF4444]">
              ⚠️ You&apos;ve only made {completion.done} of {completion.total} picks. You must complete all picks before submitting.
            </div>
          )}

          <div className="rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 p-3 text-sm text-[#EF4444]">
            🔒 This submission is <strong>PERMANENT</strong> and cannot be
            changed, EVER... <br />
            <em>
              ** If you text me I can change the database but its annoying sooo
              double check your picks before you submit.
            </em>
          </div>

          {error && (
            <p className="text-sm text-[#EF4444] text-center">{error}</p>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={handleConfirm}
            disabled={loading || incomplete}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting…" : "Yes, lock in my bracket"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="w-full text-muted-foreground hover:text-white"
          >
            Go back and keep editing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
