"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface p-6">
      <section className="max-w-md rounded-3xl border border-red-500/20 bg-surface-raised p-8 text-center shadow-card">
        <AlertCircle
          className="mx-auto h-10 w-10 text-red-400"
          aria-hidden
        />
        <h1 className="mt-4 text-xl font-semibold text-ink">
          Could not load dashboard
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          {error.message ||
            "Check your Supabase connection and environment variables."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
