"use client";

const TICKER_ITEMS = [
  "Premium handbags",
  "Free delivery over Rs. 4,000",
  "4.9 ★ rated",
  "7-day exchange",
  "Handcrafted quality",
  "Nationwide shipping",
  "Editorial luxury",
  "Made with care",
];

export default function MarqueeStrip() {
  // Double the items so the seamless loop never reveals the gap
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden border-y border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.75)] backdrop-blur-sm py-3">
      <div className="animate-marquee flex min-w-max whitespace-nowrap" aria-hidden="true">
        {items.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-primary">
              {text}
            </span>
            <span className="text-[0.68rem] text-[rgba(155,122,67,0.35)]">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
