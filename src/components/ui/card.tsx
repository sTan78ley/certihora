import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-3xl border border-[var(--border)] bg-white p-5 shadow-[0_14px_36px_rgba(28,38,74,.08)] ${className}`} {...props} />;
}
