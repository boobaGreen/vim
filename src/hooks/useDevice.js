import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user has a physical keyboard or is on a touch device.
 * It uses a combination of pointer media queries and touch event presence.
 */
export function useDevice() {
  const [hasPhysicalKeyboard, setHasPhysicalKeyboard] = useState(true);

  useEffect(() => {
    // Check if the device has a fine pointer (mouse/trackpad)
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    
    // Initial check
    const checkKeyboard = () => {
      const isTouchOnly = !finePointerQuery.matches && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      setHasPhysicalKeyboard(!isTouchOnly);
    };

    checkKeyboard();

    // Listen for changes (e.g., plugging in a mouse or switching device mode)
    const listener = (e) => setHasPhysicalKeyboard(e.matches);
    finePointerQuery.addEventListener('change', listener);

    return () => finePointerQuery.removeEventListener('change', listener);
  }, []);

  return { hasPhysicalKeyboard };
}
