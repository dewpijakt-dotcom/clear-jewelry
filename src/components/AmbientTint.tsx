'use client';

import { useEffect } from 'react';

/**
 * AMBIENT TINT — sets a CSS variable on `<html>` based on the visitor's
 * local time of day. The gold-tint variable shifts subtly so the maison
 * feels warmer at sunrise/sunset and cooler at midday/night. Returning
 * visitors at different times see a quietly different site.
 *
 * Modes (Thai local time is fine — uses the device clock):
 *   05–08  warm dawn      — slightly more amber
 *   08–17  daylight       — neutral gold
 *   17–20  golden hour    — most amber
 *   20–05  evening salon  — slightly cooler / champagne
 */
export default function AmbientTint() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const apply = () => {
      const h = new Date().getHours();
      let tint: string;
      if (h >= 17 && h < 20) {
        tint = 'rgba(226, 198, 129, 0.42)'; // golden hour
      } else if (h >= 5 && h < 8) {
        tint = 'rgba(226, 198, 129, 0.34)'; // dawn
      } else if (h >= 8 && h < 17) {
        tint = 'rgba(226, 198, 129, 0.28)'; // daylight
      } else {
        tint = 'rgba(235, 217, 168, 0.30)'; // evening champagne
      }
      document.documentElement.style.setProperty('--ambient-tint', tint);
    };

    apply();
    // Re-evaluate hourly in case the visitor lingers
    const id = window.setInterval(apply, 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  return null;
}
