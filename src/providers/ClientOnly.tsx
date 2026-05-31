"use client";

import { useEffect, useState, ReactNode } from "react";

/**
 * Wrapper component that delays rendering until client-side hydration is complete.
 * This prevents hydration mismatches for components with client-only state.
 */
export default function ClientOnly({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}
