import type { ReactNode } from "react";

type PolicySectionProps = {
  title: string;
  children: ReactNode;
  eyebrow?: string;
};

export default function PolicySection({ title, children, eyebrow }: PolicySectionProps) {
  return (
    <section className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)] sm:p-8">
      {eyebrow ? (
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-primary)]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-serif text-2xl text-[var(--foreground)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{children}</div>
    </section>
  );
}