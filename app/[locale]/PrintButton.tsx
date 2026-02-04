"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      className="rounded-md bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)]"
      onClick={() => window.print()}
    >
      {label}
    </button>
  );
}
