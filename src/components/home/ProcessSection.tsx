"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Browse the edit",
    description:
      "Explore the full collection or filter by shape — totes, shoulder bags, hobos, and mini styles, each presented with editorial calm.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Secure your piece",
    description:
      "Add to your bag and complete checkout in a few taps. Clean, low-friction, and built to feel as polished as the product.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Receive & unwrap",
    description:
      "Your handbag arrives in premium packaging with nationwide tracking — an unboxing that feels like the first wear.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-2xl">
          <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[var(--color-primary)]">
            Our atelier
          </p>
          <h2 className="font-serif text-3xl leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            From discovery to doorstep — three calm steps.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            The Pursethetic experience is designed to feel as refined as the bags themselves — unhurried, clear, and quietly premium at every stage.
          </p>
        </div>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] p-7 shadow-[0_20px_50px_rgba(61,47,28,0.07)]"
          >
            {/* Step number — large watermark */}
            <div
              className="pointer-events-none absolute right-5 top-3 font-serif text-[5.5rem] font-bold leading-none text-[rgba(155,122,67,0.07)] select-none"
              aria-hidden="true"
            >
              {step.step}
            </div>

            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(155,122,67,0.1)] text-[var(--color-primary)]">
              {step.icon}
            </div>

            {/* Content */}
            <div className="relative mt-5">
              <p className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]">
                Step {step.step}
              </p>
              <h3 className="font-serif text-2xl text-[var(--foreground)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connector line (desktop only) */}
      <div className="mt-8 hidden items-center justify-center gap-0 md:flex" aria-hidden="true">
        {steps.map((step, i) => (
          <div key={step.step} className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-[rgba(155,122,67,0.35)]" />
            {i < steps.length - 1 && (
              <div className="h-px w-32 bg-[rgba(155,122,67,0.18)] lg:w-56" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
