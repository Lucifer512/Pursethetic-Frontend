"use client";

import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export default function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full font-medium transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[rgba(155,122,67,0.35)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const sizeMap: Record<Size, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantMap: Record<Variant, string> = {
    primary: "bg-[var(--color-primary)] text-white shadow-[0_16px_32px_rgba(155,122,67,0.18)] hover:bg-[var(--color-primary-hover)]",
    secondary: "border border-[rgba(155,122,67,0.18)] bg-[rgba(255,250,241,0.92)] text-[var(--foreground)] hover:border-[rgba(155,122,67,0.35)] hover:bg-white",
    ghost: "bg-transparent text-[var(--foreground)] hover:bg-[rgba(155,122,67,0.08)]",
  };

  const classes = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
