"use client";

import { useEffect, useState } from "react";

export function useSiteShowcase(sectionKey, fallbackShowcase) {
  const [showcase, setShowcase] = useState(fallbackShowcase);
  const [hallBookingEnabled, setHallBookingEnabled] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(`/api/site-content?section=${sectionKey}`, { cache: "no-store" });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (!active) return;

        if (data?.showcase) {
          setShowcase({
            ...fallbackShowcase,
            ...data.showcase,
          });
        }

        setHallBookingEnabled(Boolean(data?.hallBookingEnabled));
      } catch (error) {
        // Keep static fallback data if fetch fails.
      }
    };

    setShowcase(fallbackShowcase);
    load();

    return () => {
      active = false;
    };
  }, [sectionKey, fallbackShowcase]);

  return { showcase, hallBookingEnabled };
}

