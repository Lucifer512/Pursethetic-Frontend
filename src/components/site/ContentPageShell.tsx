import Link from "next/link";
import type { ReactNode } from "react";

type ContentPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function ContentPageShell({
  eyebrow,
  title,
  description,
  children,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: ContentPageShellProps) {
  const renderAction = (href: string, label: string, variant: "primary" | "secondary") => {
    const baseClass =
      variant === "primary"
        ? "inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#8c6e41]"
        : "inline-flex items-center justify-center rounded-full border border-[rgba(155,122,67,0.24)] bg-[rgba(255,250,241,0.9)] px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--foreground)] transition hover:border-[rgba(155,122,67,0.45)] hover:bg-white";

    if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a href={href} className={baseClass}>
          {label}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClass}>
        {label}
      </Link>
    );
  };

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-88 bg-[radial-gradient(circle_at_top,rgba(196,162,105,0.14),transparent_48%)]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[rgba(155,122,67,0.08)] blur-3xl" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-primary">{eyebrow}</p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-(--color-muted) sm:text-lg">{description}</p>

          {(primaryHref || secondaryHref) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryHref ? (
                renderAction(primaryHref, primaryLabel ?? "Continue", "primary")
              ) : null}
              {secondaryHref ? (
                renderAction(secondaryHref, secondaryLabel ?? "Learn more", "secondary")
              ) : null}
            </div>
          )}
        </div>

        <div className="mt-12">{children}</div>
      </section>
    </main>
  );
}