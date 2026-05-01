import { useEffect } from 'react';

export default function InteractiveShimmer() {
  useEffect(() => {
    const root = document.documentElement;
    let rafId: number;

    const updatePointer = (clientX: number, clientY: number) => {
      // Calculate relative position (0 to 100%)
      // We use the element itself for the gradient, but the light source is global
      // To make it feel natural, we can use client coordinates relative to window
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      
      root.style.setProperty('--pointer-x', `${x}%`);
      root.style.setProperty('--pointer-y', `${y}%`);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updatePointer(e.clientX, e.clientY));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => 
          updatePointer(e.touches[0].clientX, e.touches[0].clientY)
        );
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
